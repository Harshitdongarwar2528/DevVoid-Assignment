import React, { useState, useEffect } from "react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import "../styles/TaskBoard.css";

function TaskBoard({ projectId }) {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (projectId) {
      setLoading(true);
      axios
        .get(`http://localhost:5000/api/tasks/${projectId}`)
        .then((res) => {
          setTasks(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching tasks:", err);
          setLoading(false);
        });
    }
  }, [projectId]);

  const addTask = async () => {
    if (!newTask.trim()) {
      alert("Please enter a task title!");
      return;
    }
    
    try {
      const res = await axios.post("http://localhost:5000/api/tasks", {
        projectId,
        title: newTask,
        status: "To Do",
      });
      setTasks([...tasks, res.data]);
      setNewTask("");
    } catch (err) {
      console.error("Error adding task:", err);
      alert("Failed to add task. Please try again.");
    }
  };

  const deleteTask = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
      alert("Failed to delete task. Please try again.");
    }
  };

  // Drag and Drop Handler
  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    // If dropped outside any column
    if (!destination) {
      return;
    }

    // If dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newStatus = destination.droppableId;
    const taskId = draggableId;

    try {
      // Optimistic update - immediately update UI
      const updatedTasks = tasks.map(task =>
        task._id === taskId ? { ...task, status: newStatus } : task
      );
      setTasks(updatedTasks);

      // Update in backend
      await axios.put(`http://localhost:5000/api/tasks/${taskId}`, {
        status: newStatus,
      });
    } catch (err) {
      console.error("Error updating task status:", err);
      // Revert optimistic update on error
      const originalTasks = tasks.map(task =>
        task._id === taskId ? { ...task, status: source.droppableId } : task
      );
      setTasks(originalTasks);
      alert("Failed to update task status. Please try again.");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  const statusConfig = {
    "To Do": { class: "todo", color: "#e53e3e" },
    "In Progress": { class: "in-progress", color: "#dd6b20" },
    "Done": { class: "done", color: "#38a169" }
  };

  if (loading) {
    return <div className="loading-text">Loading tasks...</div>;
  }

  return (
    <div className="task-board-container">
      <div className="task-board-header">
        <span>📋</span>
        <h3>Task Board</h3>
        <span className="status-count">{tasks.length} tasks</span>
      </div>

      <div className="task-input-section">
        <div className="task-input-box">
          <input
            className="task-input"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="What needs to be done?"
          />
          <button className="add-task-btn" onClick={addTask}>
            + Add Task
          </button>
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="status-container">
          {["To Do", "In Progress", "Done"].map((status) => {
            const statusTasks = tasks.filter((t) => t.status === status);
            
            return (
              <div key={status} className={`status-column ${statusConfig[status].class}`}>
                <div className="status-header">
                  <h4>{status}</h4>
                  <span className="status-count">{statusTasks.length}</span>
                </div>
                
                <Droppable droppableId={status}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`task-list ${snapshot.isDraggingOver ? "dragging-over" : ""}`}
                    >
                      {statusTasks.length === 0 && !snapshot.isDraggingOver ? (
                        <div className="empty-state">No tasks</div>
                      ) : null}
                      
                      {statusTasks.map((task, index) => (
                        <Draggable
                          key={task._id}
                          draggableId={task._id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`task-card ${snapshot.isDragging ? "dragging" : ""}`}
                            >
                              <div className="task-title">{task.title}</div>
                              <div className="task-actions">
                                <select
                                  className="status-select"
                                  value={task.status}
                                  onChange={(e) => {
                                    const newStatus = e.target.value;
                                    const taskId = task._id;
                                    
                                    // Optimistic update
                                    const updatedTasks = tasks.map(t =>
                                      t._id === taskId ? { ...t, status: newStatus } : t
                                    );
                                    setTasks(updatedTasks);

                                    // Update backend
                                    axios.put(`http://localhost:5000/api/tasks/${taskId}`, {
                                      status: newStatus,
                                    }).catch(err => {
                                      console.error("Error updating task status:", err);
                                      // Revert on error
                                      const originalTasks = tasks.map(t =>
                                        t._id === taskId ? { ...t, status: task.status } : t
                                      );
                                      setTasks(originalTasks);
                                    });
                                  }}
                                >
                                  <option value="To Do">To Do</option>
                                  <option value="In Progress">In Progress</option>
                                  <option value="Done">Done</option>
                                </select>
                                <button
                                  onClick={() => deleteTask(task._id)}
                                  className="delete-task-btn"
                                  title="Delete task"
                                >
                                  🗑️
                                </button>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
}

export default TaskBoard;
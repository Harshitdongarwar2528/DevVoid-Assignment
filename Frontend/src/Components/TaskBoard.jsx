import React, { useState, useEffect } from "react";
import axios from "axios";
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

  const changeStatus = async (id, newStatus) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/tasks/${id}`, {
        status: newStatus,
      });
      setTasks(
        tasks.map((t) => (t._id === id ? { ...t, status: res.data.status } : t))
      );
    } catch (err) {
      console.error("Error updating status:", err);
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

      <div className="status-container">
        {["To Do", "In Progress", "Done"].map((status) => {
          const statusTasks = tasks.filter((t) => t.status === status);
          return (
            <div key={status} className={`status-column ${statusConfig[status].class}`}>
              <div className="status-header">
                <h4>{status}</h4>
                <span className="status-count">{statusTasks.length}</span>
              </div>
              
              {statusTasks.length === 0 ? (
                <div className="empty-state">No tasks</div>
              ) : (
                statusTasks.map((task) => (
                  <div key={task._id} className="task-card">
                    <div className="task-title">{task.title}</div>
                    <div className="task-actions">
                      <select
                        className="status-select"
                        value={task.status}
                        onChange={(e) => changeStatus(task._id, e.target.value)}
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
                ))
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TaskBoard;
import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskBoard from "./TaskBoard";
import "../styles/ProjectDetails.css"; // Import CSS

function ProjectDetails({ projectId }) {
  const [project, setProject] = useState(null);

  useEffect(() => {
    if (projectId) {
      axios.get(`http://localhost:5000/api/projects/${projectId}`)
        .then(res => setProject(res.data))
        .catch(err => console.error(err));
    }
  }, [projectId]);

  if (!project) return <div>Loading project details...</div>;

  return (
    <div className="project-details">
      <div className="project-header">
        <h2>{project.name}</h2>
        <p>{project.description}</p>
      </div>
      <TaskBoard projectId={projectId} />
    </div>
  );
}

export default ProjectDetails;
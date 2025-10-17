import './App.css'
import React, { useState } from "react";
import ProjectDetails from './Components/ProjectDetails'
import TaskBoard from './Components/TaskBoard'

function App() {
  const [projectId, setProjectId] = useState("68efbcc49525305e9bff94df"); // Replace with actual ID
  
  return (
    <>
      <ProjectDetails projectId={projectId} />
      
    </>
  );
}

export default App
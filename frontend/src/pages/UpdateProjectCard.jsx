import React, { useState, useEffect } from 'react';

const UpdateProjectCard = ({ onUpdateProject, selectedProject }) => {
  const [projectData, setProjectData] = useState({
    projecttitle: '',
    employeename: '',
    status: '',
    tasks: '',
  });

  useEffect(() => {
    // Update the local state with the selected project data
    if (selectedProject) {
      setProjectData({
        projecttitle: selectedProject.projecttitle,
        employeename: selectedProject.employeename,
        status: selectedProject.status,
        tasks: selectedProject.tasks,
      });
    }
  }, [selectedProject]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProjectData({ ...projectData, [name]: value });
  };

  const handleSubmit = () => {
    // Call the onUpdateProject function passed from the parent component (Projects)
    onUpdateProject(projectData);
  };

  return (
    <div className="update-project-card">
      <h2>Update Project</h2>
      <div className="input-container">
        <input
          type="text"
          name="projecttitle"
          placeholder="Project Title"
          value={projectData.projecttitle}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="employeename"
          placeholder="Employee Name"
          value={projectData.employeename}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="status"
          placeholder="Status"
          value={projectData.status}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="tasks"
          placeholder="Tasks"
          value={projectData.tasks}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={handleSubmit}>Update Project</button>
      
    </div>
  );
};

export default UpdateProjectCard;
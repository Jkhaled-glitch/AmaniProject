import React, { useState } from 'react';

const AddProjectCard = ({ onAddProject }) => {
  const [projectData, setProjectData] = useState({
    projecttitle: '',
    employeename: '',
    status: '',
    tasks: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProjectData({ ...projectData, [name]: value });
  };

  const handleSubmit = () => {
    // Call the onAddProject function passed from the parent component (Projects)
    onAddProject(projectData);
  };

  return (
    <div className="add-project-card">
      <h2>Add New Project</h2>
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
      <button onClick={handleSubmit}>Add Project</button>
     
     <span className='closed'>x</span>

    </div>
  );
};

export default AddProjectCard;

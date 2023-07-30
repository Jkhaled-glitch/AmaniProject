import React, { useState } from 'react';

const AddEmployeeCard = ({ onAddEmployee,onClosed }) => {
  const [employeeData, setEmployeeData] = useState({
    name: '',
    projects: '',
    status: '',
    weeks: '',
    location : '',
    email: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({ ...employeeData, [name]: value });
  };

  const handleSubmit = () => {
    // Call the onAddProject function passed from the parent component (Projects)
    onAddEmployee(employeeData);
  };
  const handleClose = () => {
    onClosed();
  };

  return (
    <div className="add-employee-card">
      <h2>Add New Employee</h2>
      <div className="input-container">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={employeeData.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="projects"
          placeholder="Projects"
          value={employeeData.projects}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="status"
          placeholder="Status"
          value={employeeData.status}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="weeks"
          placeholder="weeks"
          value={employeeData.weeks}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={employeeData.location}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={employeeData.email}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={handleSubmit}>Add Employee</button>

      <span className='closed' onClick={handleClose}>X</span>
    </div>
  );
};

export default AddEmployeeCard;
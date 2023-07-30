// addproject.js
import React, { useState } from 'react';

const AddAdminCard = ({ onAddAdmin }) => {
  const [adminData, setAdminData] = useState({
    adminfullname: '',
    projects: '',
    designation: '',
    country: '',

  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdminData({ ...adminData, [name]: value });
  };

  const handleSubmit = () => {
    // Call the onAddProject function passed from the parent component (Projects)
    onAddAdmin(adminData);
  };

  return (
    <div className="add-admin-card">
      <h2>Add New Admin</h2>
      <div className="input-container">
        <input
          type="text"
          name="adminfullname"
          placeholder="Admin Full Name"
          value={adminData.adminfullname}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="projects"
          placeholder="Projects"
          value={adminData.projects}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="designation"
          placeholder="Designation"
          value={adminData.designation}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={adminData.location}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={adminData.email}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={handleSubmit}>Add Admin</button>
    </div>
  );
};

export default AddAdminCard;
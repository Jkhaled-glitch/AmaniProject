import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const AddProjectCard = ({ onAddTask,projectId}) => {
  const [taskData, setTaskData] = useState({
    title:'',
    projectId:projectId
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleSubmit = () => {
    // Call the onAddProject function passed from the parent component (Projects)
    onAddTask(taskData);
  };

  return (
    <div className="add-project-card">
      <h2>Add New Task</h2>
      <div className="input-container">
        <input
          type="text"
          name="title"
          placeholder="Task Title"
          value={taskData.title}
          onChange={handleInputChange}
        />
        
      </div>
      <button onClick={handleSubmit}>Add Task</button>
    </div>
  );
};

export default AddProjectCard;

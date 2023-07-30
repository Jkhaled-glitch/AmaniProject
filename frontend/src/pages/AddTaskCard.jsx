import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const AddProjectCard = ({ onAddTask,projectId}) => {
  const [taskData, setTaskData] = useState({
    Title:'',
    projectId:projectId,

  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleSubmit = () => {
  
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
          value={taskData.Title}
          onChange={handleInputChange}
        />
        <input
          type="color"
          name="Color"
         
          value={taskData.Color}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={handleSubmit}>Add Task</button>
    </div>
  );
};

export default AddProjectCard;

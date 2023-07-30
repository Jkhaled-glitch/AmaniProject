import axios from 'axios';



import AddTaskCard from './AddTaskCard';
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Search, // Include the Search service
  Page,
  Selection,
  Inject,
  Edit,
  Toolbar,
  Sort,
  Filter,
} from '@syncfusion/ej2-react-grids';
import { useParams } from 'react-router-dom';
import { tasksGrid } from '../data/dummy';
import { Header } from '../components';
import './employees.css';
import React, { useState, useEffect } from 'react';

const ProjectTasks = () => {
    const {id}  = useParams('id')
  
  const [showAddTaskCard, setShowAddTaskCard] = useState(false);
  const handleAddTaskButtonClick = () => {
    setShowAddTaskCard(true);
  };


  const handleAddTask = async (taskData) => {
    try {
      const response = await axios.post('http://localhost:5000/tasks/add', taskData);
      console.log(response.data); // Output the response message from the backend
      setShowAddTaskCard(false) // Hide the card after successful project addition
    } catch (error) {
      console.error(error);
    }
  };

  // Utilize the hook useEffect to execute fetchEmployees once the component is mounted
  useEffect(() => {
    fetchTasks();
  }, []);

  const [tasks, setTasks] = useState([]);

  // Function to fetch employees from the backend
  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/tasks/getbyproject/${id}`);
      setTasks(response.data);
console.log(`http://localhost:5000/tasks/getbyproject/${id}`)
       // Update the state of employees with the data received from the backend
    } catch (error) {
      console.error(error);
    }
  };

  // Function to handle the delete operation
  const handleDelete = async (args) => {
    const data = args.data; // Get the data object from the event arguments
    try {
      for (let task of data) {
        const taskId = task._id;
            await axios.delete(`http://localhost:5000/employees/${taskId}`)
      }
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };
  // Function to handle the update operation
  const handleUpdate = async (args) => {
    const data = args.data; // Get the data object from the event arguments
    console.log(data)
    try {
      
        const taskId = data._id;
        await axios.put(`http://localhost:5000/tasks/${taskId}`, data);
      
      fetchTasks(); // Fetch the updated data after successful update
    } catch (error) {
      console.error(error);
    }
  };

 

  

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Project  Tasks" />

      <button onClick={handleAddTaskButtonClick} className="add-employee-button">
        Add Task
      </button>

      <GridComponent
        dataSource={tasks}
        allowPaging
        allowSorting
        allowEditing  // Set allowEditing to true to enable editing
        toolbar={['Search', 'Delete', 'Update']} // Add 'Update' in the toolbar for the update operation
        width="auto"
        editSettings={{ allowDeleting: true, allowEditing: true }} // Already set in the original code
        actionBegin={handleUpdate} // Call handleUpdate when an update operation begins
        actionComplete={handleDelete} // Call handleDelete when a delete operation is completed
      >
        <ColumnsDirective>
          {tasksGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject
          services={[Page, Search, Selection, Toolbar, Edit, Sort, Filter]}
        />
      </GridComponent>

      {showAddTaskCard && <AddTaskCard onAddTask={handleAddTask}  projectId={id}/>}
    </div>
  );
};

export default ProjectTasks;
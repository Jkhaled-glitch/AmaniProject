import React, { useEffect, useState } from 'react';
import { KanbanComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-kanban';
import {  kanbanData,kanbanGrid } from '../data/dummy';
import { Header } from '../components';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

const Kanban = () => {
  const navigate = useNavigate(); 

  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/tasks');
      console.log(response.data);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };


  const priorityData = ['Low', 'Medium', 'High'];
    // Function to handle the "Join File" button click
    const handleJoinFile = () => {
      // Call the navigate function to go to the Editor page
      navigate('/editor'); // Update the path as per your route configuration
    };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="App" title="Kanban" />
    
      <KanbanComponent
        id="kanban"
        keyField="Status"
        dataSource={tasks}
        cardSettings={{
          contentField: 'Summary',
          headerField: 'Title',
          template: (task) => (
            <div>
              <div>{task.Title}</div>
              <div>{task.Priority}</div>
              <div>{task.Status}</div>
              <div>{task.Summary}</div>
              <div>Creation Date: {task.CreationDate}</div>
              <div>Expiration Date: {task.ExpirationDate}</div>
              <div>Created By: {task.CreatedBy}</div>
              <button style={{ backgroundColor: 'rgb(245, 245, 220)', color: 'black'}} onClick={handleJoinFile}>
                Join File
              </button>
            </div>
          ),
        }}
        dialogSettings={{
          fields: [
            { key: 'Title', type: 'TextBox' },
            { key: 'Priority', type: 'DropDown', dataSource: priorityData },
            { key: 'Status', type: 'DropDown' },
            { key: 'Summary', type: 'TextArea' },
            { key: 'CreationDate', type: 'TextBox' },
            { key: 'ExpirationDate', type: 'TextBox', format: 'yyyy-MM-dd' },
            { key: 'CreatedBy', type: 'TextBox' },
          ],
        }}
      >
          <ColumnsDirective>
            {kanbanGrid.map((item, index) => (
              <ColumnDirective key={index} {...item} />
            ))}
          </ColumnsDirective>
      </KanbanComponent>
      
    </div>
  );
};

export default Kanban;

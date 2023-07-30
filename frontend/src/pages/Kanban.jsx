import React, { useEffect, useState } from 'react';
import { KanbanComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-kanban';
import {  kanbanData,kanbanGrid } from '../data/dummy';
import { Header } from '../components';
import axios from 'axios';

const Kanban = () => {
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

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="App" title="Kanban" />
    
        <KanbanComponent
          id="kanban"
          keyField="Status"
          dataSource= {tasks} // Replace 'data' with 'tasks' here
          cardSettings={{
            contentField: 'Summary',
            headerField: 'Title',
            template: (task) => (
              <div style={{ backgroundColor: task.Color }}>
                
                <div>{task.Title}</div>
                <div>{task.Priority}</div>
                <div>{task.Status}</div>
                <div>{task.Summary}</div>
                <div>Creation Date: {task.CreationDate}</div>
                <div>Expiration Date: {task.ExpirationDate}</div>
                <div>Created By: {task.CreatedBy}</div>
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



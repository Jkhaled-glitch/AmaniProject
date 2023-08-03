import React, { useEffect, useState } from 'react';
import { KanbanComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-kanban';
import { Header } from '../components';
import {  kanbanData,kanbanGrid } from '../data/dummy';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode'

const Kanban = () => {

  //import jwtDecode from 'jwt-decode'
  const token = localStorage.getItem('user');
  const decodedToken = jwtDecode(token);
  const { _id, email, accountType } = decodedToken;


  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
 

  const fetchUserProjectsTasks = async () => {
    const url = accountType == 'admin' ? `http://localhost:5000/projects` : `http://localhost:5000/projects/getbyuseremail/${email}`
    const response = await axios.get(url)
    const userProjects = response.data
  
    console.log(userProjects)
    const tasksPromises = userProjects.map(project => {
      return axios.get(`http://localhost:5000/tasks/getbyproject/${project._id}`)
    })
  
    const tasksResponses = await Promise.all(tasksPromises)
  
    // Map each response to the data and flatten the array
    const allTasks = tasksResponses.map(response => response.data).flat();
  
    // Set tasks state
    setTasks(allTasks);
  }
  


  useEffect(() => {
    fetchUserProjectsTasks();
  }, [])


  const priorityData = ['Low', 'Medium', 'High'];

  const handleJoinFile = () => {
    navigate('/editor');
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
        <div style={{backgroundColor:task.Color, paddingLeft:'5px'}}>
          <div className='title'>{task.Title}</div>
          <div>Periority: {task.Priority}</div>
          <div>Summary: {task.Summary}</div>
          <div>Creation Date: {task.CreationDate}</div>
          <div>Expiration Date: {task.ExpirationDate}</div>
          <div>Created By: {task.CreatedBy}</div>
        </div>
      ),
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
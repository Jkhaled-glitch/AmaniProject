import React, { useEffect, useState } from 'react';
import { KanbanComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-kanban';
import { kanbanData, kanbanGrid } from '../data/dummy';
import { Header } from '../components';
import axios from 'axios'

const Kanban = () => {

 

 useEffect(() => {
  fetchTasks()
}, []);

  const fetchTasks=async()=>{
    const response = await axios.get(`http://localhost:5000/tasks`)
    console.log(response.data)
    setData(response.data)
  }


  const [data,setData] = useState([]);
    const priorityData = ['Low', 'Medium', 'High'];
  

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="App" title="Kanban" />
      <KanbanComponent
        id="kanban"
        keyField="Status"
        dataSource={data}
        cardSettings={{
          contentField: 'Summary',
          headerField: 'Id', 
          template: (data) => (
            <div>
              <div>{data._id}</div>
              <div>{data.Title}</div>
              <div>{data.Priority}</div>
              <div>{data.Status}</div>
              <div>{data.Summary}</div>
              <div>Creation Date: {data.CreationDate}</div>
              <div>Expiration Date: {data.ExpirationDate}</div>
              <div>Created By: {data.CreatedBy}</div> {/* Display createdBy field */}
            </div>
          )
        }}
        dialogSettings={{
          fields: [
            { key: 'Id',type:'TextBox' },
            { key: 'Title', type: 'TextBox' },
            { key: 'Priority', type: 'DropDown', dataSource: priorityData },
            { key: 'Status', type: 'DropDown',},
            { key: 'Summary', type: 'TextArea' },
            { key: 'CreationDate', type: 'TextBox' }, // Add a field for CreationDate
            { key: 'ExpirationDate', type: 'TextBox', format: 'yyyy-MM-dd' }, // Add a field for ExpirationDate
            { key: 'CreatedBy', type: 'TextBox', format: 'yyyy-MM-dd' }, {/* Add CreatedBy field for Edit Card Details */}
          ]
        }}
      >
        <ColumnsDirective>
          {kanbanGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        
      </KanbanComponent>
      
    </div>
    
  );
};

export default Kanban;
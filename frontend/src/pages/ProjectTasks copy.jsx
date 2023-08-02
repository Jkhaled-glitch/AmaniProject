import React, { useEffect, useState } from 'react';
import { KanbanComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-kanban';
import {  kanbanData,kanbanGrid } from '../data/dummy';
import { Button, Header } from '../components';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

const Kanban = () => {
  const navigate = useNavigate(); 

  const priorityData = ['Low', 'Medium', 'High'];
  const {id}= useParams('id')

  useEffect(() => {
    fetchTasks(); // Call fetchProjects inside useEffect

    // Rest of the code remains the same
  }, []);

  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/tasks/getbyproject/${id}`);
      console.log(response.data);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const [formValues, setFormValues] = useState({
    Title: '',
    Status: '',
    Priority: '',
    CreatedBy: '',
    Summary: '',
    CreationDate: '',
    ExpirationDate: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };
   


  const handleAddTask = async (taskData) => {
    try {
      const response = await axios.post(`http://localhost:5000/tasks/addbyproject/${id}`, taskData);
      console.log(response.data); // Output the response message from the backend
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (event) => {
    console.log("submit")
    event.preventDefault();
    try {
      await handleAddTask(formValues);
      closeModal();
      // Optionally, you can fetch the updated admins data here
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };
 
  
  const closeModal = () => {
    setModalVisible(false);
  };

  const handleJoinFile = () => {
    // Call the navigate function to go to the Editor page
    navigate('/editor'); // Update the path as per your route configuration
  };


  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="App" title="Kanban" />
       {/* Modal toggle button */}
        <div className="sticky-button">
        <button
          onClick={toggleModal}
          className="block text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          type="button"
        >
          Add Task
        </button>
      </div>
        <KanbanComponent
          id="kanban"
          keyField="Status"
          dataSource= {tasks} // Replace 'data' with 'tasks' here         
          cardSettings={{
            contentField: 'Summary',
            headerField: 'Title',
            template: (task) => (
              <div /*style={{ backgroundColor: task.Color }}*/>
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
              { key: '_id', type: 'TextBox' },
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
{/* Main modal */}
{isModalVisible && (
        <div className="modal-container">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Add Task
              </h3>
              <button
                onClick={closeModal}
                className="modal-close-button"
                data-modal-hide="defaultModal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              </div>
              <div className="modal-body">
              <form className="space-y-6" onSubmit={(e)=>handleSubmit(e)}>
                <div>
                <label
                    htmlFor="Title"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                     Title
                  </label>
                  <input
                    type="text"
                    name="Title"
                    id="Title"
                    value={formValues.Title}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Title"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="Priority"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Priority
                  </label>
                  <input
                    type="text"
                    name="Priority"
                    id="Priority"
                    value={formValues.Priority}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Priority"
                    required
                  />
                </div>
                <div>
                <label
                    htmlFor="Status"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Status
                  </label>
                  <input
                    type="text"
                    name="Status"
                    id="Status"
                    value={formValues.Status}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Status"
                    required
                  />
                </div>
                <div>
                <label
                    htmlFor="Summary"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                     Summary
                  </label>
                  <input
                    type="text"
                    name="Summary"
                    id="Summary"
                    value={formValues.Summary}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Summary"
                    required
                  />
                </div>
                <div>
                <label
                    htmlFor="CreationDate"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                     CreationDate
                  </label>
                  <input
                    type="text"
                    name="CreationDate"
                    id="CreationDate"
                    value={formValues.CreationDate}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="CreationDate"
                    required
                  />
                </div>
                <div>
                <label
                    htmlFor="ExpirationDate"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                     ExpirationDate
                  </label>
                  <input
                    type="text"
                    name="ExpirationDate"
                    id="ExpirationDate"
                    value={formValues.ExpirationDate}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="ExpirationDate"
                    required
                  />
                </div>
                <div>
                <label
                    htmlFor="CreatedBy"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                     CreatedBy
                  </label>
                  <input
                    type="text"
                    name="CreatedBy"
                    id="CreatedBy"
                    value={formValues.CreatedBy}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="CreatedBy"
                    required
                  />
                </div>
                <div className="modal-footer">
            <button
                    data-modal-hide="defaultModal"
                    type="submit"
                    className="text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
                  >
          Submit
        </button>
            </div>
              </form>
            </div>
            
          </div>
        </div>
      )}

  


    </div>
  );
};

export default Kanban;



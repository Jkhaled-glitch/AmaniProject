import React, { useEffect, useState } from 'react';
import { KanbanComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-kanban';
import { Header } from '../components';
import {  kanbanData,kanbanGrid } from '../data/dummy';

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

  const handleJoinFile = () => {
    navigate('/editor');
  };

  // Step 1: Add state variables to handle the edit task popup visibility and form values
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [formValues, setFormValues] = useState({
    Title: '',
    Status: '',
    Priority: '',
    Summary: '',
    CreationDate: '',
    ExpirationDate: '',
    CreatedBy: '',
  });

  // Step 2: Create a function to toggle the visibility of the edit task popup
  const toggleEditModal = () => {
    setEditModalVisible(!isEditModalVisible);
  };

  // Step 3: Modify the Kanban card template to include the "Edit Task" button and handle its click event
  const handleEditTask = (task) => {
    setFormValues(task);
    toggleEditModal();
  };

  // Function to handle the form submission for editing a task
  const handleSubmitEditTask = async (event) => {
    event.preventDefault();
    try {
      // Implement your API call here to update the task with formValues data
      console.log('Updated task:', formValues);
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  // Function to close the edit task popup
  const closeModal = () => {
    setEditModalVisible(false);
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
              <button style={{ backgroundColor: 'rgb(245, 245, 220)', color: 'black' }} onClick={handleJoinFile}>
                Join File
              </button>
              <button
                style={{ backgroundColor: 'rgb(245, 245, 220)', color: 'black' }}
                onClick={() => handleEditTask(task)}
              >
                Edit Task
              </button>
            </div>
          ),
        }}
       /* dialogSettings={{
          // Step 4: Use the formValues state to pre-fill the edit task popup
          fields: [
            { key: 'Title', type: 'TextBox', value: formValues.Title },
            { key: 'Priority', type: 'DropDown', dataSource: priorityData, value: formValues.Priority },
            { key: 'Status', type: 'DropDown', value: formValues.Status },
            { key: 'Summary', type: 'TextArea', value: formValues.Summary },
            { key: 'CreationDate', type: 'TextBox', value: formValues.CreationDate },
            { key: 'ExpirationDate', type: 'TextBox', format: 'yyyy-MM-dd', value: formValues.ExpirationDate },
            { key: 'CreatedBy', type: 'TextBox', value: formValues.CreatedBy },
          ],
        }}*/
      >
          <ColumnsDirective>
            {kanbanGrid.map((item, index) => (
              <ColumnDirective key={index} {...item} />
            ))}
          </ColumnsDirective>
      </KanbanComponent>

      {/* Step 5: Show the edit task popup when isEditModalVisible is true */}
      {isEditModalVisible && (
        <div className="modal-container">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Edit Task</h3>
              <button onClick={toggleEditModal} className="modal-close-button" data-modal-hide="defaultModal">
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
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="Title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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
            {/* Repeat for other form fields */}
            <div>
              <label htmlFor="Priority" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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
              <label htmlFor="Status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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
              <label htmlFor="Summary" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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
              <label htmlFor="CreationDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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
              <label htmlFor="ExpirationDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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
              <label htmlFor="CreatedBy" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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

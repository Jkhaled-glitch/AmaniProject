import './projectTasks.css'
import React, { useEffect, useState } from 'react';
import { KanbanComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-kanban';
import {  kanbanData,kanbanGrid } from '../data/dummy';
import { Button, Header } from '../components';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
  HtmlEditor,
  Image,
  Inject,
  Link,
  QuickToolbar,
  RichTextEditorComponent,
  Toolbar
} from '@syncfusion/ej2-react-richtexteditor';
import jwtDecode from 'jwt-decode'



const Kanban = () => {

  const {id}= useParams('id')

  useEffect(() => {
    fetchTasks(); // Call fetchProjects inside useEffect
  }, []);

  const token = localStorage.getItem('user');
  const decodedToken = jwtDecode(token);
  const { _id, email, accountType } = decodedToken;
  const [tasks, setTasks] = useState([]);
  const [taskEditedId, setTaskEditedId] = useState(null);

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
  const [isMessageVisible, setIsMessageVisible] = useState(false);
  const [message,setMessage] = useState('')



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
    Description:'',
    Color:'#00ff00',
    
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };
  

  const handleAddTask = async (taskData) => {
    try {
      // Extract the selected priority value from the form data
      const selectedPriority = taskData.Priority;
  
      const response = await axios.post(`http://localhost:5000/tasks/add/${id}`, taskData);
  
      setMessage(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await handleAddTask(formValues);
      closeModal();
      setIsMessageVisible(true)
      setTimeout(()=>closeMessage(),3000)
      
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  const closeMessage = () => {
    setIsMessageVisible(false);
  };




  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [editedDescription, setEditedDescription] = useState('');

  // Step 2: Create a function to toggle the visibility of the Edit Task popup
  const toggleEditModal = () => {
    setEditModalVisible(!isEditModalVisible);
  };

   // Step 3: Modify the Kanban card template to include the Edit Task button and handle its click event
   const handleEditTask = (task) => {
    setTaskEditedId(task._id);
    setFormValues({
      ...task,
      Priority: task.Priority // Set the priority value of the task being edited
    });

    // Set the Rich Text Editor content
    setEditedDescription(task.Description);

    toggleEditModal();
  };



  const handleSubmitEdit = async (event) => {
    event.preventDefault();

    toggleEditModal();
    await axios.put(`http://localhost:5000/tasks/${taskEditedId}`, {
      ...formValues,
      Description: editedDescription // Use the editedDescription value
    })
    .then(() => {
      setMessage("Task has been successfully edited");
      setIsMessageVisible(true);
      setTimeout(() => closeMessage(), 3000);

      fetchTasks();
    })
    .catch(error => {
      setMessage(error);
      setIsMessageVisible(true);
      setTimeout(() => closeMessage(), 3000);
      console.error(error);
    });
  };

  

  const handleDeleteTask = async (taskId) => {
    try {
      const res = await axios.delete(`http://localhost:5000/tasks/${taskId}`);
      // Optionally, you can fetch the updated tasks data here
       setMessage(res.data)
      setIsMessageVisible(true)
      setTimeout(()=>closeMessage(),3000)

      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDescriptionChange = (value) => {
    setFormValues((prevValues) => ({ ...prevValues, Description: value }));
  };
 



  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="App" title="Kanban" />
       {/* Modal toggle button */}
        <div className="sticky-button">
        {accountType=='admin'&&
        <button
          onClick={toggleModal}
          className="block text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          type="button"
        >
          Add Task
        </button>}

      </div>
        <KanbanComponent
          id="kanban"
          keyField="Status"
          dataSource= {tasks} 

          cardSettings={{
            contentField: 'Summary',
            headerField: 'Title',
            template: (task) => (
              <div style={{ backgroundColor: task.Color, paddingLeft:'5px'}} >
                <div className='title'>{task.Title}</div>
                <div>Priority: {task.Priority}</div>
               
                <div>Summary: {task.Summary}</div>
                <div>Creation Date: {task.CreationDate}</div>
                <div>Expiration Date: {task.ExpirationDate}</div>
                <div>Created By: {task.CreatedBy}</div>
                <div className="flex">
              <button
                className="mr-5 ml-3 mt-1 mb-2 bg-white hover:bg-green-700 hover:text-white text-black font-bold py-2 px-6"
                onClick={() => handleEditTask(task)}
              >
               Edit Task
              </button>
              {accountType=='admin'&&
              <button
                className="mr-5 mt-1 mb-2 bg-white hover:bg-red-600 hover:text-white hover:cursor-pointer text-black font-bold py-2 px-5"
                onClick={() => handleDeleteTask(task._id)} // Step 6: Add onClick event to delete the task
              >
                Delete Task
              </button>}
            </div>
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
{/* Main modal */}
{isModalVisible && (
        <div className="modal-container">
          <div className="modal-content" style={{ maxHeight: '90%', overflow: 'auto' }}>
            <div className="modal-header">
              <h3 className="text-xl font-semibold text-gray-900 ">
                Add Task
              </h3>
              <button
                onClick={closeModal}
                className="modal-close-button btn-close"
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
              <form className="" onSubmit={(e)=>handleSubmit(e)}>
                <div>
                <label
                    htmlFor="Title"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                     Title
                  </label>
                  <input
                    type="text"
                    name="Title"
                    id="Title"
                    value={formValues.Title}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 "
                    placeholder="Title"
                    required
                  />
                </div>
                <div>
  <label htmlFor="Priority" className="block mb-2 text-sm font-medium text-gray-900 ">
    Priority
  </label>
  <select
    name="Priority"
    id="Priority"
    value={formValues.Priority}
    onChange={handleInputChange}
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 "
    required
  >
    <option value="">Select Priority</option>
    <option value="Low">Low</option>
    <option value="Normal">Normal</option>
    <option value="Critical">Critical</option>
    <option value="High">High</option>
  </select>
</div>

                <div>
  <label htmlFor="Status" className="block mb-2 text-sm font-medium text-gray-900">
    Status
  </label>
  <select
    name="Status"
    id="Status"
    value={formValues.Status}
    onChange={handleInputChange}
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400"
    required
  >
    <option value="">Select Status</option>
    <option value="To Do">To Do</option>
    <option value="In Progress">In Progress</option>
    <option value="Testing">Testing</option>
    <option value="Done">Done</option>
  </select>
</div>

                <div>
                <label
                    htmlFor="Summary"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                     Summary
                  </label>
                  <input
                    type="text"
                    name="Summary"
                    id="Summary"
                    value={formValues.Summary}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400"
                    placeholder="Summary"
                    required
                  />
                </div>
                <div>
                <label
                    htmlFor="CreationDate"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                     CreationDate
                  </label>
                  <input
                    type="date"
                    name="CreationDate"
                    id="CreationDate"
                    value={formValues.CreationDate}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 "
                    placeholder="CreationDate"
                    required
                  />
                </div>
                <div>
                <label
                    htmlFor="ExpirationDate"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                     ExpirationDate
                  </label>
                  <input
                    type="date"
                    name="ExpirationDate"
                    id="ExpirationDate"
                    value={formValues.ExpirationDate}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 "
                    placeholder="ExpirationDate"
                    required
                  />
                </div>
                <div>
                <label
                    htmlFor="CreatedBy"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                     CreatedBy
                  </label>
                  <input
                    type="text"
                    name="CreatedBy"
                    id="CreatedBy"
                    value={formValues.CreatedBy}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 "
                    placeholder="CreatedBy"
                    required
                  />
                </div>
                <div>
        <label htmlFor="Description" className="block mb-2 text-sm font-medium text-gray-900 ">
          Description
        </label>
        <RichTextEditorComponent
          id="Description"
          value={formValues.Description}
          onChange={handleDescriptionChange} // Define the handler function
          style={{ height: '50px', maxWidth: '100%', overflow: 'auto' }}

        >
          <Inject services={[HtmlEditor, Toolbar, Image, Link, QuickToolbar]} />
        </RichTextEditorComponent>
      </div>
                <div>
                <label
                    htmlFor="Color"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                     Color: 
                  </label>
                  <span style={{backgroundColor:formValues.Color}}></span>
                  <input
                    type="color"
                    name="Color"
                    id="Color"
                    value={formValues.Color}
                    onChange={handleInputChange}
                   
  
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

{isMessageVisible && (
        <div className="modal-container">
          <div className="modal-content" style={{ maxWidth: '90%', maxHeight: '90%' }}>
            <div className="modal-header">
              <h3 className="text-xl font-semibold text-gray-900 ">
                Indicators
              </h3>
              <button
                onClick={closeMessage}
                className="modal-close-button btn-close"
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
              {message}
            </div>
            
          </div>
        </div>
      )}

{isEditModalVisible && (
  <div className="modal-container">
    <div className="modal-content" style={{ maxHeight: '90%', overflow: 'auto' }}>
      <div className="modal-header">
        <h3 className="text-xl font-semibold text-gray-900 ">
          Edit Task
        </h3>
        <button
          onClick={toggleEditModal} // Step 5: Add onClick event to close the modal
          className="modal-close-button btn-close"
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
          <form  onSubmit={handleSubmitEdit}>
            <div>
              <label htmlFor="Title" className="block mb-2 text-sm font-medium text-gray-900 ">
                Title
              </label>
              <input 
                readOnly={accountType !== 'admin'}
                type="text"
                name="Title"
                id="Title"
                value={formValues.Title}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 "
                placeholder="Title"
                required
              />
            </div>
            <div>
            <label htmlFor="Priority" className="block mb-2 text-sm font-medium text-gray-900">
              Priority
            </label>
            <select
              name="Priority"
              id="Priority"
              value={formValues.Priority}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400"
              required
              disabled={accountType !== 'admin'}
            >
              <option value="Low">Low</option>
              <option value="Normal">Normal</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
            </select>
          </div>
          <div>
            <label htmlFor="Status" className="block mb-2 text-sm font-medium text-gray-900">
              Status
            </label>
            <select
              name="Status"
              id="Status"
              value={formValues.Status}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400"
              required
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Testing">Testing</option>
              <option value="Done">Done</option>
            </select>
          </div>
            <div>
              <label htmlFor="Summary" className="block mb-2 text-sm font-medium text-gray-900 ">
                Summary
              </label>
              <input
                readOnly={accountType !== 'admin'}
                type="text"
                name="Summary"
                id="Summary"
                value={formValues.Summary}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 "
                placeholder="Summary"
                required
              />
            </div>
            <div>
              <label htmlFor="CreationDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                CreationDate
              </label>
              <input
                readOnly={accountType !== 'admin'}
                type="date"
                name="CreationDate"
                id="CreationDate"
                value={formValues.CreationDate}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 "
                placeholder="CreationDate"
                required
              />
            </div>
            <div>
              <label htmlFor="ExpirationDate" className="block mb-2 text-sm font-medium text-gray-900 ">
                ExpirationDate
              </label>
              <input
                readOnly={accountType !== 'admin'}
                type="date"
                name="ExpirationDate"
                id="ExpirationDate"
                value={formValues.ExpirationDate}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 "
                placeholder="ExpirationDate"
                required
              />
            </div>
            <div>
              <label htmlFor="CreatedBy" className="block mb-2 text-sm font-medium text-gray-900 ">
                CreatedBy
              </label>
              <input
                readOnly={accountType !== 'admin'}
                type="text"
                name="CreatedBy"
                id="CreatedBy"
                value={formValues.CreatedBy}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 "
                placeholder="CreatedBy"
                required
              />
            </div>
            <div>
              <label htmlFor="CreatedBy" className="block mb-2 text-sm font-medium text-gray-900 ">
                Color
              </label>
              <input
                readOnly={accountType !== 'admin'}
                type="color"
                name="Color"
                id="Color"
                value={formValues.Color}
                onChange={handleInputChange}
              />
            </div>
            <div>
            <label htmlFor="Description" className="block mb-2 text-sm font-medium text-gray-900 ">
              Description
            </label>
            <RichTextEditorComponent
              id="Description"
              value={editedDescription}
              onChange={handleDescriptionChange}
              style={{ height: '20px', maxWidth: '100%', overflow: 'auto' }}

            >
              <Inject services={[HtmlEditor, Toolbar, Image, Link, QuickToolbar]} />
            </RichTextEditorComponent>
          </div>
          {/*  <a
              href="http://localhost:3000/editor"
              className="mr-0 ml-0 mt-1 mb-1 bg-white hover:cursor-pointer text-black font-bold py- px-1"
              style={{ textDecoration: 'none' }}
            >
            <span className="hover:underline">Join File</span>
</a>*/}

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
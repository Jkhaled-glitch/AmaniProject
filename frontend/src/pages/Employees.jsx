import axios from 'axios';
//import AddEmployeeCard from './AddEmployee';
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
import { customersData, customersGrid } from '../data/dummy';
import { Header } from '../components';
//import './employees.css';
import React, { useState, useEffect } from 'react';

const Employees = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const [formValues, setFormValues] = useState({
    name: '',
    projects: '',
    status: '',
    weeks: '',
    location: '',
    email: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };
   
 const handleAddEmployee = async (employeeData) => {
  try {
    const response = await axios.post('http://localhost:5000/employees/addemployee', employeeData);
    console.log(response.data); // Output the response message from the backend
  } catch (error) {
    console.error(error);
  }
};

  const handleSubmit = async (event) => {
    console.log("submit")
    event.preventDefault();
    try {
      await handleAddEmployee(formValues);
      closeModal();
      // Optionally, you can fetch the updated admins data here
      fetchEmployees();
    } catch (error) {
      console.error(error);
    }
  };
  //
  
  const closeModal = () => {
    setModalVisible(false);
  };

  // Utilize the hook useEffect to execute fetchEmployees once the component is mounted
  useEffect(() => {
    let isMounted = true; // Add a variable to track if the component is mounted

    fetchEmployees()
      .then((response) => {
        if (isMounted) {
          setEmployees(response.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });

    return () => {
      isMounted = false; // This will cancel any ongoing asynchronous tasks
    };
  }, []);

  const [employees, setEmployees] = useState([]);

  // Function to fetch employees from the backend
  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:5000/employees');
      setEmployees(response.data);

       // Update the state of employees with the data received from the backend
    } catch (error) {
      console.error(error);
    }
  };

  // Function to handle the delete operation
  const handleDelete = async (args) => {
 
    const data = args.data; // Get the data object from the event arguments
    try {
      for (let employee of data) {
        const employeeId = employee._id;
            await axios.delete(`http://localhost:5000/employees/${employeeId}`)
      }
      fetchEmployees();
    } catch (error) {
      console.error(error);
    }
  };
  // Function to handle the update operation
  const handleUpdate = async (args) => {
    const data = args.data; // Get the data object from the event arguments
    console.log(data)
    try {
      
        const employeeId = data._id;
        await axios.put(`http://localhost:5000/employees/${employeeId}`, data);
      
      fetchEmployees(); // Fetch the updated data after successful update
    } catch (error) {
      console.error(error);
    }
  };





  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Employees" />
       {/* Modal toggle button */}
      <div className="sticky-button">
        <button
          onClick={toggleModal}
          className="block text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          type="button"
        >
          Add Employee
        </button>
      </div>

      {/* GridComponent */}
      <div className="table-container">
      <GridComponent
        dataSource={employees}
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
          {customersGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject
          services={[Page, Search, Selection, Toolbar, Edit, Sort, Filter]}
        />
      </GridComponent>
    </div>
{/* Main modal */}
{isModalVisible && (
        <div className="modal-container">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Add Employee
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
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                     Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formValues.name}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Name"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="projects"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Projects
                  </label>
                  <input
                    type="text"
                    name="projects"
                    id="projects"
                    value={formValues.projects}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Projects"
                    required
                  />
                </div>
                <div>
                <label
                    htmlFor="status"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Status
                  </label>
                  <input
                    type="text"
                    name="status"
                    id="status"
                    value={formValues.status}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Status"
                    required
                  />
                </div>
                <div>
                <label
                    htmlFor="weeks"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                     Weeks
                  </label>
                  <input
                    type="text"
                    name="weeks"
                    id="weeks"
                    value={formValues.weeks}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Weeks"
                    required
                  />
                </div>
                <div>
                <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                     Email
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    value={formValues.email}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Email"
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

export default Employees;
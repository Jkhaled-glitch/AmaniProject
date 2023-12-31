import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import AddAdminCard from './AddAdmin';
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Search,
  Page,
  Selection,
  Inject,
  Toolbar,
  Edit,
  valueAccessor,
} from '@syncfusion/ej2-react-grids';

import { employeesData, employeesGrid } from '../data/dummy';
import { Header } from '../components';
import './admins.css';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const Admins = () => {
  //import jwtDecode from 'jwt-decode';
  const token = localStorage.getItem('user');
  const decodedToken = jwtDecode(token);
  const { _id, email, accountType } = decodedToken;

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const [formValues, setFormValues] = useState({
    name: '',
    designation: '',
    projects: [],
    email: '',
    country: '',
  });

  const handleInputChange = (event) => {
    const { name, value, type } = event.target;
  
    // Si c'est un champ multiselect, traitez les valeurs en tant que tableau
    if (type === 'select-multiple') {
     const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
  
  setFormValues((prevValues) => {
    let updatedProjects = prevValues.projects ? [...prevValues.projects] : [];
  
    selectedOptions.forEach(option => {
      const index = updatedProjects.indexOf(option);
      if (index > -1) {
        // Si l'option est déjà dans le tableau, retirez-la.
        updatedProjects.splice(index, 1);
      } else {
        // Sinon, ajoutez-la.
        updatedProjects.push(option);
      }
    });
  
    return { ...prevValues, [name]: updatedProjects };
  });
    } else {
      setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    }
  };
  

  const handleAddAdmin = async (adminData) => {
    try {
      const response = await axios.post('http://localhost:5000/admins/addadmin', adminData);
      console.log(response.data); // Output the response message from the backend
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await handleAddAdmin(formValues);
      closeModal();
      fetchAdmins();
    } catch (error) {
      console.error(error);
    }
  };
  
  const closeModal = () => {
    setModalVisible(false);
  };
  const navigate = useNavigate()
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (accountType !== 'admin') navigate('/');

    // Fetch projects from backend
    fetchProjects();
  }, []);

  // Function to fetch projects from backend
  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:5000/projects');
      setProjects(response.data); // Update the state with fetched projects
    } catch (error) {
      console.error(error);
    }
  };
  console.log(projects)
  // Utilize the hook useEffect to execute fetchEmployees once the component is mounted
  useEffect(() => {
    if (accountType != 'admin')
      navigate('/')

    fetchAdmins()


  }, []);

  const [admins, setAdmins] = useState([]);
  // Fonction pour effectuer une requête GET vers le backend et récupérer les projets
  const fetchAdmins = async () => {
    try {
      const response = await axios.get('http://localhost:5000/admins');
      setAdmins(response.data); // Met à jour l'état des projets avec les données reçues depuis le backend
    } catch (error) {
      console.error(error);
    }
  };
  // Function to handle the delete operation
  const handleDelete = async (args) => {
    const data = args.data; // Get the data object from the event arguments
    try {
      for (let admin of data) {
        const adminId = admin._id;
        await axios.delete(`http://localhost:5000/admins/${adminId}`)
      }
      fetchAdmins();
    } catch (error) {
      console.error(error);
    }
  };

  // Function to handle the update operation
  const handleUpdate = async (args) => {
    const data = args.data; // Get the data object from the event arguments
    console.log(data);
    try {
      const adminId = data._id;
      await axios.put(`http://localhost:5000/admins/${adminId}`, data);
      fetchAdmins(); // Fetch the updated data after successful update
    } catch (error) {
      console.error(error);
    }
  };


  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (args) => {
    if (args.detail && args.detail.value !== undefined) {
      setSearchValue(args.detail.value);
    }
  };

  const filterData = () => {
    if (searchValue) {
      return admins.filter(
        (data) =>
          data['Name'].toLowerCase().includes(searchValue.toLowerCase())
      );
    } else {
      return admins;
    }
  };


  
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Admins" />

      {/* Modal toggle button */}
      <div className="sticky-button">
        <button
          onClick={toggleModal}
          className="block text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          type="button"
        >
          Add Admin
        </button>
      </div>

      {/* GridComponent */}
      <div className="table-container">
        <GridComponent
          dataSource={filterData()}
          allowPaging
          allowSorting
          toolbar={['Search', 'Delete', 'Update']} // Add 'Search' option to the toolbar
          width="auto"
          editSettings={{ allowDeleting: true, allowEditing: true }}
          actionBegin={handleSearch} // Attach the handleSearch function to the actionBegin event
          actionComplete={(args) => {
            // Check if the action is 'edit' and then call handleUpdate
            if (args.requestType === 'save') {
              handleUpdate(args);
            } else if (args.requestType === 'delete') {
              handleDelete(args);
            }
          }}
        >
<ColumnsDirective>
  <ColumnDirective type="checkbox" width="50" />
  {employeesGrid.map((item, index) => {
    if (item.field === "projects") {
      return (
        <ColumnDirective
          key={index}
          {...item}
          isPrimaryKey={true} // Empêche l'édition de la colonne "projects"
        />
      );
    }
    return (
      <ColumnDirective key={index} {...item} />
    );
  })}
</ColumnsDirective>

          <Inject services={[Page, Search, Selection, Toolbar, Edit]} />
        </GridComponent>
      </div>

      {/* Main modal */}
      {isModalVisible && (
        <div className="modal-container">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="text-xl font-semibold text-gray-900 ">
                Add Admin
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
              <form className="space-y-6" onSubmit={(e) => handleSubmit(e)}>
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 "
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
                    htmlFor="designation"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Designation
                  </label>
                  <input
                    type="text"
                    name="designation"
                    id="designation"
                    value={formValues.designation}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Designation"
                    required
                  />
                </div>
                <div>
        <label htmlFor="projects" className="block mb-2 text-sm font-medium text-gray-900">
          Projects
        </label>
        <select
          name="projects"
          id="projects"
          value={formValues.projects}
          onChange={handleInputChange}
          multiple
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          required
        >
          {/* Populate select options with projects */}
          {projects.map((project) => (
            <option key={project._id} value={project.projecttitle}>
              {project.projecttitle}
            </option>
          ))}
          
        </select>
      </div> 

                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    value={formValues.email}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400"
                    placeholder="Email"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="country"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    id="country"
                    value={formValues.country}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 "
                    placeholder="Country"
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

export default Admins;

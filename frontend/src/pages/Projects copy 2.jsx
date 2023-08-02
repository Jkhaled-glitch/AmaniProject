import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, TemplateColumn, Page, Search, Toolbar, Edit, Sort, Filter, Selection } from '@syncfusion/ej2-react-grids';
import { Header } from '../components';
import './projects.css';
//import AddProjectCard from './AddProjectCard';
import { useNavigate } from 'react-router-dom';
import { RiGitBranchFill } from 'react-icons/ri';

const Projects = () => {

  const navigate = useNavigate()

  const renderViewTasksButton = (data) => {
    return (
      <button 
        onClick={() => handleViewTasks(data)}
        style={{ backgroundColor: 'rgb(245, 245, 220)', color: 'black'}}
      >
        View Tasks
      </button>
    );
    
  };

  const handleViewTasks = (rowData) => {
    const _id = rowData._id;
    navigate(`/projects/${_id}/tasks`)
  };

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const [formValues, setFormValues] = useState({
    projecttitle: '',
    employeename: '',
    status: '',
    tasks: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };
   
 const handleAddProject = async (projectData) => {
  try {
    const response = await axios.post(`http://localhost:5000/projects/addproject`, projectData);
    console.log(response.data); // Output the response message from the backend
  } catch (error) {
    console.error(error);
  }
};

  const handleSubmit = async (event) => {
    console.log("submit")
    event.preventDefault();
    try {
      await handleAddProject(formValues);
      closeModal();
      // Optionally, you can fetch the updated admins data here
      fetchProjects();
    } catch (error) {
      console.error(error);
    }
  };
  //
  
  const closeModal = () => {
    setModalVisible(false);
  };


  useEffect(() => {
    let isMounted = true; // Add a variable to track if the component is mounted

    fetchProjects()
      .then((response) => {
        if (isMounted) {
          setProjects(response.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
      return () => {
        isMounted = false; // This will cancel any ongoing asynchronous tasks
      };
    }, []);

  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/projects/projects`);
      setProjects(response.data);
    } catch (error) {
      console.error(error);
    }
  };


  const handleDelete = async (args) => {
    const data = args.data;
    try {
      for (let project of data) {
        const projectId = project._id;
        await axios.delete(`http://localhost:5000/projects/${projectId}`);
      }
      fetchProjects();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (args) => {
    const data = args.data;
    try {
      const projectId = data._id;
      await axios.put(`http://localhost:5000/projects/${projectId}`, data);
      fetchProjects();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Projects" />
             {/* Modal toggle button */}
             <div className="sticky-button">
        <button
          onClick={toggleModal}
          className="block text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          type="button"
        >
          Add Project
        </button>
      </div>

      <div className="grid-container">
      <GridComponent
          id="gridcomp"
          dataSource={projects}
          allowPaging
          allowSorting
          toolbar={['Search', 'Delete', 'Update']}
          width="auto"

          editSettings={{ allowEditing: true, allowDeleting: true }}
          actionBegin={handleUpdate}
          actionComplete={handleDelete}
        >
          <ColumnsDirective>
            <ColumnDirective type="checkbox" width="50" />
            <ColumnDirective field="projecttitle" headerText="Project Title" />
            <ColumnDirective field="employeename" headerText="Employee Name" />
            <ColumnDirective field="status" headerText="Status" />
            <ColumnDirective headerText="Tasks" template={renderViewTasksButton} />
          </ColumnsDirective>
          <Inject services={[Page, Search, Toolbar, Edit, Sort, Filter, Selection]} />
        </GridComponent>
      </div>
{/* Main modal */}
{isModalVisible && (
        <div className="modal-container">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Add Project
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
                    htmlFor="projecttitle"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                     Projecttitle
                  </label>
                  <input
                    type="text"
                    name="projecttitle"
                    id="projecttitle"
                    value={formValues.projecttitle}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Projecttitle"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="employeename"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Employeename
                  </label>
                  <input
                    type="text"
                    name="employeename"
                    id="employeename"
                    value={formValues.employeename}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Employeename"
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

export default Projects;
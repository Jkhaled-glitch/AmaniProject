import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, TemplateColumn, Page, Search, Toolbar, Edit, Sort, Filter, Selection } from '@syncfusion/ej2-react-grids';
import { Header } from '../components';
import './projects.css';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode'


const Projects = () => {

  //import jwtDecode from 'jwt-decode'
  const token = localStorage.getItem('user');
  const decodedToken = jwtDecode(token);
  const { _id, email, accountType } = decodedToken;
  const toolbarUser=['Search', 'Update']
  const toolbarAdmin=['Search', 'Delete', 'Update']
  const toolbarTab=accountType=='admin'?toolbarAdmin : toolbarUser;

  const navigate = useNavigate()
  //const [statusOptions, setStatusOptions] = useState(["To Do", "In Progress", "Testing", "Done"]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const statusOptions = ["To Do", "In Progress", "Testing", "Done"];

  //const [domainOptions, setDomainOptions] = useState(["web development", "apps development", "graphic design ui ux", "mobile development", "it consulting", "digital marketing", "referencing"]);
  const [selectedDomain, setSelectedDomain] = useState("");
// Add the domain options to your state
  const domainOptions = [
  "web development",
  "apps development",
  "graphic design ui ux",
  "mobile development",
  "it consulting",
  "digital marketing",
  "referencing"
  ];
  
  const renderViewTasksButton = (data) => {
    return (
      <button 
        onClick={() => handleViewTasks(data)}
        class="mr-5 bg-gray-200 hover:bg-gray-300 border border-gray-400 text-black font-bold py-2 px-6 rounded-md"      >
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
    employeeEmail: [],
    domain:'',

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
    event.preventDefault();
    try {
      const updatedFormValues = { ...formValues, status: selectedStatus, domain: selectedDomain };
      await handleAddProject(updatedFormValues);
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
    let isMounted = true;

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
        isMounted = false;
      };
    }, []);

  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    const url = accountType=='admin' ? `http://localhost:5000/projects`: `http://localhost:5000/projects/getbyuseremail/${email}`
    try {
      const response = await axios.get(url);
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
  
  const renderDomainSelect = (data) => {
    const handleDomainChange = async (newValue) => {
      // Update the domain locally first
      const updatedProjects = projects.map((project) => {
        if (project._id === data._id) {
          return { ...project, domain: newValue };
        }
        return project;
      });
      setProjects(updatedProjects);
  
      // Update the domain in the backend
      try {
        await axios.put(`http://localhost:5000/projects/${data._id}`, { domain: newValue });
        fetchProjects();
      } catch (error) {
        console.error(error);
      }
    };
  
    return (
      <div>
        <select
          value={data.domain}
          onChange={(e) => handleDomainChange(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-500 dark:placeholder-gray-400"
        >
          {domainOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  };
  
  const renderStatusSelect = (data) => {
    const handleStatusChange = async (newValue) => {
      // Update the domain locally first
      const updatedProjects = projects.map((project) => {
        if (project._id === data._id) {
          return { ...project,status: newValue };
        }
        return project;
      });
      setProjects(updatedProjects);
  
      // Update the domain in the backend
      try {
        await axios.put(`http://localhost:5000/projects/${data._id}`, { status: newValue });
        fetchProjects();
      } catch (error) {
        console.error(error);
      }
    };
  
    return (
      <div>
        <select
          value={data.status}
          onChange={(e) => handleStatusChange(e.target.value)}
          className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-500 dark:placeholder-gray-400 "
        >
          {statusOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Projects" />
             {/* Modal toggle button */}
             <div className="sticky-button">
        {accountType=='admin'&&
        <button
          onClick={toggleModal}
          className="block text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          type="button"
        >
          Add Project
        </button>
        }
      </div>

      <div className="grid-container">
      <GridComponent
          id="gridcomp"
          dataSource={projects}
          allowPaging
          allowSorting
          toolbar={toolbarTab}
          width="auto"

          editSettings={{ allowEditing: true, allowDeleting: true }}
          actionBegin={handleUpdate}
          actionComplete={handleDelete}
        >
          <ColumnsDirective>
            <ColumnDirective isPrimaryKey={true} field="projecttitle" headerText="Project Title" />
            <ColumnDirective isPrimaryKey={true} field="employeename" headerText="Employee Name" />
            <ColumnDirective isPrimaryKey={true} field="status" headerText="Status" template={renderStatusSelect} />
            <ColumnDirective isPrimaryKey={true} field="domain" headerText="Domain" template={renderDomainSelect} />
            <ColumnDirective isPrimaryKey={true} headerText="Tasks" template={renderViewTasksButton} />
          </ColumnsDirective>
          <Inject services={[Page, Search, Toolbar, Edit, Sort, Filter, Selection]} />
        </GridComponent>
      </div>
{/* Main modal */}
{isModalVisible && (
        <div className="modal-container">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="text-xl font-semibold text-gray-900 ">
              Add Project
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
              <form className="space-y-6" onSubmit={(e)=>handleSubmit(e)}>
                <div>
                <label
                    htmlFor="projecttitle"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                     Projecttitle
                  </label>
                  <input
                    type="text"
                    name="projecttitle"
                    id="projecttitle"
                    value={formValues.projecttitle}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 "
                    placeholder="Projecttitle"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="employeename"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Employeename
                  </label>
                  <input
                    type="text"
                    name="employeename"
                    id="employeename"
                    value={formValues.employeename}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 "
                    placeholder="Employeename"
                    required
                  />
                </div>
  <div>
 <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900">
    Status
  </label>
  <select
    name="status"
    id="status"
    value={selectedStatus}
    onChange={(e) => setSelectedStatus(e.target.value)}
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400"
    required
  >
    <option value="">Select Status</option>
    {statusOptions.map((status) => (
      <option key={status} value={status}>
        {status}
      </option>
    ))}
  </select>
</div>
<div>
  <label htmlFor="domain" className="block mb-2 text-sm font-medium text-gray-900">
    Domain
  </label>
  <select
    name="domain"
    id="domain"
    value={selectedDomain}
    onChange={(e) => setSelectedDomain(e.target.value)}
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400"
    required
  >
    <option value="">Select Domain</option>
    {domainOptions.map((domain) => (
      <option key={domain} value={domain}>
        {domain}
      </option>
    ))}
  </select>
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
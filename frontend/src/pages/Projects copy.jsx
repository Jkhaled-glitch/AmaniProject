import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, TemplateColumn, Page, Search, Toolbar, Edit, Sort, Filter } from '@syncfusion/ej2-react-grids';
import { Header } from '../components';
import './projects.css';
import AddProjectCard from './AddProjectCard';
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

  const [showAddProjectCard, setShowAddProjectCard] = useState(false);
  const handleAddProjectButtonClick = () => {
    setShowAddProjectCard(true);
  };

  const handleAddProject = async (projectData) => {
    try {
      const response = await axios.post('http://localhost:5000/projects/addproject', projectData);
      console.log(response.data);
      setShowAddProjectCard(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClosed = () => {
    setShowAddProjectCard(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:5000/projects/projects');
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

      <div className="grid-container">
      <GridComponent
          id="gridcomp"
          dataSource={projects}
          allowPaging
          allowSorting
          toolbar={['Search', 'Delete', 'Update']}
          editSettings={{ allowEditing: true, allowDeleting: true }}
          actionBegin={handleUpdate}
          actionComplete={handleDelete}
        >
          <ColumnsDirective>
            <ColumnDirective field="projecttitle" headerText="Project Title" />
            <ColumnDirective field="employeename" headerText="Employee Name" />
            <ColumnDirective field="status" headerText="Status" />
            <ColumnDirective headerText="Tasks" template={renderViewTasksButton} />
          </ColumnsDirective>
          <Inject services={[Page, Search, Toolbar, Edit, Sort, Filter]} />
        </GridComponent>
      </div>

      <button onClick={handleAddProjectButtonClick} className="add-project-button">
        Add Project
      </button>

      {showAddProjectCard && <AddProjectCard onAddProject={handleAddProject} onClosed={handleClosed} />}
    </div>
  );
};

export default Projects;
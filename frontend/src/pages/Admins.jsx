import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddAdminCard from './AddAdmin';
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
} from '@syncfusion/ej2-react-grids';

import { employeesData, employeesGrid } from '../data/dummy';
import { Header } from '../components';
import './admins.css';

const Admins = () => {
  const [showAddAdminCard, setShowAddAdminCard] = useState(false);
  const handleAddAdminButtonClick = () => {
    setShowAddAdminCard(true);
  };
  const handleAddAdmin = async (adminData) => {
    try {
      const response = await axios.post('http://localhost:5000/admins/addadmin', adminData);
      console.log(response.data); // Output the response message from the backend
      setShowAddAdminCard(false); // Hide the card after successful project addition
    } catch (error) {
      console.error(error);
    }
  };
  
    // Utilisez le hook useEffect pour exécuter fetchProjects une fois que le composant est monté
    useEffect(() => {
      fetchAdmins();
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

  const [searchValue, setSearchValue] = useState(''); // State for handling search value

  const handleSearch = (args) => {
    if (args.detail && args.detail.value !== undefined) {
      setSearchValue(args.detail.value);
    }
  };

  const filterData = () => {
    if (searchValue) {
      return admins.filter(
        (data) =>
          data['Admin Full Name'].toLowerCase().includes(searchValue.toLowerCase())
      );
    } else {
      return admins;
    }
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Admins" />

      {/* Bouton "Add Project" */}
      <button onClick={handleAddAdminButtonClick} className="add-admin-button">
        Add Admin
      </button>

      <GridComponent
        dataSource={filterData()}
        allowPaging
        allowSorting
        toolbar={['Search', 'Delete']} // Add 'Search' option to the toolbar
        width="auto"
        editSettings={{ allowDeleting: true, allowEditing: true }}
        actionBegin={handleSearch} // Attach the handleSearch function to the actionBegin event
      >
        <ColumnsDirective>
          <ColumnDirective type="checkbox" width="50" />
          {employeesGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject
          services={[Page, Search, Selection, Toolbar, Edit]}
        />
      </GridComponent>
      {/* Bouton "Add Employee" */}
      <button onClick={handleAddAdminButtonClick} className="add-admin-button">
        Add Admin
      </button>

      {showAddAdminCard && <AddAdminCard onAddAdmin={handleAddAdmin} />}
    </div>
  );
};

export default Admins;
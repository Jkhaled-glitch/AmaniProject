import React, { useEffect,useState } from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Legend, Category, Tooltip, ColumnSeries, DataLabel } from '@syncfusion/ej2-react-charts';

import { barCustomSeries, barPrimaryXAxis, barPrimaryYAxis } from '../../data/dummy';
import { ChartsHeader } from '../../components';
import { useStateContext } from '../../contexts/ThemeContext';
import axios from 'axios';
import jwtDecode from 'jwt-decode';


//nombre de task par project

const Bar = () => {

  const token = localStorage.getItem('user');
  const decodedToken = jwtDecode(token);

   const {_id,email,accountType} = decodedToken;


   const [userProjects, setUserProjects] = useState([])
   const [projectTasks, setProjectTasks] = useState([])
   
   useEffect(() => {
       fetchUserProjects()
   }, [])
   
   const fetchUserProjects = async () => {
       const response = await axios.get(`http://localhost:5000/projects/getbyuseremail/${email}`)
       setUserProjects(response.data)
   
       // Utiliser response.data directement ici car userProjects n'est pas encore mis à jour
       const tasksPromises = response.data.map(project => {
           return axios.get(`http://localhost:5000/tasks/getbyproject/${project._id}`)
       })
   
       // Attendre que toutes les requêtes soient terminées
       const tasksResponses = await Promise.all(tasksPromises)
       
       // Fusionner tous les résultats
       const allTasks = tasksResponses.flatMap(response => response.data)
       
       setProjectTasks(allTasks)
   }
   
console.log(userProjects)
console.log(projectTasks)   


  const { currentMode } = useStateContext();

  const data = [
    {
      dataSource:[{ x: 'Tasks Number', y: 46 }],
      xName: 'x',
      yName: 'y',
      name: 'Project A',
      type: 'Column',
      marker: {
        dataLabel: {
          visible: true,
          position: 'Top',
          font: { fontWeight: '600', color: '#ffffff' },
        },
      },
    },
    {
      dataSource:[{ x: 'Tasks Number', y: 50 }],
      xName: 'x',
      yName: 'y',
      
      name: 'Project B',
      type: 'Column',
      marker: {
        dataLabel: {
          visible: true,
          position: 'Top',
          font: { fontWeight: '600', color: '#ffffff' },
        },
      },
    },
  ];

  return (
    <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
      <ChartsHeader category="Bar" title="tasks number per project" />
      <div className=" w-full">
        <ChartComponent
          id="charts"
          primaryXAxis={barPrimaryXAxis}
          primaryYAxis={barPrimaryYAxis}
          chartArea={{ border: { width: 0 } }}
          tooltip={{ enable: true }}
          background={currentMode === 'Dark' ? '#33373E' : '#fff'}
          legendSettings={{ background: 'white' }}
        >
          <Inject services={[ColumnSeries, Legend, Tooltip, Category, DataLabel]} />
          <SeriesCollectionDirective>
            {data.map((item, index) => 
            <SeriesDirective key={index} {...item} />)}
          </SeriesCollectionDirective>
        </ChartComponent>
      </div>
    </div>
  );
};

export default Bar;
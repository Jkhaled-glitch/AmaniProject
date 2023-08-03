import React, { useEffect, useState } from 'react';
import {
  ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject,
  Legend, Category, Tooltip, ColumnSeries, DataLabel, SelectedDataIndexDirective
} from '@syncfusion/ej2-react-charts';
import { barCustomSeries, barPrimaryXAxis, barPrimaryYAxis } from '../../data/dummy';
import { ChartsHeader } from '../../components';
import { useStateContext } from '../../contexts/ThemeContext';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

const Bar = () => {
  //import jwtDecode from 'jwt-decode';
  const token = localStorage.getItem('user');
  const decodedToken = jwtDecode(token);
  const { _id, email, accountType } = decodedToken;

  const [data, setData] = useState([]);

  const { currentMode } = useStateContext();
  const fetchUserProjectsTasks = async () => {
    const url = accountType == 'admin' ? `http://localhost:5000/projects` : `http://localhost:5000/projects/getbyuseremail/${email}`
    const response = await axios.get(url)
    const userProjects = response.data
    const tasksPromises = userProjects.map(project => {
      return axios.get(`http://localhost:5000/tasks/getbyproject/${project._id}`)
    })

    const tasksResponses = await Promise.all(tasksPromises)
    const projectTasks = tasksResponses.map(response => response.data)


    // Now you can create data right away
    const tempData = userProjects.map((project, index) => {
      return {
        dataSource: [{ x: 'Tasks Number', y: projectTasks[index].length }],
        xName: 'x',
        yName: 'y',
        name: project.projecttitle,
        type: 'Column',
        marker: {
          dataLabel: {
            visible: true,
            position: 'Top',
            font: { fontWeight: '600', color: '#ffffff' },
          },
        },
      }
    });

    setData(tempData);
  }


  useEffect(() => {
    fetchUserProjectsTasks();
  }, [])

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
              <SeriesDirective key={index} {...item} />
            )}
          </SeriesCollectionDirective>
        </ChartComponent>
      </div>
    </div>
  );
};

export default Bar;

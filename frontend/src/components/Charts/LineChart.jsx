import React, { useEffect,useState } from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, LineSeries, DateTime, Legend, Tooltip } from '@syncfusion/ej2-react-charts';

import { LinePrimaryXAxis, LinePrimaryYAxis } from '../../data/dummy';
import { useStateContext } from '../../contexts/ThemeContext';
import axios from 'axios';
const LineChart = () => {

  //const [projects,setProjects] = useState([]);
  const [lineCustomSeries,setLineCustomSeries] = useState([]);

  const getPastSixMonths = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 6; i++) {
      dates.push(new Date(today.getFullYear(), today.getMonth() - i, 1));
    }
    return dates.reverse();
  };
  
  const fetchYRate = async (projectId, date) => {
    const response = await axios.get(`http://localhost:5000/tasks/getbyproject/${projectId}/rate/${date}`);
    return response.data.rate;  
  };
  
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('http://localhost:5000/projects');
      const projectsData = res.data;
  
      const seriesPromises = projectsData.map(async project => {
        const dataSourcePromises = getPastSixMonths().map(async date => {
          const yRate = await fetchYRate(project._id, date);
          return { x: date, y: yRate };
        });
        
        const dataSource = await Promise.all(dataSourcePromises);
  
        return {
          dataSource,
          xName: 'x',
          yName: 'y',
          name: project.projecttitle,
          width: '2',
          marker: { visible: true, width: 10, height: 10 },
          type: 'Line'
        };
      });
  
      const newLineCustomSeries = await Promise.all(seriesPromises);
      setLineCustomSeries(newLineCustomSeries);
    };
  
    fetchData();
  }, []);
  

  console.log(lineCustomSeries)
  console.log(new Date(2005, 0, 1))


  

/*
  const lineCustomSeries = [
    { 
      dataSource: [
          { x: new Date(2005, 0, 1), y: 21 },
          { x: new Date(2005, 1, 1), y: 24 },
          { x: new Date(2005, 2, 1), y: 36 },
          { x: new Date(2005, 3, 1), y: 38 },
          { x: new Date(2005, 4, 1), y: 54 },
          { x: new Date(2005, 5, 1), y: 57 },
          { x: new Date(2005, 6, 1), y: 70 },
        ],
      xName: 'x',
      yName: 'y',
      name: 'Project A',
      width: '2',
      marker: { visible: true, width: 10, height: 10 },
      type: 'Line' 
    },
  
    { dataSource: [
      { x: new Date(2005, 0, 1), y: 21 },
      { x: new Date(2005, 1, 1), y: 24 },
      { x: new Date(2005, 2, 1), y: 36 },
      { x: new Date(2005, 3, 1), y: 38 },
      { x: new Date(2005, 4, 1), y: 54 },
      { x: new Date(2005, 5, 1), y: 57 },
      { x: new Date(2005, 6, 1), y: 70 },
    ],
      xName: 'x',
      yName: 'y',
      name: 'Project B',
      width: '2',
      marker: { visible: true, width: 10, height: 10 },
      type: 'Line' },
  
    { dataSource: [
      { x: new Date(2005, 0, 1), y: 21 },
      { x: new Date(2005, 1, 1), y: 24 },
      { x: new Date(2005, 5, 1), y: 36 },
      { x: new Date(2005, 7, 1), y: 38 },
      { x: new Date(2005, 8, 1), y: 54 },
      { x: new Date(2005, 10, 1), y: 57 },
      { x: new Date(2005, 11, 1), y: 70 },
    ],
      xName: 'x',
      yName: 'y',
      name: 'Project C',
      width: '2',
      marker: { visible: true, width: 10, height: 10 },
      type: 'Line' },
  
  ]
  */

  const { currentMode } = useStateContext();

  return (
    <ChartComponent
      id="line-chart"
      height="420px"
      primaryXAxis={LinePrimaryXAxis}
      primaryYAxis={LinePrimaryYAxis}
      chartArea={{ border: { width: 0 } }}
      tooltip={{ enable: true }}
      background={currentMode === 'Dark' ? '#33373E' : '#fff'}
      legendSettings={{ background: 'white' }}
    >
      <Inject services={[LineSeries, DateTime, Legend, Tooltip]} />
      <SeriesCollectionDirective>
        {lineCustomSeries.map((item, index) => <SeriesDirective key={index} {...item} />)}
      </SeriesCollectionDirective>
    </ChartComponent>
  );
};

export default LineChart;
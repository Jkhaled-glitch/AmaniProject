import React, { useState,useEffect } from 'react';


import { ChartsHeader, Pie as PieChart } from '../../components';
import axios from 'axios'




const Pie = () => {
 
const [data,setData]  = useState([])
 const fetchDataLength = async (url) => {
  const response = await axios.get(url)
  return response.data.length
}



const fetchData = async () => {
  const numProjects = await fetchDataLength(`http://localhost:5000/projects`)

  const numProjectsWebDevelopment = await fetchDataLength(`http://localhost:5000/projects/web development`)
  const numProjectsAppsDevelopment = await fetchDataLength(`http://localhost:5000/projects/apps development`)
  const numProjectsGraphicDesignUI_UX = await fetchDataLength(`http://localhost:5000/projects/graphic design ui ux`)
  const numProjectsMobileDevelopment = await fetchDataLength(`http://localhost:5000/projects/mobile development`)
  const numProjectsItConsulting = await fetchDataLength(`http://localhost:5000/projects/it consulting`)
  const numProjectsDigitalMarketing = await fetchDataLength(`http://localhost:5000/projects/digital marketing`)
  const numProjectsReferencing = await fetchDataLength(`http://localhost:5000/projects/referencing`)
  const getPercentage = (num) => {
    const result = (num * 100) / numProjects;
    return result.toFixed(2);
  }
  

  setData([
  
    { x: 'Web Development', y: getPercentage(numProjectsWebDevelopment), text: getPercentage(numProjectsWebDevelopment)+'%' },
    { x: 'Apps Development', y: getPercentage(numProjectsAppsDevelopment), text:getPercentage(numProjectsAppsDevelopment)+'%' },
    { x: 'Graphic Design UI/UX', y: getPercentage(numProjectsGraphicDesignUI_UX), text:getPercentage(numProjectsGraphicDesignUI_UX)+'%' },
    { x: 'Mobile Development', y: getPercentage(numProjectsMobileDevelopment), text:getPercentage(numProjectsMobileDevelopment)+'%'},
    { x: 'IT Consulting',y: getPercentage(numProjectsItConsulting), text:getPercentage(numProjectsItConsulting)+'%'},
    { x: 'Digital Marketing', y: getPercentage(numProjectsDigitalMarketing), text:getPercentage(numProjectsDigitalMarketing)+'%' },
    { x: 'Referencing', y: getPercentage(numProjectsReferencing), text:getPercentage(numProjectsReferencing)+'%' },
  ])
}

 useEffect(() => {
   fetchData();
 }, [])
return(
  <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
    <ChartsHeader category="Pie" title="projects domains" />
    <div className="w-full">
      <PieChart id="chart-pie" data={data} legendVisiblity height="full" />
    </div>
  </div>
)}
;

export default Pie;
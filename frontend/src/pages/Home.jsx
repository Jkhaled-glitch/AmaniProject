import React, { useEffect, useState } from 'react';

import { MdOutlineSupervisorAccount } from 'react-icons/md';
import { BsBoxSeam } from 'react-icons/bs';
import { FiBarChart } from 'react-icons/fi';
import Bar from '../pages/Charts/Bar';
import Line from '../pages/Charts/Line';
import Pie from '../pages/Charts/Pie';

import axios from 'axios'
import jwtDecode from 'jwt-decode';

const Home = () => {

  //import jwtDecode from 'jwt-decode'
  const token = localStorage.getItem('user');
  const decodedToken = jwtDecode(token);
  const { _id, email, accountType } = decodedToken;
  const [data, setData] = useState([])

  const fetchEmployees = async () => {
    const url = `http://localhost:5000/employees`
    const response = await axios.get(url)

    return response.data.length
  }

  const fetchProjects = async () => {
    const url = `http://localhost:5000/projects`
    const response = await axios.get(url)

    return response.data.length
  }

  const fetchTasks = async () => {
    const url = `http://localhost:5000/tasks`
    const response = await axios.get(url)

    return response.data.length
  }


  const fetchData = async () => {
    const numEmployees = await fetchEmployees()
    const numProjects = await fetchProjects()
    const numTasks = await fetchTasks()

    setData([
      {
        icon: <MdOutlineSupervisorAccount />,
        amount: numEmployees,
        title: 'employees',
        iconColor: '#03C9D7',
        iconBg: '#E5FAFB',
        pcColor: 'red-600',
      },
      {
        icon: <BsBoxSeam />,
        amount: numProjects,
        title: 'Projects',
        iconColor: 'rgb(255, 244, 229)',
        iconBg: 'rgb(254, 201, 15)',
        pcColor: 'green-600',
      },
      {
        icon: <FiBarChart />,
        amount: numTasks,
        title: 'Tasks',
        iconColor: 'rgb(228, 106, 118)',
        iconBg: 'rgb(255, 244, 229)',
        pcColor: 'green-600',
      },
    ])
  }


  useEffect(() => {

    fetchData()
  }, [])



  return (

    <div className="mt-24">
      {(accountType == 'admin') && (
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          {data.map((item) => (
            <div key={item.title} className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ">
              <button
                type="button"
                style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
              >
                {item.icon}
              </button>
              <p className="mt-3">
                <span className="text-lg font-semibold">{item.amount}</span>
                <span className={`text-sm text-${item.pcColor} ml-2`}>
                  {item.percentage}
                </span>
              </p>
              <p className="text-sm text-gray-400  mt-1">{item.title}</p>
            </div>
          ))}




        </div>
      )}
      {(accountType == 'admin') && (
        <Pie />
      )}
      {(accountType == 'admin') && (
        <Line />
      )}
      
      <Bar />
    </div>
  )
}

export default Home
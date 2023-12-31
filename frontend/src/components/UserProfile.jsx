import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { MdOutlineCancel } from 'react-icons/md';

import { Button } from '.';
import LogOut from './LogOut';
import { userProfileData } from '../data/dummy';
import { useStateContext } from '../contexts/ThemeContext';
import avatar from '../data/avatar.jpg';
import jwtDecode from 'jwt-decode';
import axios from 'axios';



const UserProfile = () => {
  const { currentColor } = useStateContext();
   //import jwtDecode from 'jwt-decode'
   const token = localStorage.getItem('user');
   const decodedToken = jwtDecode(token);
   const { _id, email, accountType } = decodedToken;
   
   const[userData,setUserData] = useState({userName:"",email:email});
   useEffect(async () => {
    try{
      const res = await axios.get(`http://localhost:5000/users/${_id}`)
      console.log(res)
      setUserData(res.data)
  
    }catch(err){
      console.error(err)
    }
   
  }, []);

  

  return (
    <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">User Profile</p>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        />
      </div>
      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
        <img
          className="rounded-full h-24 w-24"
          src={avatar}
          alt="user-profile"
        />
        <div>
          <p className="font-semibold text-xl dark:text-gray-200"> {userData.userName} </p>
          <p className="text-gray-500 text-sm dark:text-gray-400"> {accountType=="admin"?'Administrator':'Employee'} </p>
          <p className="text-gray-500 text-sm font-semibold dark:text-gray-400"> {userData.email} </p>
        </div>
      </div>
      <div>
        {userProfileData.map((item, index) => (
          <div key={index} className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]">
            <button
              type="button"
              style={{ color: item.iconColor, backgroundColor: item.iconBg }}
              className=" text-xl rounded-lg p-3 hover:bg-light-gray"
            >
              {item.icon}
            </button>

            <div>
              <p className="font-semibold dark:text-gray-200 ">{item.title}</p>
              <p className="text-gray-500 text-sm dark:text-gray-400"> {item.desc} </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5">
        <LogOut
          color="white"
          bgColor={currentColor}
          text="Logout "
          borderRadius="10px"
          width="full"
        />
      </div>
    </div>

  );
};

export default UserProfile;
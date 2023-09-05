import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

import { AiOutlineMenu } from 'react-icons/ai';
import { FiShoppingCart } from 'react-icons/fi';
import { BsChatLeft } from 'react-icons/bs';
import { RiNotification3Line } from 'react-icons/ri';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import avatar from '../data/avatar.jpg';
import { Chat, Notification, UserProfile } from '.';
import { useStateContext } from '../contexts/ThemeContext';

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
    <TooltipComponent content={title} position="BottomCenter">
      <button type="button" onClick={() => customFunc()} style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray">
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}      
      </button>
    </TooltipComponent>
  );

const Navbar = () => {
  const { currentColor, activeMenu, setActiveMenu, handleClick, isClicked, setScreenSize, screenSize } = useStateContext();
    useEffect(() => {
      const handleResize = () => setScreenSize(window.innerWidth);
  
      window.addEventListener('resize', handleResize);
  
      handleResize();
  
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    
    const handleActiveMenu = () => setActiveMenu(!activeMenu);
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
    <div className="flex justify-between p-2 md:ml-6 md:mr-6 relative">
    {activeMenu ? <span></span> : <NavButton title="Menu" customFunc={handleActiveMenu} color={currentColor} icon={<AiOutlineMenu />} /> }
    <div className="flex">
    <NavButton title="Chat" dotColor="#03C9D7" customFunc={() => handleClick('chat')} color={currentColor} icon={<BsChatLeft />} />
    <NavButton title="Notification" dotColor="rgb(254, 201, 15)" customFunc={() => handleClick('notification')} color={currentColor} icon={<RiNotification3Line />} />
    
    <TooltipComponent content="Profile" position="BottomCenter">
        <div className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg" onClick={() => handleClick('userProfile')}>
        <img
              className="rounded-full w-8 h-8"
              src={avatar}
              alt="user-profile"
            />
        <p>
              <span className="text-gray-400 text-14">Hi,</span>{' '}
              <span className="text-gray-400 font-bold ml-1 text-14">
              {userData.userName}
              </span>
        </p>  
        <MdKeyboardArrowDown className="text-gray-400 text-14" />
        </div> 
        </TooltipComponent>
        {isClicked.chat && (<Chat />)}
        {isClicked.notification && (<Notification />)}
        {isClicked.userProfile && (<UserProfile />)}
        
    </div>
    </div>
  );
};

export default Navbar;

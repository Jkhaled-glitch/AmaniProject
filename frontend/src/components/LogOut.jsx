import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';


const Button = ({ icon, bgColor, color, bgHoverColor, size, text, borderRadius, width }) => {
    const {dispatch} = useContext(AuthContext);

  return (
    <button
      type="button"
      onClick={() =>
        dispatch({type:"LOGOUT"})
      } 
      style={{ backgroundColor: bgColor, color, borderRadius }}
      className={` text-${size} p-3 w-${width} hover:drop-shadow-xl hover:bg-${bgHoverColor}`}
    >
      {icon} {text}
    </button>
  );
};

export default Button;
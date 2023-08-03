import React from 'react';

import { useStateContext } from '../contexts/ThemeContext';

const CloseSideBar = ({ icon, bgColor, color, bgHoverColor, size, text, borderRadius, width }) => {

  const { activeMenu, setActiveMenu } = useStateContext();

  return (
    <button
      type="button"
      onClick={() => setActiveMenu(false)}
      style={{ backgroundColor: bgColor, color, borderRadius }}
      className={` text-${size} p-3 w-${width} hover:drop-shadow-xl hover:bg-${bgHoverColor}`}
    >
      {icon} {text}
    </button>
  );
};

export default CloseSideBar;
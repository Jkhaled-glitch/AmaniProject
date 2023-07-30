import React, { useEffect, useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import './App.css';

import { Navbar, Footer, Sidebar, ThemeSettings } from './components';
import { Home, Projects, Calendar, Employees, Admins, Kanban, Line, Area, Bar, Pie } from './pages';
import { AuthContext } from "./contexts/AuthContext";
import { useStateContext } from './contexts/ThemeContext';
import PropTypes from "prop-types";
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp'
import ProjectTasks from './pages/ProjectTasks.jsx';


const App = () => {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  RequireAuth.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          

          <Route
            path="/"
            element={
              <RequireAuth>
                <div className="flex relative dark:bg-main-dark-bg">
                  <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
                    <TooltipComponent content="Settings" position="Top">
                      <button
                        type="button"
                        className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
                        onClick={() => setThemeSettings(true)}
                        style={{ background: currentColor, borderRadius: '50%' }}
                      >
                        <FiSettings />
                      </button>
                    </TooltipComponent>
                  </div>

                  {activeMenu ? (
                    <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
                      <Sidebar />
                    </div>
                  ) : (
                    <div className="w-0 dark:bg-secondary-dark-bg">
                      <Sidebar />
                    </div>
                  )}

                  <div className={activeMenu ? 'dark:bg-main-dark-bg bg-main-bg min-h-screen md:ml-72 w-full' : 'bg-main-bg dark:bg-main-dark-bg w-full min-h-screen flex-2'}>
                    <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
                      <Navbar />
                    </div>

                    <div>
                      {themeSettings && <ThemeSettings />}
                      <Home/>
                    </div>

                    <Footer />
                  </div>
                </div>
              </RequireAuth>
            }
          />

          <Route
            path="/home"
            element={
              <RequireAuth>
                <div className="flex relative dark:bg-main-dark-bg">
                  <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
                    <TooltipComponent content="Settings" position="Top">
                      <button
                        type="button"
                        className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
                        onClick={() => setThemeSettings(true)}
                        style={{ background: currentColor, borderRadius: '50%' }}
                      >
                        <FiSettings />
                      </button>
                    </TooltipComponent>
                  </div>

                  {activeMenu ? (
                    <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
                      <Sidebar />
                    </div>
                  ) : (
                    <div className="w-0 dark:bg-secondary-dark-bg">
                      <Sidebar />
                    </div>
                  )}

                  <div className={activeMenu ? 'dark:bg-main-dark-bg bg-main-bg min-h-screen md:ml-72 w-full' : 'bg-main-bg dark:bg-main-dark-bg w-full min-h-screen flex-2'}>
                    <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
                      <Navbar />
                    </div>

                    <div>
                      {themeSettings && <ThemeSettings />}
                      <Home/>
                    </div>

                    <Footer />
                  </div>
                </div>
              </RequireAuth>
            }
          />

<Route
            path="/projects"
            element={
              <RequireAuth>
                <div className="flex relative dark:bg-main-dark-bg">
                  <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
                    <TooltipComponent content="Settings" position="Top">
                      <button
                        type="button"
                        className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
                        onClick={() => setThemeSettings(true)}
                        style={{ background: currentColor, borderRadius: '50%' }}
                      >
                        <FiSettings />
                      </button>
                    </TooltipComponent>
                  </div>

                  {activeMenu ? (
                    <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
                      <Sidebar />
                    </div>
                  ) : (
                    <div className="w-0 dark:bg-secondary-dark-bg">
                      <Sidebar />
                    </div>
                  )}

                  <div className={activeMenu ? 'dark:bg-main-dark-bg bg-main-bg min-h-screen md:ml-72 w-full' : 'bg-main-bg dark:bg-main-dark-bg w-full min-h-screen flex-2'}>
                    <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
                      <Navbar />
                    </div>

                    <div>
                      {themeSettings && <ThemeSettings />}
                      <Projects />
                    </div>

                    <Footer />
                  </div>
                </div>
              </RequireAuth>
            }
          />

<Route
            path="/projects/:id/tasks"
            element={
              <RequireAuth>
                <div className="flex relative dark:bg-main-dark-bg">
                  <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
                    <TooltipComponent content="Settings" position="Top">
                      <button
                        type="button"
                        className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
                        onClick={() => setThemeSettings(true)}
                        style={{ background: currentColor, borderRadius: '50%' }}
                      >
                        <FiSettings />
                      </button>
                    </TooltipComponent>
                  </div>

                  {activeMenu ? (
                    <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
                      <Sidebar />
                    </div>
                  ) : (
                    <div className="w-0 dark:bg-secondary-dark-bg">
                      <Sidebar />
                    </div>
                  )}

                  <div className={activeMenu ? 'dark:bg-main-dark-bg bg-main-bg min-h-screen md:ml-72 w-full' : 'bg-main-bg dark:bg-main-dark-bg w-full min-h-screen flex-2'}>
                    <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
                      <Navbar />
                    </div>

                    <div>
                      {themeSettings && <ThemeSettings />}
                      < ProjectTasks />
                    </div>

                    <Footer />
                  </div>
                </div>
              </RequireAuth>
            }
          />
<Route
            path="/admins"
            element={
              <RequireAuth>
                <div className="flex relative dark:bg-main-dark-bg">
                  <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
                    <TooltipComponent content="Settings" position="Top">
                      <button
                        type="button"
                        className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
                        onClick={() => setThemeSettings(true)}
                        style={{ background: currentColor, borderRadius: '50%' }}
                      >
                        <FiSettings />
                      </button>
                    </TooltipComponent>
                  </div>

                  {activeMenu ? (
                    <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
                      <Sidebar />
                    </div>
                  ) : (
                    <div className="w-0 dark:bg-secondary-dark-bg">
                      <Sidebar />
                    </div>
                  )}

                  <div className={activeMenu ? 'dark:bg-main-dark-bg bg-main-bg min-h-screen md:ml-72 w-full' : 'bg-main-bg dark:bg-main-dark-bg w-full min-h-screen flex-2'}>
                    <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
                      <Navbar />
                    </div>

                    <div>
                      {themeSettings && <ThemeSettings />}
                      <Admins/>
                    </div>

                    <Footer />
                  </div>
                </div>
              </RequireAuth>
            }
          />

<Route
            path="/employees"
            element={
              <RequireAuth>
                <div className="flex relative dark:bg-main-dark-bg">
                  <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
                    <TooltipComponent content="Settings" position="Top">
                      <button
                        type="button"
                        className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
                        onClick={() => setThemeSettings(true)}
                        style={{ background: currentColor, borderRadius: '50%' }}
                      >
                        <FiSettings />
                      </button>
                    </TooltipComponent>
                  </div>

                  {activeMenu ? (
                    <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
                      <Sidebar />
                    </div>
                  ) : (
                    <div className="w-0 dark:bg-secondary-dark-bg">
                      <Sidebar />
                    </div>
                  )}

                  <div className={activeMenu ? 'dark:bg-main-dark-bg bg-main-bg min-h-screen md:ml-72 w-full' : 'bg-main-bg dark:bg-main-dark-bg w-full min-h-screen flex-2'}>
                    <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
                      <Navbar />
                    </div>

                    <div>
                      {themeSettings && <ThemeSettings />}
                      <Employees />
                    </div>

                    <Footer />
                  </div>
                </div>
              </RequireAuth>
            }
          />

<Route
            path="/calendar"
            element={
              <RequireAuth>
                <div className="flex relative dark:bg-main-dark-bg">
                  <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
                    <TooltipComponent content="Settings" position="Top">
                      <button
                        type="button"
                        className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
                        onClick={() => setThemeSettings(true)}
                        style={{ background: currentColor, borderRadius: '50%' }}
                      >
                        <FiSettings />
                      </button>
                    </TooltipComponent>
                  </div>

                  {activeMenu ? (
                    <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
                      <Sidebar />
                    </div>
                  ) : (
                    <div className="w-0 dark:bg-secondary-dark-bg">
                      <Sidebar />
                    </div>
                  )}

                  <div className={activeMenu ? 'dark:bg-main-dark-bg bg-main-bg min-h-screen md:ml-72 w-full' : 'bg-main-bg dark:bg-main-dark-bg w-full min-h-screen flex-2'}>
                    <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
                      <Navbar />
                    </div>

                    <div>
                      {themeSettings && <ThemeSettings />}
                      <Calendar />
                    </div>

                    <Footer />
                  </div>
                </div>
              </RequireAuth>
            }
          />
          <Route
            path="/kanban"
            element={
              <RequireAuth>
                <div className="flex relative dark:bg-main-dark-bg">
                  <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
                    <TooltipComponent content="Settings" position="Top">
                      <button
                        type="button"
                        className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
                        onClick={() => setThemeSettings(true)}
                        style={{ background: currentColor, borderRadius: '50%' }}
                      >
                        <FiSettings />
                      </button>
                    </TooltipComponent>
                  </div>

                  {activeMenu ? (
                    <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
                      <Sidebar />
                    </div>
                  ) : (
                    <div className="w-0 dark:bg-secondary-dark-bg">
                      <Sidebar />
                    </div>
                  )}

                  <div className={activeMenu ? 'dark:bg-main-dark-bg bg-main-bg min-h-screen md:ml-72 w-full' : 'bg-main-bg dark:bg-main-dark-bg w-full min-h-screen flex-2'}>
                    <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
                      <Navbar />
                    </div>

                    <div>
                      {themeSettings && <ThemeSettings />}
                      <Kanban />
                    </div>

                    <Footer />
                  </div>
                </div>
              </RequireAuth>
            }
          />




        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

import React, { useState, useEffect } from 'react';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';
import axios from 'axios';
import { scheduleData } from '../data/dummy';
import { Header } from '../components';
import './calendar.css';


const Calendar = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const [formValues, setFormValues] = useState({
    subject: '',
    location: '',
    startTime: '',
    endTime: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };
   
 const handleAddCalendar = async (calendarData) => {
  try {
    const response = await axios.post(`http://localhost:5000/calendars/add`, calendarData);
    console.log(response.data); // Output the response message from the backend
  } catch (error) {
    console.error(error);
  }
};

  const handleSubmit = async (event) => {
    console.log("submit")
    event.preventDefault();
    try {
      await handleAddCalendar(formValues);
      closeModal();
      // Optionally, you can fetch the updated admins data here
      fetchCalendars();
    } catch (error) {
      console.error(error);
    }
  };
  //
  
  const closeModal = () => {
    setModalVisible(false);
  };

  // Utilize the hook useEffect to execute fetchEmployees once the component is mounted
  useEffect(() => {
    fetchCalendars()
  }, []);

  const [calendars, setCalendars] = useState([]);

  // Function to fetch employees from the backend
  const fetchCalendars = async () => {
    try {
      const response = await axios.get('http://localhost:5000/calendars');
      setCalendars(response.data);

       // Update the state of employees with the data received from the backend
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="App" title="Calendar" />
             {/* Modal toggle button */}
        <div className="sticky-button">
        <button
          onClick={toggleModal}
          className="block text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          type="button"
        >
          Add Event
        </button>
      </div>
      <ScheduleComponent height="650px" eventSettings={{ dataSource: calendars }} >
        <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]} />

      </ScheduleComponent>

{/* Main modal */}
{isModalVisible && (
  <div className="modal-container">
    <div className="modal-content">
      <div className="modal-header">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Add Event
        </h3>
        <button
          onClick={closeModal}
          className="modal-close-button"
          data-modal-hide="defaultModal"
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Close modal</span>
        </button>
        </div>
        <div className="modal-body">
        <form className="space-y-6" onSubmit={(e)=>handleSubmit(e)}>
          <div>
          <label
              htmlFor="subject"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
               Subject
            </label>
            <input
              type="text"
              name="subject"
              id="subject"
              value={formValues.subject}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="Subject"
              required
            />
          </div>
          <div>
            <label
              htmlFor="location"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Location
            </label>
            <input
              type="text"
              name="location"
              id="location"
              value={formValues.location}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="Location"
              required
            />
          </div>
          <div>
          <label
              htmlFor="startTime"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              StartTime
            </label>
            <input
              type="text"
              name="startTime"
              id="startTime"
              value={formValues.startTime}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="StartTime"
              required
            />
          </div>
          <div>
          <label
              htmlFor="endTime"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
               EndTime
            </label>
            <input
              type="text"
              name="endTime"
              id="endTime"
              value={formValues.endTime}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="EndTime"
              required
            />
          </div>
          <div className="modal-footer">
      <button
              data-modal-hide="defaultModal"
              type="submit"
              className="text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
            >
    Submit
  </button>
      </div>
        </form>
      </div>
      
    </div>
  </div>
)}
</div>
);
}; 
export default Calendar 
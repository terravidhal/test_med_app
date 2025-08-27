// Following code has been commented with appropriate comments for your reference.
import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './Notification.css';

// Function component Notification to display user notifications
const Notification = ({ children }) => {
  // State variables to manage user authentication, username, doctor data, and appointment data
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [doctorData, setDoctorData] = useState(null);
  const [appointmentData, setAppointmentData] = useState(null);
  const [showNotification, setShowNotification] = useState(true);

  // useEffect hook to perform side effects in the component
  useEffect(() => {
    // Retrieve stored username, doctor data, and appointment data from sessionStorage and localStorage
    const storedUsername = sessionStorage.getItem('email');
    const storedDoctorData = JSON.parse(localStorage.getItem('doctorData'));
    const storedAppointmentData = JSON.parse(localStorage.getItem(storedDoctorData?.name));
    
    // Set isLoggedIn state to true and update username if storedUsername exists
    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }
    
    // Set doctorData state if storedDoctorData exists
    if (storedDoctorData) {
      setDoctorData(storedDoctorData);
    }
    
    // Set appointmentData state if storedAppointmentData exists
    if (storedAppointmentData) {
      setAppointmentData(storedAppointmentData);
    }
  }, []); // Empty dependency array ensures useEffect runs only once after initial render

  // Function to handle appointment cancellation
  const handleCancelAppointment = () => {
    // Clear appointment data from localStorage
    if (doctorData?.name) {
      localStorage.removeItem(doctorData.name);
    }
    localStorage.removeItem('doctorData');
    
    // Update state to hide notification
    setShowNotification(false);
    setAppointmentData(null);
    setDoctorData(null);
  };

  // Function to handle notification dismissal
  const handleDismissNotification = () => {
    setShowNotification(false);
  };

  // Return JSX elements to display Navbar, children components, and appointment details if user is logged in
  return (
    <div>
      {/* Render Navbar component */}
      <Navbar />
      
      {/* Render children components */}
      {children}
      
      {/* Display appointment details if user is logged in and appointmentData is available */}
      {isLoggedIn && appointmentData && showNotification && (
        <div className="notification-container">
          <div className="appointment-card">
            <div className="appointment-card__content">
              {/* Display title for appointment details */}
              <h3 className="appointment-card__title">Appointment Details</h3>
              
              {/* Display doctor's name from doctorData */}
              <p className="appointment-card__message">
                <strong>Doctor:</strong> {doctorData?.name}
              </p>
              
              {/* Display user name who booked appointment */}
              <p className="appointment-card__message">
                <strong>Patient Name:</strong> {appointmentData.name}
              </p>
              
              {/* Display phone number */}
              <p className="appointment-card__message">
                <strong>Phone Number:</strong> {appointmentData.phoneNumber}
              </p>
              
              {/* Display appointment date if available */}
              {appointmentData.date && (
                <p className="appointment-card__message">
                  <strong>Date:</strong> {appointmentData.date}
                </p>
              )}
              
              {/* Display appointment time if available */}
              {appointmentData.time && (
                <p className="appointment-card__message">
                  <strong>Time:</strong> {appointmentData.time}
                </p>
              )}
              
              {/* Display appointment slot if available */}
              {appointmentData.selectedSlot && (
                <p className="appointment-card__message">
                  <strong>Time Slot:</strong> {appointmentData.selectedSlot}
                </p>
              )}
              
              {/* Action buttons */}
              <div className="appointment-card__actions">
                <button 
                  className="appointment-card__cancel-btn"
                  onClick={handleCancelAppointment}
                >
                  Cancel Appointment
                </button>
                <button 
                  className="appointment-card__dismiss-btn"
                  onClick={handleDismissNotification}
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Export Notification component for use in other parts of the application
export default Notification; 
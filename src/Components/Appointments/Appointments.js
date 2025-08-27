import React from 'react';
import './Appointments.css';

const Appointments = () => {
  return (
    <div className="appointments-container">
      <div className="appointments-content">
        <h1>Appointments</h1>
        <p>Welcome to the appointments page. This feature is coming soon!</p>
        <div className="appointments-info">
          <h3>What you'll be able to do here:</h3>
          <ul>
            <li>Schedule appointments with doctors</li>
            <li>View your upcoming appointments</li>
            <li>Cancel or reschedule appointments</li>
            <li>View appointment history</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Appointments; 
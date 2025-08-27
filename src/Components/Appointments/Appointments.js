import React from 'react';
import './Appointments.css';
import ReviewForm from '../ReviewForm/ReviewForm';

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
        
        {/* Review Form Section */}
        <div className="review-section">
          <h2>Review Your Consultation</h2>
          <p>Share your experience with your recent consultation to help other patients make informed decisions.</p>
          <ReviewForm />
        </div>
      </div>
    </div>
  );
};

export default Appointments; 
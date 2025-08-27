// Following code has been commented with appropriate comments for your reference.
import React, { useState, useEffect } from 'react';
import './ReviewForm.css';

// Function component for giving reviews
function ReviewForm() {
  // State variables using useState hook
  const [showForm, setShowForm] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState('');
  const [showWarning, setShowWarning] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [doctorData, setDoctorData] = useState(null);
  const [appointmentData, setAppointmentData] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    review: '',
    rating: 0
  });

  // useEffect hook to retrieve doctor and appointment data
  useEffect(() => {
    // Retrieve stored doctor data and appointment data from localStorage
    const storedDoctorData = JSON.parse(localStorage.getItem('doctorData'));
    const storedAppointmentData = storedDoctorData ? 
      JSON.parse(localStorage.getItem(storedDoctorData.name)) : null;
    
    if (storedDoctorData) {
      setDoctorData(storedDoctorData);
    }
    
    if (storedAppointmentData) {
      setAppointmentData(storedAppointmentData);
      // Pre-fill the name field with patient's name
      setFormData(prev => ({
        ...prev,
        name: storedAppointmentData.name
      }));
    }
  }, []);

  // Function to handle button click event
  const handleButtonClick = () => {
    setShowForm(true);
  };

  // Function to handle form input changes
  const handleChange = (e) => {
    // Update the form data based on user input
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to handle rating selection
  const handleRatingChange = (rating) => {
    setFormData({ ...formData, rating: rating });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if all required fields are filled before submission
    if (formData.name && formData.review && formData.rating > 0) {
      setShowWarning(false);
      setSubmittedMessage(formData);
      setIsSubmitted(true);
      setShowForm(false);
      
      // Reset form data
      setFormData({
        name: '',
        review: '',
        rating: 0
      });
    } else {
      setShowWarning(true);
    }
  };

  return (
    <div className="review-form-container">
      <div className="review-form-card">
        <h2 className="review-form-title">Consultation Review</h2>
        
        {/* Display consultation information */}
        {doctorData && appointmentData && (
          <div className="consultation-info">
            <h3>Consultation Details</h3>
            <div className="info-grid">
              <div className="info-item">
                <strong>Doctor:</strong> {doctorData.name}
              </div>
              <div className="info-item">
                <strong>Speciality:</strong> {doctorData.speciality}
              </div>
              <div className="info-item">
                <strong>Patient:</strong> {appointmentData.name}
              </div>
              <div className="info-item">
                <strong>Date:</strong> {appointmentData.date || 'Not specified'}
              </div>
              <div className="info-item">
                <strong>Time:</strong> {appointmentData.time || 'Not specified'}
              </div>
            </div>
          </div>
        )}

        {/* Provide feedback section */}
        <div className="feedback-section">
          <h3>Provide Feedback</h3>
          <p>Share your experience with this consultation to help other patients.</p>
          
          {!showForm && !isSubmitted ? (
            // Display button to open the form
            <button 
              className="feedback-btn"
              onClick={handleButtonClick}
            >
              Click Here to Provide Feedback
            </button>
          ) : showForm ? (
            // Display form for giving feedback
            <form onSubmit={handleSubmit} className="feedback-form">
              <h4>Give Your Feedback</h4>
              
              {/* Display warning message if not all fields are filled */}
              {showWarning && (
                <p className="warning-message">Please fill out all fields including rating.</p>
              )}
              
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="review">Review:</label>
                <textarea 
                  id="review" 
                  name="review" 
                  value={formData.review} 
                  onChange={handleChange}
                  placeholder="Share your experience with this consultation..."
                  rows="4"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Rating:</label>
                <div className="rating-selector">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className={`rating-star ${formData.rating >= star ? 'active' : ''}`}
                      onClick={() => handleRatingChange(star)}
                    >
                      ★
                    </button>
                  ))}
                  <span className="rating-text">
                    {formData.rating > 0 ? `${formData.rating} out of 5` : 'Select rating'}
                  </span>
                </div>
              </div>
              
              {/* Submit button for form submission */}
              <button type="submit" className="submit-btn">Submit Review</button>
            </form>
          ) : null}
        </div>

        {/* Display the submitted message if available */}
        {submittedMessage && isSubmitted && (
          <div className="submitted-message">
            <h3>Thank you for your feedback!</h3>
            <div className="message-content">
              <p><strong>Name:</strong> {submittedMessage.name}</p>
              <p><strong>Rating:</strong> {submittedMessage.rating} out of 5</p>
              <p><strong>Review:</strong> {submittedMessage.review}</p>
            </div>
            <p className="success-message">
              Your review has been submitted successfully. Thank you for helping other patients!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReviewForm; 
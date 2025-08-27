import React, { useState } from 'react'

const AppointmentFormIC = ({ doctorName, doctorSpeciality, onSubmit }) => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
  
    const handleSlotSelection = (slot) => {
      setSelectedSlot(slot);
    };
  
    const handleFormSubmit = (e) => {
      e.preventDefault();
      const appointmentData = {
        name,
        phoneNumber,
        selectedSlot,
        date,
        time
      };
      onSubmit(appointmentData);
      setName('');
      setPhoneNumber('');
      setSelectedSlot(null);
      setDate('');
      setTime('');
    };

    // Available time slots
    const timeSlots = [
      '09:00 AM - 10:00 AM',
      '10:00 AM - 11:00 AM',
      '11:00 AM - 12:00 PM',
      '02:00 PM - 03:00 PM',
      '03:00 PM - 04:00 PM',
      '04:00 PM - 05:00 PM'
    ];
  
    return (
      <form onSubmit={handleFormSubmit} className="appointment-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Preferred Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            min={new Date().toISOString().split('T')[0]}
          />
        </div>
        <div className="form-group">
          <label htmlFor="time">Preferred Time:</label>
          <input
            type="time"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Available Time Slots:</label>
          <div className="time-slots">
            {timeSlots.map((slot) => (
              <button
                key={slot}
                type="button"
                className={`time-slot ${selectedSlot === slot ? 'selected' : ''}`}
                onClick={() => handleSlotSelection(slot)}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
        <button type="submit">Book Now</button>
      </form>
    );
  };

export default AppointmentFormIC

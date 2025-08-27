// Following code has been commented with appropriate comments for your reference.
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';
import './Sign_Up.css';

const Sign_Up = () => {
  const navigate = useNavigate();
  
  // Individual state variables for form fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    } else if (name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long';
    }

    // Phone validation - exactly 10 digits
    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(phone.trim())) {
      newErrors.phone = 'Phone number must be exactly 10 digits';
    }

    // Email validation
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const register = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // API Call to register user
        const response = await fetch(`${API_URL}/api/auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            email: email,
            password: password,
            phone: phone,
          }),
        });

        const json = await response.json();

        if (json.authtoken) {
          // Store user data in session storage
          sessionStorage.setItem("auth-token", json.authtoken);
          sessionStorage.setItem("name", name);
          sessionStorage.setItem("phone", phone);
          sessionStorage.setItem("email", email);

          setIsSubmitted(true);
          
          // Navigate to home page after successful registration
          setTimeout(() => {
            navigate('/');
            window.location.reload();
          }, 2000);
          
        } else {
          if (json.errors) {
            for (const error of json.errors) {
              setErrors({ general: error.msg });
            }
          } else {
            setErrors({ general: json.error });
          }
        }
        
      } catch (error) {
        console.error('Registration failed:', error);
        setErrors({ general: 'Registration failed. Please try again.' });
      }
    }
  };

  const handleReset = () => {
    setName('');
    setPhone('');
    setEmail('');
    setPassword('');
    setErrors({});
    setIsSubmitted(false);
  };

  return (
    <div className="container" style={{marginTop: '5%'}}>
      {/* Grid layout for sign-up form */}
      <div className="signup-grid">
        {/* Title for the sign-up form */}
        <div className="signup-text">
          <h1>Sign Up</h1>
        </div>
        {/* Text for existing members to log in */}
        <div className="signup-text1" style={{textAlign: 'left'}}>
          Already a member? <span><Link to="/login" style={{color: '#2190FF'}}> Login</Link></span>
        </div>
        {/* Form for user sign-up */}
        <div className="signup-form">
          {isSubmitted ? (
            <div style={{textAlign: 'center', color: 'green', padding: '20px'}}>
              <h3>Registration Successful!</h3>
              <p>Welcome {name}! Your account has been created successfully.</p>
              <p>Redirecting to home page...</p>
            </div>
          ) : (
            <form onSubmit={register}>
              {/* Form group for user's name */}
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input 
                  value={name}
                  type="text" 
                  onChange={(e) => setName(e.target.value)}
                  name="name" 
                  id="name" 
                  required 
                  className={`form-control ${errors.name ? 'error' : ''}`}
                  placeholder="Enter your name" 
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>

              {/* Form group for user's phone number */}
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="tel" 
                  name="phone" 
                  id="phone" 
                  required 
                  className={`form-control ${errors.phone ? 'error' : ''}`}
                  placeholder="Enter your phone number (10 digits)" 
                  maxLength="10"
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>

              {/* Form group for user's email */}
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email" 
                  name="email" 
                  id="email" 
                  required 
                  className={`form-control ${errors.email ? 'error' : ''}`}
                  placeholder="Enter your email" 
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              {/* Form group for user's password */}
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  name="password" 
                  id="password" 
                  required 
                  className={`form-control ${errors.password ? 'error' : ''}`}
                  placeholder="Enter your password" 
                />
                {errors.password && <span className="error-message">{errors.password}</span>}
              </div>

              {/* Button group for form submission and reset */}
              <div className="btn-group">
                <button type="submit" className="btn btn-primary mb-2 mr-1 waves-effect waves-light">Submit</button>
                <button type="button" onClick={handleReset} className="btn btn-danger mb-2 waves-effect waves-light">Reset</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sign_Up;
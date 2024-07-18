import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /\S+@\S+\.\S+/;

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (emailRegex.test(formData.email) === false && formData.email.includes('@')) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate the form
    const validationErrors = validateForm();
    setErrors(validationErrors);
  
    if (Object.keys(validationErrors).length === 0) {
      try {
        // Log the formData to verify its content
        console.log('Form Data:', formData);

      const requestBody = JSON.stringify({
        email: formData.email,
        password: formData.password
      });
      console.log('Request Body:', requestBody);
  
        const response = await fetch('http://localhost:8000/api/v1/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: requestBody
        });
  
        if (response.ok) {
          // Login successful
          const data = await response.json();
          console.log('Login successful:', data);
          navigate('/Register'); // Example navigation to dashboard
        } else {
          // Login failed
          const text = await response.text(); // Read the error response as text
          console.error('Error logging in:', text);
          if (response.status === 404) {
            setErrorMessage('User not registered. Please create an account.');
          } 
        }
      } catch (error) {
        console.error('Error logging in:', error);
        setErrorMessage('An error occurred during login.');
      }
    }
  };
  
  

  const navigateToRegister = () => {
    navigate('/register');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <img
        src="https://res.cloudinary.com/diwt649vq/image/upload/v1721033025/cdot_logo_q4yvd6.png"
        alt="CDOT Logo"
        className="mb-8 w-50 h-32 object-cover"
      />
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg shadow-sm custom-focus-ring"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg shadow-sm custom-focus-ring"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white rounded-lg"
            style={{ backgroundColor: '#1e3a8a' }}
          >
            Login
          </button>
        </form>
        {errorMessage && (
          <div className="text-red-500 text-sm mt-4 text-center">{errorMessage}</div>
        )}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <button onClick={navigateToRegister} className="text-blue-500 hover:underline">
              Create an account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

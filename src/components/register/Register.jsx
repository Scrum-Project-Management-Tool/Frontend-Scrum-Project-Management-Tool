// src/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    fullname: '',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.fullname) newErrors.fullname = 'Fullname is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // Handle successful registration logic
      console.log('Form data submitted:', formData);
      navigate('/login');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <img src="https://res.cloudinary.com/diwt649vq/image/upload/v1721033025/cdot_logo_q4yvd6.png "alt="Description" className="mb-8 w-50 h-32 object-cover" />
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg shadow-sm custom-focus-ring"
            />
            {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Fullname</label>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg shadow-sm custom-focus-ring"
            />
            {errors.fullname && <p className="text-red-500 text-xs mt-1">{errors.fullname}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
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
            Register
          </button>
        </form>
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <button onClick={() => navigate('/login')} className="text-blue-500 hover:underline">
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

              
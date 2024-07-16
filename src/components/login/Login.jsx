// src/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    usernameOrEmail: '',
    password: '',

  });
  const navigate = useNavigate();
  const [errors,setErrors]=useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
const validateform=()=>{
    const newerrors={};
    const emailRegex = /\S+@\S+\.\S+/;

    if (!formData.usernameOrEmail) {
      newerrors.usernameOrEmail = 'Username or Email is required';
    } else if (emailRegex.test(formData.usernameOrEmail) === false && formData.usernameOrEmail.includes('@')) {
      newerrors.usernameOrEmail = 'Email is invalid';
    }
      if(!formData.password) 
        {newerrors.password="Password is required"
        }
      else if(formData.password.length<8){
        newerrors.password="Password must be atleast 8 characters"
      }
      return newerrors;

}

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic
    const validationErrors = validateform();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // Handle successful registration logic
      console.log('Form data submitted:', formData);
      
    }
   
  };

  const navigateToRegister = () => {
    navigate('/register');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
        <img src="https://res.cloudinary.com/diwt649vq/image/upload/v1721033025/cdot_logo_q4yvd6.png "alt="Description" className="mb-8 w-50 h-32 object-cover" />
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Username or Email</label>
            <input
              type="text"
              name="usernameOrEmail"
              value={formData.usernameOrEmail}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg shadow-sm custom-focus-ring"
              
            />
            {errors.usernameOrEmail && <p className="text-red-500 text-xs mt-1">{errors.usernameOrEmail}</p>}
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


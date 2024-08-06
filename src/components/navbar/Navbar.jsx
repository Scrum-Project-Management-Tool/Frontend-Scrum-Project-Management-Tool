import React, { useEffect, useState } from 'react';

function Navbar({ children }) {
  const [username, setUsername] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async () => {
    const token = localStorage.getItem('accessToken'); // Replace with your token retrieval method
    try {
      const response = await fetch('http://localhost:8000/api/v1/users/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer${token}`, // Include token in headers
        },
        
      });
  
      if (response.ok) {
        
        localStorage.removeItem('username');
        localStorage.removeItem('accessToken'); // Remove token if used
        window.location.href = '/'; // Redirect path
      } else {
        console.error('Logout failed:', response.statusText);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  

  return (
    <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-8 py-3 bg-gray-300 h-16 z-10">
      <div className="flex items-center space-x-5">
        <img
          src="https://res.cloudinary.com/diwt649vq/image/upload/v1721033025/cdot_logo_q4yvd6.png"
          className="w-25 h-12 object-cover"
          alt="Logo"
        />
        {children}
      </div>
      <div className="relative">
        <button
          className="text-white font-bold text-lg"
          style={{ color: '#1e3a8a', textDecoration: 'underline' }}
          onClick={handleDropdownToggle}
        >
          {username || 'USER'}
        </button>
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
            <button
              onClick={handleLogout}
              className="block w-full bg-gray-200 px-4 py-2 text-left font-bold"
              style={{ color: '#1e3a8a' }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;



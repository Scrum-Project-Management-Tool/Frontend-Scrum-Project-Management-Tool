import React from 'react'

function Navbar() {
    return (
        <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-8 py-3 bg-gray-300 h-16 z-10">
        <img
          src="https://res.cloudinary.com/diwt649vq/image/upload/v1721033025/cdot_logo_q4yvd6.png"
          className="w-25 h-12 object-cover"
          alt="Logo"
        />
        <div className="text-white">
          <h1 className="font-bold text-lg" style={{ color: '#1e3a8a' }}>USER</h1>
        </div>
      </nav>
    )
}

export default Navbar

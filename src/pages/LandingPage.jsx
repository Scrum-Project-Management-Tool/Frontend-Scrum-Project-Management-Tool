import React from 'react'

import { useNavigate } from 'react-router-dom';

function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="max-h-screen overflow-y-hidden">
        <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-8 py-3 bg-gray-300 h-16 z-10">
          <img
            src="https://res.cloudinary.com/diwt649vq/image/upload/v1721033025/cdot_logo_q4yvd6.png"
            className="w-25 h-12 object-cover"
            alt="Logo"
          />
          <div className="flex space-x-4 text-white">
            <button
              type="submit"
              className="mr-4 px-4 py-2 font-bold text-white rounded-lg"
              style={{ backgroundColor: '#1e3a8a' }}
              onClick={() => navigate('/register')}
            >
              Register
            </button>
            <button
              type="submit"
              className="px-4 py-2 font-bold text-white rounded-lg"
              style={{ backgroundColor: '#1e3a8a' }}
              onClick={() => navigate('/login')}
            >
              Login
            </button>
          </div>
        </nav>
        <div className="flex flex-col justify-center items-center min-h-screen mt-[-4rem]">
  <h1 className="mb-4 mt-[10rem] text-[4.8rem] font-bold">
    Scrum <span style={{ color: '#1e3a8a' }}>Project Management</span> Tool
  </h1>
  <h3 className="mb-6 italic text-2xl">
   Optimize Your Projects & Streamline Your Agile Workflows with Our Cutting-Edge Scrum Project Management Tool.
  </h3>
  <button
              type="submit"
              className="mb-6 px-4 py-2 font-bold text-white rounded-lg"
              style={{ backgroundColor: '#1e3a8a' }}
              onClick={() => navigate('/register')}
            >
              Get started
            </button>
  <img src="https://res.cloudinary.com/diwt649vq/image/upload/v1721723476/Screenshot_124_ikiyfz.png" alt="dashboard" className='w-[60rem]  rounded-lg'/>
 
</div>


      </div>
      
      
      
     
    )
}

export default LandingPage

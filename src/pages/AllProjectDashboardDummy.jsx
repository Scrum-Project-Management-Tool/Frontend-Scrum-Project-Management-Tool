import React from 'react'
import { useNavigate } from 'react-router-dom';

function AllProjectDashboardDummy() {
    const navigate=useNavigate();
    return (
        <div className='flex flex-col relative min-h-screen'>
        <h1 className='mb-4 text-xl '>This a dummy project dashboard to display user projects.</h1>
        <button onClick={()=>navigate('/createproject')} style={{backgroundColor:'#1e3a8a'}} className='w-full px-4 py-2 font-bold text-white rounded-lg'>Create Project</button>
        </div>
    )
}

export default AllProjectDashboardDummy

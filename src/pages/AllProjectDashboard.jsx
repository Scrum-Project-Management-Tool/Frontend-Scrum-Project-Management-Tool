import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';


function AllProjectDashboard() {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    

    useEffect(() => {
        async function fetchProjects() {
            const token = localStorage.getItem('accessToken');
            try {
                const response = await fetch('http://localhost:8000/api/v1/projects/allAssigned',{
                    method: 'GET', 
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization':`Bearer${token}`
                        
                    },
                    
                }) 
                    
                    
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
               
                if (Array.isArray(data.message)) {
                    setProjects(data.message);
                } else {
                    throw new Error('API response is not an array');
                }
              
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        }

        fetchProjects();
    }, []);

    const handleProjectClick = (project) => {
        navigate(`/project/${project._id}`, { state: { project } });
    };

    return (
        <div>
            <Navbar>
                <button
                    className="text-white px-4 py-2 rounded hover:bg-blue-700"
                    style={{ backgroundColor: "#1e3a8a" }}
                    onClick={() => navigate('/createproject')}
                >
                    Create Project
                </button>
            </Navbar>
            <div className="mt-16 grid grid-cols-3 gap-4 p-4">
    {projects.map((project) => (
        <div
            key={project._id}
            className="project-card p-4 bg-gray-200 rounded-md shadow-md cursor-pointer w-56 h-56"
            onClick={() => handleProjectClick(project)}
        >
            <h3 className="text-xl font-bold mb-4">{project.title}</h3>
            <p className='mb-8'>{project.description}</p>
            <div className="flex justify-center mb-4">
                <button
                    style={{ backgroundColor: '#1e3a8a' }}
                    className="text-white px-4 py-2 rounded hover:bg-blue-500"
                >
                    Go to Project
                </button>
            </div>
        </div>
    ))}
</div>


        </div>
    );
}

export default AllProjectDashboard;




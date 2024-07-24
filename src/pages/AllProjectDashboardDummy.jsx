import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';

function AllProjectDashboardDummy() {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);

   /* useEffect(() => {
        async function fetchProjects() {
            try {
                const response = await fetch('http://localhost:8000/api/v1/projects');
                const data = await response.json();
                setProjects(data);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        }

        fetchProjects();
    }, []);*/

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
           {/*<div>
                <h1>All Projects</h1>
                <ul>
                    {projects.map(project => (
                        <li key={project.id}>{project.title}</li>
                    ))}
                </ul>
            </div>*/}
        </div>
    );
}

export default AllProjectDashboardDummy;


import React,{useEffect,useState} from 'react'
import { Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function ProjectDropdown() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  const navigate=useNavigate();

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
    setAnchorEl(null);
  };

  const handleCreateProject = () => {
    navigate('/createproject');
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

    useEffect(() => {
        const fetchAssignedProjects = async () => {
          const token = localStorage.getItem('accessToken');
          try {
            const response = await fetch('http://localhost:8000/api/v1/projects/allAssigned', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer${token}`, // Added space between 'Bearer' and token
              },
            });
    
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
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
        };
    
        fetchAssignedProjects();
      }, []);
    
    return (
       <div>
          <button
            aria-controls={open ? 'project-menu' : undefined}
            aria-haspopup="true"
            onClick={handleMenuClick}
            className="text-white px-4 py-2 rounded hover:bg-blue-700"
            style={{ backgroundColor: "#1e3a8a" }}
          >
            {selectedProject ? selectedProject.title : 'Select Project'}
          </button>
          <Menu
            id="project-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            PaperProps={{
              style: {
                maxHeight: 224,
                width: '20ch',
              },
            }}
          >
            {projects.map((proj) => (
              <MenuItem key={proj._id} onClick={() => handleProjectSelect(proj)}>
                {proj.title}
              </MenuItem>
            ))}
            <MenuItem onClick={handleCreateProject} style={{ backgroundColor: "#1e3a8a", color:'white' }}>Create Project</MenuItem>
          </Menu>
       </div>
    )
}

export default ProjectDropdown

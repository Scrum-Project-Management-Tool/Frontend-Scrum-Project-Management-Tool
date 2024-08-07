import React, { useState, useEffect, useContext } from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import Navbar from '../components/navbar/Navbar';
import { useLocation, useNavigate } from 'react-router-dom';
import Projectcontext from '../contexts/Projectcontext';
import { Modal, TextField, Button, Box, Menu, MenuItem } from '@mui/material';

const ProjectDashboard = () => {
  const { updateProjectId ,projectId } = useContext(Projectcontext);

  const [openPopup, setOpenPopup] = useState(false);
  const [userEmails, setUserEmails] = useState('');
  const [error, setError] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const project = location.state?.project;

  useEffect(() => {
    if (project && project._id) {
      updateProjectId(project._id);
     
      setSelectedProject(project);
    }
  }, [project, updateProjectId]);

 
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

  const handleClick = () => {
    navigate('/projectbacklog');
  };

  const handleOpenPopup = () => {
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  const handleAddUser = async () => {
    const token = localStorage.getItem('accessToken');
    try {
      const response = await fetch('http://localhost:8000/api/v1/projects/assign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer${token}`,
        },
        body: JSON.stringify({
          projectId,
          userEmails: userEmails.split(',').map(email => email.trim()), // Split by commas and trim whitespace
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Handle successful response
      console.log('Users added successfully');
      handleClosePopup();
    } catch (error) {
      console.error('Error adding users:', error);
      setError('Failed to add users');
    }
  };

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

  const leftSections = [
    {
      label: 'Scrum',
      icon: <RestartAltRoundedIcon className="mr-2" />,
      dropdown: [{ label: 'Backlog', onClick: handleClick }]
    },
    {
      label: 'Issues',
      icon: <BookmarkBorderOutlinedIcon className="mr-2" />
    }
  ];

  const rightSections = [
    {
      label: 'Team',
      icon: <BookmarkBorderOutlinedIcon className="mr-2" />,
      onClick: handleOpenPopup
    }
  ];

  return (
    <div className="relative min-h-screen flex">
      <Sidebar sections={leftSections} showSettingsButton={true} style={{ position: 'fixed', top: 0, left: 0, bottom: 0, width: '250px' }} />
      <div className="flex-1 ml-64 flex flex-col items-center pt-16">
        <Navbar>
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
        </Navbar>
        <div className="flex-1 w-full max-w-4xl p-4">
          {selectedProject ? (
            <div className='text-left'>
              <h1 className="text-3xl font-bold">{selectedProject.title}</h1>
              <p className="mt-2">{selectedProject.description}</p>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
      <Sidebar 
        sections={rightSections} 
        side="right" 
        width="w-64" 
        height="h-full" 
        top="top-16" 
        padding="p-4" 
        bgColor="bg-gray-700" 
        textColor="text-white" 
        showSettingsButton={false} // Hide settings button in right sidebar
        style={{ position: 'fixed', top: 0, right: 0, bottom: 0 }} 
      />
      <Modal
        open={openPopup}
        onClose={handleClosePopup}
        aria-labelledby="add-team-member-modal"
        aria-describedby="modal-to-add-team-member"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            width: 400,
            bgcolor: 'background.paper',
            p: 3,
            borderRadius: 2,
            boxShadow: 24,
            textAlign: 'center',
          }}
        >
          <h2 className="text-lg font-bold mb-4">Add Team Member</h2>
          <TextField
            label="User Emails (comma separated)"
            variant="outlined"
            fullWidth
            value={userEmails}
            onChange={(e) => setUserEmails(e.target.value)}
            className="mb-4"
          />
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddUser}
          >
            Add User
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default ProjectDashboard;








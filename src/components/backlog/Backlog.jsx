import React, { useEffect, useState, useContext } from 'react';
import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import { useNavigate, useLocation } from 'react-router-dom';
import Projectcontext from '../../contexts/Projectcontext';
import { isValidObjectId } from '../../utils';
import AddIcon from '@mui/icons-material/Add';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ProjectDropdown from '../projectsdropdown/ProjectDropdown';


const Backlog = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userStories, setUserStories] = useState([]);
  const { projectId } = useContext(Projectcontext);


  useEffect(() => {
    // Define the async function to fetch data

    const fetchUserStories = async () => {
      const projectIdStr = String(projectId).trim();

      if (!isValidObjectId(projectIdStr)) {
        console.error('Invalid projectId format:', projectIdStr);
        return;
      }

      const token = localStorage.getItem('accessToken');
      
      try {
        const response = await fetch(`http://localhost:8000/api/v1/userstories/getalluserstories/${projectIdStr}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer${token}`, // Ensure a space after 'Bearer'
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Network response was not ok: ${response.status} ${errorText}`);
        }

        const data = await response.json();
     
        if (data.success && Array.isArray(data.message)) {
          setUserStories(data.message);
        } else {
          console.error('Unexpected data format:', data);
        }
      } catch (error) {
        console.error('Error fetching user stories:', error);
      }
    };

    fetchUserStories();
  }, [projectId, location.state?.newUserStoryAdded]); // Fetch data when the projectId or newUserStoryAdded changes

  const handleuserstoryClick = (userStoryId) => {
    
    navigate('/userstorydashboard', { state: { userStoryId } });
  };

  const leftSections = [
    {
      label: 'Scrum',
      icon: <RestartAltRoundedIcon className="mr-2" />,
      dropdown: [{ label: 'Backlog' }],
    },
    {
      label: 'Issues',
      icon: <BookmarkBorderOutlinedIcon className="mr-2" />,
    },
  ];
  const rightSections = [
    {label: 'SPRINTS',
      icon:<FiberManualRecordIcon className='mr-2'/>

    },
    { label: 'Add Sprint', icon: <AddIcon className="mr-2" />, onClick: () => {} }
  ];

  return (
    <div className="flex flex-col h-screen">
      <Navbar/>
        
      <div className="flex flex-1">
        <Sidebar sections={leftSections} showSettingsButton={true} />
        <div className="flex flex-1 justify-center items-center p-4">
          <div className="relative max-w-3xl w-full bg-gray-200 shadow-lg rounded-lg p-4 flex flex-col">
            <div className="absolute top-4 right-4">
              <button
                style={{ backgroundColor: '#1e3a8a' }}
                className="text-white px-4 py-2 rounded"
                onClick={() => navigate('/userstory')}
              >
                Add User Story
              </button>
            </div>
            <h2 className="text-xl font-bold mb-4 text-left">Backlog</h2>
            <div className="flex flex-col flex-1 overflow-auto">
              <ul className="list-none pl-0">
                {userStories.length > 0 ? (
                  userStories.map(story => (
                    <li key={story._id} className="mb-2 p-2 bg-gray-300 border border-gray-300 rounded-md w-full max-w-md" onClick={() => handleuserstoryClick(story._id)}>
                      <span className="text-left block">{story.subject}</span>
                    </li> 
                  ))
                ) : (
                  <li className="p-2">No user stories found.</li>
                )}
              </ul>
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
          />
        </div>
      </div>
    </div>
  );
};

export default Backlog;


import React from 'react';
import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import { useNavigate } from 'react-router-dom';

const Backlog = () => {
  const navigate=useNavigate();
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

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar sections={leftSections} showSettingsButton={true} />
        <div className="flex flex-1 justify-center items-center p-4">
          <div className="relative max-w-3xl w-full bg-gray-200 shadow-lg rounded-lg p-4">
            <div className="absolute top-4 right-4">
              <button
                style={{ backgroundColor: '#1e3a8a' }}
                className="text-white px-4 py-2 rounded"
                onClick={()=>navigate('/userstory')}
              >
                User Story
              </button>
            </div>
            <h2 className="text-xl font-bold mb-4 text-left">Backlog</h2>
            <div className="flex flex-col flex-1 justify-between">
              <div className="flex-grow">
                {/* Additional content can go here */}
              </div>
              <div className="flex justify-center mb-4">
                <button
                  style={{ backgroundColor: '#1e3a8a' }}
                  className="text-white px-4 py-2 rounded hover:bg-blue-500"
                >
                  Add User Story
                </button>
              </div>
            </div>
          </div>
          <div className="absolute top-20 right-4 p-4 bg-gray-200 shadow-lg rounded-lg">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold mr-4">Sprints</h2>
              <button
                style={{ backgroundColor: '#1e3a8a' }}
                className="text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Add Sprint
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Backlog;


    

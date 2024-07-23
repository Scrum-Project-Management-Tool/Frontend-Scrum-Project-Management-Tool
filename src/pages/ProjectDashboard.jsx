import React from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import Navbar from '../components/navbar/Navbar'

const ProjectDashboard = () => {
  
  const leftSections = [
    {
      label: 'Scrum',
      icon: <RestartAltRoundedIcon className="mr-2" />,
      dropdown: [{ label: 'Backlog' }]
    },
    {
      label: 'Issues',
      icon: <BookmarkBorderOutlinedIcon className="mr-2" />
    }
  ];

  const rightSections = [
    {
      label: 'Team',
      icon: <BookmarkBorderOutlinedIcon className="mr-2" />
    }
  ];

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <Sidebar sections={leftSections} showSettingsButton={true} />
      <div className="flex-1 flex pt-16">
        <div className="w-64"></div>
        <div className="flex-1 p-4">
          {/* Main content goes here */}
        </div>
        <div className="w-64 fixed right-0 top-16 p-4 h-full">
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

export default ProjectDashboard;

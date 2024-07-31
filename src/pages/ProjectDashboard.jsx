import React,{useEffect,useContext} from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import Navbar from '../components/navbar/Navbar'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Projectcontext from '../contexts/Projectcontext';

const ProjectDashboard = () => {
  const {updateProjectId}=useContext(Projectcontext);

  const navigate=useNavigate();
  const location = useLocation();
  const project = location.state?.project; 
  console.log(project);
  console.log(project._id);

  useEffect(() => {
    if (project && project._id) {
      updateProjectId(project._id); // Update context with the current project ID
    }
  }, [project, updateProjectId]);

  const handleclick=()=>{
    navigate('/projectbacklog')
  }
  
  const leftSections = [
    {
      label: 'Scrum',
      icon: <RestartAltRoundedIcon className="mr-2" />,
      dropdown: [{ label: 'Backlog', onClick:handleclick }]
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
        {project ? (
            <div className='text-left' >
              <h1 className="text-3xl font-bold">{project.title}</h1>
              <p className="mt-2">{project.description}</p>
            </div>
          ) : (
            <p>Loading...</p>
          )}
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

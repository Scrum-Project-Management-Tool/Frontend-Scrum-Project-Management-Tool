import React, { useState, useRef } from 'react';
import Navbar from '../components/navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/sidebar/Sidebar';
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AddIcon from '@mui/icons-material/Add';

function UserStoryPage() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Select Status');
  const [attachments, setAttachments] = useState([]);
  const fileInputRef = useRef(null);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionClick = (option, event) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };

  const handleclick = () => {
    navigate('/projectbacklog');
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setAttachments((prevAttachments) => [...prevAttachments, ...files]);
  };

  const leftSections = [
    {
      label: 'Scrum',
      icon: <RestartAltRoundedIcon className="mr-2" />,
      dropdown: [{ label: 'Backlog', onClick: handleclick }],
    },
    {
      label: 'Issues',
      icon: <BookmarkBorderOutlinedIcon className="mr-2" />,
    },
  ];

  const rightSections = [
    {
      label: 'New',
      icon: <ArrowDropDownIcon className="mr-2" />,
      dropdown: [
        { label: 'new', onClick: () => handleOptionClick('new') },
        { label: 'ready', onClick: () => handleOptionClick('ready') },
        { label: 'in-progress', onClick: () => handleOptionClick('in-progress') },
        { label: 'ready for test', onClick: () => handleOptionClick('ready for test') },
        { label: 'done', onClick: () => handleOptionClick('done') },
        { label: 'archived', onClick: () => handleOptionClick('archived') },
      ],
    },
    {
      label: 'Add Assignees',
      icon: <AddIcon className="mr-2" />,
      onClick: () => {
        // Handle "Add Assignees" button click here
      }
    }
  ];

  return (
    <div className="flex relative">
      <Sidebar sections={leftSections} showSettingsButton={true} side="left" />

      <div className="flex-grow p-4 ml-64 mr-64 flex flex-col relative">
        <Navbar>
          <button
            className="text-white px-4 py-2 rounded hover:bg-blue-700"
            style={{ backgroundColor: "#1e3a8a" }}
            onClick={() => navigate('/createproject')}
          >
            Create Project
          </button>
        </Navbar>

        <div className="relative mt-[20rem]">
          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
            className="w-full text-white py-2 px-4 rounded-md hover:bg-blue-800 text-left"
            style={{ backgroundColor: '#1e3a8a' }}

          >
            <AddIcon className='mr-2'/>
            Attachments
          </button>
        
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            multiple
          />

          <div className="mt-8 bg-gray-100 p-4 rounded-lg">
            {attachments.length > 0 ? (
              <ul className="list-disc pl-5 space-y-2">
                {attachments.map((file, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <span className="text-gray-700">{file.name}</span>
                    {/* Display file icon or other relevant details here */}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No attachments uploaded yet.</p>
            )}
          </div>
          
          <div className="mt-8">
            <button
              type="button"
              className="w-full text-white py-2 px-4 rounded-md hover:bg-green-800 text-left"
              style={{ backgroundColor: '#1e3a8a' }}
              
            >
                <AddIcon className='mr-2'/>
              Tasks
            </button>
          </div>
        </div>
      </div>

      <Sidebar sections={rightSections} showSettingsButton={false} side="right" />
    </div>
  );
}

export default UserStoryPage;







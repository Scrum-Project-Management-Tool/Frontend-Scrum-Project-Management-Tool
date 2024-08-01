import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import Sidebar from '../components/sidebar/Sidebar';
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AddIcon from '@mui/icons-material/Add';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem } from '@mui/material';
import { useUserContext } from '../contexts/UserContextProvider';

function UserStoryPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const fileInputRef = useRef(null);

  const [userStoryId, setUserstoryId] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Select Status');
  const [attachments, setAttachments] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [isTaskFormVisible, setIsTaskFormVisible] = useState(false);
  const [taskStatus, setTaskStatus] = useState('new');

  const { setUserstoryId: setUserstoryIdContext } = useUserContext();

  useEffect(() => {
    const { userStoryId } = location.state || {};
    if (userStoryId) {
      setUserstoryId(userStoryId);
      setUserstoryIdContext(userStoryId); // Update context if needed
    } else {
      console.error('Invalid input or missing userstoryId');
    }
  }, [location.state, setUserstoryIdContext]);

  const handleDropdownToggle = () => setIsDropdownOpen(!isDropdownOpen);
  
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };

  const handleclick = () => navigate('/projectbacklog');

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setAttachments(prev => [...prev, ...files]);
  };

  const handleTaskChange = (event) => setTaskInput(event.target.value);

  const handleAddTask = async () => {
    if (taskInput.trim() === '' || !userStoryId) return;

    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch('http://localhost:8000/api/v1/tasks/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer${token}`,
        },
        body: JSON.stringify({ userStoryId, subject: taskInput, status: taskStatus }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok: ${response.status} ${errorText}`);
      }
console.log("Task created successfully")
      setTaskInput('');
      setTaskStatus('new');
      handleCloseModal();
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleEditTask = (id) => {
    const task = tasks.find(task => task.id === id);
    if (task) {
      setTaskInput(task.subject);
      setTaskStatus(task.status);
      setEditingTaskId(id);
      handleOpenModal();
    }
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
    if (editingTaskId === id) setEditingTaskId(null);
  };

  const handleOpenModal = () => setIsTaskFormVisible(true);
  const handleCloseModal = () => setIsTaskFormVisible(false);

  const handleStatusChange = (event) => setTaskStatus(event.target.value);

  const leftSections = [
    { label: 'Scrum', icon: <RestartAltRoundedIcon className="mr-2" />, dropdown: [{ label: 'Backlog', onClick: handleclick }] },
    { label: 'Issues', icon: <BookmarkBorderOutlinedIcon className="mr-2" /> },
  ];

  const rightSections = [
    { label: 'New', icon: <ArrowDropDownIcon className="mr-2" />, dropdown: [
      { label: 'new', onClick: () => handleOptionClick('new') },
      { label: 'ready', onClick: () => handleOptionClick('ready') },
      { label: 'in-progress', onClick: () => handleOptionClick('in-progress') },
      { label: 'ready for test', onClick: () => handleOptionClick('ready for test') },
      { label: 'done', onClick: () => handleOptionClick('done') },
      { label: 'archived', onClick: () => handleOptionClick('archived') },
    ]},
    { label: 'Add Assignees', icon: <AddIcon className="mr-2" />, onClick: () => {} }
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
              onClick={handleOpenModal}
              className="w-full text-white py-2 px-4 rounded-md text-left"
              style={{ backgroundColor: '#1e3a8a' }}
            >
              <AddIcon className='mr-2'/>
              Tasks
            </button>

            <Dialog open={isTaskFormVisible} onClose={handleCloseModal}>
              <DialogTitle>{editingTaskId ? 'Edit Task' : 'Add Task'}</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  label="Task Subject"
                  fullWidth
                  variant="outlined"
                  value={taskInput}
                  onChange={handleTaskChange}
                />
                <TextField
                  select
                  margin="dense"
                  label="Status"
                  fullWidth
                  variant="outlined"
                  value={taskStatus}
                  onChange={handleStatusChange}
                >
                  <MenuItem value="new">new</MenuItem>
                  <MenuItem value="ready">ready</MenuItem>
                  <MenuItem value="in-progress">in-progress</MenuItem>
                  <MenuItem value="ready for test">ready for test</MenuItem>
                  <MenuItem value="done">done</MenuItem>
                  <MenuItem value="archived">archived</MenuItem>
                </TextField>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseModal} color="secondary">Close</Button>
                <Button onClick={handleAddTask} color="primary">{editingTaskId ? 'Update Task' : 'Add Task'}</Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserStoryPage;

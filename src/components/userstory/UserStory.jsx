import React, { useState, useRef, useContext } from 'react';
import Projectcontext from '../../contexts/Projectcontext';
import { useNavigate } from 'react-router-dom';

const UserStory = () => {

  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [fileName, setFileName] = useState('');
  const [errors, setErrors] = useState({});
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('New');
  const fileInputRef = useRef(null);
  const navigate=useNavigate();

  const {projectId}=useContext(Projectcontext);
  console.log('Current Project ID:', projectId);

  const handleDropdownToggle = () => {
    setDropdownOpen(prev => !prev);
  };

  const handleOptionClick = (option, event) => {
    event.stopPropagation(); // Prevent click events from bubbling
    setSelectedOption(option);
    setDropdownOpen(false); // Close the dropdown
  };
  

  const handleSubmit =async  (e) => {
    e.preventDefault();
    // Clear previous errors
    setErrors({});

    // Validate form fields
    const newErrors = {};
    if (!subject) newErrors.subject = 'Subject is required';
    if (!description) newErrors.description = 'Description is required';
    if (!fileName) newErrors.attachment = 'Attachment is required';

    // If there are errors, set the errors state and stop form submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Proceed with form submission logic
    try{
      const token = localStorage.getItem('accessToken');
      console.log(token);
      const response=await fetch('http://localhost:8000/api/v1/userstories/new',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
          'Authorization': `Bearer${token}`

        },
        body:JSON.stringify({
          projectId,
          subject,
          description,
          status:selectedOption,
          attachment:fileName
        }),
      })
      if (!response.ok) {
        // Check if the response status is not OK
        const error = await response.text(); // Get error message from response
        throw new Error(`Error: ${error}`);
      }

      // Handle successful response
      console.log('User story created successfully');
      navigate('/projectbacklog')

    }
    catch (error) {
      // Handle error
      console.error('Error creating user story:', error.message);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="relative max-w-4xl w-full p-4 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Create User Story</h2>

        <button
          type="button"
          className="absolute top-4 right-4 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 z-50"
          onClick={handleDropdownToggle}
        >
          {selectedOption}
        </button>

        {isDropdownOpen && (
          <div className="absolute top-12 right-4 w-48 bg-white border border-gray-300 shadow-lg rounded-md z-50">
            <ul className="py-1">
              {['new', 'ready', 'in-progress', 'ready for test', 'done', 'archived'].map((status, index) => (
                <li key={index}>
                  <button
                    type="button"
                    onClick={(event) => handleOptionClick(status, event)}
                    className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-200 text-left"
                  >
                    {status}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <form className="relative mt-6">
          {/* Form fields and buttons here */}
          <div className="mb-4">
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="mt-1 block w-[40rem] border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="Subject"
            />
            {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              name="description"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-[40rem] border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="Description"
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="attachments" className="block text-sm font-medium text-gray-700">Attachments</label>
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="w-32 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 text-left"
              >
                Attachments
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
              {fileName && (
                <span className="ml-4 text-gray-700">{fileName}</span>
              )}
            </div>
            {errors.attachment && <p className="text-red-500 text-sm mt-1">{errors.attachment}</p>}
          </div>

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserStory;

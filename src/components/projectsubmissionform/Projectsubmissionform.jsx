import React, { useState } from 'react';

const ProjectSubmissionForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title) {
      newErrors.title = 'Title is required';
    }
    if (!formData.description) {
      newErrors.description = 'Description is required';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await fetch('http://localhost:8000/api/v1/projects/new', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: formData.title,
            description: formData.description,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Project created successfully', data);
        }
      } catch (error) {
        console.log('Error in creating project', error);
      }
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-8 py-3 bg-gray-300">
        <img
          src="https://res.cloudinary.com/diwt649vq/image/upload/v1721033025/cdot_logo_q4yvd6.png"
          className="w-25 h-16 object-cover"
          alt="Logo"
        />
        <div className="text-white">
          <h1 className="font-bold text-lg" style={{ color: '#1e3a8a' }}>USER</h1>
        </div>
      </nav>
      <div className="flex justify-center items-center min-h-screen pt-20">
        <div className="max-w-lg w-full p-6 bg-gray-300 rounded-md">
          <p className="text-gray-900 text-lg mb-4">New Project Details</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-900 mb-2" htmlFor="projectName">Title</label>
              <input
                type="text"
                id="projectName"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md bg-white text-black placeholder-gray-400 custom-focus-ring"
              />
              {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-900 mb-2" htmlFor="projectDescription">Description</label>
              <textarea
                id="projectDescription"
                name="description"
                placeholder="Description"
                onChange={handleChange}
                value={formData.description}
                className="w-full px-4 py-2 rounded-md bg-white text-black placeholder-gray-400 custom-focus-ring"
                rows="4"
              ></textarea>
              {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
              style={{ backgroundColor: '#1e3a8a' }}
            >
              Create Project
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProjectSubmissionForm;
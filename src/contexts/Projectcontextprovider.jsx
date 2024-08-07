import React, { useState } from 'react';
import Projectcontext from './Projectcontext';

export const ProjectProvider = ({ children }) => {
  const [projectId, setProjectId] = useState(()=>{
    const storedprojectid=localStorage.getItem('projectId');
    return storedprojectid?storedprojectid:null;
  });

  const updateProjectId = (id) => {
    setProjectId(id);
    localStorage.setItem('projectId', id);
  };

  return (
    <Projectcontext.Provider value={{ projectId, updateProjectId }}>
      {children}
    </Projectcontext.Provider>
  );
};

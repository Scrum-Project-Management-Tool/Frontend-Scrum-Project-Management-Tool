import React, { useState } from 'react';
import Projectcontext from './Projectcontext';

export const ProjectProvider = ({ children }) => {
  const [projectId, setProjectId] = useState(null);

  const updateProjectId = (id) => {
    setProjectId(id);
  };

  return (
    <Projectcontext.Provider value={{ projectId, updateProjectId }}>
      {children}
    </Projectcontext.Provider>
  );
};

import React, { createContext, useState, useContext } from 'react';

// Create a Context for user story
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [userStoryId, setUserstoryId] = useState(null);

  return (
    <UserContext.Provider value={{ userStoryId, setUserstoryId }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for accessing UserContext
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};


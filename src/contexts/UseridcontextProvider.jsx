import React, { createContext, useState, useContext } from 'react';

// Create a Context for user story
const Useridcontext = createContext();

// Create a provider component
export const UseridProvider = ({ children }) => {
  const [userId, setUserId] = useState('');

  return (
    <Useridcontext.Provider value={{ userId, setUserId }}>
      {children}
    </Useridcontext.Provider>
  );
};

// Custom hook for accessing UserContext
export const useUser = () => {
  const context = useContext(Useridcontext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
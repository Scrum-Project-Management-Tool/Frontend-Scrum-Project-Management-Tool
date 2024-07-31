import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ProjectProvider } from './contexts/Projectcontextprovider.jsx'; // Adjust import path if needed

import App from './App.jsx';
import './index.css';

import Register from './components/register/Register.jsx';
import Login from './components/login/Login.jsx';
import Projectsubmissionform from './components/projectsubmissionform/Projectsubmissionform.jsx';
import ProjectDashboard from './pages/ProjectDashboard.jsx';
import LandingPage from './pages/LandingPage.jsx';
import BacklogPage from './pages/BacklogPage.jsx';
import AllProjectDashboard from './pages/AllProjectDashboard.jsx';
import UserStory from './components/userstory/UserStory.jsx';
import UserStoryPage from './pages/UserStoryPage.jsx';

// Define the router with routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/createproject',
    element: <Projectsubmissionform />,
  },
  {
    path: '/allproject',
    element: <AllProjectDashboard />,
  },
  {
    path: '/projectbacklog',
    element: <BacklogPage />,
  },
  {
    path: '/project/:projectId',
    element: <ProjectDashboard />,
  },
  {
    path: '/userstory',
    element: <UserStory />,
  },
  {
    path: '/userstorydashboard',
    element: <UserStoryPage/>,
  },
]);

// Render the application
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ProjectProvider>
      <RouterProvider router={router} />
    </ProjectProvider>
  </React.StrictMode>
);

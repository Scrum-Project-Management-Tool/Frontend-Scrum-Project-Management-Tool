import {React, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Register from './components/register/Register'
import {Router,Routes,Route} from 'react-router-dom'


function App() {
  

  return (
    <Router>
      <Routes>
        <Route path="/register" Component={Register}/>
        </Routes>
    </Router>
    
  );
}

export default App

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Auth from './components/Auth/Auth';
import Login from './components/Login/Login';
import NavBar from './components/NavBar/NavBar';
import PersonalPage from './components/PersonalPage/PersonalPage';
import './null.scss';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/personalPage" element={<PersonalPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </div>
  );
}

export default App;

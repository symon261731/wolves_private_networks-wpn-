import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import PersonalPage from './components/PersonalPage/PersonalPage';
import './null.scss';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/personalPage" element={<PersonalPage />} />
      </Routes>
    </div>
  );
}

export default App;

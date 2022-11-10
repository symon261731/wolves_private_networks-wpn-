import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Auth from './components/Auth/Auth';
import Login from './components/Login/Login';
import NavBar from './components/NavBar/NavBar';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </div>
  );
}

export default App;

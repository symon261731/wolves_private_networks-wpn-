import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage/MainPage';
import NavBar from './components/NavBar/NavBar';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route element={<MainPage />} path="/" />
      </Routes>
    </div>
  );
}

export default App;

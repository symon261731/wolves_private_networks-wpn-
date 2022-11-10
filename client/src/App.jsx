import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage/MainPage';
import Auth from './components/Auth/Auth';
import FormVPN from './components/FormVPN/FormVPN';
import Login from './components/Login/Login';
import NavBar from './components/NavBar/NavBar';
import PersonalPage from './components/PersonalPage/PersonalPage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

import './null.scss';

function App() {
  const user = undefined;
  // { login: 'admin', id: 1 };

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route element={<MainPage />} path="/" />
        <Route element={<ProtectedRoute redirect="/" isAllowed={user?.id} />}>
          <Route path="/personalPage" element={<PersonalPage />} />
          <Route path="/createVPN" element={<FormVPN />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </div>
  );
}

export default App;

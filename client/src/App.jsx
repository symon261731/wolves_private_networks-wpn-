import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import MainPage from './components/MainPage/MainPage';
import Auth from './components/Auth/Auth';
import FormVPN from './components/FormVPN/FormVPN';
import Login from './components/Login/Login';
import NavBar from './components/NavBar/NavBar';
import PersonalPage from './components/PersonalPage/PersonalPage';
import UserPage from './components/UserPage/UserPage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import './null.scss';
import FormOrder from './components/FormOrder/FormOrder';
import OrdersList from './components/OrdersList/OrdersList';
import { checkUserThunk } from './Redux/actions/userActions';

function App() {
  // const user = { login: 'admin', id: 1 };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkUserThunk());
  }, []);
  const user = useSelector((state) => state.user);

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route element={<MainPage />} path="/" />
        <Route element={<ProtectedRoute redirect="/" isAllowed={user?.id} />}>
          <Route path="/personalPage" element={<PersonalPage />} />
          <Route path="/createVPN" element={<FormVPN />} />
          <Route path="/createorder" element={<FormOrder />} />
          <Route path="/orders" element={<OrdersList />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/createVPN" element={<FormVPN />} />
        <Route path="/userHori/:id" element={<UserPage />} />
      </Routes>
    </div>
  );
}

export default App;

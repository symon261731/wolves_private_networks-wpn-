import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence } from 'framer-motion';
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
import ServerInfo from './components/ServerInfo/ServerInfo';
import Pocket from './components/Pocket/Pocket';
import PocketForm from './components/PocketForm/PocketForm';
import OrderAbout from './components/OrderAbout/OrderAbout';
import FourZeroFour from './components/FourZeroFour/FourZeroFour';

function App() {
  // const user = { login: 'admin', id: 1 };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkUserThunk());
  }, []);
  const user = useSelector((state) => state.user);
  console.log({ user });
  const location = useLocation();
  return (
    <div className="App" style={{ position: 'relative', zIndex: '10' }}>
      {user.loading ? (null) : (
        <>
          <NavBar />
          <AnimatePresence exitBeforeEnter>
            <Routes key={location.pathname} location={location}>
              <Route element={<MainPage />} path="/" />
              <Route element={<ProtectedRoute redirect="/" isAllowed={!!user.id} />}>
                <Route path="/personalPage/:id" element={<PersonalPage />} />
                <Route path="/addCash" element={<Pocket />} />
                <Route path="/createVPN" element={<FormVPN />} />
                <Route path="/createorder" element={<FormOrder />} />
                <Route path="/orders" element={<OrdersList />} />
                <Route path="/server/:id" element={<ServerInfo />} />
                <Route path="/pocketForm" element={<PocketForm />} />
                <Route path="order/:orderId" element={<OrderAbout />} />
                <Route path="/userHori/:id" element={<UserPage />} />
                {/* <Route path="/server/:id" element={<ServerInfo />} /> */}

              </Route>
              <Route element={<ProtectedRoute redirect="/" isAllowed={!user.id} />}>
                <Route path="/login" element={<Login />} />
                <Route path="/auth" element={<Auth />} />
              </Route>
              <Route path="*" element={<FourZeroFour />} />
            </Routes>
          </AnimatePresence>
        </>
      )}

    </div>
  );
}

export default App;

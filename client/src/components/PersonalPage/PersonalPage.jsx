/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Order from './Order/Order';
import { setIssuedOrderThunk } from '../../Redux/actions/issuedOrderActions';
import { setCurrentOrderThunk } from '../../Redux/actions/currentOrderActions';
import './PesonalPage.scss';
import './OneVpn/OneVpn.scss';
import { setServersOfUserThunk } from '../../Redux/actions/myServersActions';
import OneVpn from './OneVpn/OneVpn';
import Card from '../Card/Card';
import { editServersOfUserThunk, setAllServersThunk } from '../../Redux/actions/serversActions';
import AnimatedPage from '../AnimateRoute/AnimatedRoute';
import IssuedOrder from './IssuedOrder/IssuedOrder';

export default function PersonalPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentOrder = useSelector((state) => state.currentOrder);
  const issuedOrder = useSelector((state) => state.issuedOrder);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(setCurrentOrderThunk());
    dispatch(setIssuedOrderThunk());
    dispatch(setAllServersThunk());
    dispatch(setServersOfUserThunk(user.id));
  }, []);
  const vpn = useSelector((state) => state.myServers);
  const servers = useSelector((state) => state.servers);
  const mySubscribes = servers.filter((server) => server.subscribeStatus === true);

  const [toggleState, setToggleState] = useState(Number(id) || 1);
  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <AnimatedPage>
      <div className="personal-page personal-page_margin">
        <h2 className="personal-page__title">Welcome to your personal account page </h2>
        <h3 className="personal-page__name">{user?.login}</h3>
        <ul className="personal-page__link-tab">
          <li
            onClick={() => toggleTab(1)}
            className={toggleState === 1 ? 'personal-page__item active-tab' : 'personal-page__item'}
          >
            My subscribtions
          </li>
          <li
            onClick={() => toggleTab(2)}
            className={toggleState === 2 ? 'personal-page__item active-tab' : 'personal-page__item'}
          >
            My VPNs
          </li>
          <li
            onClick={() => toggleTab(3)}
            className={toggleState === 3 ? 'personal-page__item active-tab' : 'personal-page__item'}
          >
            Orders in work
          </li>
          <li
            onClick={() => toggleTab(4)}
            className={toggleState === 4 ? 'personal-page__item active-tab' : 'personal-page__item'}
          >
            My orders
          </li>
        </ul>
        <div className="personal-page__tabs">
          <div className={toggleState === 1 ? 'personal-page__one-tab active-content' : 'personal-page__one-tab'}>
            <div className="personal-page__content">
              <h4 className="personal-page__tab-title">My Subscribtions</h4>

              { mySubscribes.length !== 0
                ? (
                  <div className="second-tab second-tab_margin">
                    {mySubscribes?.map((el) => (
                    // <div className="download">
                      <OneVpn key={el.id} info={el} flag />
                    // </div>
                    ))}
                  </div>
                )
                : (
                  <div className="current-order__nope">
                    <p className="personal-page__content">You don't have subscriptions yet</p>
                    <button onClick={() => navigate('/')} type="button" className="current-order__btn">Find VPN</button>
                  </div>
                )}
            </div>
          </div>

          <div className={toggleState === 2 ? 'personal-page__one-tab active-content' : 'personal-page__one-tab'}>
            <div className="personal-page__content">
              <h4 className="personal-page__tab-title">My VPNs</h4>
              { vpn.length !== 0
                ? (
                  <div className="second-tab second-tab_margin">
                    {vpn?.map((el) => <OneVpn key={el.id} info={el} flag={false} />)}
                  </div>
                )
                : (<p className="personal-page__content">You don' have VPN</p>)}
              <Link className="personal-page__btn" to="/createVPN">Create VPN</Link>
            </div>
          </div>

          <div className={toggleState === 3 ? 'personal-page__one-tab active-content' : 'personal-page__one-tab'}>
            <h4 className="personal-page__tab-title">ORDERS IN WORK</h4>
            <div className="personal-page__order current-order">
              {currentOrder.length ? (
                currentOrder.map((el) => <Order key={el.id} info={el} />)) : (
                  <div className="current-order__nope">
                    <p className="current-order__text"> You don't have orders in work yet</p>
                    <button onClick={() => navigate('/orders')} type="button" className="current-order__btn">Find order</button>
                  </div>
              )}
            </div>
          </div>

          <div className={toggleState === 4 ? 'personal-page__one-tab active-content' : 'personal-page__one-tab'}>
            <h4 className="personal-page__tab-title">MY ORDERS</h4>
            <div className="personal-page__order current-order">

              { issuedOrder.length ? (issuedOrder?.map((el) => <IssuedOrder key={el.id} info={el} />)) : (
                <div className="current-order__nope">
                  <p className="current-order__text"> You don't have orders yet</p>
                  <button onClick={() => navigate('/createorder')} type="button" className="current-order__btn">Create order</button>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </AnimatedPage>
  );
}

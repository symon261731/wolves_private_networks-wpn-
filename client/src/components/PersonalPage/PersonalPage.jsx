/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Order from './Order/Order';
import { setIssuedOrderThunk } from '../../Redux/actions/issuedOrderActions';
import { setCurrentOrderThunk } from '../../Redux/actions/currentOrderActions';
import './PesonalPage.scss';
import { setServersOfUserThunk } from '../../Redux/actions/serversActions';
import OneVpn from './OneVpn/OneVpn';

export default function PersonalPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentOrder = useSelector((state) => state.currentOrder);
  const issuedOrder = useSelector((state) => state.issuedOrder);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(setCurrentOrderThunk());
    dispatch(setCurrentOrderThunk());
    dispatch(setIssuedOrderThunk());
    dispatch(setServersOfUserThunk(user.id));
  }, []);
  const vpn = useSelector((state) => state.servers);

  const [toggleState, setToggleState] = useState(1);
  const toggleTab = (index) => {
    setToggleState(index);
  };
  return (
    <div className="personal-page">
      <h2 className="personal-page__title">Личный кабинет</h2>
      <ul className="personal-page__link-tab">
        <li
          onClick={() => toggleTab(1)}
          className={toggleState === 1 ? 'personal-page__item active-tab' : 'personal-page__item'}
        >
          1 tab
        </li>
        <li
          onClick={() => toggleTab(2)}
          className={toggleState === 2 ? 'personal-page__item active-tab' : 'personal-page__item'}
        >
          VPN
        </li>
        <li
          onClick={() => toggleTab(3)}
          className={toggleState === 3 ? 'personal-page__item active-tab' : 'personal-page__item'}
        >
          current orders
        </li>
        <li
          onClick={() => toggleTab(4)}
          className={toggleState === 4 ? 'personal-page__item active-tab' : 'personal-page__item'}
        >
          issued orders
        </li>
      </ul>
      <div className="personal-page__tabs">
        <div className={toggleState === 1 ? 'personal-page__one-tab active-content' : 'personal-page__one-tab'}>
          <h4 className="personal-page__tab-title">first</h4>
          <p className="personal-page__content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil nesciunt quaerat sequi error. Eum quam atque natus saepe inventore? Doloremque cum architecto laudantium doloribus amet. Hic mollitia ullam similique veritatis.
          </p>
        </div>

        <div className={toggleState === 2 ? 'personal-page__one-tab active-content' : 'personal-page__one-tab'}>
          <div className="personal-page__content">
            <h4 className="personal-page__tab-title">Ваши VPN</h4>
            { vpn.length !== 0
              ? (vpn?.map((el) => <OneVpn key={el.id} info={el} />))
              : (<p className="personal-page__content">У вас пока нету VPN</p>)}
            <Link className="personal-page__btn" to="/createVPN">Создать VPN</Link>
          </div>
        </div>

        <div className={toggleState === 3 ? 'personal-page__one-tab active-content' : 'personal-page__one-tab'}>
          <h4 className="personal-page__tab-title">CURRENT ORDERS</h4>
          <div className="personal-page__order current-order">
            {currentOrder.length ? (
              currentOrder.map((el) => <Order key={el.id} info={el} />)) : (
                <div className="current-order__nope">
                  <p className="current-order__text"> You haven't token a job yet</p>
                  <button onClick={() => navigate('/orders')} type="button" className="current-order__btn">find order</button>
                </div>
            )}
          </div>
        </div>

        <div className={toggleState === 4 ? 'personal-page__one-tab active-content' : 'personal-page__one-tab'}>
          <h4 className="personal-page__tab-title">ISSUED ORDERS</h4>
          <div className="personal-page__order current-order">
            { issuedOrder ? (issuedOrder?.map((el) => <Order key={el.id} info={el} />)) : (
              <div className="current-order__nope">
                <p className="current-order__text"> You haven't given a job yet</p>
                <button onClick={() => navigate('/orders')} type="button" className="current-order__btn">find order</button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import './PesonalPage.scss';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Order from './Order/Order';
import { setCurrentOrderThunk, setIssuedOrderThunk } from '../../Redux/actions/orderActions';

export default function PersonalPage() {
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order);
  useEffect(() => {
    dispatch(setCurrentOrderThunk());
  });
  console.log('order', order);
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
            <p className="personal-page__content">У вас пока нету VPN</p>
            <Link className="personal-page__btn" to="/createVPN">Создать VPN</Link>
          </div>
        </div>
        <div className={toggleState === 3 ? 'personal-page__one-tab active-content' : 'personal-page__one-tab'}>
          <h4 className="personal-page__tab-title">CURRENT ORDERS</h4>
          <div className="personal-page__order current-order">
            {order ? (order.map((el) => <Order key={el.id} info={el} />)) : (<p> You haven't token a job yet</p>)}
          </div>
        </div>
        <div className={toggleState === 4 ? 'personal-page__one-tab active-content' : 'personal-page__one-tab'}>
          <h4 className="personal-page__tab-title">ISSUED ORDERS</h4>
          <p className="personal-page__content">
            fourth
          </p>
        </div>
      </div>
    </div>
  );
}

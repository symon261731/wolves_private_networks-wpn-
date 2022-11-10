import React from 'react';
import { Link } from 'react-router-dom';
import OneOrder from '../OneOrder/OneOrder';
import './OrderList.scss';

export default function OrdersList() {
  return (
    <div className="order">
      <div className="order__container">
        <h1 className="order__title">Заказы</h1>
        <Link to="/createorder" className="order__btn">Создать заказ</Link>
      </div>
      <div>
        <div className="one-order">
          <OneOrder />
        </div>
      </div>
    </div>
  );
}

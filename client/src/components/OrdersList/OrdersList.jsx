import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import OneOrder from '../OneOrder/OneOrder';
import './OrderList.scss';

export default function OrdersList() {
  const order = useSelector((state) => state.order);
  return (
    <div className="order">
      <div className="order__container">
        <h1 className="order__title">Заказы</h1>
        <Link to="/createorder" className="order__btn">Создать заказ</Link>
      </div>
      <div>
        <div className="one-order">
          <OneOrder />
          {order?.map((el) => <OneOrder key={el.id} info={el} />)}
        </div>
      </div>
    </div>
  );
}

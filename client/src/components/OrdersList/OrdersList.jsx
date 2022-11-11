import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setOrderThunk } from '../../Redux/actions/orderActions';
import OneOrder from '../OneOrder/OneOrder';
import './OrderList.scss';

export default function OrdersList() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setOrderThunk());
  }, []);
  const order = useSelector((state) => state.order);
  return (
    <div className="order">
      <div className="order__container">
        <h1 className="order__title">Заказы</h1>
        <Link to="/createorder" className="order__btn">Создать заказ</Link>
      </div>
      <div>
        <div className="one-order">
          {order?.map((el) => <OneOrder key={el.id} info={el} />)}
        </div>
      </div>
    </div>
  );
}

import React, { useEffect } from 'react';
import './OrderAbout.scss';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setOneOrderThunk } from '../../Redux/actions/orderActions';

export default function OrderAbout() {
  const dispatch = useDispatch();
  const { orderId } = useParams();

  useEffect(() => {
    dispatch(setOneOrderThunk(orderId));
  }, []);
  const order = useSelector((state) => state.order);
  console.log(order);
  return (
    <div className="order-about">
      <div className="order-about__box">
        <div className="order-about__content">
          <p className="order-about__text order-about_login">{order?.User?.login}</p>
          <p className="order-about__text">{order?.title}</p>
          <p className="order-about__text">
            <span className="order-about_margin"> location: </span>
            {order?.location}
          </p>
          <p className="order-about__text order-about_price">
            {order?.price}
            {' '}
            $
          </p>
        </div>
        <button type="button" className="order-about__confirm">confirm</button>
      </div>
    </div>
  );
}

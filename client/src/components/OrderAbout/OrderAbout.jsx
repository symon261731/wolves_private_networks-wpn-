import React, { useEffect } from 'react';
import './OrderAbout.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setOneOrderThunk } from '../../Redux/actions/orderActions';

export default function OrderAbout() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setOneOrderThunk());
  }, []);
  const order = useSelector((state) => state.order);
  return (
    <div className="order-about">
      <div className="order-about__box">
        <div className="order-about__content">
          <p className="order-about__text">123</p>
          <p className="order-about__text">{order?.price}</p>

        </div>
        <button type="button" className="order-about__confirm">confirm</button>
      </div>
    </div>
  );
}

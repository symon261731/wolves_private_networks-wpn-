import React, { useEffect, useState } from 'react';
import './OrderAbout.scss';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getNewOrderThunk, removeFromAll } from '../../Redux/actions/orderActions';

export default function OrderAbout() {
  const dispatch = useDispatch();
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [info, setInfo] = useState({});
  useEffect(() => {
    axios.get(`/order/${orderId}`).then((res) => setInfo(res.data));
  }, []);
  // const order = useSelector((state) => state.order);
  return (
    <div className="order-about">
      <div className="order-about__box">
        <div className="order-about__content">
          <p className="order-about__text order-about_login">{info?.User?.login}</p>
          <p className="order-about__text">{info?.title}</p>
          <p className="order-about__text">
            <span className="order-about_margin"> location: </span>
            {info?.location}
          </p>
          <p className="order-about__text order-about_price">
            {info?.price}
            {' '}
            $
          </p>
        </div>
        <button
          onClick={() => {
            dispatch(removeFromAll(info));
            dispatch(getNewOrderThunk(orderId, navigate));
          }}
          type="button"
          className="order-about__confirm"
        >
          confirm

        </button>
      </div>
    </div>
  );
}

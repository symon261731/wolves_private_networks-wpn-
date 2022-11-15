import React from 'react';
import './Order.scss';
import { useDispatch } from 'react-redux';
import { doneNewOrderThunk } from '../../../Redux/actions/currentOrderActions';

export default function Order({ info }) {
  const dispatch = useDispatch();
  return (
    <div className={(info.status === 'close' ? 'current-order__box current-order__box_green' : 'current-order__box')}>
      <p className="current-order__title">{info?.title}</p>
      <div className="current-order__path">
        <p className="current-order__costumer">{info?.status}</p>
        <p className="current-order__costumer">{info?.createdAt}</p>
        <p className="current-order__price">
          {info?.price}
          {' '}
          <span>$</span>
        </p>

      </div>
      <button onClick={() => dispatch(doneNewOrderThunk(info.id))} type="button" className="current-order__btn">confirm order</button>
    </div>
  );
}

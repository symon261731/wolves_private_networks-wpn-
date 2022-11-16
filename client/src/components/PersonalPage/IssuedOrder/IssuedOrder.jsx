import React from 'react';
import { useDispatch } from 'react-redux';
import { doneIssuedOrderThunk } from '../../../Redux/actions/issuedOrderActions';

export default function IssuedOrder({ info }) {
  const dispatch = useDispatch();

  return (
    <div className={(info.status === 'need validation' ? 'current-order__box current-order__box_green' : 'current-order__box')}>
      <p className="current-order__title">{info?.title}</p>
      <div className="current-order__path">
        <p className="current-order__costumer">{info?.status}</p>
        <p className="current-order__price">
          {info?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
          {' '}
          <span>$</span>
        </p>

      </div>
      <button onClick={() => dispatch(doneIssuedOrderThunk(info.id))} type="button" className="current-order__btn">done order</button>
    </div>
  );
}

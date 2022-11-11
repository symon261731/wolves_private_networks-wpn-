import React from 'react';
import './Order.scss';

export default function Order({ info }) {
  console.log(info);
  return (
    <div className="current-order__box">
      <p className="current-order__title">{info?.title}</p>
      <div className="current-order__path">
        <p className="current-order__costumer">{info?.createdAt}</p>
        <p className="current-order__price">
          {info?.price}
          {' '}
          <span>€</span>
        </p>
      </div>
    </div>
  );
}

import React from 'react';
import './OneOrder.scss';

export default function OneOrder({ info }) {
  return (
    <div className="one-order__box">
      <p className="one-order__title">{info?.title}</p>
      <div className="one-order__path">
        <p className="one-order__location">{info?.location}</p>
        <p className="one-order__price">
          {info?.price}
          <span className="one-order__span">€</span>
        </p>
      </div>
    </div>
  );
}

import React from 'react';
import './Order.scss';

export default function Order() {
  return (
    <div className="current-order__box">
      <p className="current-order__title">order title</p>
      <div className="current-order__path">
        <p className="current-order__costumer">Costumer</p>
        <p className="current-order__price">123</p>
      </div>
    </div>
  );
}

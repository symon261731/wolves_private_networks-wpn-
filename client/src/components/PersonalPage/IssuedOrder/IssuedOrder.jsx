import React from 'react';

export default function IssuedOrder({ info }) {
  return (
    <div className={(info.status === 'need validation' ? 'current-order__box current-order__box_green' : 'current-order__box')}>
      <p className="current-order__title">{info?.title}</p>
      <div className="current-order__path">
        <p className="current-order__costumer">{info?.createdAt}</p>
        <p className="current-order__price">
          {info?.price}
          {' '}
          <span>$</span>
        </p>

      </div>
      <button type="button" className="current-order__btn">done order</button>
    </div>
  );
}

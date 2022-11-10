import React from 'react';
import { Link } from 'react-router-dom';
import OneOrder from '../OneOrder/OneOrder';

export default function OrdersList() {
  return (
    <div>
      <h1>Заказы</h1>
      <Link to="/createorder" className="btn btn-primary">Создать заказ</Link>
      <br />
      <OneOrder />
    </div>
  );
}

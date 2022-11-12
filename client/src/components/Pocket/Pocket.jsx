import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './Pocket.scss';

export default function Pocket() {
  const user = useSelector((state) => state.user);
  return (
    <div className="pocket">
      <div className="pocket__box">
        <p className="pocket__current-cash">
          {user?.pocket}
          $
        </p>
        <p className="pocket__text">
          Do you want to top up your wallet?
        </p>
        <div className="pocket__center">
          <Link className="pocket__btn" to="/pocketForm">Confirm</Link>
        </div>
      </div>
    </div>
  );
}

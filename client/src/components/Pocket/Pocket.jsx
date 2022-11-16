import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './Pocket.scss';
import AnimatedPage from '../AnimateRoute/AnimatedRoute';

export default function Pocket() {
  // const user = useSelector((state) => state.user);
  const pocket = useSelector((state) => state.pocket);
  return (
    <AnimatedPage>
      <div className="pocket">
        <div className="pocket__box">
          <p className="pocket__current-cash">
            {pocket || 0}
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
    </AnimatedPage>

  );
}

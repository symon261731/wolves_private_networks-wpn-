import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <div>
      <ul className="nav justify-content-center">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Личный кабинет</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/">Заказы</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/">100р</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/">Pocket</Link>
        </li>
      </ul>
    </div>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.scss';

export default function NavBar() {
  const user = { login: 'admin', id: 1 };

  return (
    <div>
      <ul className="nav">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        {user?.id ? (
          <>
            <div className="nav__flex">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/personalPage">MyPage</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/orders">Orders</Link>
              </li>
            </div>
            <div className="nav__flex">
              <li className="nav-item">
                <Link className="nav-link" to="/logout">Logout</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/addCash">Pocket: 0 USD</Link>
              </li>
            </div>
          </>
        ) : (
          <>
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/auth">Auth</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUserThunk } from '../../Redux/actions/userActions';
import './NavBar.scss';

export default function NavBar() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <div className="header__margin">
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
                <Link className="nav-link active" aria-current="page" to="/userHori">UserPage</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/orders">Orders</Link>
              </li>
            </div>
            <div className="nav__flex">
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/#"
                  onClick={() => {
                    dispatch(logoutUserThunk());
                  }}
                >
                  Logout

                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/addCash">
                  Pocket:
                  {' '}
                  {user?.pocket}
                  {' '}
                  USD
                </Link>
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

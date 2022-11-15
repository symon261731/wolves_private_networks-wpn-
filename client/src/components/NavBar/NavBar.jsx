import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setMoneyPocketThunk } from '../../Redux/actions/pocketAction';
import { logoutServer } from '../../Redux/actions/serversActions';
import { logoutUserThunk } from '../../Redux/actions/userActions';
import './NavBar.scss';

export default function NavBar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const pocket = useSelector((state) => state.pocket);
  useEffect(() => {
    dispatch(setMoneyPocketThunk());
  }, [user.id]);

  return (
    <div className="header header__margin">
      <ul className="nav">
        <li className="nav__item">
          <Link className="nav__link" aria-current="page" to="/">Home</Link>
        </li>
        {user?.id ? (
          <>
            <div className="nav__flex">
              <li className="nav__item">
                <Link className="nav__link" aria-current="page" to="/personalPage/1">MyPage</Link>
              </li>
              <li className="nav__item">
                <Link className="nav__link" to="/orders">Orders</Link>
              </li>
            </div>
            <div className="nav__flex">
              <li className="nav__item">
                <Link
                  className="nav__link"
                  to="/#"
                  onClick={() => {
                    dispatch(logoutUserThunk());
                    dispatch(logoutServer());
                  }}
                >
                  Logout

                </Link>
              </li>
              <li className="nav__item">
                <Link className="nav__link" to="/addCash">
                  Pocket:
                  {' '}
                  {pocket || 0}
                  {/* {user.pocket || 0} */}
                  {' '}
                  USD
                </Link>
              </li>
            </div>
          </>
        ) : (
          <>
            <li className="nav__item">
              <Link className="nav__link" to="/login">Login</Link>
            </li>
            <li className="nav__item">
              <Link className="nav__link" to="/auth">Auth</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

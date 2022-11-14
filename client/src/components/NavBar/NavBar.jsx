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
                    dispatch(logoutServer());
                  }}
                >
                  Logout

                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/addCash">
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

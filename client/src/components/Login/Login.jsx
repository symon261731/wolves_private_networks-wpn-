import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUserThunk } from '../../Redux/actions/userActions';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <form
      method="post"
      onSubmit={(e) => {
        e.preventDefault();
        dispatch(loginUserThunk(Object.fromEntries(new FormData(e.target)), navigate));
      }}
    >
      <div className="mb-3">
        <label htmlFor="title-input" className="block mar-b-1">
          Email
          <input name="email" type="email" className="block w-100 no-outline no-border pad-1 mar-b-2" id="exampleInputEmail1" aria-describedby="emailHelp" />
        </label>
      </div>
      <div className="mb-3">
        <label htmlFor="title-input" className="block mar-b-1">
          Password
          <input name="password" type="password" className="block w-100 no-outline no-border pad-1 mar-b-2" id="exampleInputPassword1" />
        </label>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
}

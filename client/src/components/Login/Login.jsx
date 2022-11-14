import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUserThunk } from '../../Redux/actions/userActions';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="auth__main-box">
      <div className="waveWrapper waveAnimation">
        <div className="waveWrapperInner bgTop">
          <div className="wave waveTop" style={{ 'background-image': "url('http://front-end-noobs.com/jecko/img/wave-top.png')" }} />
        </div>
        <div className="waveWrapperInner bgMiddle">
          <div className="wave waveMiddle" style={{ 'background-image': "url('http://front-end-noobs.com/jecko/img/wave-mid.png')" }} />
        </div>
        <div className="waveWrapperInner bgBottom">
          <div className="wave waveBottom" style={{ 'background-image': "url('http://front-end-noobs.com/jecko/img/wave-bot.png')" }} />
        </div>
      </div>
      <div className="auth auth_margin">
        <form
          className="auth__form"
          method="post"
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(loginUserThunk(Object.fromEntries(new FormData(e.target)), navigate));
          }}
        >
          <div className="auth__container">
            <div className="auth__content">
              <p className="auth__text">Email</p>
              <input placeholder="email" name="email" type="email" className="auth__input" />
            </div>
            <div className="auth__content">
              <p className="auth__text">Password</p>
              <input placeholder="password" name="password" type="password" className="auth__input" />
            </div>
            <button type="submit" className="auth__btn">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

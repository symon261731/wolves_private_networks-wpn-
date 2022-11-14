import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './Pocket.scss';

export default function Pocket() {
  // const user = useSelector((state) => state.user);
  const pocket = useSelector((state) => state.pocket);
  return (
    <div className="pocket">
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

  );
}

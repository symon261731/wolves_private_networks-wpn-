import React from 'react';
import './OneVpn.scss';

export default function OneVpn({ info }) {
  return (
    <div className="one-vpn">
      <div className="one-vpn__box">
        <button className="one-vpn__delete-btn" type="button">X</button>
        <p className="one-vpn__content">
          <span className="one-vpn__span">location:</span>
          {info?.location}
        </p>
        <p className="one-vpn__content">
          <span className="one-vpn__span">protocol:</span>
          {info?.protocol}
        </p>
        <p className="one-vpn__content">
          <span className="one-vpn__span">IP:</span>
          {info?.ip}
        </p>
        <p className="one-vpn__score">
          <span className="one-vpn__span">Subscribers:</span>
          {info?.subscribedUsers.length}
        </p>
      </div>
    </div>
  );
}

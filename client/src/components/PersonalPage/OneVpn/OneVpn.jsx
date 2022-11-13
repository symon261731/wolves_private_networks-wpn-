import React from 'react';
import './OneVpn.scss';

export default function OneVpn({ info }) {
  return (
    <div className="one-vpn">
      <div className="one-vpn__box">
        <h4 className="one-vpn__title">{info?.title}</h4>
        <div className="one-vpn__flex">
          <p className="one-vpn__content">{info?.location}</p>
          <p className="one-vpn__content">{info?.protocol}</p>
          <p className="one-vpn__content">{info?.ip}</p>
        </div>
      </div>
    </div>
  );
}

import axios from 'axios';
import React, { useState } from 'react';
import './OneVpn.scss';

export default function OneVpn({ info }) {
  const [configLink, setConfigLink] = useState({});

  function handleDownload() {
    axios('server/config/:id', { responseType: 'blob' })
      .then((res) => {
        const href = URL.createObjectURL(res.data);
        const download = 'config.ovpn';
        setConfigLink({ href, download });
        console.log({ res });
      });
  }
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
          {info?.subscribedUsers?.length}
        </p>
        <button onClick={handleDownload} type="button" className="one-vpn__btn" to="/">Download config</button>
        {configLink?.href ? (
          <a href={`${configLink?.href}`} download="config.ovpn"> config</a>
        ) : (null)}
      </div>

    </div>
  );
}

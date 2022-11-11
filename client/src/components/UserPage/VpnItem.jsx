import React from 'react';

export default function VpnItem({ vpn }) {
  return (
    <li className="user-page__vpn-item">
      <div className="user-page__vpn-info">
        <p className="user-page__vpn-country">{vpn?.location}</p>
        <p className="user-page__vpn-score">
          {vpn?.rating}
          ★
        </p>
      </div>
    </li>
  );
}

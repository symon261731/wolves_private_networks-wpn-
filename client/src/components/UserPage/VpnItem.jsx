import React from 'react';
import { Link } from 'react-router-dom';

export default function VpnItem({ vpn }) {
  console.log(vpn);
  return (
    <li className="user-page__vpn-item">

      <Link to={`/server/${vpn.id}`}>
        <p className="user-page__vpn-country">{vpn?.location}</p>
        {' '}
      </Link>

      <p className="user-page__vpn-score">
        {vpn?.rating}
        ★
      </p>
    </li>
  );
}

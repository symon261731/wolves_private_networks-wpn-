import React from 'react';
import { useSelector } from 'react-redux';
import Card from '../Card/Card';
import './MainPage.scss';

export default function List() {
  const servers = useSelector((state) => state.servers);

  return (
    <ul className=" main-page__list">
      {servers.length ? (
        servers?.map((server) => (
          <li className="main-page__item">
            <Card key={server.id} server={server} />
          </li>
        ))

      ) : (
        <div className="card" style={{ width: '36rem' }}>
          No matching results
        </div>
      )}

    </ul>
  );
}

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Card({ server }) {
  const [curServer, setCurServer] = useState(server);

  function likeHandle() {
    setCurServer((prev) => ({ ...prev, rating: prev.rating + 1 }));
  }

  return (

    <div className="card" style={{ width: '36rem' }}>

      <div className="card-body">
        <p>
          Username:
          {' '}
          {curServer?.User?.login || 'ololoshka'}
        </p>
        <p>
          Protocol:
          {' '}
          {curServer?.protocol}
        </p>
        <p>
          Location:
          {' '}
          {curServer?.location}
        </p>
        <p>
          Price:
          {' '}
          {curServer?.price}
        </p>
        <div className="form-label__flex">
          <p>
            Rating:
            {' '}
            {curServer?.rating}
          </p>
          <button className="btn btn-sm" style={{ height: '30px' }} type="button" onClick={likeHandle}>🐺</button>
          {/* когда с бека придет инфо о том был ли лайк будет меняться иконка */}
          <div>☝</div>
        </div>
      </div>
      <Link key={curServer?.id} to={`/server/${curServer?.id}`}>
        <button className="btn btn-info" type="button">Info</button>
      </Link>

      <button className="btn btn-primary" type="button">Subscribe</button>

    </div>
  );
}

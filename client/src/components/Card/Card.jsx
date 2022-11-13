/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './Card.scss';

export default function Card({ server }) {
  const [curServer, setCurServer] = useState(server);
  const { id } = useParams();

  function likeHandle() {
    setCurServer((prev) => ({ ...prev, rating: prev.rating + 1 }));
  }

  return (

    <div className="card">
      <div className="card__body">
        <p className="card__item">
          Username:
          {' '}
          {curServer?.User?.login || 'ololoshka'}
        </p>
        <p className="card__item">
          Protocol:
          {' '}
          {curServer?.protocol}
        </p>
        <p className="card__item">
          IP:
          {' '}
          {curServer?.ip}
        </p>
        <div className="card__flex">
          <p className="card__item">
            Location:
            {' '}
            {curServer?.location}
          </p>
          <p className="card__item card__price">
            Price:
            {' '}
            {curServer?.price}
          </p>
        </div>
        <div className="card__flex">
          <p className="card__item">
            Rating:
            {' '}
            {curServer?.rating}
          </p>
          <button className="btn btn-sm" style={{ height: '30px' }} type="button" onClick={likeHandle}>🐺</button>
        </div>
        {/* когда с бека придет инфо о том был ли лайк будет меняться иконка */}
        {/* <div>☝</div> */}

      </div>
      <div className="card__buttons">
        <Link key={curServer?.id} to={`/server/${curServer?.id}`}>
          {!id
                    && <button className="card__btn-info" type="button">Info</button>}
        </Link>
        <button className="card__btn-sub" type="button">Subscribe</button>
      </div>

    </div>
  );
}

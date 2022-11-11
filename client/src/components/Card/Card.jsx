import React from 'react';

export default function Card({ server }) {
  return (

    <div className="card" style={{ width: '36rem' }}>
      <div className="card-body">
        <p>
          Username:
          {' '}
          {server?.User?.login || 'ololoshka'}
        </p>
        <p>
          Protocol:
          {' '}
          {server?.protocol}
        </p>
        <p>
          Location:
          {' '}
          {server?.location}
        </p>
        <p>
          Price:
          {' '}
          {server?.price}
        </p>
        <p>
          Rating:
          {' '}
          {server?.rating}
          ⭐
        </p>
        <button className="btn btn-primary" type="button">Subscribe</button>
      </div>
    </div>
  );
}

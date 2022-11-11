import React from 'react';

export default function Card({ server }) {
  return (

    <div className="card" style={{ width: '36rem', height: '100px' }}>
      <div className="card-body">
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
        </p>
        <button className="btn btn-primary" type="button">Subscribe</button>
      </div>
    </div>
  );
}

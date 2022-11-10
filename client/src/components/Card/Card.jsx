import React from 'react';

export default function Card() {
  return (

    <div className="card" style={{ width: '18rem' }}>
      <div className="card-body">
        <p>User_owner:</p>
        <p>Protocol:</p>
        <p>Location:</p>
        <p>Price:</p>
        <p>Rating:</p>
        <button className="btn btn-primary" type="button">Subscribe</button>
      </div>
    </div>
  );
}

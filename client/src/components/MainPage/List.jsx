import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../Card/Card';

export default function List() {
  const id = 4;
  return (
    <div>
      <Link to={`/server/${id}`}>
        {' '}
        <Card />
      </Link>
      <Card />
      <Card />
    </div>
  );
}

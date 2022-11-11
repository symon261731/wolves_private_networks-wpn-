import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Card from '../Card/Card';

export default function List() {
  const servers = useSelector((state) => state.servers);

  return (
    <div>
      {servers?.map((server) => (
        <Link key={server?.id} to={`/server/${server?.id}`}>
          <Card server={server} />
        </Link>
      ))}

    </div>
  );
}

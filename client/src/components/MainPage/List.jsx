import React from 'react';
import { useSelector } from 'react-redux';
import Card from '../Card/Card';

export default function List() {
  const servers = useSelector((state) => state.servers);

  return (
    <div>
      {servers.length ? (
        servers?.map((server) => (
          <Card key={server.id} server={server} />
        ))

      ) : (
        <div className="card" style={{ width: '36rem' }}>
          No matching results
        </div>
      )}

    </div>
  );
}

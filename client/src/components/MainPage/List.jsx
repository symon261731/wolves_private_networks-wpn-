import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Card from '../Card/Card';
import usePagination from '../../hooks/usePagination';
import './MainPage.scss';
import Pagination from '../Pagination/Pagination';

export default function List() {
  const servers = useSelector((state) => state.servers);

  const {
    firstContentIndex,
    lastContentIndex,
    nextPage,
    prevPage,
    page,
    gaps,
    setPage,
    totalPages,
  } = usePagination({
    contentPerPage: 4,
    count: servers.length,
  });

  useEffect(() => {
    if (page > totalPages && totalPages !== 0) setPage(1);
  }, [totalPages]);

  return (
    <ul className=" main-page__list">
      {servers.length ? (
        servers
          .slice(firstContentIndex, lastContentIndex)
          .map((server) => (
            <li className="main-page__item">
              <Card key={server.id} server={server} />
            </li>
          ))) : (
            <div className="card" style={{ width: '36rem' }}>
              No matching results
            </div>
      )}
      {servers.length > 0
       && (
       <Pagination array={servers} nextPage={nextPage} prevPage={prevPage} gaps={gaps} page={page} setPage={setPage} totalPages={totalPages} />
       )}
    </ul>

  );
}

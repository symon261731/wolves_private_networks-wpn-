import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Card from '../Card/Card';
import usePagination from '../../hooks/usePagination';

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
    contentPerPage: 5,
    count: servers.length,
  });
  console.log(gaps);

  useEffect(() => {
    // usePagination({ count: servers.length });
  }, []);

  return (
    <>
      <div>
        {
        servers.length ? (servers
          .slice(firstContentIndex, lastContentIndex)
          .map((server) => (<Card key={server.id} server={server} />
          ))) : (
            <div className="card" style={{ width: '36rem' }}>
              No matching results
            </div>
        )

        }

      </div>

      {servers.length > 0
       && (
       <div className="pagination">
         <p className="text">
           {page}
           /
           {totalPages}
         </p>
         <button
           type="button"
           onClick={prevPage}
           className={`page ${page === 1 && 'disabled'}`}
         >
           &larr;
         </button>
         <button
           type="button"
           onClick={() => setPage(1)}
           className={`page ${page === 1 && 'disabled'}`}
         >
           1
         </button>
         {gaps.before ? '...' : null}
         {/* @ts-ignore */}
         {gaps?.paginationGroup?.map((el) => (
           <button
             type="button"
             onClick={() => setPage(el)}
             key={el}
             className={`page ${page === el ? 'active' : ''}`}
           >
             {el}
           </button>
         ))}
         {gaps.after ? '...' : null}
         {
          servers.length > 1
            && (
            <button
              type="button"
              onClick={() => setPage(totalPages)}
              className={`page ${page === totalPages && 'disabled'}`}
            >
              {totalPages}
            </button>
            )
         }

         <button
           type="button"
           onClick={nextPage}
           className={`page ${page === totalPages && 'disabled'}`}
         >
           &rarr;
         </button>
       </div>
       )}

    </>
  );
}

import React from 'react';

export default function Pagination({
  array, nextPage, prevPage, gaps, page, setPage, totalPages,
}) {
  return (
    <div className="pagination">
      <p className="text">

        { page }
        /
        {' '}
        { totalPages }

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
     array.length > 1 && totalPages > 1
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

  );
}

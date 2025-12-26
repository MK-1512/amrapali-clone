import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pagesToShow = [];
  const maxPagesToShow = 5;

  if (totalPages <= maxPagesToShow + 2) {
    for (let i = 1; i <= totalPages; i++) {
      pagesToShow.push(i);
    }
  } else {
    pagesToShow.push(1);

    let start = Math.max(2, currentPage - Math.floor((maxPagesToShow - 2) / 2));
    let end = Math.min(totalPages - 1, currentPage + Math.ceil((maxPagesToShow - 2) / 2));

    const pagesInRange = end - start + 1;
    if (pagesInRange < maxPagesToShow - 2) {
        if (currentPage < totalPages / 2) {
             end = Math.min(totalPages - 1, start + (maxPagesToShow - 3));
        } else {
             start = Math.max(2, end - (maxPagesToShow - 3));
        }
    }


    if (start > 2) {
      pagesToShow.push('...');
    }

    for (let i = start; i <= end; i++) {
      pagesToShow.push(i);
    }

    if (end < totalPages - 1) {
      pagesToShow.push('...');
    }

    if (end < totalPages) {
       pagesToShow.push(totalPages);
    }
  }


  return (
    <nav className="custom-pagination-container">
      <ul className="custom-pagination">
         <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
           <button className="page-link arrow" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
             &lt;
           </button>
         </li>

         {pagesToShow.map((page, index) => (
           <li key={index} className={`page-item ${page === currentPage ? 'active' : ''} ${page === '...' ? 'ellipsis' : ''}`}>
             {page === '...' ? (
                <span className="page-link ellipsis-span">...</span>
             ) : (
                <button
                    className="page-link number"
                    onClick={() => onPageChange(page)}
                    disabled={page === currentPage}
                >
                    {page}
                </button>
             )}
           </li>
         ))}

         <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
           <button className="page-link arrow" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
             &gt;
           </button>
         </li>
      </ul>
      <div className="pagination-line-container">
        <div className="pagination-line"></div>
        {totalPages > 0 && (
            <div
                className="pagination-underline"
                style={{
                    width: `${100 / totalPages}%`,
                    left: `${(currentPage - 1) * (100 / totalPages)}%`
                }}
            ></div>
        )}
      </div>
    </nav>
  );
};

export default Pagination;
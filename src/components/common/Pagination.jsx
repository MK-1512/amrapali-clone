// src/components/common/Pagination.jsx
import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Determine which page numbers to show
  const pagesToShow = [];
  const maxPagesToShow = 5; // Max number buttons (excluding arrows, first/last if needed)

  if (totalPages <= maxPagesToShow + 2) {
    // Show all pages if total is small
    for (let i = 1; i <= totalPages; i++) {
      pagesToShow.push(i);
    }
  } else {
    // Show first page
    pagesToShow.push(1);

    // Calculate start and end for middle range
    let start = Math.max(2, currentPage - Math.floor((maxPagesToShow - 2) / 2));
    let end = Math.min(totalPages - 1, currentPage + Math.ceil((maxPagesToShow - 2) / 2));

    // Adjust if range is too small near the beginning or end
    const pagesInRange = end - start + 1;
    if (pagesInRange < maxPagesToShow - 2) {
        if (currentPage < totalPages / 2) {
             end = Math.min(totalPages - 1, start + (maxPagesToShow - 3));
        } else {
             start = Math.max(2, end - (maxPagesToShow - 3));
        }
    }


    // Add ellipsis if needed after first page
    if (start > 2) {
      pagesToShow.push('...');
    }

    // Add middle range
    for (let i = start; i <= end; i++) {
      pagesToShow.push(i);
    }

    // Add ellipsis if needed before last page
    if (end < totalPages - 1) {
      pagesToShow.push('...');
    }

    // Show last page only if it's not already included in the end range
    if (end < totalPages) {
       pagesToShow.push(totalPages);
    }
  }


  return (
    // Use a simpler nav structure
    <nav className="custom-pagination-container">
      <ul className="custom-pagination">
         {/* Previous Button */}
         <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
           <button className="page-link arrow" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
             &lt; {/* Use HTML entity for arrow */}
           </button>
         </li>

         {/* Page Numbers */}
         {pagesToShow.map((page, index) => (
           <li key={index} className={`page-item ${page === currentPage ? 'active' : ''} ${page === '...' ? 'ellipsis' : ''}`}>
             {page === '...' ? (
                <span className="page-link ellipsis-span">...</span>
             ) : (
                <button
                    className="page-link number"
                    onClick={() => onPageChange(page)}
                    // Disable button if it represents the current page
                    disabled={page === currentPage}
                >
                    {page}
                </button>
             )}
           </li>
         ))}

         {/* Next Button */}
         <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
           <button className="page-link arrow" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
             &gt; {/* Use HTML entity for arrow */}
           </button>
         </li>
      </ul>
      {/* Container for the decorative line */}
      <div className="pagination-line-container">
        <div className="pagination-line"></div>
        {/* Underline - Conditionally render only if there are pages */}
        {totalPages > 0 && (
            <div
                className="pagination-underline"
                style={{
                    // Calculate width and left position
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
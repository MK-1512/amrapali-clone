// src/pages/BestsellersPage.jsx

import React, { useState, useMemo } from 'react';
import { bestsellerProducts } from '../data/bestsellerProducts'; // Ensure correct path
import ProductCard from '../components/product/ProductCard';
import Pagination from '../components/common/Pagination'; // Import Pagination if used
import FilterBar from '../components/filters/FilterBar';
import FilterDrawer from '../components/filters/FilterDrawer'; // Import FilterDrawer if used

const BestsellersPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 16; // 4x4 grid as per original code

    // State for Filter Drawer (if you use it on this page)
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const handleOpenFilter = () => setIsFilterOpen(true);
    const handleCloseFilter = () => setIsFilterOpen(false);


    const totalPages = Math.ceil(bestsellerProducts.length / productsPerPage);

    const currentProducts = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * productsPerPage;
        const lastPageIndex = firstPageIndex + productsPerPage;
        return bestsellerProducts.slice(firstPageIndex, lastPageIndex);
    }, [currentPage]);

    // Handle page changes for Pagination component
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo(0, 0); // Scroll to top on page change
    };

    return (
        <>
            {/* FIX: Use the standard collection banner structure */}
            <div className="collection-hero-banner bestsellers-hero-banner">
              <div className="hero-overlay"></div> {/* Optional overlay */}
              <div className="hero-content">
                  <h1 className="hero-title" style={{ color: '#ffffff', fontSize: '2.8rem' /* Adjusted from original BestsellersHero */ }}>
                      MOST LOVED
                  </h1>
                  <p className="hero-subtitle" style={{ color: '#ffffff', maxWidth: '550px', margin: '1rem auto 0' /* Adjusted from original */ }}>
                      While all our six yards are equally precious and treasured by us, we would like to present you few top-listed pieces that have received the most amount of love in the past. Grab them before they're gone.
                  </p>
              </div>
            </div>

            {/* Pass handleOpenFilter to FilterBar */}
            <FilterBar handleOpenFilter={handleOpenFilter} />

            <div className="container my-5 product-list-container"> {/* Added product-list-container */}
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-3"> {/* Adjusted grid classes and gap */}
                    {currentProducts.map((product) => (
                        <div className="col" key={product.id}>
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>

                {/* Use the common Pagination component */}
                {totalPages > 1 && (
                     <Pagination
                         currentPage={currentPage}
                         totalPages={totalPages}
                         onPageChange={handlePageChange} // Use the correct handler
                     />
                 )}
            </div>

             {/* Include FilterDrawer if filters are used on this page */}
             <FilterDrawer show={isFilterOpen} handleClose={handleCloseFilter} />
        </>
    );
};

export default BestsellersPage;
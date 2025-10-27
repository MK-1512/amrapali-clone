// src/pages/BestsellersPage.jsx

import React, { useState, useMemo } from 'react';
// Correct import: Import the data, not the component itself recursively
import { bestsellerProducts } from '../data/bestsellerProducts';
import ProductCard from '../components/product/ProductCard';
import Pagination from '../components/common/Pagination';
import FilterBar from '../components/filters/FilterBar';
import FilterDrawer from '../components/filters/FilterDrawer';


// *** MODIFIED: Accept filter state props from App.jsx ***
const BestsellersPage = ({ setPage, onApplyFilters, isFilterOpen, handleOpenFilter, handleCloseFilter }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 16;

    // --- REMOVED Local State ---
    // const [isFilterOpen, setIsFilterOpen] = useState(false);
    // const handleOpenFilter = () => setIsFilterOpen(true);
    // const handleCloseFilter = () => setIsFilterOpen(false);

    const totalPages = Math.ceil(bestsellerProducts.length / productsPerPage);

    const currentProducts = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * productsPerPage;
        const lastPageIndex = firstPageIndex + productsPerPage;
        return bestsellerProducts.slice(firstPageIndex, lastPageIndex);
    }, [currentPage]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo(0, 0);
    };

    return (
        <>
            <div className="collection-hero-banner bestsellers-hero-banner">
              <div className="hero-overlay"></div>
              <div className="hero-content">
                  <h1 className="hero-title" style={{ color: '#ffffff', fontSize: '2.8rem' }}>
                      MOST LOVED
                  </h1>
                  <p className="hero-subtitle" style={{ color: '#ffffff', maxWidth: '550px', margin: '1rem auto 0' }}>
                      While all our six yards are equally precious and treasured by us, we would like to present you few top-listed pieces that have received the most amount of love in the past. Grab them before they're gone.
                  </p>
              </div>
            </div>

            {/* *** MODIFIED: Pass prop handler from App.jsx *** */}
            <FilterBar handleOpenFilter={handleOpenFilter} />

            <div className="container my-5 product-list-container">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-3">
                    {currentProducts.map((product) => (
                        <div className="col" key={product.id}>
                            {/* Pass setPage prop down */}
                            <ProductCard product={product} setPage={setPage} />
                        </div>
                    ))}
                </div>

                {totalPages > 1 && (
                     <Pagination
                         currentPage={currentPage}
                         totalPages={totalPages}
                         onPageChange={handlePageChange}
                     />
                 )}
            </div>

             {/* *** MODIFIED: Pass props from App.jsx *** */}
             <FilterDrawer
                show={isFilterOpen}
                handleClose={handleCloseFilter}
                onApplyFilters={onApplyFilters}
             />
        </>
    );
};

export default BestsellersPage;
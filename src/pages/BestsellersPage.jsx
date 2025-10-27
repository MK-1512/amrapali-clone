// src/pages/BestsellersPage.jsx

import React from 'react'; // Removed useState and useMemo
import { bestsellerProducts } from '../data/bestsellerProducts';
import ProductList from '../components/product/ProductList'; // Import ProductList
// import ProductCard from '../components/product/ProductCard'; // No longer needed if using ProductList
// import Pagination from '../components/common/Pagination'; // No longer needed if using ProductList
import FilterBar from '../components/filters/FilterBar';
import FilterDrawer from '../components/filters/FilterDrawer';


// *** MODIFIED: Accept all filter/sort props ***
const BestsellersPage = ({ setPage, onApplyFilters, isFilterOpen, handleOpenFilter, handleCloseFilter, appliedFilters, sortOrder, onSortChange }) => {
    
    // --- REMOVED Local State for pagination ---
    // const [currentPage, setCurrentPage] = useState(1);
    // const productsPerPage = 16;
    // ... etc ...

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

            {/* *** MODIFIED: Pass sort props to FilterBar *** */}
            <FilterBar
              handleOpenFilter={handleOpenFilter}
              sortOrder={sortOrder}
              onSortChange={onSortChange}
            />

            {/* *** MODIFIED: Use ProductList and pass all props *** */}
            <ProductList
                products={bestsellerProducts} // Pass bestseller data
                collectionName="Bestsellers"
                setPage={setPage}
                appliedFilters={appliedFilters} // <-- Pass down
                sortOrder={sortOrder} // <-- Pass down
            />
            
            {/* --- REMOVED direct rendering/pagination --- */}

             <FilterDrawer
                show={isFilterOpen}
                handleClose={handleCloseFilter}
                onApplyFilters={onApplyFilters}
             />
        </>
    );
};

export default BestsellersPage;
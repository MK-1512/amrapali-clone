// src/pages/SareesPage.jsx

import React from 'react'; // Removed useState
import ProductList from '../components/product/ProductList';
import FilterBar from '../components/filters/FilterBar';
import FilterDrawer from '../components/filters/FilterDrawer';
import SareesHeroBanner from '../components/common/SareesHeroBanner';

// *** MODIFIED: Accept all filter/sort props ***
const SareesPage = ({ setPage, onApplyFilters, isFilterOpen, handleOpenFilter, handleCloseFilter, appliedFilters, sortOrder, onSortChange }) => {

    return (
        <>
            <SareesHeroBanner />
            {/* *** MODIFIED: Pass sort props to FilterBar *** */}
            <FilterBar
              handleOpenFilter={handleOpenFilter}
              sortOrder={sortOrder}
              onSortChange={onSortChange}
            />
            <div className="container my-5">
                <div className="row">
                    <div className="col-12">
                        {/* *** MODIFIED: Pass appliedFilters and sortOrder to ProductList *** */}
                        <ProductList
                            collectionName="sarees"
                            setPage={setPage}
                            appliedFilters={appliedFilters} // <-- Pass down
                            sortOrder={sortOrder} // <-- Pass down
                        />
                    </div>
                </div>
            </div>
            <FilterDrawer
                show={isFilterOpen}
                handleClose={handleCloseFilter}
                onApplyFilters={onApplyFilters}
            />
        </>
    );
};

export default SareesPage;
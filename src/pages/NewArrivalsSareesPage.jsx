// src/pages/NewArrivalsSareesPage.jsx
import React from 'react'; // Removed useState
import ProductList from '../components/product/ProductList';
import FilterBar from '../components/filters/FilterBar';
import FilterDrawer from '../components/filters/FilterDrawer';
import NewArrivalsSareesHeroBanner from '../components/common/NewArrivalsSareesHeroBanner';
// import { products as sareeProducts } from '../data/products'; // Not needed if ProductList defaults

// *** MODIFIED: Accept all filter/sort props ***
const NewArrivalsSareesPage = ({ setPage, onApplyFilters, isFilterOpen, handleOpenFilter, handleCloseFilter, appliedFilters, sortOrder, onSortChange }) => {

    return (
        <>
            <NewArrivalsSareesHeroBanner />
            {/* *** MODIFIED: Pass sort props to FilterBar *** */}
            <FilterBar
              handleOpenFilter={handleOpenFilter}
              sortOrder={sortOrder}
              onSortChange={onSortChange}
            />
            {/* *** MODIFIED: Pass appliedFilters and sortOrder to ProductList *** */}
            <ProductList
              collectionName="Sarees"
              setPage={setPage}
              appliedFilters={appliedFilters} // <-- Pass down
              sortOrder={sortOrder} // <-- Pass down
            />
            <FilterDrawer
              show={isFilterOpen}
              handleClose={handleCloseFilter}
              onApplyFilters={onApplyFilters}
            />
        </>
    );
};

export default NewArrivalsSareesPage;
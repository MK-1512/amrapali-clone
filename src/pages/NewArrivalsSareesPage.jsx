// src/pages/NewArrivalsSareesPage.jsx
import React from 'react'; // Removed useState
import ProductList from '../components/product/ProductList';
import FilterBar from '../components/filters/FilterBar';
import FilterDrawer from '../components/filters/FilterDrawer';
import NewArrivalsSareesHeroBanner from '../components/common/NewArrivalsSareesHeroBanner';
// Assuming ProductList handles fetching default sarees if no 'products' prop is given
// Or import { products as sareeProducts } from '../data/products'; if needed

// *** MODIFIED: Accept appliedFilters prop ***
const NewArrivalsSareesPage = ({ setPage, onApplyFilters, isFilterOpen, handleOpenFilter, handleCloseFilter, appliedFilters }) => {

    return (
        <>
            <NewArrivalsSareesHeroBanner />
            <FilterBar handleOpenFilter={handleOpenFilter} />
            {/* *** MODIFIED: Pass appliedFilters down *** */}
            <ProductList
              collectionName="Sarees" // Or pass specific new arrival saree data if available
              setPage={setPage}
              appliedFilters={appliedFilters} // <-- Pass down
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
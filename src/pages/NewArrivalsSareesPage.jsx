// src/pages/NewArrivalsSareesPage.jsx
import React, { useState } from 'react'; // useState is no longer needed if not used elsewhere
import ProductList from '../components/product/ProductList';
import FilterBar from '../components/filters/FilterBar';
import FilterDrawer from '../components/filters/FilterDrawer';
import NewArrivalsSareesHeroBanner from '../components/common/NewArrivalsSareesHeroBanner';
import { products as sareeProducts } from '../data/products'; // Import saree data

// *** MODIFIED: Accept filter state props from App.jsx ***
const NewArrivalsSareesPage = ({ setPage, onApplyFilters, isFilterOpen, handleOpenFilter, handleCloseFilter }) => {

    // --- REMOVED Local State ---
    // const [isFilterOpen, setIsFilterOpen] = useState(false);
    // const handleOpenFilter = () => setIsFilterOpen(true);
    // const handleCloseFilter = () => setIsFilterOpen(false);

    return (
        <>
            <NewArrivalsSareesHeroBanner />
            {/* *** MODIFIED: Pass prop handler from App.jsx *** */}
            <FilterBar handleOpenFilter={handleOpenFilter} />
            {/* Pass setPage down to ProductList */}
            <ProductList collectionName="Sarees" setPage={setPage} /> {/* Assuming 'Sarees' uses default product list */}
            {/* *** MODIFIED: Pass props from App.jsx *** */}
            <FilterDrawer
              show={isFilterOpen}
              handleClose={handleCloseFilter}
              onApplyFilters={onApplyFilters}
            />
        </>
    );
};

export default NewArrivalsSareesPage;
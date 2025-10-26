// src/pages/SareesPage.jsx

import React, { useState } from 'react';
import ProductList from '../components/product/ProductList';
import FilterBar from '../components/filters/FilterBar';
import FilterDrawer from '../components/filters/FilterDrawer';
import SareesHeroBanner from '../components/common/SareesHeroBanner';

// --- FIX: Accept setPage prop ---
const SareesPage = ({ setPage }) => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const handleOpenFilter = () => setIsFilterOpen(true);
    const handleCloseFilter = () => setIsFilterOpen(false);

    return (
        <>
            <SareesHeroBanner />
            <FilterBar handleOpenFilter={handleOpenFilter} />
            <div className="container my-5">
                <div className="row">
                    <div className="col-12">
                        {/* --- FIX: Pass setPage down to ProductList --- */}
                        <ProductList collectionName="sarees" setPage={setPage} />
                    </div>
                </div>
            </div>
            <FilterDrawer show={isFilterOpen} handleClose={handleCloseFilter} />
        </>
    );
};

export default SareesPage;
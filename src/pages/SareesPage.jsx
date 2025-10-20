// src/pages/SareesPage.jsx

import React, { useState } from 'react';
import ProductList from '../components/product/ProductList';
import FilterBar from '../components/filters/FilterBar';
import FilterDrawer from '../components/filters/FilterDrawer';
import SareesHeroBanner from '../components/common/SareesHeroBanner';

const SareesPage = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const handleOpenFilter = () => setIsFilterOpen(true);
    const handleCloseFilter = () => setIsFilterOpen(false);

    return (
        <>
            {/* The wrapper div is GONE. This allows 'position: sticky' to work. */}
            
            <SareesHeroBanner />

            <FilterBar handleOpenFilter={handleOpenFilter} />
            
            <div className="container my-5">
                <div className="row">
                    <div className="col-12">
                        <ProductList collectionName="sarees" />
                    </div>
                </div>
            </div>

            <FilterDrawer show={isFilterOpen} handleClose={handleCloseFilter} />
        </>
    );
};

export default SareesPage;
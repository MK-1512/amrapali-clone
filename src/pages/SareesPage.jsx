// src/pages/SareesPage.jsx

import React, { useState } from 'react'; // useState is no longer needed if not used elsewhere
import ProductList from '../components/product/ProductList';
import FilterBar from '../components/filters/FilterBar';
import FilterDrawer from '../components/filters/FilterDrawer';
import SareesHeroBanner from '../components/common/SareesHeroBanner';

// *** MODIFIED: Accept filter state props from App.jsx ***
const SareesPage = ({ setPage, onApplyFilters, isFilterOpen, handleOpenFilter, handleCloseFilter }) => {
    
    // --- REMOVED Local State ---
    // const [isFilterOpen, setIsFilterOpen] = useState(false);
    // const handleOpenFilter = () => setIsFilterOpen(true);
    // const handleCloseFilter = () => setIsFilterOpen(false);

    return (
        <>
            <SareesHeroBanner />
            {/* *** MODIFIED: Pass prop handler from App.jsx *** */}
            <FilterBar handleOpenFilter={handleOpenFilter} />
            <div className="container my-5">
                <div className="row">
                    <div className="col-12">
                        {/* --- Pass setPage down to ProductList --- */}
                        <ProductList collectionName="sarees" setPage={setPage} />
                    </div>
                </div>
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

export default SareesPage;
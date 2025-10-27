// src/pages/JewelleryPage.jsx

import React, { useState } from 'react'; // useState is no longer needed if not used elsewhere
import ProductList from '../components/product/ProductList';
import FilterBar from '../components/filters/FilterBar';
import FilterDrawer from '../components/filters/FilterDrawer';
import JewelleryHeroBanner from '../components/common/JewelleryHeroBanner';
import { jewellery } from '../data/jewellery'; // Import the jewellery data

// *** MODIFIED: Accept filter state props from App.jsx ***
const JewelleryPage = ({ setPage, onApplyFilters, isFilterOpen, handleOpenFilter, handleCloseFilter }) => {

  // --- REMOVED Local State ---
  // const [isFilterOpen, setIsFilterOpen] = useState(false);
  // const handleOpenFilter = () => setIsFilterOpen(true);
  // const handleCloseFilter = () => setIsFilterOpen(false);

  return (
    <>
      <JewelleryHeroBanner />
      {/* *** MODIFIED: Pass prop handler from App.jsx *** */}
      <FilterBar handleOpenFilter={handleOpenFilter} />
      {/* Pass setPage down to ProductList */}
      <ProductList products={jewellery} collectionName="jewellery" setPage={setPage} />
      {/* *** MODIFIED: Pass props from App.jsx *** */}
      <FilterDrawer
        show={isFilterOpen}
        handleClose={handleCloseFilter}
        onApplyFilters={onApplyFilters}
      />
    </>
  );
};

export default JewelleryPage;
// src/pages/jewellery/RingsPage.jsx
import React, { useState } from 'react'; // useState is no longer needed if not used elsewhere
import ProductList from '../../components/product/ProductList';
import FilterBar from '../../components/filters/FilterBar';
import FilterDrawer from '../../components/filters/FilterDrawer';
import RingsHeroBanner from '../../components/common/RingsHeroBanner';
import { jewellery } from '../../data/jewellery';

// ... (keep existing filter logic for rings) ...
const rings = jewellery.filter(item => {
    const nameLower = typeof item.name === 'string' ? item.name.toLowerCase() : '';
    // Filter specifically for items named 'ring' or known ring names
    return nameLower.includes('ring') ||
           nameLower === 'checkmate ring' || // Example explicit names if needed
           nameLower === 'shield me ring';
});


// *** MODIFIED: Accept filter state props from App.jsx ***
const RingsPage = ({ setPage, onApplyFilters, isFilterOpen, handleOpenFilter, handleCloseFilter }) => {

  // --- REMOVED Local State ---
  // const [isFilterOpen, setIsFilterOpen] = useState(false);
  // const handleOpenFilter = () => setIsFilterOpen(true);
  // const handleCloseFilter = () => setIsFilterOpen(false);

  return (
    <>
      <RingsHeroBanner />
      {/* *** MODIFIED: Pass prop handler from App.jsx *** */}
      <FilterBar handleOpenFilter={handleOpenFilter} />
      {/* Pass setPage down to ProductList */}
      <ProductList products={rings} collectionName="rings" setPage={setPage} />
      {/* *** MODIFIED: Pass props from App.jsx *** */}
      <FilterDrawer
        show={isFilterOpen}
        handleClose={handleCloseFilter}
        onApplyFilters={onApplyFilters}
      />
    </>
  );
};

export default RingsPage;
// src/pages/jewellery/EarringsPage.jsx
import React, { useState } from 'react'; // useState is no longer needed if not used elsewhere
import ProductList from '../../components/product/ProductList';
import FilterBar from '../../components/filters/FilterBar';
import FilterDrawer from '../../components/filters/FilterDrawer';
import EarringsHeroBanner from '../../components/common/EarringsHeroBanner';
import { jewellery } from '../../data/jewellery';

// ... (keep existing filter logic for earrings) ...
const earrings = jewellery.filter(item => {
    const nameLower = typeof item.name === 'string' ? item.name.toLowerCase() : '';
    return nameLower.includes('earring') ||
           nameLower.includes('hoop') ||
           nameLower.includes('stud') ||
           nameLower === 'sacred heart' ||
           nameLower === 'hoopla' ||
           nameLower === 'peacock' ||
           nameLower === 'twisted triangle' ||
           nameLower === 'hook me up' ||
           nameLower === 'fan-tastic' ||
           nameLower === 'eclipse' ||
           nameLower === 'a pearly dream' ||
           nameLower === 'moon-o-poly' ||
           nameLower === 'folded moon' ||
           nameLower === 'daydreamer' ||
           nameLower === 'boss babe ring'; // Note: This might be incorrect if 'boss babe ring' is only a ring
});


// *** MODIFIED: Accept filter state props from App.jsx ***
const EarringsPage = ({ setPage, onApplyFilters, isFilterOpen, handleOpenFilter, handleCloseFilter }) => {

  // --- REMOVED Local State ---
  // const [isFilterOpen, setIsFilterOpen] = useState(false);
  // const handleOpenFilter = () => setIsFilterOpen(true);
  // const handleCloseFilter = () => setIsFilterOpen(false);

  return (
    <>
      <EarringsHeroBanner />
      {/* *** MODIFIED: Pass prop handler from App.jsx *** */}
      <FilterBar handleOpenFilter={handleOpenFilter} />
      {/* Pass setPage down to ProductList */}
      <ProductList products={earrings} collectionName="earrings" setPage={setPage} />
      {/* *** MODIFIED: Pass props from App.jsx *** */}
      <FilterDrawer
        show={isFilterOpen}
        handleClose={handleCloseFilter}
        onApplyFilters={onApplyFilters}
      />
    </>
  );
};

export default EarringsPage;
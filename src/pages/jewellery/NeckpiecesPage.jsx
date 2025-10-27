// src/pages/jewellery/NeckpiecesPage.jsx
import React, { useState } from 'react'; // useState is no longer needed if not used elsewhere
import ProductList from '../../components/product/ProductList';
import FilterBar from '../../components/filters/FilterBar';
import FilterDrawer from '../../components/filters/FilterDrawer';
import NeckpiecesHeroBanner from '../../components/common/NeckpiecesHeroBanner';
import { jewellery } from '../../data/jewellery';

// ... (keep existing filter logic for neckpieces) ...
const neckpieces = jewellery.filter(item => {
    const nameLower = typeof item.name === 'string' ? item.name.toLowerCase() : '';
    return nameLower.includes('necklace') ||
           nameLower.includes('hasli') ||
           nameLower.includes('choker') ||
           nameLower.includes('chain') ||
           nameLower === 'little sea horse' ||
           nameLower === 'tropical palm' ||
           nameLower === 'crescent horn';
});

// *** MODIFIED: Accept filter state props from App.jsx ***
const NeckpiecesPage = ({ setPage, onApplyFilters, isFilterOpen, handleOpenFilter, handleCloseFilter }) => {

  // --- REMOVED Local State ---
  // const [isFilterOpen, setIsFilterOpen] = useState(false);
  // const handleOpenFilter = () => setIsFilterOpen(true);
  // const handleCloseFilter = () => setIsFilterOpen(false);

  return (
    <>
      <NeckpiecesHeroBanner />
      {/* *** MODIFIED: Pass prop handler from App.jsx *** */}
      <FilterBar handleOpenFilter={handleOpenFilter} />
      {/* Pass setPage down to ProductList */}
      <ProductList products={neckpieces} collectionName="neckpieces" setPage={setPage} />
      {/* *** MODIFIED: Pass props from App.jsx *** */}
      <FilterDrawer
        show={isFilterOpen}
        handleClose={handleCloseFilter}
        onApplyFilters={onApplyFilters}
      />
    </>
  );
};

export default NeckpiecesPage;
// src/pages/jewellery/BanglesCuffsPage.jsx
import React, { useState } from 'react'; // useState is no longer needed if not used elsewhere
import ProductList from '../../components/product/ProductList';
import FilterBar from '../../components/filters/FilterBar';
import FilterDrawer from '../../components/filters/FilterDrawer';
import BanglesCuffsHeroBanner from '../../components/common/BanglesCuffsHeroBanner';
import { jewellery } from '../../data/jewellery';

// ... (keep existing filter logic for banglesCuffs) ...
const banglesCuffs = jewellery.filter(item => {
    const nameLower = typeof item.name === 'string' ? item.name.toLowerCase() : '';
    return nameLower.includes('cuff') || // Include 'cuff'
           nameLower.includes('bangle') || // Include 'bangle'
           nameLower.includes('bracelet'); // Include 'bracelet' based on items like Soulmate
});

// *** MODIFIED: Accept filter state props from App.jsx ***
const BanglesCuffsPage = ({ setPage, onApplyFilters, isFilterOpen, handleOpenFilter, handleCloseFilter }) => {

  // --- REMOVED Local State ---
  // const [isFilterOpen, setIsFilterOpen] = useState(false);
  // const handleOpenFilter = () => setIsFilterOpen(true);
  // const handleCloseFilter = () => setIsFilterOpen(false);

  return (
    <>
      <BanglesCuffsHeroBanner />
      {/* *** MODIFIED: Pass prop handler from App.jsx *** */}
      <FilterBar handleOpenFilter={handleOpenFilter} />
      {/* Pass setPage down to ProductList */}
      <ProductList products={banglesCuffs} collectionName="bangles-cuffs" setPage={setPage} />
      {/* *** MODIFIED: Pass props from App.jsx *** */}
      <FilterDrawer
        show={isFilterOpen}
        handleClose={handleCloseFilter}
        onApplyFilters={onApplyFilters}
      />
    </>
  );
};

export default BanglesCuffsPage;
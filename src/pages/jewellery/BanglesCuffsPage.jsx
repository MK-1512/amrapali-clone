// src/pages/jewellery/BanglesCuffsPage.jsx
import React, { useState } from 'react';
import ProductList from '../../components/product/ProductList';
import FilterBar from '../../components/filters/FilterBar';
import FilterDrawer from '../../components/filters/FilterDrawer';
import BanglesCuffsHeroBanner from '../../components/common/BanglesCuffsHeroBanner';
import { jewellery } from '../../data/jewellery';

// ... (filter logic for banglesCuffs remains the same)
const banglesCuffs = jewellery.filter(item => {
    const nameLower = typeof item.name === 'string' ? item.name.toLowerCase() : '';
    return nameLower === 'drama queen cuff' ||
           nameLower === 'the bold type' ||
           nameLower === 'soulmate bracelet' ||
           nameLower === 'classic bangles';
});

// --- FIX: Accept setPage prop ---
const BanglesCuffsPage = ({ setPage }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const handleOpenFilter = () => setIsFilterOpen(true);
  const handleCloseFilter = () => setIsFilterOpen(false);

  return (
    <>
      <BanglesCuffsHeroBanner />
      <FilterBar handleOpenFilter={handleOpenFilter} />
      {/* --- FIX: Pass setPage down to ProductList --- */}
      <ProductList products={banglesCuffs} collectionName="bangles-cuffs" setPage={setPage} />
      <FilterDrawer show={isFilterOpen} handleClose={handleCloseFilter} />
    </>
  );
};

export default BanglesCuffsPage;
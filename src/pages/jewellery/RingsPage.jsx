// src/pages/jewellery/RingsPage.jsx
import React, { useState } from 'react';
import ProductList from '../../components/product/ProductList';
import FilterBar from '../../components/filters/FilterBar';
import FilterDrawer from '../../components/filters/FilterDrawer';
import RingsHeroBanner from '../../components/common/RingsHeroBanner';
import { jewellery } from '../../data/jewellery';

// ... (filter logic for rings remains the same)
const rings = jewellery.filter(item => {
    const nameLower = typeof item.name === 'string' ? item.name.toLowerCase() : '';
    return nameLower === 'capsule ring' ||
           nameLower === 'wow ring' ||
           nameLower === 'checkmate ring' ||
           nameLower === 'shield me ring' ||
           nameLower.includes('chakra adjustable');
});

// --- FIX: Accept setPage prop ---
const RingsPage = ({ setPage }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const handleOpenFilter = () => setIsFilterOpen(true);
  const handleCloseFilter = () => setIsFilterOpen(false);

  return (
    <>
      <RingsHeroBanner />
      <FilterBar handleOpenFilter={handleOpenFilter} />
      {/* --- FIX: Pass setPage down to ProductList --- */}
      <ProductList products={rings} collectionName="rings" setPage={setPage} />
      <FilterDrawer show={isFilterOpen} handleClose={handleCloseFilter} />
    </>
  );
};

export default RingsPage;
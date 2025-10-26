// src/pages/jewellery/EarringsPage.jsx
import React, { useState } from 'react';
import ProductList from '../../components/product/ProductList';
import FilterBar from '../../components/filters/FilterBar';
import FilterDrawer from '../../components/filters/FilterDrawer';
import EarringsHeroBanner from '../../components/common/EarringsHeroBanner';
import { jewellery } from '../../data/jewellery';

// ... (filter logic for earrings remains the same)
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
           nameLower === 'boss babe ring';
});

// --- FIX: Accept setPage prop ---
const EarringsPage = ({ setPage }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const handleOpenFilter = () => setIsFilterOpen(true);
  const handleCloseFilter = () => setIsFilterOpen(false);

  return (
    <>
      <EarringsHeroBanner />
      <FilterBar handleOpenFilter={handleOpenFilter} />
      {/* --- FIX: Pass setPage down to ProductList --- */}
      <ProductList products={earrings} collectionName="earrings" setPage={setPage} />
      <FilterDrawer show={isFilterOpen} handleClose={handleCloseFilter} />
    </>
  );
};

export default EarringsPage;
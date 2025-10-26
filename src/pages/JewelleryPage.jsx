// src/pages/JewelleryPage.jsx

import React, { useState } from 'react';
import ProductList from '../components/product/ProductList';
import FilterBar from '../components/filters/FilterBar';
import FilterDrawer from '../components/filters/FilterDrawer';
import JewelleryHeroBanner from '../components/common/JewelleryHeroBanner';
import { jewellery } from '../data/jewellery'; // Import the jewellery data

// --- FIX: Accept setPage prop ---
const JewelleryPage = ({ setPage }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleOpenFilter = () => setIsFilterOpen(true);
  const handleCloseFilter = () => setIsFilterOpen(false);

  return (
    <>
      <JewelleryHeroBanner />
      <FilterBar handleOpenFilter={handleOpenFilter} />
      {/* --- FIX: Pass setPage down to ProductList --- */}
      <ProductList products={jewellery} collectionName="jewellery" setPage={setPage} />
      <FilterDrawer show={isFilterOpen} handleClose={handleCloseFilter} />
    </>
  );
};

export default JewelleryPage;
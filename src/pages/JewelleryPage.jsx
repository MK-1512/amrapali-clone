// src/pages/JewelleryPage.jsx

import React, { useState } from 'react';
import ProductList from '../components/product/ProductList';
import FilterBar from '../components/filters/FilterBar';
import FilterDrawer from '../components/filters/FilterDrawer';
import JewelleryHeroBanner from '../components/common/JewelleryHeroBanner';

const JewelleryPage = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleOpenFilter = () => setIsFilterOpen(true);
  const handleCloseFilter = () => setIsFilterOpen(false);

  return (
    <>
      {/* The wrapper div is GONE. */}
      
      <JewelleryHeroBanner />

      <FilterBar handleOpenFilter={handleOpenFilter} />

      <ProductList collectionName="jewellery" />
      
      <FilterDrawer show={isFilterOpen} handleClose={handleCloseFilter} />
    </>
  );
};

export default JewelleryPage;
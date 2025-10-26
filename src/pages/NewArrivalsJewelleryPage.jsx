// src/pages/NewArrivalsJewelleryPage.jsx
import React, { useState } from 'react';
import ProductList from '../components/product/ProductList';
import FilterBar from '../components/filters/FilterBar';
import FilterDrawer from '../components/filters/FilterDrawer';
import NewArrivalsJewelleryHeroBanner from '../components/common/NewArrivalsJewelleryHeroBanner';
import { jewellery } from '../data/jewellery'; // Import the jewellery data

// --- FIX: Accept setPage prop ---
const NewArrivalsJewelleryPage = ({ setPage }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const handleOpenFilter = () => setIsFilterOpen(true);
  const handleCloseFilter = () => setIsFilterOpen(false);

  return (
    <>
      <NewArrivalsJewelleryHeroBanner />
      <FilterBar handleOpenFilter={handleOpenFilter} />
      {/* --- FIX: Pass setPage down to ProductList --- */}
      <ProductList products={jewellery} collectionName="New Arrivals - Jewellery" setPage={setPage} />
      <FilterDrawer show={isFilterOpen} handleClose={handleCloseFilter} />
    </>
  );
};

export default NewArrivalsJewelleryPage;
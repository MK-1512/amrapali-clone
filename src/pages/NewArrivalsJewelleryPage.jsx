// src/pages/NewArrivalsJewelleryPage.jsx
import React, { useState } from 'react';
import ProductList from '../components/product/ProductList';
import FilterBar from '../components/filters/FilterBar';
import FilterDrawer from '../components/filters/FilterDrawer';
import NewArrivalsJewelleryHeroBanner from '../components/common/NewArrivalsJewelleryHeroBanner'; // Use the new banner
import { jewellery } from '../data/jewellery'; // Import the jewellery data

const NewArrivalsJewelleryPage = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const handleOpenFilter = () => setIsFilterOpen(true);
  const handleCloseFilter = () => setIsFilterOpen(false);

  return (
    <>
      <NewArrivalsJewelleryHeroBanner /> {/* Use the specific New Arrivals banner */}
      <FilterBar handleOpenFilter={handleOpenFilter} />
      {/* Display all jewellery products, pass a distinct collectionName for potential title use */}
      <ProductList products={jewellery} collectionName="New Arrivals - Jewellery" />
      <FilterDrawer show={isFilterOpen} handleClose={handleCloseFilter} />
    </>
  );
};

export default NewArrivalsJewelleryPage;
// src/pages/JewelleryPage.jsx

import React from 'react'; // Removed useState
import ProductList from '../components/product/ProductList';
import FilterBar from '../components/filters/FilterBar';
import FilterDrawer from '../components/filters/FilterDrawer';
import JewelleryHeroBanner from '../components/common/JewelleryHeroBanner';
import { jewellery } from '../data/jewellery'; // Import the jewellery data

// *** MODIFIED: Accept appliedFilters prop ***
const JewelleryPage = ({ setPage, onApplyFilters, isFilterOpen, handleOpenFilter, handleCloseFilter, appliedFilters }) => {

  return (
    <>
      <JewelleryHeroBanner />
      <FilterBar handleOpenFilter={handleOpenFilter} />
      {/* *** MODIFIED: Pass appliedFilters down *** */}
      <ProductList
        products={jewellery}
        collectionName="jewellery"
        setPage={setPage}
        appliedFilters={appliedFilters} // <-- Pass down
      />
      <FilterDrawer
        show={isFilterOpen}
        handleClose={handleCloseFilter}
        onApplyFilters={onApplyFilters}
      />
    </>
  );
};

export default JewelleryPage;
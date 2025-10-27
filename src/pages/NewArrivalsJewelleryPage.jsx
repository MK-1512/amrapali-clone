// src/pages/NewArrivalsJewelleryPage.jsx
import React from 'react'; // Removed useState
import ProductList from '../components/product/ProductList';
import FilterBar from '../components/filters/FilterBar';
import FilterDrawer from '../components/filters/FilterDrawer';
import NewArrivalsJewelleryHeroBanner from '../components/common/NewArrivalsJewelleryHeroBanner';
import { jewellery } from '../data/jewellery'; // Import the jewellery data

// *** MODIFIED: Accept appliedFilters prop ***
const NewArrivalsJewelleryPage = ({ setPage, onApplyFilters, isFilterOpen, handleOpenFilter, handleCloseFilter, appliedFilters }) => {

  return (
    <>
      <NewArrivalsJewelleryHeroBanner />
      <FilterBar handleOpenFilter={handleOpenFilter} />
      {/* *** MODIFIED: Pass appliedFilters down *** */}
      <ProductList
        products={jewellery} // Assuming new arrivals are derived or handled within ProductList/data
        collectionName="New Arrivals - Jewellery"
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

export default NewArrivalsJewelleryPage;
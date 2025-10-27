// src/pages/NewArrivalsJewelleryPage.jsx
import React from 'react'; // Removed useState
import ProductList from '../components/product/ProductList';
import FilterBar from '../components/filters/FilterBar';
import FilterDrawer from '../components/filters/FilterDrawer';
import NewArrivalsJewelleryHeroBanner from '../components/common/NewArrivalsJewelleryHeroBanner';
import { jewellery } from '../data/jewellery';

// *** MODIFIED: Accept all filter/sort props ***
const NewArrivalsJewelleryPage = ({ setPage, onApplyFilters, isFilterOpen, handleOpenFilter, handleCloseFilter, appliedFilters, sortOrder, onSortChange }) => {

  return (
    <>
      <NewArrivalsJewelleryHeroBanner />
      {/* *** MODIFIED: Pass sort props to FilterBar *** */}
      <FilterBar
        handleOpenFilter={handleOpenFilter}
        sortOrder={sortOrder}
        onSortChange={onSortChange}
      />
      {/* *** MODIFIED: Pass appliedFilters and sortOrder to ProductList *** */}
      <ProductList
        products={jewellery}
        collectionName="New Arrivals - Jewellery"
        setPage={setPage}
        appliedFilters={appliedFilters} // <-- Pass down
        sortOrder={sortOrder} // <-- Pass down
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
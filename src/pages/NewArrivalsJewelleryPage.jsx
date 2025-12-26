import React from 'react';
import ProductList from '../components/product/ProductList';
import FilterBar from '../components/filters/FilterBar';
import FilterDrawer from '../components/filters/FilterDrawer';
import NewArrivalsJewelleryHeroBanner from '../components/common/NewArrivalsJewelleryHeroBanner';
import { jewellery } from '../data/jewellery';

const NewArrivalsJewelleryPage = ({ setPage, onApplyFilters, isFilterOpen, handleOpenFilter, handleCloseFilter, appliedFilters, sortOrder, onSortChange }) => {

  return (
    <>
      <NewArrivalsJewelleryHeroBanner />
      <FilterBar
        handleOpenFilter={handleOpenFilter}
        sortOrder={sortOrder}
        onSortChange={onSortChange}
      />
      <ProductList
        products={jewellery}
        collectionName="New Arrivals - Jewellery"
        setPage={setPage}
        appliedFilters={appliedFilters}
        sortOrder={sortOrder}
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
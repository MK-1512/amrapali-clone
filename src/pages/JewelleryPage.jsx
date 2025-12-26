
import React from 'react';
import ProductList from '../components/product/ProductList';
import FilterBar from '../components/filters/FilterBar';
import FilterDrawer from '../components/filters/FilterDrawer';
import JewelleryHeroBanner from '../components/common/JewelleryHeroBanner';
import { jewellery } from '../data/jewellery';

const JewelleryPage = ({ setPage, onApplyFilters, isFilterOpen, handleOpenFilter, handleCloseFilter, appliedFilters, sortOrder, onSortChange }) => {

  return (
    <>
      <JewelleryHeroBanner />
      <FilterBar
        handleOpenFilter={handleOpenFilter}
        sortOrder={sortOrder}
        onSortChange={onSortChange}
      />
      <ProductList
        products={jewellery}
        collectionName="jewellery"
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

export default JewelleryPage;
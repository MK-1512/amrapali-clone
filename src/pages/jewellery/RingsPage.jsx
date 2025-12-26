import React from 'react';
import ProductList from '../../components/product/ProductList';
import FilterBar from '../../components/filters/FilterBar';
import FilterDrawer from '../../components/filters/FilterDrawer';
import RingsHeroBanner from '../../components/common/RingsHeroBanner';
import { jewellery } from '../../data/jewellery';

const rings = jewellery.filter(item => {
    const nameLower = typeof item.name === 'string' ? item.name.toLowerCase() : '';
    return nameLower.includes('ring') ||
           nameLower === 'checkmate ring' ||
           nameLower === 'shield me ring';
});


const RingsPage = ({ setPage, onApplyFilters, isFilterOpen, handleOpenFilter, handleCloseFilter, appliedFilters, sortOrder, onSortChange }) => {

  return (
    <>
      <RingsHeroBanner />
      <FilterBar
        handleOpenFilter={handleOpenFilter}
        sortOrder={sortOrder}
        onSortChange={onSortChange}
      />
      <ProductList
        products={rings}
        collectionName="rings"
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

export default RingsPage;
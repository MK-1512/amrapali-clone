import React from 'react';
import ProductList from '../../components/product/ProductList';
import FilterBar from '../../components/filters/FilterBar';
import FilterDrawer from '../../components/filters/FilterDrawer';
import EarringsHeroBanner from '../../components/common/EarringsHeroBanner';
import { jewellery } from '../../data/jewellery';

const earrings = jewellery.filter(item => {
    const nameLower = typeof item.name === 'string' ? item.name.toLowerCase() : '';
    return nameLower.includes('earring') ||
           nameLower.includes('hoop') ||
           nameLower.includes('stud') ||
           nameLower === 'sacred heart' ||
           nameLower === 'hoopla' ||
           nameLower === 'peacock' ||
           nameLower === 'twisted triangle' ||
           nameLower === 'hook me up' ||
           nameLower === 'fan-tastic' ||
           nameLower === 'eclipse' ||
           nameLower === 'a pearly dream' ||
           nameLower === 'moon-o-poly' ||
           nameLower === 'folded moon' ||
           nameLower === 'daydreamer' ||
           nameLower === 'boss babe ring';
});


const EarringsPage = ({ setPage, onApplyFilters, isFilterOpen, handleOpenFilter, handleCloseFilter, appliedFilters, sortOrder, onSortChange }) => {

  return (
    <>
      <EarringsHeroBanner />
      <FilterBar
        handleOpenFilter={handleOpenFilter}
        sortOrder={sortOrder}
        onSortChange={onSortChange}
      />
      <ProductList
        products={earrings}
        collectionName="earrings"
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

export default EarringsPage;
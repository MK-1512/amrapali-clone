// src/pages/jewellery/EarringsPage.jsx
import React from 'react'; // Removed useState
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


// *** MODIFIED: Accept all filter/sort props ***
const EarringsPage = ({ setPage, onApplyFilters, isFilterOpen, handleOpenFilter, handleCloseFilter, appliedFilters, sortOrder, onSortChange }) => {

  return (
    <>
      <EarringsHeroBanner />
      {/* *** MODIFIED: Pass sort props to FilterBar *** */}
      <FilterBar
        handleOpenFilter={handleOpenFilter}
        sortOrder={sortOrder}
        onSortChange={onSortChange}
      />
      {/* *** MODIFIED: Pass appliedFilters and sortOrder to ProductList *** */}
      <ProductList
        products={earrings}
        collectionName="earrings"
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

export default EarringsPage;
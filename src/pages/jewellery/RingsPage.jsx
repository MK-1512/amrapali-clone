// src/pages/jewellery/RingsPage.jsx
import React from 'react'; // Removed useState
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


// *** MODIFIED: Accept all filter/sort props ***
const RingsPage = ({ setPage, onApplyFilters, isFilterOpen, handleOpenFilter, handleCloseFilter, appliedFilters, sortOrder, onSortChange }) => {

  return (
    <>
      <RingsHeroBanner />
      {/* *** MODIFIED: Pass sort props to FilterBar *** */}
      <FilterBar
        handleOpenFilter={handleOpenFilter}
        sortOrder={sortOrder}
        onSortChange={onSortChange}
      />
      {/* *** MODIFIED: Pass appliedFilters and sortOrder to ProductList *** */}
      <ProductList
        products={rings}
        collectionName="rings"
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

export default RingsPage;
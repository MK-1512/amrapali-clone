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


// *** MODIFIED: Accept appliedFilters prop ***
const RingsPage = ({ setPage, onApplyFilters, isFilterOpen, handleOpenFilter, handleCloseFilter, appliedFilters }) => {

  return (
    <>
      <RingsHeroBanner />
      <FilterBar handleOpenFilter={handleOpenFilter} />
      {/* *** MODIFIED: Pass appliedFilters down *** */}
      <ProductList
        products={rings}
        collectionName="rings"
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

export default RingsPage;
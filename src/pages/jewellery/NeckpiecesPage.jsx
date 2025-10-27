// src/pages/jewellery/NeckpiecesPage.jsx
import React from 'react'; // Removed useState
import ProductList from '../../components/product/ProductList';
import FilterBar from '../../components/filters/FilterBar';
import FilterDrawer from '../../components/filters/FilterDrawer';
import NeckpiecesHeroBanner from '../../components/common/NeckpiecesHeroBanner';
import { jewellery } from '../../data/jewellery';

const neckpieces = jewellery.filter(item => {
    const nameLower = typeof item.name === 'string' ? item.name.toLowerCase() : '';
    return nameLower.includes('necklace') ||
           nameLower.includes('hasli') ||
           nameLower.includes('choker') ||
           nameLower.includes('chain') ||
           nameLower === 'little sea horse' ||
           nameLower === 'tropical palm' ||
           nameLower === 'crescent horn';
});

// *** MODIFIED: Accept all filter/sort props ***
const NeckpiecesPage = ({ setPage, onApplyFilters, isFilterOpen, handleOpenFilter, handleCloseFilter, appliedFilters, sortOrder, onSortChange }) => {

  return (
    <>
      <NeckpiecesHeroBanner />
      {/* *** MODIFIED: Pass sort props to FilterBar *** */}
      <FilterBar
        handleOpenFilter={handleOpenFilter}
        sortOrder={sortOrder}
        onSortChange={onSortChange}
      />
      {/* *** MODIFIED: Pass appliedFilters and sortOrder to ProductList *** */}
      <ProductList
        products={neckpieces}
        collectionName="neckpieces"
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

export default NeckpiecesPage;
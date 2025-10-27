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

// *** MODIFIED: Accept appliedFilters prop ***
const NeckpiecesPage = ({ setPage, onApplyFilters, isFilterOpen, handleOpenFilter, handleCloseFilter, appliedFilters }) => {

  return (
    <>
      <NeckpiecesHeroBanner />
      <FilterBar handleOpenFilter={handleOpenFilter} />
      {/* *** MODIFIED: Pass appliedFilters down *** */}
      <ProductList
        products={neckpieces}
        collectionName="neckpieces"
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

export default NeckpiecesPage;
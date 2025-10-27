// src/pages/jewellery/BanglesCuffsPage.jsx
import React from 'react'; // Removed useState
import ProductList from '../../components/product/ProductList';
import FilterBar from '../../components/filters/FilterBar';
import FilterDrawer from '../../components/filters/FilterDrawer';
import BanglesCuffsHeroBanner from '../../components/common/BanglesCuffsHeroBanner';
import { jewellery } from '../../data/jewellery';

const banglesCuffs = jewellery.filter(item => {
    const nameLower = typeof item.name === 'string' ? item.name.toLowerCase() : '';
    return nameLower.includes('cuff') ||
           nameLower.includes('bangle') ||
           nameLower.includes('bracelet');
});

// *** MODIFIED: Accept appliedFilters prop ***
const BanglesCuffsPage = ({ setPage, onApplyFilters, isFilterOpen, handleOpenFilter, handleCloseFilter, appliedFilters }) => {

  return (
    <>
      <BanglesCuffsHeroBanner />
      <FilterBar handleOpenFilter={handleOpenFilter} />
      {/* *** MODIFIED: Pass appliedFilters down *** */}
      <ProductList
        products={banglesCuffs}
        collectionName="bangles-cuffs"
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

export default BanglesCuffsPage;
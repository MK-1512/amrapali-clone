import React from 'react';
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

const BanglesCuffsPage = ({ setPage, onApplyFilters, isFilterOpen, handleOpenFilter, handleCloseFilter, appliedFilters, sortOrder, onSortChange }) => {

  return (
    <>
      <BanglesCuffsHeroBanner />
      <FilterBar
        handleOpenFilter={handleOpenFilter}
        sortOrder={sortOrder}
        onSortChange={onSortChange}
      />
      <ProductList
        products={banglesCuffs}
        collectionName="bangles-cuffs"
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

export default BanglesCuffsPage;
import React, { useMemo } from 'react';
import ProductList from '../../components/product/ProductList';
import FilterBar from '../../components/filters/FilterBar';
import FilterDrawer from '../../components/filters/FilterDrawer';
import LinenSareesHeroBanner from '../../components/common/LinenSareesHeroBanner';
import { getFilteredSarees } from '../../utils/productUtils';

const LinenSareesPage = ({ setPage, onApplyFilters, isFilterOpen, handleOpenFilter, handleCloseFilter, appliedFilters, sortOrder, onSortChange }) => {

  const linenSarees = useMemo(() => getFilteredSarees(['linen'], 16, 'Linen'), []);

  return (
    <>
      <LinenSareesHeroBanner />
      <FilterBar
        handleOpenFilter={handleOpenFilter}
        sortOrder={sortOrder}
        onSortChange={onSortChange}
      />
      <ProductList
        products={linenSarees}
        collectionName="Linen Sarees"
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

export default LinenSareesPage;
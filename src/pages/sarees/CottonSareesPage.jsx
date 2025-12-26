import React, { useMemo } from 'react';
import ProductList from '../../components/product/ProductList';
import FilterBar from '../../components/filters/FilterBar';
import FilterDrawer from '../../components/filters/FilterDrawer';
import CottonSareesHeroBanner from '../../components/common/CottonSareesHeroBanner';
import { getFilteredSarees } from '../../utils/productUtils';

const CottonSareesPage = ({ setPage, onApplyFilters, isFilterOpen, handleOpenFilter, handleCloseFilter, appliedFilters, sortOrder, onSortChange }) => {

  const cottonSarees = useMemo(() => getFilteredSarees(['cotton']), []);

  return (
    <>
      <CottonSareesHeroBanner />
      <FilterBar
        handleOpenFilter={handleOpenFilter}
        sortOrder={sortOrder}
        onSortChange={onSortChange}
      />
      <ProductList
        products={cottonSarees}
        collectionName="Cotton Sarees"
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

export default CottonSareesPage;
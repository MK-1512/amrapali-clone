import React, { useMemo } from 'react';
import ProductList from '../../components/product/ProductList';
import FilterBar from '../../components/filters/FilterBar';
import FilterDrawer from '../../components/filters/FilterDrawer';
import SilkTussarSareesHeroBanner from '../../components/common/SilkTussarSareesHeroBanner';
import { getFilteredSarees } from '../../utils/productUtils';

const SilkTussarSareesPage = ({ setPage, onApplyFilters, isFilterOpen, handleOpenFilter, handleCloseFilter, appliedFilters, sortOrder, onSortChange }) => {

  const silkTussarSarees = useMemo(() => getFilteredSarees(['silk', 'tussar']), []);

  return (
    <>
      <SilkTussarSareesHeroBanner />
      <FilterBar
        handleOpenFilter={handleOpenFilter}
        sortOrder={sortOrder}
        onSortChange={onSortChange}
      />
      <ProductList
        products={silkTussarSarees}
        collectionName="Silk & Tussar Sarees"
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

export default SilkTussarSareesPage;
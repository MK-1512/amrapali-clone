import React, { useMemo } from 'react';
import ProductList from '../../components/product/ProductList';
import FilterBar from '../../components/filters/FilterBar';
import FilterDrawer from '../../components/filters/FilterDrawer';
import ChanderiSareesHeroBanner from '../../components/common/ChanderiSareesHeroBanner';
import { getFilteredSarees } from '../../utils/productUtils';

const ChanderiSareesPage = ({ setPage, onApplyFilters, isFilterOpen, handleOpenFilter, handleCloseFilter, appliedFilters, sortOrder, onSortChange }) => {

  const chanderiSarees = useMemo(() => getFilteredSarees(['chanderi'], 16, 'Chanderi'), []);

  return (
    <>
      <ChanderiSareesHeroBanner />
      <FilterBar
        handleOpenFilter={handleOpenFilter}
        sortOrder={sortOrder}
        onSortChange={onSortChange}
      />
      <ProductList
        products={chanderiSarees}
        collectionName="Chanderi Sarees"
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

export default ChanderiSareesPage;
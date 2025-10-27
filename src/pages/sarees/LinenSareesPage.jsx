// src/pages/sarees/LinenSareesPage.jsx
import React, { useMemo } from 'react'; // Removed useState
import ProductList from '../../components/product/ProductList';
import FilterBar from '../../components/filters/FilterBar';
import FilterDrawer from '../../components/filters/FilterDrawer';
import LinenSareesHeroBanner from '../../components/common/LinenSareesHeroBanner';
import { getFilteredSarees } from '../../utils/productUtils';

// *** MODIFIED: Accept all filter/sort props ***
const LinenSareesPage = ({ setPage, onApplyFilters, isFilterOpen, handleOpenFilter, handleCloseFilter, appliedFilters, sortOrder, onSortChange }) => {

  const linenSarees = useMemo(() => getFilteredSarees(['linen'], 16, 'Linen'), []);

  return (
    <>
      <LinenSareesHeroBanner />
      {/* *** MODIFIED: Pass sort props to FilterBar *** */}
      <FilterBar
        handleOpenFilter={handleOpenFilter}
        sortOrder={sortOrder}
        onSortChange={onSortChange}
      />
      {/* *** MODIFIED: Pass appliedFilters and sortOrder to ProductList *** */}
      <ProductList
        products={linenSarees}
        collectionName="Linen Sarees"
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

export default LinenSareesPage;
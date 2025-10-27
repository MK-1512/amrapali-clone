// src/pages/sarees/SilkTussarSareesPage.jsx
import React, { useMemo } from 'react'; // Removed useState
import ProductList from '../../components/product/ProductList';
import FilterBar from '../../components/filters/FilterBar';
import FilterDrawer from '../../components/filters/FilterDrawer';
import SilkTussarSareesHeroBanner from '../../components/common/SilkTussarSareesHeroBanner';
import { getFilteredSarees } from '../../utils/productUtils';

// *** MODIFIED: Accept all filter/sort props ***
const SilkTussarSareesPage = ({ setPage, onApplyFilters, isFilterOpen, handleOpenFilter, handleCloseFilter, appliedFilters, sortOrder, onSortChange }) => {

  const silkTussarSarees = useMemo(() => getFilteredSarees(['silk', 'tussar']), []);

  return (
    <>
      <SilkTussarSareesHeroBanner />
      {/* *** MODIFIED: Pass sort props to FilterBar *** */}
      <FilterBar
        handleOpenFilter={handleOpenFilter}
        sortOrder={sortOrder}
        onSortChange={onSortChange}
      />
      {/* *** MODIFIED: Pass appliedFilters and sortOrder to ProductList *** */}
      <ProductList
        products={silkTussarSarees}
        collectionName="Silk & Tussar Sarees"
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

export default SilkTussarSareesPage;
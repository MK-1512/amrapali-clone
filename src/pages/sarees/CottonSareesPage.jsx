// src/pages/sarees/CottonSareesPage.jsx
import React, { useMemo } from 'react'; // Removed useState
import ProductList from '../../components/product/ProductList';
import FilterBar from '../../components/filters/FilterBar';
import FilterDrawer from '../../components/filters/FilterDrawer';
import CottonSareesHeroBanner from '../../components/common/CottonSareesHeroBanner';
import { getFilteredSarees } from '../../utils/productUtils';

// *** MODIFIED: Accept all filter/sort props ***
const CottonSareesPage = ({ setPage, onApplyFilters, isFilterOpen, handleOpenFilter, handleCloseFilter, appliedFilters, sortOrder, onSortChange }) => {

  const cottonSarees = useMemo(() => getFilteredSarees(['cotton']), []);

  return (
    <>
      <CottonSareesHeroBanner />
      {/* *** MODIFIED: Pass sort props to FilterBar *** */}
      <FilterBar
        handleOpenFilter={handleOpenFilter}
        sortOrder={sortOrder}
        onSortChange={onSortChange}
      />
      {/* *** MODIFIED: Pass appliedFilters and sortOrder to ProductList *** */}
      <ProductList
        products={cottonSarees}
        collectionName="Cotton Sarees"
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

export default CottonSareesPage;
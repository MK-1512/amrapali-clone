// src/pages/sarees/ChanderiSareesPage.jsx
import React, { useMemo } from 'react'; // Removed useState
import ProductList from '../../components/product/ProductList';
import FilterBar from '../../components/filters/FilterBar';
import FilterDrawer from '../../components/filters/FilterDrawer';
import ChanderiSareesHeroBanner from '../../components/common/ChanderiSareesHeroBanner';
import { getFilteredSarees } from '../../utils/productUtils';

// *** MODIFIED: Accept all filter/sort props ***
const ChanderiSareesPage = ({ setPage, onApplyFilters, isFilterOpen, handleOpenFilter, handleCloseFilter, appliedFilters, sortOrder, onSortChange }) => {

  const chanderiSarees = useMemo(() => getFilteredSarees(['chanderi'], 16, 'Chanderi'), []);

  return (
    <>
      <ChanderiSareesHeroBanner />
      {/* *** MODIFIED: Pass sort props to FilterBar *** */}
      <FilterBar
        handleOpenFilter={handleOpenFilter}
        sortOrder={sortOrder}
        onSortChange={onSortChange}
      />
      {/* *** MODIFIED: Pass appliedFilters and sortOrder to ProductList *** */}
      <ProductList
        products={chanderiSarees}
        collectionName="Chanderi Sarees"
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

export default ChanderiSareesPage;
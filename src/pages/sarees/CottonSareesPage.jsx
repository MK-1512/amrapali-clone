// src/pages/sarees/CottonSareesPage.jsx
import React, { useMemo } from 'react'; // Removed useState
import ProductList from '../../components/product/ProductList';
import FilterBar from '../../components/filters/FilterBar';
import FilterDrawer from '../../components/filters/FilterDrawer';
import CottonSareesHeroBanner from '../../components/common/CottonSareesHeroBanner';
import { getFilteredSarees } from '../../utils/productUtils';

// *** MODIFIED: Accept appliedFilters prop ***
const CottonSareesPage = ({ setPage, onApplyFilters, isFilterOpen, handleOpenFilter, handleCloseFilter, appliedFilters }) => {

  const cottonSarees = useMemo(() => getFilteredSarees(['cotton']), []);

  return (
    <>
      <CottonSareesHeroBanner />
      <FilterBar handleOpenFilter={handleOpenFilter} />
      {/* *** MODIFIED: Pass appliedFilters down *** */}
      <ProductList
        products={cottonSarees}
        collectionName="Cotton Sarees"
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

export default CottonSareesPage;
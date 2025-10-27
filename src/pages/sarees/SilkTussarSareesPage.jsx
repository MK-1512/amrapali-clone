// src/pages/sarees/SilkTussarSareesPage.jsx
import React, { useMemo } from 'react'; // Removed useState
import ProductList from '../../components/product/ProductList';
import FilterBar from '../../components/filters/FilterBar';
import FilterDrawer from '../../components/filters/FilterDrawer';
import SilkTussarSareesHeroBanner from '../../components/common/SilkTussarSareesHeroBanner';
import { getFilteredSarees } from '../../utils/productUtils';

// *** MODIFIED: Accept appliedFilters prop ***
const SilkTussarSareesPage = ({ setPage, onApplyFilters, isFilterOpen, handleOpenFilter, handleCloseFilter, appliedFilters }) => {

  const silkTussarSarees = useMemo(() => getFilteredSarees(['silk', 'tussar']), []);

  return (
    <>
      <SilkTussarSareesHeroBanner />
      <FilterBar handleOpenFilter={handleOpenFilter} />
      {/* *** MODIFIED: Pass appliedFilters down *** */}
      <ProductList
        products={silkTussarSarees}
        collectionName="Silk & Tussar Sarees"
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

export default SilkTussarSareesPage;
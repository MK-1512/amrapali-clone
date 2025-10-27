// src/pages/sarees/SilkTussarSareesPage.jsx
import React, { useState, useMemo } from 'react'; // useState is no longer needed if not used elsewhere
import ProductList from '../../components/product/ProductList';
import FilterBar from '../../components/filters/FilterBar';
import FilterDrawer from '../../components/filters/FilterDrawer';
import SilkTussarSareesHeroBanner from '../../components/common/SilkTussarSareesHeroBanner';
import { getFilteredSarees } from '../../utils/productUtils';

// *** MODIFIED: Accept filter state props from App.jsx ***
const SilkTussarSareesPage = ({ setPage, onApplyFilters, isFilterOpen, handleOpenFilter, handleCloseFilter }) => {

  // --- REMOVED Local State ---
  // const [isFilterOpen, setIsFilterOpen] = useState(false);
  // const handleOpenFilter = () => setIsFilterOpen(true);
  // const handleCloseFilter = () => setIsFilterOpen(false);

  // Keep useMemo for product filtering
  const silkTussarSarees = useMemo(() => getFilteredSarees(['silk', 'tussar']), []);

  return (
    <>
      <SilkTussarSareesHeroBanner />
      {/* *** MODIFIED: Pass prop handler from App.jsx *** */}
      <FilterBar handleOpenFilter={handleOpenFilter} />
      {/* Pass setPage down to ProductList */}
      <ProductList products={silkTussarSarees} collectionName="Silk & Tussar Sarees" setPage={setPage} />
      {/* *** MODIFIED: Pass props from App.jsx *** */}
      <FilterDrawer
        show={isFilterOpen}
        handleClose={handleCloseFilter}
        onApplyFilters={onApplyFilters}
      />
    </>
  );
};

export default SilkTussarSareesPage;
// src/pages/sarees/LinenSareesPage.jsx
import React, { useState, useMemo } from 'react'; // useState is no longer needed if not used elsewhere
import ProductList from '../../components/product/ProductList';
import FilterBar from '../../components/filters/FilterBar';
import FilterDrawer from '../../components/filters/FilterDrawer';
import LinenSareesHeroBanner from '../../components/common/LinenSareesHeroBanner';
import { getFilteredSarees } from '../../utils/productUtils';

// *** MODIFIED: Accept filter state props from App.jsx ***
const LinenSareesPage = ({ setPage, onApplyFilters, isFilterOpen, handleOpenFilter, handleCloseFilter }) => {

  // --- REMOVED Local State ---
  // const [isFilterOpen, setIsFilterOpen] = useState(false);
  // const handleOpenFilter = () => setIsFilterOpen(true);
  // const handleCloseFilter = () => setIsFilterOpen(false);

  // Keep useMemo for product filtering
  const linenSarees = useMemo(() => getFilteredSarees(['linen'], 16, 'Linen'), []); // Assuming 16 products based on original code

  return (
    <>
      <LinenSareesHeroBanner />
      {/* *** MODIFIED: Pass prop handler from App.jsx *** */}
      <FilterBar handleOpenFilter={handleOpenFilter} />
      {/* Pass setPage down to ProductList */}
      <ProductList products={linenSarees} collectionName="Linen Sarees" setPage={setPage} />
      {/* *** MODIFIED: Pass props from App.jsx *** */}
      <FilterDrawer
        show={isFilterOpen}
        handleClose={handleCloseFilter}
        onApplyFilters={onApplyFilters}
      />
    </>
  );
};

export default LinenSareesPage;
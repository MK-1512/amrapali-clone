// src/pages/sarees/CottonSareesPage.jsx
import React, { useState, useMemo } from 'react';
import ProductList from '../../components/product/ProductList';
import FilterBar from '../../components/filters/FilterBar';
import FilterDrawer from '../../components/filters/FilterDrawer';
import CottonSareesHeroBanner from '../../components/common/CottonSareesHeroBanner';
import { getFilteredSarees } from '../../utils/productUtils';

// --- FIX: Accept setPage prop ---
const CottonSareesPage = ({ setPage }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const handleOpenFilter = () => setIsFilterOpen(true);
  const handleCloseFilter = () => setIsFilterOpen(false);

  const cottonSarees = useMemo(() => getFilteredSarees(['cotton']), []);

  return (
    <>
      <CottonSareesHeroBanner />
      <FilterBar handleOpenFilter={handleOpenFilter} />
      {/* --- FIX: Pass setPage down to ProductList --- */}
      <ProductList products={cottonSarees} collectionName="Cotton Sarees" setPage={setPage} />
      <FilterDrawer show={isFilterOpen} handleClose={handleCloseFilter} />
    </>
  );
};

export default CottonSareesPage;
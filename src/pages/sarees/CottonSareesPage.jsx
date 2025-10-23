import React, { useState, useMemo } from 'react';
import ProductList from '../../components/product/ProductList';
import FilterBar from '../../components/filters/FilterBar';
import FilterDrawer from '../../components/filters/FilterDrawer';
import CottonSareesHeroBanner from '../../components/common/CottonSareesHeroBanner';
import { getFilteredSarees } from '../../utils/productUtils'; // Adjust path if needed

const CottonSareesPage = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const handleOpenFilter = () => setIsFilterOpen(true);
  const handleCloseFilter = () => setIsFilterOpen(false);

  // Use memoization for filtering
  const cottonSarees = useMemo(() => getFilteredSarees(['cotton']), []); // Filter by 'cotton' keyword

  return (
    <>
      <CottonSareesHeroBanner />
      <FilterBar handleOpenFilter={handleOpenFilter} />
      <ProductList products={cottonSarees} collectionName="Cotton Sarees" />
      <FilterDrawer show={isFilterOpen} handleClose={handleCloseFilter} />
    </>
  );
};

export default CottonSareesPage;
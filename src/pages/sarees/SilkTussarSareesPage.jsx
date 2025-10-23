import React, { useState, useMemo } from 'react';
import ProductList from '../../components/product/ProductList';
import FilterBar from '../../components/filters/FilterBar';
import FilterDrawer from '../../components/filters/FilterDrawer';
import SilkTussarSareesHeroBanner from '../../components/common/SilkTussarSareesHeroBanner';
import { getFilteredSarees } from '../../utils/productUtils'; // Adjust path if needed

const SilkTussarSareesPage = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const handleOpenFilter = () => setIsFilterOpen(true);
  const handleCloseFilter = () => setIsFilterOpen(false);

  // Use memoization for filtering
  const silkTussarSarees = useMemo(() => getFilteredSarees(['silk', 'tussar']), []); // Filter by 'silk' OR 'tussar'

  return (
    <>
      <SilkTussarSareesHeroBanner />
      <FilterBar handleOpenFilter={handleOpenFilter} />
      <ProductList products={silkTussarSarees} collectionName="Silk & Tussar Sarees" />
      <FilterDrawer show={isFilterOpen} handleClose={handleCloseFilter} />
    </>
  );
};

export default SilkTussarSareesPage;
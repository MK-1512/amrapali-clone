import React, { useState, useMemo } from 'react';
import ProductList from '../../components/product/ProductList';
import FilterBar from '../../components/filters/FilterBar';
import FilterDrawer from '../../components/filters/FilterDrawer'; //
import LinenSareesHeroBanner from '../../components/common/LinenSareesHeroBanner';
import { getFilteredSarees } from '../../utils/productUtils'; // Adjust path if needed

const LinenSareesPage = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const handleOpenFilter = () => setIsFilterOpen(true);
  const handleCloseFilter = () => setIsFilterOpen(false);

  // Use memoization: Filter by 'linen', target 16 products, use 'Linen' for placeholder name
  const linenSarees = useMemo(() => getFilteredSarees(['linen'], 16, 'Linen'), []);

  return (
    <>
      <LinenSareesHeroBanner />
      <FilterBar handleOpenFilter={handleOpenFilter} />
      {/* Pass the potentially padded list */}
      <ProductList products={linenSarees} collectionName="Linen Sarees" />
      <FilterDrawer show={isFilterOpen} handleClose={handleCloseFilter} /> {/* */}
    </>
  );
};

export default LinenSareesPage;
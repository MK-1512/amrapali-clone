import React, { useState, useMemo } from 'react';
import ProductList from '../../components/product/ProductList';
import FilterBar from '../../components/filters/FilterBar';
import FilterDrawer from '../../components/filters/FilterDrawer'; //
import ChanderiSareesHeroBanner from '../../components/common/ChanderiSareesHeroBanner';
import { getFilteredSarees } from '../../utils/productUtils'; // Adjust path if needed

const ChanderiSareesPage = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const handleOpenFilter = () => setIsFilterOpen(true);
  const handleCloseFilter = () => setIsFilterOpen(false);

  // Use memoization: Filter by 'chanderi', target 16 products, use 'Chanderi' for placeholder name
  const chanderiSarees = useMemo(() => getFilteredSarees(['chanderi'], 16, 'Chanderi'), []);

  return (
    <>
      <ChanderiSareesHeroBanner />
      <FilterBar handleOpenFilter={handleOpenFilter} />
      {/* Pass the potentially padded list */}
      <ProductList products={chanderiSarees} collectionName="Chanderi Sarees" />
      <FilterDrawer show={isFilterOpen} handleClose={handleCloseFilter} /> {/* */}
    </>
  );
};

export default ChanderiSareesPage;
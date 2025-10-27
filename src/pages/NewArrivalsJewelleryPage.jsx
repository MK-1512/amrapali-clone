// src/pages/NewArrivalsJewelleryPage.jsx
import React, { useState } from 'react'; // useState is no longer needed if not used elsewhere
import ProductList from '../components/product/ProductList';
import FilterBar from '../components/filters/FilterBar';
import FilterDrawer from '../components/filters/FilterDrawer';
import NewArrivalsJewelleryHeroBanner from '../components/common/NewArrivalsJewelleryHeroBanner';
import { jewellery } from '../data/jewellery'; // Import the jewellery data

// *** MODIFIED: Accept filter state props from App.jsx ***
const NewArrivalsJewelleryPage = ({ setPage, onApplyFilters, isFilterOpen, handleOpenFilter, handleCloseFilter }) => {

  // --- REMOVED Local State ---
  // const [isFilterOpen, setIsFilterOpen] = useState(false);
  // const handleOpenFilter = () => setIsFilterOpen(true);
  // const handleCloseFilter = () => setIsFilterOpen(false);

  return (
    <>
      <NewArrivalsJewelleryHeroBanner />
      {/* *** MODIFIED: Pass prop handler from App.jsx *** */}
      <FilterBar handleOpenFilter={handleOpenFilter} />
      {/* Pass setPage down to ProductList */}
      <ProductList products={jewellery} collectionName="New Arrivals - Jewellery" setPage={setPage} />
      {/* *** MODIFIED: Pass props from App.jsx *** */}
      <FilterDrawer
        show={isFilterOpen}
        handleClose={handleCloseFilter}
        onApplyFilters={onApplyFilters}
      />
    </>
  );
};

export default NewArrivalsJewelleryPage;
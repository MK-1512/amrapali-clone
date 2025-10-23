import React, { useState } from 'react';
import ProductList from '../../components/product/ProductList'; //
import FilterBar from '../../components/filters/FilterBar'; // Corrected import path
import FilterDrawer from '../../components/filters/FilterDrawer'; //
import RingsHeroBanner from '../../components/common/RingsHeroBanner';
import { jewellery } from '../../data/jewellery'; //

// More specific filtering based on video/data
const rings = jewellery.filter(item => { //
    const nameLower = typeof item.name === 'string' ? item.name.toLowerCase() : '';
    // Use more exact names or defining terms based on video
    return nameLower === 'capsule ring' || // Item ID 122
           nameLower === 'wow ring' || // Item ID 112
           nameLower === 'checkmate ring' || // Item ID 101
           nameLower === 'shield me ring' || // Item ID 115
           // Added Chakra rings based on video - adjust names if they are different in your data
           nameLower.includes('chakra adjustable'); // Assuming names contain this
           // EXCLUDE items shown specifically under Earrings in the video, even if data says Ring
           // && nameLower !== 'daydreamer'
           // && nameLower !== 'boss babe ring'; // Uncomment these lines if needed
});
// console.log("Filtered Rings:", rings);

const RingsPage = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false); //
  const handleOpenFilter = () => setIsFilterOpen(true); //
  const handleCloseFilter = () => setIsFilterOpen(false); //

  return (
    <>
      <RingsHeroBanner />
      <FilterBar handleOpenFilter={handleOpenFilter} />
      <ProductList products={rings} collectionName="rings" />
      <FilterDrawer show={isFilterOpen} handleClose={handleCloseFilter} /> {/* */}
    </>
  );
};

export default RingsPage;
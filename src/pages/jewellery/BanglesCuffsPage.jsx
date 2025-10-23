import React, { useState } from 'react';
import ProductList from '../../components/product/ProductList'; //
import FilterBar from '../../components/filters/FilterBar'; // Corrected import path
import FilterDrawer from '../../components/filters/FilterDrawer'; //
import BanglesCuffsHeroBanner from '../../components/common/BanglesCuffsHeroBanner';
import { jewellery } from '../../data/jewellery'; //

// More specific filtering based on video/data
const banglesCuffs = jewellery.filter(item => { //
    const nameLower = typeof item.name === 'string' ? item.name.toLowerCase() : '';
    // Use more exact names or defining terms based on video
    return nameLower === 'drama queen cuff' || // Item ID 116
           nameLower === 'the bold type' || // Item ID 126
           nameLower === 'soulmate bracelet' || // Item ID 124
           nameLower === 'classic bangles'; // Item ID 109 - Assuming this is the 'Classic Textured Bangles' from video
});
// console.log("Filtered Bangles/Cuffs:", banglesCuffs);

const BanglesCuffsPage = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false); //
  const handleOpenFilter = () => setIsFilterOpen(true); //
  const handleCloseFilter = () => setIsFilterOpen(false); //

  return (
    <>
      <BanglesCuffsHeroBanner />
      <FilterBar handleOpenFilter={handleOpenFilter} />
      <ProductList products={banglesCuffs} collectionName="bangles-cuffs" />
      <FilterDrawer show={isFilterOpen} handleClose={handleCloseFilter} /> {/* */}
    </>
  );
};

export default BanglesCuffsPage;
import React, { useState } from 'react';
import ProductList from '../../components/product/ProductList'; //
import FilterBar from '../../components/filters/FilterBar'; // Corrected import path
import FilterDrawer from '../../components/filters/FilterDrawer'; //
import EarringsHeroBanner from '../../components/common/EarringsHeroBanner';
import { jewellery } from '../../data/jewellery'; //

// More specific filtering based on video/data
const earrings = jewellery.filter(item => { //
    const nameLower = typeof item.name === 'string' ? item.name.toLowerCase() : '';
    // Check for earring types or specific names shown in the video for earrings
    return nameLower.includes('earring') || // General catch
           nameLower.includes('hoop') || // Includes various hoops
           nameLower.includes('stud') || // Includes various studs
           nameLower === 'sacred heart' ||
           nameLower === 'hoopla' ||
           nameLower === 'peacock' || // Assuming 'Peacock' item (ID 127) is earrings based on video context
           nameLower === 'twisted triangle' ||
           nameLower === 'hook me up' ||
           nameLower === 'fan-tastic' ||
           nameLower === 'eclipse' || // Item ID 105
           nameLower === 'a pearly dream' || // Item ID 114
           nameLower === 'moon-o-poly' || // Item ID 134
           nameLower === 'folded moon' || // Item ID 110
           nameLower === 'daydreamer' || // Item ID 106 - Listed as Ring in data but shown with Earrings in video
           nameLower === 'boss babe ring'; // Item ID 108 - Listed as Ring in data but shown with Earrings in video
        // Explicitly EXCLUDE rings unless they were shown in the earrings video section
        // Example: && !nameLower.includes('ring name to exclude');
});
// console.log("Filtered Earrings:", earrings);

const EarringsPage = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false); //
  const handleOpenFilter = () => setIsFilterOpen(true); //
  const handleCloseFilter = () => setIsFilterOpen(false); //

  return (
    <>
      <EarringsHeroBanner />
      <FilterBar handleOpenFilter={handleOpenFilter} />
      <ProductList products={earrings} collectionName="earrings" />
      <FilterDrawer show={isFilterOpen} handleClose={handleCloseFilter} /> {/* */}
    </>
  );
};

export default EarringsPage;
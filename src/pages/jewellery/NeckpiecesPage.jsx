import React, { useState } from 'react';
import ProductList from '../../components/product/ProductList';
import FilterBar from '../../components/filters/FilterBar'; // Corrected import path
import FilterDrawer from '../../components/filters/FilterDrawer'; //
import NeckpiecesHeroBanner from '../../components/common/NeckpiecesHeroBanner';
import { jewellery } from '../../data/jewellery'; //

// More specific filtering based on video/data
const neckpieces = jewellery.filter(item => { //
    const nameLower = typeof item.name === 'string' ? item.name.toLowerCase() : '';
    // Use more exact or defining terms
    return nameLower.includes('necklace') || // Catches "Untamed Necklace", "Vintage Medallion", "Daisy Necklace" etc.
           nameLower.includes('hasli') || // Catches "Classic Textured Hasli", "Layered Hasli"
           nameLower.includes('choker') || // Catches "Moondance Choker"
           nameLower.includes('chain') || // Catches "Fine Chain", "Ball Chain"
           // Add specific names if they don't contain the keywords above
           nameLower === 'little sea horse' ||
           nameLower === 'tropical palm' ||
           nameLower === 'crescent horn';
});
// console.log("Filtered Neckpieces:", neckpieces);

const NeckpiecesPage = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false); //
  const handleOpenFilter = () => setIsFilterOpen(true); //
  const handleCloseFilter = () => setIsFilterOpen(false); //

  return (
    <>
      <NeckpiecesHeroBanner />
      <FilterBar handleOpenFilter={handleOpenFilter} />
      <ProductList products={neckpieces} collectionName="neckpieces" />
      <FilterDrawer show={isFilterOpen} handleClose={handleCloseFilter} /> {/* */}
    </>
  );
};

export default NeckpiecesPage;
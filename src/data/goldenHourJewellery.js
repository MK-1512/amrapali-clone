// src/data/goldenHourJewellery.js

// Using first 25 items from jewellery.js as per user request for GOLDEN HOUR collection
// Needs verification against actual collection content on the live site.
import { jewellery } from './jewellery'; // Import the main jewellery data

// Select the first 25 items and add the GOLDEN HOUR collection tag
export const goldenHourJewelleryProducts = jewellery.slice(0, 25).map(item => ({
    ...item,
    collections: [...(item.collections || []), "GOLDEN HOUR - Eclectic Jewellery"] // Add Golden Hour collection tag
}));

// Helper function (optional) - Update this if you use it elsewhere
export const getProductsByCollection = (collectionName) => {
  const upperName = collectionName ? collectionName.toUpperCase() : '';
  // Keep other collection checks here...
  if (upperName.includes("SOULFUL WEAVES")) return soulfulWeavesProducts;
  if (upperName.includes("IKTARA - JAMDANI WEAVES")) return iktaraWeavesProducts;
  if (upperName.includes("RAANJHANA - BENARASI WEAVES")) return raanjhanaWeavesProducts;
  if (upperName.includes("MASAKALI - CHANDERI WEAVES")) return masakaliWeavesProducts;
  if (upperName.includes("POPSICLE - EVERYDAY COTTONS")) return popsicleCottonsProducts;
  if (upperName.includes("DOODHE-AALTA - RED-BORDERED WHITE SAREES")) return doodheAaltaSareesProducts;
  if (upperName.includes("STORIES FROM HOME - COTTON SAREES")) return storiesFromHomeProducts;
  if (upperName.includes("ROOPKATHA - BALUCHARI AND SWARNACHARI")) return roopkathaWeavesProducts;
  if (upperName.includes("CANDYFLOSS - COTTON SAREES")) return candyflossCottonsProducts;
  if (upperName.includes("NOOR - ORGANZA BENARASI")) return noorOrganzaProducts;
  if (upperName.includes("SUNKISSED - MINIMALIST JEWELLERY")) return sunkissedJewelleryProducts;
  if (upperName.includes("A MIDAS TOUCH - TUSSAR SILK")) return aMidasTouchSilkProducts;
  // Check for Golden Hour
  if (upperName.includes("GOLDEN HOUR - ECLECTIC JEWELLERY")) {
    return goldenHourJewelleryProducts;
  }
  return []; // Return empty if no match
};
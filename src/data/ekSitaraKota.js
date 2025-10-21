// src/data/ekSitaraKota.js

// Extracted from video: Screen Recording 2025-10-21 at 5.35.48 PM.mov
// Collection: EK SITARA - Kota Sarees

export const ekSitaraKotaProducts = [
  // --- Page 1 (Products 1-4) ---
  {
    id: 1201, // Starting IDs from 1201
    name: "PARI", //
    price: 14500, //
    originalPrice: null,
    image1: "https://www.amrapaliboutique.in/cdn/shop/products/IMG_0022_800x.jpg?v=1652546836", // Found on reference site
    image2: "https://www.amrapaliboutique.in/cdn/shop/products/DSC03418_e3d1d555-4b75-4138-88a6-a8753263a1a9_800x.jpg?v=1652546836", // Placeholder
    tags: ["Kota", "Silk", "Handloom"],
    collections: ["EK SITARA - Kota Sarees"],
    availability: "In stock",
  },
  {
    id: 1202,
    name: "RUHANI", //
    price: 14500, //
    originalPrice: null,
    image1: "https://www.amrapaliboutique.in/cdn/shop/products/IMG_0048_800x.jpg?v=1652546115", // Found on reference site
    image2: "https://www.amrapaliboutique.in/cdn/shop/products/DSC03077_800x.jpg?v=1652546115", // Placeholder
    tags: ["Kota", "Silk", "Handloom"],
    collections: ["EK SITARA - Kota Sarees"],
    availability: "In stock",
  },
  {
    id: 1203,
    name: "ZARIN", //
    price: 15800, //
    originalPrice: null,
    image1: "https://www.amrapaliboutique.in/cdn/shop/products/IMG_1912_800x.jpg?v=1652545891", // Found on reference site
    image2: "https://www.amrapaliboutique.in/cdn/shop/products/DSC03190_800x.jpg?v=1652545891", // Placeholder
    tags: ["Kota", "Silk", "Handloom"],
    collections: ["EK SITARA - Kota Sarees"],
    availability: "In stock",
  },
  {
    id: 1204,
    name: "NAZNEEN", //
    price: 18800, //
    originalPrice: null,
    image1: "https://www.amrapaliboutique.in/cdn/shop/products/image_35792a73-b257-4b51-b15c-9a4984da3df3_800x.jpg?v=1652596513", // Found on reference site
    image2: "https://www.amrapaliboutique.in/cdn/shop/products/DSC03445_800x.jpg?v=1652596513", // Placeholder
    tags: ["Kota", "Silk", "Handloom"],
    collections: ["EK SITARA - Kota Sarees"],
    availability: "Sold out", // Marked Sold Out in video
  },
];

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
  // Check for Ek Sitara
  if (upperName.includes("EK SITARA - KOTA SAREES")) {
    return ekSitaraKotaProducts;
  }
  return []; // Return empty if no match
};
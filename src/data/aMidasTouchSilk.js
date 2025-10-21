// src/data/aMidasTouchSilk.js

// Extracted from video: Screen Recording 2025-10-21 at 5.05.37 PM.mov
// Collection: A MIDAS TOUCH - Tussar Silk

export const aMidasTouchSilkProducts = [
  // --- Page 1 (Products 1-8) ---
  {
    id: 1101, // Starting IDs from 1101
    name: "DOROTHY", //
    price: 9900, //
    originalPrice: null,
    image1: "https://www.amrapaliboutique.in/cdn/shop/products/IMG_2431_800x.jpg?v=1634661704", // Extracted image URL
    image2: "https://www.amrapaliboutique.in/cdn/shop/products/DSC04311_800x.jpg?v=1634661702", // Placeholder
    tags: ["Tussar", "Silk", "Benarasi"], // Assuming Benarasi based on overlap
    collections: ["A MIDAS TOUCH - Tussar Silk"],
    availability: "In stock",
  },
  {
    id: 1102,
    name: "CYNTHIA", //
    price: 9900, //
    originalPrice: null,
    image1: "https://www.amrapaliboutique.in/cdn/shop/products/DSC03996_800x.jpg?v=1634659518", // Extracted image URL
    image2: "https://www.amrapaliboutique.in/cdn/shop/products/DSC04298_800x.jpg?v=1634659516", // Placeholder
    tags: ["Tussar", "Silk", "Benarasi"],
    collections: ["A MIDAS TOUCH - Tussar Silk"],
    availability: "In stock",
  },
  {
    id: 1103,
    name: "CHLOE", //
    price: 9900, //
    originalPrice: null,
    image1: "https://www.amrapaliboutique.in/cdn/shop/products/BeautyPlus_20211019011706553_save_800x.jpg?v=1634665311", // Extracted image URL
    image2: "https://www.amrapaliboutique.in/cdn/shop/products/DSC04287_800x.jpg?v=1634665311", // Placeholder
    tags: ["Tussar", "Silk", "Benarasi"],
    collections: ["A MIDAS TOUCH - Tussar Silk"],
    availability: "Sold out", // Marked Sold Out
  },
  {
    id: 1104,
    name: "HAZEL", //
    price: 9900, //
    originalPrice: null,
    image1: "https://www.amrapaliboutique.in/cdn/shop/products/DSC03700_800x.jpg?v=1634662216", // Extracted image URL
    image2: "https://www.amrapaliboutique.in/cdn/shop/products/DSC04294_800x.jpg?v=1634662214", // Placeholder
    tags: ["Tussar", "Silk", "Benarasi"],
    collections: ["A MIDAS TOUCH - Tussar Silk"],
    availability: "Sold out", // Marked Sold Out
  },
  {
    id: 1105,
    name: "ATHENA", //
    price: 9900, //
    originalPrice: null,
    image1: "https://www.amrapaliboutique.in/cdn/shop/products/IMG_2455_800x.jpg?v=1634665486", // Extracted image URL
    image2: "https://www.amrapaliboutique.in/cdn/shop/products/DSC04320_800x.jpg?v=1634665484", // Placeholder
    tags: ["Tussar", "Silk", "Benarasi"],
    collections: ["A MIDAS TOUCH - Tussar Silk"],
    availability: "Sold out", // Marked Sold Out
  },
  {
    id: 1106,
    name: "MELISSA", //
    price: 9900, //
    originalPrice: null,
    image1: "https://www.amrapaliboutique.in/cdn/shop/products/BeautyPlus_20211018222132421_save_800x.jpg?v=1634662706", // Extracted image URL
    image2: "https://www.amrapaliboutique.in/cdn/shop/products/image_2b4e8ce2-1f22-49b0-8c84-1052fdfdd4a4_800x.jpg?v=1634663261", // Placeholder
    tags: ["Tussar", "Silk", "Benarasi"],
    collections: ["A MIDAS TOUCH - Tussar Silk"],
    availability: "Sold out", // Marked Sold Out
  },
  {
    id: 1107,
    name: "SOPHIA", //
    price: 9900, //
    originalPrice: null,
    image1: "https://www.amrapaliboutique.in/cdn/shop/products/image_db3a8257-12d3-4880-b636-389a6bb9a95d_800x.jpg?v=1634664787", // Extracted image URL
    image2: "https://www.amrapaliboutique.in/cdn/shop/products/DSC04323_800x.jpg?v=1634707667", // Placeholder
    tags: ["Tussar", "Silk", "Benarasi"],
    collections: ["A MIDAS TOUCH - Tussar Silk"],
    availability: "Sold out", // Marked Sold Out
  },
  {
    id: 1108,
    name: "ELENA", //
    price: 9300, //
    originalPrice: null,
    image1: "https://www.amrapaliboutique.in/cdn/shop/products/DSC03327_800x.jpg?v=1634665139", // Extracted image URL
    image2: "https://www.amrapaliboutique.in/cdn/shop/products/image_05f06ae8-ea2e-4b19-b93a-3ff50314f5e0_800x.jpg?v=1634666117", // Placeholder
    tags: ["Tussar", "Silk", "Benarasi"],
    collections: ["A MIDAS TOUCH - Tussar Silk"],
    availability: "Sold out", // Marked Sold Out
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
  // Check for A Midas Touch
  if (upperName.includes("A MIDAS TOUCH - TUSSAR SILK")) {
    return aMidasTouchSilkProducts;
  }
  return []; // Return empty if no match
};
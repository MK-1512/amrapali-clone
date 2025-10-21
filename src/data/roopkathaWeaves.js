// src/data/roopkathaWeaves.js

// Extracted from video: Screen Recording 2025-10-21 at 2.37.32 PM.mov
// Collection: ROOPKATHA - Baluchari and Swarnachari

export const roopkathaWeavesProducts = [
  // --- Page 1 (Products 1-5) ---
  {
    id: 901, // Starting IDs from 901
    name: "SHAHANA", //
    price: 11400, //
    originalPrice: null,
    image1: "https://www.amrapaliboutique.in/cdn/shop/products/IMG_2395_800x.jpg?v=1653780114", // Found on reference site
    image2: "https://www.amrapaliboutique.in/cdn/shop/products/IMG_2403_800x.jpg?v=1653780114", // Placeholder
    tags: ["Baluchari", "Swarnachari", "Silk", "Heritage"],
    collections: ["ROOPKATHA - Baluchari and Swarnachari"],
    availability: "In stock",
  },
  {
    id: 902,
    name: "INDRAKSHI", //
    price: 12950, //
    originalPrice: null,
    image1: "https://www.amrapaliboutique.in/cdn/shop/products/IMG_2638_800x.jpg?v=1653779225", // Found on reference site
    image2: "https://www.amrapaliboutique.in/cdn/shop/products/DSC01855_800x.jpg?v=1653779225", // Placeholder
    tags: ["Baluchari", "Swarnachari", "Silk", "Heritage"],
    collections: ["ROOPKATHA - Baluchari and Swarnachari"],
    availability: "In stock",
  },
  {
    id: 903,
    name: "KASTURI", //
    price: 12950, //
    originalPrice: null,
    image1: "https://www.amrapaliboutique.in/cdn/shop/products/IMG_0236_800x.jpg?v=1653779543", // Found on reference site
    image2: "https://www.amrapaliboutique.in/cdn/shop/products/DSC02048_800x.jpg?v=1653800435", // Placeholder
    tags: ["Baluchari", "Swarnachari", "Silk", "Heritage"],
    collections: ["ROOPKATHA - Baluchari and Swarnachari"],
    availability: "In stock",
  },
  {
    id: 904,
    name: "ROSHMITA", //
    price: 11400, //
    originalPrice: null,
    image1: "https://www.amrapaliboutique.in/cdn/shop/products/DSC01318_800x.jpg?v=1653779812", // Found on reference site
    image2: "https://www.amrapaliboutique.in/cdn/shop/products/DSC01489_800x.jpg?v=1653779812", // Placeholder
    tags: ["Baluchari", "Swarnachari", "Silk", "Heritage"],
    collections: ["ROOPKATHA - Baluchari and Swarnachari"],
    availability: "In stock",
  },
  {
    id: 905,
    name: "PRIYADARSHINI", //
    price: 11400, //
    originalPrice: null,
    image1: "https://www.amrapaliboutique.in/cdn/shop/products/IMG_0185_800x.jpg?v=1653735687", // Found on reference site
    image2: "https://www.amrapaliboutique.in/cdn/shop/products/DSC01770_800x.jpg?v=1653781707", // Placeholder
    tags: ["Baluchari", "Swarnachari", "Silk", "Heritage"],
    collections: ["ROOPKATHA - Baluchari and Swarnachari"],
    availability: "Sold out", // Marked Sold Out in video
  },
];

// Helper function (optional) - Update this if you use it elsewhere
export const getProductsByCollection = (collectionName) => {
  const upperName = collectionName ? collectionName.toUpperCase() : '';
  // Keep other collection checks here...
  if (upperName.includes("SOULFUL WEAVES")) return soulfulWeavesProducts; // Assuming imported
  if (upperName.includes("IKTARA - JAMDANI WEAVES")) return iktaraWeavesProducts; // Assuming imported
  if (upperName.includes("RAANJHANA - BENARASI WEAVES")) return raanjhanaWeavesProducts; // Assuming imported
  if (upperName.includes("MASAKALI - CHANDERI WEAVES")) return masakaliWeavesProducts; // Assuming imported
  if (upperName.includes("POPSICLE - EVERYDAY COTTONS")) return popsicleCottonsProducts; // Assuming imported
  if (upperName.includes("DOODHE-AALTA - RED-BORDERED WHITE SAREES")) return doodheAaltaSareesProducts; // Assuming imported
  if (upperName.includes("STORIES FROM HOME - COTTON SAREES")) return storiesFromHomeProducts; // Assuming imported
  // Check for Roopkatha
  if (upperName.includes("ROOPKATHA - BALUCHARI AND SWARNACHARI")) {
    return roopkathaWeavesProducts;
  }
  return []; // Return empty if no match
};
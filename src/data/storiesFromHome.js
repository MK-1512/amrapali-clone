// src/data/storiesFromHome.js

// Extracted from video: Screen Recording 2025-10-21 at 2.26.55 PM.mov
// Collection: STORIES FROM HOME - Cotton Sarees

export const storiesFromHomeProducts = [
  // --- Page 1 (Products 1-10) ---
  {
    id: 801, // Starting IDs from 801
    name: "ADRIJA", // Corrected
    price: 3700, // Corrected
    image1: "https://www.amrapaliboutique.in/cdn/shop/files/IMG_4143_800x.jpg?v=1695540037", // Image URL matches Doodhe-Aalta Adrija
    image2: "https://www.amrapaliboutique.in/cdn/shop/files/DSC02462_800x.jpg?v=1695540037", // Placeholder
    tags: ["Cotton", "Handloom", "Bengal"],
    collections: ["STORIES FROM HOME - Cotton Sarees", "DOODHE-AALTA - Red-Bordered White Sarees"], // Also in Doodhe-Aalta
    availability: "In stock",
  },
  {
    id: 802,
    name: "PEYANJI", // Corrected
    price: 3700, // Corrected
    image1: "https://www.amrapaliboutique.in/cdn/shop/products/DSC00255_800x.jpg?v=1628982594", // Extracted image URL
    image2: "https://www.amrapaliboutique.in/cdn/shop/products/BeautyPlus_20210815010449114_save_800x.jpg?v=1628982594", // Placeholder
    tags: ["Cotton", "Handloom", "Bengal"],
    collections: ["STORIES FROM HOME - Cotton Sarees"],
    availability: "In stock",
  },
  {
    id: 803,
    name: "DARCHINI", // Corrected
    price: 3700, // Corrected
    image1: "https://www.amrapaliboutique.in/cdn/shop/products/BeautyPlus_20210815040314221_save_800x.jpg?v=1628980829", // Extracted image URL
    image2: "https://www.amrapaliboutique.in/cdn/shop/products/DSC00285_800x.jpg?v=1629385656", // Placeholder
    tags: ["Cotton", "Handloom", "Bengal"],
    collections: ["STORIES FROM HOME - Cotton Sarees"],
    availability: "In stock",
  },
  {
    id: 804,
    name: "KUSHUM", // Corrected
    price: 3700, // Corrected
    image1: "https://www.amrapaliboutique.in/cdn/shop/products/BeautyPlus_20210815005946992_save_800x.jpg?v=1628981000", // Extracted image URL
    image2: "https://www.amrapaliboutique.in/cdn/shop/products/BeautyPlus_20210815005706448_save_800x.jpg?v=1628981000", // Placeholder
    tags: ["Cotton", "Handloom", "Bengal"],
    collections: ["STORIES FROM HOME - Cotton Sarees"],
    availability: "In stock",
  },
  {
    id: 805,
    name: "SHINDUK", // Corrected
    price: 3700, // Corrected
    image1: "https://www.amrapaliboutique.in/cdn/shop/products/BeautyPlus_20210815031644192_save_800x.jpg?v=1628981201", // Extracted image URL
    image2: "https://www.amrapaliboutique.in/cdn/shop/products/DSC00294_800x.jpg?v=1629385697", // Placeholder
    tags: ["Cotton", "Handloom", "Bengal"],
    collections: ["STORIES FROM HOME - Cotton Sarees"],
    availability: "In stock",
  },
  {
    id: 806,
    name: "AALTA", // Corrected
    price: 3700, // Corrected
    image1: "https://www.amrapaliboutique.in/cdn/shop/products/BeautyPlus_20210815011543602_save_800x.jpg?v=1628981921", // Extracted image URL
    image2: "https://www.amrapaliboutique.in/cdn/shop/products/DSC00274_800x.jpg?v=1629385809", // Placeholder
    tags: ["Cotton", "Handloom", "Bengal"],
    collections: ["STORIES FROM HOME - Cotton Sarees"],
    availability: "In stock",
  },
  {
    id: 807,
    name: "AAKASH", // Corrected
    price: 3700, // Corrected
    image1: "https://www.amrapaliboutique.in/cdn/shop/products/BeautyPlus_20210815012152472_save_800x.jpg?v=1643697689", // Extracted image URL
    image2: "https://www.amrapaliboutique.in/cdn/shop/products/DSC00277_800x.jpg?v=1643697689", // Placeholder
    tags: ["Cotton", "Handloom", "Bengal"],
    collections: ["STORIES FROM HOME - Cotton Sarees"],
    availability: "In stock",
  },
  {
    id: 808,
    name: "KAJOL", // Corrected
    price: 3700, // Corrected
    image1: "https://www.amrapaliboutique.in/cdn/shop/products/DSC00268_800x.jpg?v=1628982176", // Extracted image URL
    image2: "https://www.amrapaliboutique.in/cdn/shop/products/DSC00281_800x.jpg?v=1629386084", // Placeholder
    tags: ["Cotton", "Handloom", "Bengal"],
    collections: ["STORIES FROM HOME - Cotton Sarees"],
    availability: "In stock",
  },
  {
    id: 809,
    name: "MEGH", // Corrected
    price: 3700, // Corrected
    image1: "https://www.amrapaliboutique.in/cdn/shop/products/DSC00175_800x.jpg?v=1628982414", // Extracted image URL
    image2: "https://www.amrapaliboutique.in/cdn/shop/products/DSC002682_800x.jpg?v=1629358286", // Placeholder
    tags: ["Cotton", "Handloom", "Bengal"],
    collections: ["STORIES FROM HOME - Cotton Sarees"],
    availability: "In stock",
  },
  {
    id: 810,
    name: "PEKHOM", // Corrected
    price: 3700, // Corrected
    image1: "https://www.amrapaliboutique.in/cdn/shop/products/BeautyPlus_20210815032549956_save_800x.jpg?v=1628981507", // Extracted image URL
    image2: "https://www.amrapaliboutique.in/cdn/shop/products/DSC00290_800x.jpg?v=1629385763", // Placeholder
    tags: ["Cotton", "Handloom", "Bengal"],
    collections: ["STORIES FROM HOME - Cotton Sarees"],
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
  // Check for Stories From Home
  if (upperName.includes("STORIES FROM HOME - COTTON SAREES")) {
    return storiesFromHomeProducts;
  }
  return []; // Return empty if no match
};
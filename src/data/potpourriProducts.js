// src/data/potpourriProducts.js

// Extracted from video: Screen Recording 2025-10-24 at 5.12.31 PM.mov
// Collection: POTPOURRI

// Import details if found elsewhere
import { doodheAaltaSareesProducts } from './doodheAaltaSarees';
import { smartStaplesProducts } from './smartStaples';

// Find specific products from other collections
const chandrika = doodheAaltaSareesProducts.find(p => p.name === "CHANDRIKA");
const ira = smartStaplesProducts.find(p => p.name === "IRA");
const reva = smartStaplesProducts.find(p => p.name === "REVA");
const anvi = smartStaplesProducts.find(p => p.name === "ANVI");
const urvi = smartStaplesProducts.find(p => p.name === "URVI");

export const potpourriProducts = [
  {
    id: 1401, // New ID range for Potpourri
    name: "GULMOHAR",
    price: 3150, // Assuming price based on similar items, confirm if possible
    originalPrice: null,
    image1: "https://www.amrapaliboutique.in/cdn/shop/files/IMG_4003_800x.jpg?v=1756625583", // Image from video
    image2: "https://www.amrapaliboutique.in/cdn/shop/files/DSC06294_800x.jpg?v=1756625583", // Placeholder or second image if available
    tags: ["Cotton", "Handloom", "Bengal"], // Guessing tags
    collections: ["POTPOURRI"],
    availability: "Sold out", // Marked Sold Out in video
  },
  // Use found Chandrika data
  chandrika ? { ...chandrika, collections: [...(chandrika.collections || []), "POTPOURRI"] } : null,
  {
    id: 1402,
    name: "NAVYA",
    price: 3600, // Price from video
    originalPrice: null,
    image1: "https://www.amrapaliboutique.in/cdn/shop/files/IMG_0529_800x.jpg?v=1756575127", // Image from video
    image2: "https://www.amrapaliboutique.in/cdn/shop/files/DSC03723_800x.jpg?v=1756623917", // Placeholder
    tags: ["Cotton", "Handloom", "Bengal"],
    collections: ["POTPOURRI"],
    availability: "In stock",
  },
  {
    id: 1403,
    name: "MORNI",
    price: 2750, // Price from video
    originalPrice: null,
    image1: "https://www.amrapaliboutique.in/cdn/shop/files/IMG_0380_800x.jpg?v=1756626158", // Image from video (appears to be this one)
    image2: "https://www.amrapaliboutique.in/cdn/shop/files/DSC06278_800x.jpg?v=1756626158", // Placeholder
    tags: ["Cotton", "Handloom", "Bengal"],
    collections: ["POTPOURRI"],
    availability: "In stock",
  },
  {
    id: 1404,
    name: "TISTA",
    price: 3600, // Price from video
    originalPrice: null,
    image1: "https://www.amrapaliboutique.in/cdn/shop/files/IMG_3949_800x.jpg?v=1756623529", // Image from video
    image2: "https://www.amrapaliboutique.in/cdn/shop/files/DSC04821_800x.jpg?v=1756623529", // Placeholder
    tags: ["Cotton", "Handloom", "Bengal"],
    collections: ["POTPOURRI"],
    availability: "In stock",
  },
   {
    id: 1405,
    name: "ANAAYA",
    price: 3750, // Price from video
    originalPrice: null,
    image1: "https://www.amrapaliboutique.in/cdn/shop/files/IMG_0560_800x.jpg?v=1756624056", // Image from video
    image2: "https://www.amrapaliboutique.in/cdn/shop/files/IMG_0566_800x.jpg?v=1756624056", // Placeholder
    tags: ["Cotton", "Jamdani", "Bengal"], // Assuming Jamdani based on pattern
    collections: ["POTPOURRI", "IKTARA - Jamdani Weaves"], // Potentially also Iktara
    availability: "In stock",
  },
  // Use found Ira data
  ira ? { ...ira, collections: [...(ira.collections || []), "POTPOURRI"] } : null,
  {
    id: 1406,
    name: "PARIJAT",
    price: 2750, // Price from video
    originalPrice: null,
    image1: "https://www.amrapaliboutique.in/cdn/shop/files/IMG_0432_800x.jpg?v=1756625787", // Image from video
    image2: "https://www.amrapaliboutique.in/cdn/shop/files/DSC06286_800x.jpg?v=1756625787", // Placeholder
    tags: ["Cotton", "Handloom", "Bengal"],
    collections: ["POTPOURRI"],
    availability: "Sold out", // Marked Sold Out in video
  },
  // Use found Reva data
  reva ? { ...reva, collections: [...(reva.collections || []), "POTPOURRI"] } : null,
  // Use found Anvi data
  anvi ? { ...anvi, collections: [...(anvi.collections || []), "POTPOURRI"] } : null,
  // Use found Urvi data
  urvi ? { ...urvi, collections: [...(urvi.collections || []), "POTPOURRI"] } : null,
].filter(Boolean); // Filter out any null entries if products weren't found

// Helper function (optional)
export const getProductsByCollection = (collectionName) => {
  const upperName = collectionName ? collectionName.toUpperCase() : '';
  // Add Potpourri check
  if (upperName === "POTPOURRI") {
    return potpourriProducts;
  }
  // Keep other checks...
  // ...
  return []; // Return empty if no match
};
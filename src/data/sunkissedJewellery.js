// src/data/sunkissedJewellery.js

// Extracted from video: Screen Recording 2025-10-21 at 4.59.45 PM.mov
// Collection: SUNKISSED - Minimalist Jewellery
const defaultJewelleryDetails = {
    description: "Handcrafted contemporary jewellery piece.", // Generic description
    baseMaterial: "Base Material: Brass", // Common material
    finish: "Finish: 18k gold-plated with 0.5 micron thickness", // Common finish
    weight: "Approx. 5-15 gms.", // General weight range based on examples
    origin: "Handcrafted in Jaipur", // Common origin
    measurements: "Varies by item (e.g., length, diameter, adjustable)", // Placeholder as size varies
    disclaimer: "Disclaimer: This product has been handmade and hence may have slight irregularities in its color or embellishments. These imperfections are not defects per se, but a testimony of human involvement in the process and is the reason that makes each piece unique.", // Standard handcrafted disclaimer
    care: "Care: Wipe with a soft dry cloth after every wear. Avoid contact with perfumes, water and other liquid substances. Store in a box separately, away from moisture and other jewellery. As a thumb rule, jewellery should be the last thing you wear and the first thing you take off.", // Specific jewellery care
    shipping: "Shipping and Returns: This product is non-returnable. No exchange or refund will be made against a non-returnable product. Dispatched in 2-3 working days. Delivery Timeline: Domestic - 3 to 10 business days; International - 12 to 20 business days. *However, the delivery period may exceed due to unforeseen external factors.", // Shipping info, noting non-returnable status
};
// Reusing IDs from jewellery.js where applicable
export const sunkissedJewelleryProducts = [
  // --- Page 1 (Products 1-12) ---
  {
    id: 128, // Matches jewellery.js
    name: "DAISY", //
    price: 800, //
    originalPrice: 1000, // From jewellery.js
    image1: "https://www.amrapaliboutique.in/cdn/shop/products/AUK00045_800x.jpg?v=1655743063", // From jewellery.js
    image2: "https://www.amrapaliboutique.in/cdn/shop/products/AUK00394_800x.jpg?v=1655750888", // From jewellery.js
    tags: ["Jewellery", "Minimalist", "Necklace"],
    collections: ["SUNKISSED - Minimalist Jewellery"],
    availability: "In stock",
    details: { ...defaultJewelleryDetails }
  },
  {
    id: 124, // Matches jewellery.js
    name: "SOULMATE", //
    price: 950, //
    originalPrice: 1200, // From jewellery.js
    image1: "https://www.amrapaliboutique.in/cdn/shop/products/AUK00107_800x.jpg?v=1655800780", // From jewellery.js
    image2: "https://www.amrapaliboutique.in/cdn/shop/products/DSC05859_800x.jpg?v=1655800780", // From jewellery.js
    tags: ["Jewellery", "Minimalist", "Bracelet"],
    collections: ["SUNKISSED - Minimalist Jewellery"],
    availability: "In stock",
    details: { ...defaultJewelleryDetails }
  },
  {
    id: 116, // Matches jewellery.js
    name: "DRAMA QUEEN", //
    price: 2000, //
    originalPrice: 2400, // From jewellery.js
    image1: "https://www.amrapaliboutique.in/cdn/shop/products/IMG_4229_800x.jpg?v=1655800618", // From jewellery.js
    image2: "https://www.amrapaliboutique.in/cdn/shop/products/DSC05851_800x.jpg?v=1655798553", // From jewellery.js
    tags: ["Jewellery", "Minimalist", "Cuff"],
    collections: ["SUNKISSED - Minimalist Jewellery"],
    availability: "In stock",
    details: { ...defaultJewelleryDetails }
  },
  {
    id: 129, // Matches jewellery.js
    name: "HOOPLA", //
    price: 950, //
    originalPrice: 1200, // From jewellery.js
    image1: "https://www.amrapaliboutique.in/cdn/shop/products/IMG_2224_800x.jpg?v=1655750500", // From jewellery.js
    image2: "https://www.amrapaliboutique.in/cdn/shop/products/AUK00344_800x.jpg?v=1655750500", // From jewellery.js
    tags: ["Jewellery", "Minimalist", "Earrings"],
    collections: ["SUNKISSED - Minimalist Jewellery"],
    availability: "In stock",
    details: { ...defaultJewelleryDetails }
  },
  {
    id: 125, // Matches jewellery.js
    name: "SACRED HEART", //
    price: 900, //
    originalPrice: 1150, // From jewellery.js
    image1: "https://www.amrapaliboutique.in/cdn/shop/products/IMG_4222_800x.jpg?v=1655749989", // From jewellery.js
    image2: "https://www.amrapaliboutique.in/cdn/shop/products/DSC05820_800x.jpg?v=1655797978", // From jewellery.js
    tags: ["Jewellery", "Minimalist", "Earrings"],
    collections: ["SUNKISSED - Minimalist Jewellery"],
    availability: "In stock",
    details: { ...defaultJewelleryDetails }
  },
  {
    id: 126, // Matches jewellery.js
    name: "THE BOLD TYPE", //
    price: 1750, //
    originalPrice: 2100, // From jewellery.js
    image1: "https://www.amrapaliboutique.in/cdn/shop/products/IMG_2250_800x.jpg?v=1655801166", // From jewellery.js
    image2: "https://www.amrapaliboutique.in/cdn/shop/products/DSC05798_800x.jpg?v=1655801166", // From jewellery.js
    tags: ["Jewellery", "Minimalist", "Necklace"],
    collections: ["SUNKISSED - Minimalist Jewellery"],
    availability: "In stock",
    details: { ...defaultJewelleryDetails }
  },
  {
    id: 130, // Matches jewellery.js
    name: "LITTLE SEA HORSE", //
    price: 1200, //
    originalPrice: 1500, // From jewellery.js
    image1: "https://www.amrapaliboutique.in/cdn/shop/products/AUK00791_800x.jpg?v=1655789881", // From jewellery.js
    image2: "https://www.amrapaliboutique.in/cdn/shop/products/DSC05898_800x.jpg?v=1655797862", // From jewellery.js
    tags: ["Jewellery", "Minimalist", "Necklace"],
    collections: ["SUNKISSED - Minimalist Jewellery"],
    availability: "In stock",
    details: { ...defaultJewelleryDetails }
  },
  {
    id: 120, // Matches jewellery.js
    name: "TROPICAL PALM", //
    price: 1200, //
    originalPrice: 1500, // From jewellery.js
    image1: "https://www.amrapaliboutique.in/cdn/shop/products/IMG_4218_800x.jpg?v=1655798449", // From jewellery.js
    image2: "https://www.amrapaliboutique.in/cdn/shop/products/DSC05884_800x.jpg?v=1655798449", // From jewellery.js
    tags: ["Jewellery", "Minimalist", "Earrings"],
    collections: ["SUNKISSED - Minimalist Jewellery"],
    availability: "In stock",
   details: { ...defaultJewelleryDetails }
  },
  {
    id: 127, // Matches jewellery.js
    name: "PEACOCK", //
    price: 1800, // Price updated from video (jewellery.js has 1500)
    originalPrice: 1900, // From jewellery.js
    image1: "https://www.amrapaliboutique.in/cdn/shop/products/IMG_4245_800x.jpg?v=1655798134", // From jewellery.js
    image2: "https://www.amrapaliboutique.in/cdn/shop/products/DSC05816_800x.jpg?v=1655798134", // From jewellery.js
    tags: ["Jewellery", "Minimalist", "Necklace"], // Assuming necklace based on image
    collections: ["SUNKISSED - Minimalist Jewellery"],
    availability: "In stock",
    details: { ...defaultJewelleryDetails }
  },
  {
    id: 133, // Matches jewellery.js
    name: "FINE CHAIN", //
    price: 450, //
    originalPrice: 600, // From jewellery.js
    image1: "https://www.amrapaliboutique.in/cdn/shop/products/IMG_4238_800x.jpg?v=1655753985", // From jewellery.js
    image2: "https://www.amrapaliboutique.in/cdn/shop/products/DSC06007_800x.jpg?v=1656322757", // From jewellery.js
    tags: ["Jewellery", "Minimalist", "Chain"],
    collections: ["SUNKISSED - Minimalist Jewellery"],
    availability: "Sold out", // Marked Sold Out in video
   details: { ...defaultJewelleryDetails }
  },
  {
    id: 136, // Matches jewellery.js
    name: "CRESCENT HORN", //
    price: 950, //
    originalPrice: 1200, // From jewellery.js
    image1: "https://www.amrapaliboutique.in/cdn/shop/products/AUK00561_800x.jpg?v=1655756004", // From jewellery.js
    image2: "https://www.amrapaliboutique.in/cdn/shop/products/DSC05977_800x.jpg?v=1656322675", // From jewellery.js
    tags: ["Jewellery", "Minimalist", "Necklace"],
    collections: ["SUNKISSED - Minimalist Jewellery"],
    availability: "Sold out", // Marked Sold Out in video
    details: { ...defaultJewelleryDetails }
  },
  {
    id: 137, // Matches jewellery.js
    name: "BALL CHAIN", //
    price: 500, //
    originalPrice: 700, // From jewellery.js
    image1: "https://www.amrapaliboutique.in/cdn/shop/products/AUK00828_800x.jpg?v=1655744094", // From jewellery.js
    image2: "https://www.amrapaliboutique.in/cdn/shop/products/DSC06003_800x.jpg?v=1656322262", // From jewellery.js
    tags: ["Jewellery", "Minimalist", "Chain"],
    collections: ["SUNKISSED - Minimalist Jewellery"],
    availability: "Sold out", // Marked Sold Out in video
   details: { ...defaultJewelleryDetails }
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
  // Check for Sunkissed
  if (upperName.includes("SUNKISSED - MINIMALIST JEWELLERY")) {
    return sunkissedJewelleryProducts;
  }
  return []; // Return empty if no match
};


import { doodheAaltaSareesProducts } from './doodheAaltaSarees';
import { smartStaplesProducts } from './smartStaples';

const chandrika = doodheAaltaSareesProducts.find(p => p.name === "CHANDRIKA");
const ira = smartStaplesProducts.find(p => p.name === "IRA");
const reva = smartStaplesProducts.find(p => p.name === "REVA");
const anvi = smartStaplesProducts.find(p => p.name === "ANVI");
const urvi = smartStaplesProducts.find(p => p.name === "URVI");
const defaultSareeDetails = {

description: "Handloom saree woven with traditional techniques. Features beautiful patterns and includes a running blouse piece.",

colors: "As shown",

fabric: "Pure Handloom Fabric (Specific type varies)",

technique: "Handloom",

weavingCluster: "India (Specific region varies)",

measurements: "Approx. 6.30 m x 1.12 m",

weight: "Approx. 500-800 gms.",

blousePiece: "Yes (in running)",

disclaimer: "Disclaimer: Actual color may vary slightly. Handwoven items may have minor irregularities. Orders with fall/picot are non-returnable.",

care: "Care: Dry clean recommended for silk/tussar/benarasi. Gentle hand-wash for cotton/linen. Avoid direct sunlight.",

shipping: "Shipping: Ships in 3-5 days (India), 12-20 days (International). Free domestic shipping.",

};
export const potpourriProducts = [
  {
    id: 1401,
    name: "GULMOHAR",
    price: 3150,
    originalPrice: null,
    image1: "https://www.amrapaliboutique.in/cdn/shop/files/IMG_4003_800x.jpg?v=1756625583",
    image2: "https://www.amrapaliboutique.in/cdn/shop/files/DSC06294_800x.jpg?v=1756625583",
    tags: ["Cotton", "Handloom", "Bengal"],
    collections: ["POTPOURRI"],
    availability: "Sold out",
    details: { ...defaultSareeDetails}
  },
  chandrika ? { ...chandrika, collections: [...(chandrika.collections || []), "POTPOURRI"] } : null,
  {
    id: 1402,
    name: "NAVYA",
    price: 3600,
    originalPrice: null,
    image1: "https://www.amrapaliboutique.in/cdn/shop/files/IMG_0529_800x.jpg?v=1756575127",
    image2: "https://www.amrapaliboutique.in/cdn/shop/files/DSC03723_800x.jpg?v=1756623917",
    tags: ["Cotton", "Handloom", "Bengal"],
    collections: ["POTPOURRI"],
    availability: "In stock",
    details: { ...defaultSareeDetails}
  },
  {
    id: 1403,
    name: "MORNI",
    price: 2750,
    originalPrice: null,
    image1: "https://www.amrapaliboutique.in/cdn/shop/files/IMG_0380_800x.jpg?v=1756626158",
    image2: "https://www.amrapaliboutique.in/cdn/shop/files/DSC06278_800x.jpg?v=1756626158",
    tags: ["Cotton", "Handloom", "Bengal"],
    collections: ["POTPOURRI"],
    availability: "In stock",
    details: { ...defaultSareeDetails}
  },
  {
    id: 1404,
    name: "TISTA",
    price: 3600,
    originalPrice: null,
    image1: "https://www.amrapaliboutique.in/cdn/shop/files/IMG_3949_800x.jpg?v=1756623529",
    image2: "https://www.amrapaliboutique.in/cdn/shop/files/DSC04821_800x.jpg?v=1756623529",
    tags: ["Cotton", "Handloom", "Bengal"],
    collections: ["POTPOURRI"],
    availability: "In stock",
    details: { ...defaultSareeDetails}
  },
   {
    id: 1405,
    name: "ANAAYA",
    price: 3750,
    originalPrice: null,
    image1: "https://www.amrapaliboutique.in/cdn/shop/files/IMG_0560_800x.jpg?v=1756624056",
    image2: "https://www.amrapaliboutique.in/cdn/shop/files/IMG_0566_800x.jpg?v=1756624056",
    tags: ["Cotton", "Jamdani", "Bengal"],
    collections: ["POTPOURRI", "IKTARA - Jamdani Weaves"],
    availability: "In stock",
    details: { ...defaultSareeDetails}
  },
  ira ? { ...ira, collections: [...(ira.collections || []), "POTPOURRI"] } : null,
  {
    id: 1406,
    name: "PARIJAT",
    price: 2750,
    originalPrice: null,
    image1: "https://www.amrapaliboutique.in/cdn/shop/files/IMG_0432_800x.jpg?v=1756625787",
    image2: "https://www.amrapaliboutique.in/cdn/shop/files/DSC06286_800x.jpg?v=1756625787",
    tags: ["Cotton", "Handloom", "Bengal"],
    collections: ["POTPOURRI"],
    availability: "Sold out",
    details: { ...defaultSareeDetails}
  },
  reva ? { ...reva, collections: [...(reva.collections || []), "POTPOURRI"] } : null,
  anvi ? { ...anvi, collections: [...(anvi.collections || []), "POTPOURRI"] } : null,
  urvi ? { ...urvi, collections: [...(urvi.collections || []), "POTPOURRI"] } : null,
].filter(Boolean);

export const getProductsByCollection = (collectionName) => {
  const upperName = collectionName ? collectionName.toUpperCase() : '';
  if (upperName === "POTPOURRI") {
    return potpourriProducts;
  }
  return [];
};
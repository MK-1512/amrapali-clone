
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
export const storiesFromHomeProducts = [
  {
    id: 801,
    name: "ADRIJA",
    price: 3700,
    image1: "https://www.amrapaliboutique.in/cdn/shop/files/IMG_4143_800x.jpg?v=1695540037",
    image2: "https://www.amrapaliboutique.in/cdn/shop/files/DSC02462_800x.jpg?v=1695540037",
    tags: ["Cotton", "Handloom", "Bengal"],
    collections: ["STORIES FROM HOME - Cotton Sarees", "DOODHE-AALTA - Red-Bordered White Sarees"],
    availability: "In stock",
        details: { ...defaultSareeDetails}
  },
  {
    id: 802,
    name: "PEYANJI",
    price: 3700,
    image1: "https://www.amrapaliboutique.in/cdn/shop/products/DSC00255_800x.jpg?v=1628982594",
    image2: "https://www.amrapaliboutique.in/cdn/shop/products/BeautyPlus_20210815010449114_save_800x.jpg?v=1628982594",
    tags: ["Cotton", "Handloom", "Bengal"],
    collections: ["STORIES FROM HOME - Cotton Sarees"],
    availability: "In stock",
        details: { ...defaultSareeDetails}
  },
  {
    id: 803,
    name: "DARCHINI",
    price: 3700,
    image1: "https://www.amrapaliboutique.in/cdn/shop/products/BeautyPlus_20210815040314221_save_800x.jpg?v=1628980829",
    image2: "https://www.amrapaliboutique.in/cdn/shop/products/DSC00285_800x.jpg?v=1629385656",
    tags: ["Cotton", "Handloom", "Bengal"],
    collections: ["STORIES FROM HOME - Cotton Sarees"],
    availability: "In stock",
        details: { ...defaultSareeDetails}
  },
  {
    id: 804,
    name: "KUSHUM",
    price: 3700,
    image1: "https://www.amrapaliboutique.in/cdn/shop/products/BeautyPlus_20210815005946992_save_800x.jpg?v=1628981000",
    image2: "https://www.amrapaliboutique.in/cdn/shop/products/BeautyPlus_20210815005706448_save_800x.jpg?v=1628981000",
    tags: ["Cotton", "Handloom", "Bengal"],
    collections: ["STORIES FROM HOME - Cotton Sarees"],
    availability: "In stock",
        details: { ...defaultSareeDetails}
  },
  {
    id: 805,
    name: "SHINDUK",
    price: 3700,
    image1: "https://www.amrapaliboutique.in/cdn/shop/products/BeautyPlus_20210815031644192_save_800x.jpg?v=1628981201",
    image2: "https://www.amrapaliboutique.in/cdn/shop/products/DSC00294_800x.jpg?v=1629385697",
    tags: ["Cotton", "Handloom", "Bengal"],
    collections: ["STORIES FROM HOME - Cotton Sarees"],
    availability: "In stock",
        details: { ...defaultSareeDetails}
  },
  {
    id: 806,
    name: "AALTA",
    price: 3700,
    image1: "https://www.amrapaliboutique.in/cdn/shop/products/BeautyPlus_20210815011543602_save_800x.jpg?v=1628981921",
    image2: "https://www.amrapaliboutique.in/cdn/shop/products/DSC00274_800x.jpg?v=1629385809",
    tags: ["Cotton", "Handloom", "Bengal"],
    collections: ["STORIES FROM HOME - Cotton Sarees"],
    availability: "In stock",
        details: { ...defaultSareeDetails}
  },
  {
    id: 807,
    name: "AAKASH",
    price: 3700,
    image1: "https://www.amrapaliboutique.in/cdn/shop/products/BeautyPlus_20210815012152472_save_800x.jpg?v=1643697689",
    image2: "https://www.amrapaliboutique.in/cdn/shop/products/DSC00277_800x.jpg?v=1643697689",
    tags: ["Cotton", "Handloom", "Bengal"],
    collections: ["STORIES FROM HOME - Cotton Sarees"],
    availability: "In stock",
        details: { ...defaultSareeDetails}
  },
  {
    id: 808,
    name: "KAJOL",
    price: 3700,
    image1: "https://www.amrapaliboutique.in/cdn/shop/products/DSC00268_800x.jpg?v=1628982176",
    image2: "https://www.amrapaliboutique.in/cdn/shop/products/DSC00281_800x.jpg?v=1629386084",
    tags: ["Cotton", "Handloom", "Bengal"],
    collections: ["STORIES FROM HOME - Cotton Sarees"],
    availability: "In stock",
        details: { ...defaultSareeDetails}
  },
  {
    id: 809,
    name: "MEGH",
    price: 3700,
    image1: "https://www.amrapaliboutique.in/cdn/shop/products/DSC00175_800x.jpg?v=1628982414",
    image2: "https://www.amrapaliboutique.in/cdn/shop/products/DSC002682_800x.jpg?v=1629358286",
    tags: ["Cotton", "Handloom", "Bengal"],
    collections: ["STORIES FROM HOME - Cotton Sarees"],
    availability: "In stock",
        details: { ...defaultSareeDetails}
  },
  {
    id: 810,
    name: "PEKHOM",
    price: 3700,
    image1: "https://www.amrapaliboutique.in/cdn/shop/products/BeautyPlus_20210815032549956_save_800x.jpg?v=1628981507",
    image2: "https://www.amrapaliboutique.in/cdn/shop/products/DSC00290_800x.jpg?v=1629385763",
    tags: ["Cotton", "Handloom", "Bengal"],
    collections: ["STORIES FROM HOME - Cotton Sarees"],
    availability: "Sold out",
        details: { ...defaultSareeDetails}
  },
];

export const getProductsByCollection = (collectionName) => {
  const upperName = collectionName ? collectionName.toUpperCase() : '';
  if (upperName.includes("SOULFUL WEAVES")) return soulfulWeavesProducts;
  if (upperName.includes("IKTARA - JAMDANI WEAVES")) return iktaraWeavesProducts;
  if (upperName.includes("RAANJHANA - BENARASI WEAVES")) return raanjhanaWeavesProducts;
  if (upperName.includes("MASAKALI - CHANDERI WEAVES")) return masakaliWeavesProducts;
  if (upperName.includes("POPSICLE - EVERYDAY COTTONS")) return popsicleCottonsProducts;
  if (upperName.includes("DOODHE-AALTA - RED-BORDERED WHITE SAREES")) return doodheAaltaSareesProducts;
  if (upperName.includes("STORIES FROM HOME - COTTON SAREES")) {
    return storiesFromHomeProducts;
  }
  return [];
};
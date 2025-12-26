
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
export const roopkathaWeavesProducts = [
  {
    id: 901,
    name: "SHAHANA",
    price: 11400,
    originalPrice: null,
    image1: "https://www.amrapaliboutique.in/cdn/shop/products/IMG_2395_800x.jpg?v=1653780114",
    image2: "https://www.amrapaliboutique.in/cdn/shop/products/IMG_2403_800x.jpg?v=1653780114",
    tags: ["Baluchari", "Swarnachari", "Silk", "Heritage"],
    collections: ["ROOPKATHA - Baluchari and Swarnachari"],
    availability: "In stock",
    details: { ...defaultSareeDetails}
  },
  {
    id: 902,
    name: "INDRAKSHI",
    price: 12950,
    originalPrice: null,
    image1: "https://www.amrapaliboutique.in/cdn/shop/products/IMG_2638_800x.jpg?v=1653779225",
    image2: "https://www.amrapaliboutique.in/cdn/shop/products/DSC01855_800x.jpg?v=1653779225",
    tags: ["Baluchari", "Swarnachari", "Silk", "Heritage"],
    collections: ["ROOPKATHA - Baluchari and Swarnachari"],
    availability: "In stock",
    details: { ...defaultSareeDetails}
  },
  {
    id: 903,
    name: "KASTURI",
    price: 12950,
    originalPrice: null,
    image1: "https://www.amrapaliboutique.in/cdn/shop/products/IMG_0236_800x.jpg?v=1653779543",
    image2: "https://www.amrapaliboutique.in/cdn/shop/products/DSC02048_800x.jpg?v=1653800435",
    tags: ["Baluchari", "Swarnachari", "Silk", "Heritage"],
    collections: ["ROOPKATHA - Baluchari and Swarnachari"],
    availability: "In stock",
    details: { ...defaultSareeDetails}
  },
  {
    id: 904,
    name: "ROSHMITA",
    price: 11400,
    originalPrice: null,
    image1: "https://www.amrapaliboutique.in/cdn/shop/products/DSC01318_800x.jpg?v=1653779812",
    image2: "https://www.amrapaliboutique.in/cdn/shop/products/DSC01489_800x.jpg?v=1653779812",
    tags: ["Baluchari", "Swarnachari", "Silk", "Heritage"],
    collections: ["ROOPKATHA - Baluchari and Swarnachari"],
    availability: "In stock",
    details: { ...defaultSareeDetails}
  },
  {
    id: 905,
    name: "PRIYADARSHINI",
    price: 11400,
    originalPrice: null,
    image1: "https://www.amrapaliboutique.in/cdn/shop/products/IMG_0185_800x.jpg?v=1653735687",
    image2: "https://www.amrapaliboutique.in/cdn/shop/products/DSC01770_800x.jpg?v=1653781707",
    tags: ["Baluchari", "Swarnachari", "Silk", "Heritage"],
    collections: ["ROOPKATHA - Baluchari and Swarnachari"],
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
  if (upperName.includes("STORIES FROM HOME - COTTON SAREES")) return storiesFromHomeProducts;
  if (upperName.includes("ROOPKATHA - BALUCHARI AND SWARNACHARI")) {
    return roopkathaWeavesProducts;
  }
  return [];
};
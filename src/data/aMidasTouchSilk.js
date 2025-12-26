

const defaultSareeDetails = {
  fabric: "Tussar Silk",
  technique: "Benarasi Weave",
  cluster: "Varanasi",
  material: "Pure Handwoven Silk",
  color: "As shown in image",
  occasion: "Festive / Traditional / Occasion Wear",
  blousePiece: "Included (unstitched)",
  care: "Dry clean only. Avoid direct sunlight exposure for long durations.",
  note: "This saree is handcrafted. Slight irregularities in weave or color are natural characteristics of handloom products.",
  disclaimer:
    "Color may slightly vary due to photographic lighting sources or your device display settings.",
     shipping: "Shipping: Ships in 3-5 days (India), 12-20 days (International). Free domestic shipping.",
};

export const aMidasTouchSilkProducts = [
  {
    id: 1101,
    name: "DOROTHY",
    price: 9900,
    originalPrice: null,
    image1: "https://www.amrapaliboutique.in/cdn/shop/products/IMG_2431_800x.jpg?v=1634661704",
    image2: "https://www.amrapaliboutique.in/cdn/shop/products/DSC04311_800x.jpg?v=1634661702",
    tags: ["Tussar", "Silk", "Benarasi"],
    collections: ["A MIDAS TOUCH - Tussar Silk"],
    availability: "In stock",
    details: { ...defaultSareeDetails },
  },
  {
    id: 1102,
    name: "CYNTHIA",
    price: 9900,
    originalPrice: null,
    image1: "https://www.amrapaliboutique.in/cdn/shop/products/DSC03996_800x.jpg?v=1634659518",
    image2: "https://www.amrapaliboutique.in/cdn/shop/products/DSC04298_800x.jpg?v=1634659516",
    tags: ["Tussar", "Silk", "Benarasi"],
    collections: ["A MIDAS TOUCH - Tussar Silk"],
    availability: "In stock",
    details: { ...defaultSareeDetails },
  },
  {
    id: 1103,
    name: "CHLOE",
    price: 9900,
    originalPrice: null,
    image1: "https://www.amrapaliboutique.in/cdn/shop/products/BeautyPlus_20211019011706553_save_800x.jpg?v=1634665311",
    image2: "https://www.amrapaliboutique.in/cdn/shop/products/DSC04287_800x.jpg?v=1634665311",
    tags: ["Tussar", "Silk", "Benarasi"],
    collections: ["A MIDAS TOUCH - Tussar Silk"],
    availability: "Sold out",
    details: { ...defaultSareeDetails },
  },
  {
    id: 1104,
    name: "HAZEL",
    price: 9900,
    originalPrice: null,
    image1: "https://www.amrapaliboutique.in/cdn/shop/products/DSC03700_800x.jpg?v=1634662216",
    image2: "https://www.amrapaliboutique.in/cdn/shop/products/DSC04294_800x.jpg?v=1634662214",
    tags: ["Tussar", "Silk", "Benarasi"],
    collections: ["A MIDAS TOUCH - Tussar Silk"],
    availability: "Sold out",
    details: { ...defaultSareeDetails },
  },
  {
    id: 1105,
    name: "ATHENA",
    price: 9900,
    originalPrice: null,
    image1: "https://www.amrapaliboutique.in/cdn/shop/products/IMG_2455_800x.jpg?v=1634665486",
    image2: "https://www.amrapaliboutique.in/cdn/shop/products/DSC04320_800x.jpg?v=1634665484",
    tags: ["Tussar", "Silk", "Benarasi"],
    collections: ["A MIDAS TOUCH - Tussar Silk"],
    availability: "Sold out",
    details: { ...defaultSareeDetails },
  },
  {
    id: 1106,
    name: "MELISSA",
    price: 9900,
    originalPrice: null,
    image1: "https://www.amrapaliboutique.in/cdn/shop/products/BeautyPlus_20211018222132421_save_800x.jpg?v=1634662706",
    image2: "https://www.amrapaliboutique.in/cdn/shop/products/image_2b4e8ce2-1f22-49b0-8c84-1052fdfdd4a4_800x.jpg?v=1634663261",
    tags: ["Tussar", "Silk", "Benarasi"],
    collections: ["A MIDAS TOUCH - Tussar Silk"],
    availability: "Sold out",
    details: { ...defaultSareeDetails },
  },
  {
    id: 1107,
    name: "SOPHIA",
    price: 9900,
    originalPrice: null,
    image1: "https://www.amrapaliboutique.in/cdn/shop/products/image_db3a8257-12d3-4880-b636-389a6bb9a95d_800x.jpg?v=1634664787",
    image2: "https://www.amrapaliboutique.in/cdn/shop/products/DSC04323_800x.jpg?v=1634707667",
    tags: ["Tussar", "Silk", "Benarasi"],
    collections: ["A MIDAS TOUCH - Tussar Silk"],
    availability: "Sold out",
    details: { ...defaultSareeDetails },
  },
  {
    id: 1108,
    name: "ELENA",
    price: 9300,
    originalPrice: null,
    image1: "https://www.amrapaliboutique.in/cdn/shop/products/DSC03327_800x.jpg?v=1634665139",
    image2: "https://www.amrapaliboutique.in/cdn/shop/products/image_05f06ae8-ea2e-4b19-b93a-3ff50314f5e0_800x.jpg?v=1634666117",
    tags: ["Tussar", "Silk", "Benarasi"],
    collections: ["A MIDAS TOUCH - Tussar Silk"],
    availability: "Sold out",
    details: { ...defaultSareeDetails },
  },
];

export const getProductsByCollection = (collectionName) => {
  const upperName = collectionName ? collectionName.toUpperCase() : "";
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
  return [];
};

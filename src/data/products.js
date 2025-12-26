
const defaultDetails = {
    description: "Handloom saree woven with alternating warp and weft threads, creating small, regular gaps for a jute-like texture. Embellished with tassels.",
    colors: "As shown",
    fabric: "Pure Cotton (Warp/Weft details vary)",
    technique: "Handloom",
    weavingCluster: "West Bengal",
    measurements: "6.30 m x 1.12 m approx.",
    weight: "Approx. 600-700 gms.",
    blousePiece: "Yes (usually in running)",
    disclaimer: "Disclaimer: The actual color may vary slightly due to different screen calibration. Since this product is handwoven, there might be slight irregularities. Orders with fall and picot are not eligible for return or exchange.",
    care: "Care: Gentle hand-wash in soft water and mild detergent separately. Dry without wringing. Avoid direct sunlight and liquids, especially perfumes.",
    shipping: "Shipping: Ships within 3-5 business days. Free shipping across India. International shipping available (charges apply)."
};

export const products = [
  {
    id: 1,
    name: "Aahilya Banarasi Silk Saree",
    price: 4699,
    originalPrice: 7999,
    image1: "/images/products/saree1_1.webp",
    image2: "/images/products/saree1_2.webp",
    tags: ["Banarasi", "Silk"],
    availability: "In stock",
    details: {
        ...defaultDetails,
        description: "Handloom Banarasi Silk saree with traditional motifs, featuring alternating warp and weft threads. Embellished with tassels.",
        colors: "Red, Beige",
        fabric: "Pure Silk",
        technique: "Handloom, Banarasi Weave",
        measurements: "6.30 m x 1.12 m approx.",
        weight: "Weight: 630 gms.",
    }
  },
  {
    id: 2,
    name: "Aarini Banarasi Silk Saree",
    price: 4999,
    originalPrice: 8599,
    image1: "/images/products/saree2_1.webp",
    image2: "/images/products/saree2_2.webp",
    tags: ["Banarasi", "Silk"],
    availability: "In stock",
    details: { ...defaultDetails, fabric: "Pure Silk", technique: "Handloom, Banarasi Weave" }
  },
  {
    id: 3,
    name: "Aarohi Banarasi Silk Saree",
    price: 4499,
    originalPrice: 7999,
    image1: "/images/products/saree3_1.webp",
    image2: "/images/products/saree3_2.webp",
    tags: ["Banarasi", "Silk"],
    availability: "In stock",
     details: { ...defaultDetails, fabric: "Pure Silk", technique: "Handloom, Banarasi Weave" }
  },
  {
    id: 4,
    name: "Aadrika Banarasi Silk Saree",
    price: 4699,
    originalPrice: 7999,
    image1: "/images/products/saree4_1.webp",
    image2: "/images/products/saree4_2.webp",
    tags: ["Banarasi", "Silk"],
    availability: "In stock",
     details: { ...defaultDetails, fabric: "Pure Silk", technique: "Handloom, Banarasi Weave" }
  },
  {
    id: 5,
    name: "Aadhya Banarasi Silk Saree",
    price: 4599,
    originalPrice: 8299,
    image1: "/images/products/saree5_1.webp",
    image2: "/images/products/saree5_2.webp",
    tags: ["Banarasi", "Silk"],
    availability: "In stock",
     details: { ...defaultDetails, fabric: "Pure Silk", technique: "Handloom, Banarasi Weave" }
  },
  {
    id: 6,
    name: "Aaditri Banarasi Silk Saree",
    price: 4999,
    originalPrice: 8999,
    image1: "/images/products/saree6_1.webp",
    image2: "/images/products/saree6_2.webp",
    tags: ["Banarasi", "Silk"],
    availability: "In stock",
     details: { ...defaultDetails, fabric: "Pure Silk", technique: "Handloom, Banarasi Weave" }
  },
  {
    id: 7,
    name: "Aanya Banarasi Silk Saree",
    price: 4799,
    originalPrice: 8499,
    image1: "/images/products/saree7_1.webp",
    image2: "/images/products/saree7_2.webp",
    tags: ["Banarasi", "Silk"],
    availability: "In stock",
     details: { ...defaultDetails, fabric: "Pure Silk", technique: "Handloom, Banarasi Weave" }
  },
  {
    id: 8,
    name: "Bhavya Banarasi Silk Saree",
    price: 5099,
    originalPrice: 9099,
    image1: "/images/products/saree8_1.webp",
    image2: "/images/products/saree8_2.webp",
    tags: ["Banarasi", "Silk"],
    availability: "In stock",
     details: { ...defaultDetails, fabric: "Pure Silk", technique: "Handloom, Banarasi Weave" }
  },
  {
    id: 9,
    name: "Charu Banarasi Silk Saree",
    price: 4399,
    originalPrice: 7899,
    image1: "/images/products/saree9_1.webp",
    image2: "/images/products/saree9_2.webp",
    tags: ["Banarasi", "Silk"],
    availability: "In stock",
     details: { ...defaultDetails, fabric: "Pure Silk", technique: "Handloom, Banarasi Weave" }
  },
  {
    id: 10,
    name: "Diya Banarasi Silk Saree",
    price: 5199,
    originalPrice: 9199,
    image1: "/images/products/saree10_1.webp",
    image2: "/images/products/saree10_2.webp",
    tags: ["Banarasi", "Silk"],
    availability: "In stock",
     details: { ...defaultDetails, fabric: "Pure Silk", technique: "Handloom, Banarasi Weave" }
  },
  {
    id: 11,
    name: "Esha Banarasi Silk Saree",
    price: 4699,
    originalPrice: 8399,
    image1: "/images/products/saree11_1.webp",
    image2: "/images/products/saree11_2.webp",
    tags: ["Banarasi", "Silk"],
    availability: "In stock",
     details: { ...defaultDetails, fabric: "Pure Silk", technique: "Handloom, Banarasi Weave" }
  },
  {
    id: 12,
    name: "Falguni Banarasi Silk Saree",
    price: 4999,
    originalPrice: 8999,
    image1: "/images/products/saree12_1.webp",
    image2: "/images/products/saree12_2.webp",
    tags: ["Banarasi", "Silk"],
    availability: "In stock",
     details: { ...defaultDetails, fabric: "Pure Silk", technique: "Handloom, Banarasi Weave" }
  },
  {
    id: 13,
    name: "Gauri Banarasi Silk Saree",
    price: 4799,
    originalPrice: 8599,
    image1: "/images/products/saree13_1.webp",
    image2: "/images/products/saree13_2.webp",
    tags: ["Banarasi", "Silk"],
    availability: "In stock",
     details: { ...defaultDetails, fabric: "Pure Silk", technique: "Handloom, Banarasi Weave" }
  },
  {
    id: 14,
    name: "Hina Banarasi Silk Saree",
    price: 5299,
    originalPrice: 9299,
    image1: "/images/products/saree14_1.webp",
    image2: "/images/products/saree14_2.webp",
    tags: ["Banarasi", "Silk"],
    availability: "In stock",
     details: { ...defaultDetails, fabric: "Pure Silk", technique: "Handloom, Banarasi Weave" }
  },
  {
    id: 15,
    name: "Isha Banarasi Silk Saree",
    price: 4599,
    originalPrice: 7999,
    image1: "/images/products/saree15_1.webp",
    image2: "/images/products/saree15_2.webp",
    tags: ["Banarasi", "Silk"],
    availability: "In stock",
     details: { ...defaultDetails, fabric: "Pure Silk", technique: "Handloom, Banarasi Weave" }
  },
  {
    id: 16,
    name: "Jiya Banarasi Silk Saree",
    price: 4899,
    originalPrice: 8799,
    image1: "/images/products/saree16_1.webp",
    image2: "/images/products/saree16_2.webp",
    tags: ["Banarasi", "Silk"],
    availability: "In stock",
     details: { ...defaultDetails, fabric: "Pure Silk", technique: "Handloom, Banarasi Weave" }
  },
  {
    id: 17,
    name: "Kavya Banarasi Silk Saree",
    price: 4999,
    originalPrice: 8999,
    image1: "/images/products/saree17_1.webp",
    image2: "/images/products/saree17_2.webp",
    tags: ["Banarasi", "Silk"],
    availability: "In stock",
     details: { ...defaultDetails, fabric: "Pure Silk", technique: "Handloom, Banarasi Weave" }
  },
  {
    id: 18,
    name: "Lata Banarasi Silk Saree",
    price: 4699,
    originalPrice: 8199,
    image1: "/images/products/saree18_1.webp",
    image2: "/images/products/saree18_2.webp",
    tags: ["Banarasi", "Silk"],
    availability: "In stock",
     details: { ...defaultDetails, fabric: "Pure Silk", technique: "Handloom, Banarasi Weave" }
  },
  {
    id: 19,
    name: "Meera Banarasi Silk Saree",
    price: 5199,
    originalPrice: 9099,
    image1: "/images/products/saree19_1.webp",
    image2: "/images/products/saree19_2.webp",
    tags: ["Banarasi", "Silk"],
    availability: "In stock",
     details: { ...defaultDetails, fabric: "Pure Silk", technique: "Handloom, Banarasi Weave" }
  },
  {
    id: 20,
    name: "Naina Banarasi Silk Saree",
    price: 4799,
    originalPrice: 8499,
    image1: "/images/products/saree20_1.webp",
    image2: "/images/products/saree20_2.webp",
    tags: ["Banarasi", "Silk"],
    availability: "In stock",
     details: { ...defaultDetails, fabric: "Pure Silk", technique: "Handloom, Banarasi Weave" }
  },
  {
    id: 21,
    name: "Opal Banarasi Silk Saree",
    price: 4999,
    originalPrice: 8899,
    image1: "/images/products/saree21_1.webp",
    image2: "/images/products/saree21_2.webp",
    tags: ["Banarasi", "Silk"],
    availability: "In stock",
     details: { ...defaultDetails, fabric: "Pure Silk", technique: "Handloom, Banarasi Weave" }
  },
  {
    id: 22,
    name: "Priya Banarasi Silk Saree",
    price: 4599,
    originalPrice: 7999,
    image1: "/images/products/saree22_1.webp",
    image2: "/images/products/saree22_2.webp",
    tags: ["Banarasi", "Silk"],
    availability: "In stock",
     details: { ...defaultDetails, fabric: "Pure Silk", technique: "Handloom, Banarasi Weave" }
  },
  {
    id: 23,
    name: "Rani Banarasi Silk Saree",
    price: 5099,
    originalPrice: 9199,
    image1: "/images/products/saree23_1.webp",
    image2: "/images/products/saree23_2.webp",
    tags: ["Banarasi", "Silk"],
    availability: "In stock",
     details: { ...defaultDetails, fabric: "Pure Silk", technique: "Handloom, Banarasi Weave" }
  },
  {
    id: 24,
    name: "Sita Banarasi Silk Saree",
    price: 4899,
    originalPrice: 8699,
    image1: "/images/products/saree24_1.webp",
    image2: "/images/products/saree24_2.webp",
    tags: ["Banarasi", "Silk", "Chanderi", "Organza"],
    availability: "In stock",
    details: {
        description: "Handloom, lightweight, translucent, chanderi cotton silk saree, embellished with golden thin stripes on body.",
        colors: "Magenta, Golden",
        fabric: "Warp - Silk | Weft - Mercerised Cotton",
        technique: "Handloom",
        weavingCluster: "West Bengal",
        measurements: "6.50 m x 1.15 m approx.",
        weight: "330 gms.",
        blousePiece: "Yes (Showcased blouse is from our in-house wardrobe)",
        disclaimer: "Disclaimer: The actual color may vary slightly due to different screen calibration. Please Note: Orders with fall and picot are not eligible for return or exchange.",
        care: "Care: Dry clean only. Avoid bringing in contact with direct sunlight & liquids, especially perfumes.",
        shipping: "Shipping: Ships within 3-5 business days. Free shipping across India. International shipping available."
    }
  },

  {
    id: 25, name: "Sunkissed Pure Linen", price: 3600, originalPrice: null,
    image1: "https://www.amrapaliboutique.in/cdn/shop/products/BeautyPlus_20211106203345786_save_800x.jpg?v=1636211470",
    image2: "https://www.amrapaliboutique.in/cdn/shop/products/DSC05198_800x.jpg?v=1636211469",
    tags: ["Linen"], availability: "In stock", details: { ...defaultDetails, fabric: "Pure Linen" }
  },
  {
    id: 26, name: "Lime Sorbet Pure Linen", price: 3600, originalPrice: null,
    image1: "https://www.amrapaliboutique.in/cdn/shop/products/DSC04887_800x.jpg?v=1636210912",
    image2: "https://www.amrapaliboutique.in/cdn/shop/products/DSC05033_96d70891-8e23-4b4d-8148-8c38cb53cece_800x.jpg?v=1636210913",
    tags: ["Linen"], availability: "In stock", details: { ...defaultDetails, fabric: "Pure Linen" }
  },
  {
    id: 27, name: "Viola Pure Linen", price: 3600, originalPrice: null,
    image1: "https://www.amrapaliboutique.in/cdn/shop/products/BeautyPlus_20211106010933359_save_800x.jpg?v=1636211251",
    image2: "https://www.amrapaliboutique.in/cdn/shop/products/DSC05190_800x.jpg?v=1636211251",
    tags: ["Linen"], availability: "In stock", details: { ...defaultDetails, fabric: "Pure Linen" }
  },
  {
    id: 28, name: "Sea Breeze Pure Linen", price: 3600, originalPrice: null,
    image1: "https://www.amrapaliboutique.in/cdn/shop/products/DSC04352_800x.jpg?v=1636211116",
    image2: "https://www.amrapaliboutique.in/cdn/shop/products/DSC04507_800x.jpg?v=1636211118",
    tags: ["Linen"], availability: "In stock", details: { ...defaultDetails, fabric: "Pure Linen" }
  },
  {
    id: 29, name: "Caramel Pure Linen", price: 3600, originalPrice: null,
    image1: "https://www.amrapaliboutique.in/cdn/shop/products/1_f1d657cb-f747-4623-8b13-3a395be4e90f_800x.jpg?v=1605502394",
    image2: "https://www.amrapaliboutique.in/cdn/shop/products/2_83aff44b-0276-45a6-a110-baa781df16ed_800x.jpg?v=1605502398",
    tags: ["Linen"], availability: "In stock", details: { ...defaultDetails, fabric: "Pure Linen" }
  },
  {
    id: 30, name: "Handwoven Pure Linen with Zari Border - Green", price: 3200, originalPrice: null,
    image1: "https://www.amrapaliboutique.in/cdn/shop/products/82_800x.jpg?v=1638786988",
    image2: "https://www.amrapaliboutique.in/cdn/shop/products/2_0d26a485-1c68-418f-9313-e87035b6ccbb_800x.jpg?v=1638786988",
    tags: ["Linen", "Zari"], availability: "In stock", details: { ...defaultDetails, fabric: "Pure Linen with Zari" }
  },
  {
    id: 31, name: "Pure Linen Cotton Resham with Zari Jamdani Accents - Royal Blue", price: 4900, originalPrice: null,
    image1: "https://www.amrapaliboutique.in/cdn/shop/products/1_c8be8b8f-f50e-44ab-ac1b-f622d6c32c86_800x.jpg?v=1594812349",
    image2: "https://www.amrapaliboutique.in/cdn/shop/products/2_2dc5e8cf-ac2c-47c3-8dea-2c4c4253d75c_800x.jpg?v=1594812349",
    tags: ["Linen", "Cotton", "Jamdani", "Zari"], availability: "In stock", details: { ...defaultDetails, fabric: "Linen Cotton Resham blend with Zari Jamdani" }
  },
  {
    id: 32, name: "Handwoven Pure Linen with Zari Border - White", price: 3200, originalPrice: null,
    image1: "https://www.amrapaliboutique.in/cdn/shop/products/1_3802a77f-9787-455c-911f-891a911531eb_800x.jpg?v=1594811503",
    image2: "https://www.amrapaliboutique.in/cdn/shop/products/2_4620f973-34f3-4f1f-b1dc-074a75ea4206_1_800x.jpg?v=1594811505",
    tags: ["Linen", "Zari"], availability: "In stock", details: { ...defaultDetails, fabric: "Pure Linen with Zari" }
  },
  {
    id: 33, name: "Handwoven Linen Jamdani", price: 2850, originalPrice: null,
    image1: "https://www.amrapaliboutique.in/cdn/shop/products/1_6852a40d-5cb3-42d6-ad6e-5a7af82fdd22_800x.jpg?v=1625579389",
    image2: "https://www.amrapaliboutique.in/cdn/shop/products/2_d82e067a-15c2-4720-a9d5-7de575b1b038_800x.jpg?v=1625579389",
    tags: ["Linen", "Jamdani"], availability: "In stock", details: { ...defaultDetails, fabric: "Linen Jamdani" }
  },
  {
    id: 34, name: "Pure Linen Cotton Resham with Zari Jamdani Accents - Pink", price: 4900, originalPrice: null,
    image1: "https://www.amrapaliboutique.in/cdn/shop/products/DSC02573_800x.jpg?v=1651044569",
    image2: "https://www.amrapaliboutique.in/cdn/shop/products/11_1_d267c85e-454e-46f8-9ef4-4ab839b7bbc6_800x.jpg?v=1651044569",
    tags: ["Linen", "Cotton", "Jamdani", "Zari"], availability: "In stock", details: { ...defaultDetails, fabric: "Linen Cotton Resham blend with Zari Jamdani" }
  },
  {
    id: 35, name: "Handwoven Pure Linen with Zari Border - Yellow", price: 3200, originalPrice: null,
    image1: "https://www.amrapaliboutique.in/cdn/shop/products/BeautyPlus_20210702012104326_save_800x.jpg?v=1625392268",
    image2: "https://www.amrapaliboutique.in/cdn/shop/products/DSC09779_800x.jpg?v=1625392268",
    tags: ["Linen", "Zari"], availability: "In stock", details: { ...defaultDetails, fabric: "Pure Linen with Zari" }
  },
  {
    id: 36, name: "Handwoven Pure Linen with Zari Border - Red", price: 3200, originalPrice: null,
    image1: "https://www.amrapaliboutique.in/cdn/shop/products/1_c9cdbf4f-c776-4923-9edb-e6031190c7c4_800x.jpg?v=1603023906",
    image2: "https://www.amrapaliboutique.in/cdn/shop/products/2_5183f469-0cd6-42c9-aa0c-4032ab32146e_800x.jpg?v=1603023906",
    tags: ["Linen", "Zari"], availability: "In stock", details: { ...defaultDetails, fabric: "Pure Linen with Zari" }
  },
  {
    id: 37, name: "Handwoven Pure Linen with Polka Buti and Tree Motif", price: 4000, originalPrice: null,
    image1: "https://www.amrapaliboutique.in/cdn/shop/products/1_1_812d82d6-2160-4faf-bdbf-a373d1073bf9_800x.jpg?v=1572939697",
    image2: "https://www.amrapaliboutique.in/cdn/shop/products/2_e5dc209c-96db-496d-9975-43c57d0fe2fc_800x.jpg?v=1572939697",
    tags: ["Linen"], availability: "In stock", details: { ...defaultDetails, fabric: "Pure Linen" }
  },

  {
    id: 38, name: "Bawri Chanderi Saree", price: 5950, originalPrice: null,
    image1: "https://www.amrapaliboutique.in/cdn/shop/products/1_b666a4ca-6278-4e05-a20f-1afe57de0e2b_800x.jpg?v=1658160157",
    image2: "https://www.amrapaliboutique.in/cdn/shop/products/2_7dcca6e8-eec1-4a4e-aead-fcddc8cd3d87_800x.jpg?v=1658160156",
    tags: ["Chanderi"], availability: "In stock", details: { ...defaultDetails, fabric: "Chanderi Silk/Cotton Blend" }
  },
  {
    id: 39, name: "Pihu Chanderi Saree", price: 5800, originalPrice: null,
    image1: "https://www.amrapaliboutique.in/cdn/shop/products/1_3_88a70303-edb0-40f2-844a-9aaa053482c8_800x.jpg?v=1589819889",
    image2: "https://www.amrapaliboutique.in/cdn/shop/products/2_4_bcd7432a-1834-4872-899c-4c9aedec491d_800x.jpg?v=1589819889",
    tags: ["Chanderi"], availability: "In stock", details: { ...defaultDetails, fabric: "Chanderi Silk/Cotton Blend" }
  },
  {
    id: 40, name: "Oorja Chanderi Saree", price: 5800, originalPrice: null,
    image1: "https://www.amrapaliboutique.in/cdn/shop/products/1_063f5ac7-fdea-434c-9184-839874a7d3f1_800x.jpg?v=1572939768",
    image2: "https://www.amrapaliboutique.in/cdn/shop/products/2_0f2bb7c1-e4c6-4248-ae3d-4674b340f3c9_800x.jpg?v=1572939768",
    tags: ["Chanderi"], availability: "In stock", details: { ...defaultDetails, fabric: "Chanderi Silk/Cotton Blend" }
  },
  {
    id: 41, name: "Nethra Chanderi Saree", price: 5800, originalPrice: null,
    image1: "https://www.amrapaliboutique.in/cdn/shop/products/3_255d6594-5097-4e45-8708-828ee0c40008_800x.jpg?v=1618650778",
    image2: "https://www.amrapaliboutique.in/cdn/shop/products/2_bc8ffd51-5c14-44f8-8425-b65bae3808ed_800x.jpg?v=1618650778",
    tags: ["Chanderi"], availability: "In stock", details: { ...defaultDetails, fabric: "Chanderi Silk/Cotton Blend" }
  },
   {
    id: 42, name: "Rajvi Chanderi Saree", price: 5950, originalPrice: null,
    image1: "https://www.amrapaliboutique.in/cdn/shop/products/1_d565a036-137b-464f-9502-acdef041deef_800x.jpg?v=1581768567",
    image2: "https://www.amrapaliboutique.in/cdn/shop/products/2_6f6418f2-0f70-4f78-bf66-762f0dce48d1_800x.jpg?v=1581768567",
    tags: ["Chanderi"], availability: "In stock", details: { ...defaultDetails, fabric: "Chanderi Silk/Cotton Blend" }
  },
  {
    id: 43, name: "Uditi Chanderi Saree", price: 5950, originalPrice: null,
    image1: "https://www.amrapaliboutique.in/cdn/shop/products/1_4_847f168b-6862-4fa7-82a8-987d1b0cd3c0_800x.jpg?v=1572939701",
    image2: "https://www.amrapaliboutique.in/cdn/shop/products/2_1_1b9a9ab1-eda6-42ee-a164-e649d1a8ecc7_800x.jpg?v=1572939701",
    tags: ["Chanderi"], availability: "In stock", details: { ...defaultDetails, fabric: "Chanderi Silk/Cotton Blend" }
  },
  {
    id: 44, name: "Nimrat Chanderi Saree", price: 12600, originalPrice: null,
    image1: "https://www.amrapaliboutique.in/cdn/shop/products/DSC02646_800x.jpg?v=1653198935",
    image2: "https://www.amrapaliboutique.in/cdn/shop/products/IMG_0044_1bcc75a9-7b73-44ca-a3e5-0045f3c2ad44_800x.jpg?v=1655032401",
    tags: ["Chanderi"], availability: "In stock", details: { ...defaultDetails, fabric: "Chanderi Silk/Cotton Blend" }
  },
  {
    id: 45, name: "Kimaya Chanderi Saree", price: 13500, originalPrice: null,
    image1: "https://www.amrapaliboutique.in/cdn/shop/products/1_62c51c43-d8e3-4803-b2b1-af743af3ef89_800x.jpg?v=1572939766",
    image2: "https://www.amrapaliboutique.in/cdn/shop/products/2_a1fa1273-8ab4-4750-a02d-3f50ebe7b1ec_800x.jpg?v=1572939766",
    tags: ["Chanderi"], availability: "In stock", details: { ...defaultDetails, fabric: "Chanderi Silk/Cotton Blend" }
  },
  {
    id: 46, name: "Raima Chanderi Saree", price: 12600, originalPrice: null,
    image1: "https://www.amrapaliboutique.in/cdn/shop/products/1_b3b11209-b77c-4ec3-8137-36d6e9c0a470_800x.jpg?v=1602749193",
    image2: "https://www.amrapaliboutique.in/cdn/shop/products/9_7298315d-1f8e-4dda-9c8b-296d2de938a4_800x.jpg?v=1602749193",
    tags: ["Chanderi"], availability: "In stock", details: { ...defaultDetails, fabric: "Chanderi Silk/Cotton Blend" }
  },
  {
    id: 47, name: "Naaz Chanderi Saree", price: 10400, originalPrice: null,
    image1: "https://www.amrapaliboutique.in/cdn/shop/products/1_5c51d05e-03b1-46d6-ab20-bd1c77904d59_800x.jpg?v=1572939770",
    image2: "https://www.amrapaliboutique.in/cdn/shop/products/2_3a7aa8b8-71b8-42c5-8993-f8ec3d5e93ec_800x.jpg?v=1572939770",
    tags: ["Chanderi"], availability: "In stock", details: { ...defaultDetails, fabric: "Chanderi Silk/Cotton Blend" }
  },
  {
    id: 48, name: "Farah Chanderi Saree", price: 10400, originalPrice: null,
    image1: "https://www.amrapaliboutique.in/cdn/shop/products/3_10c4ef30-3526-479e-8700-a28e350e4806_800x.jpg?v=1585324905",
    image2: "https://www.amrapaliboutique.in/cdn/shop/products/2_579360b0-ece8-433c-833f-74976d6b2779_800x.jpg?v=1585324905",
    tags: ["Chanderi"], availability: "In stock", details: { ...defaultDetails, fabric: "Chanderi Silk/Cotton Blend" }
  },
  {
    id: 49, name: "Chandni Chanderi Saree", price: 10800, originalPrice: null,
    image1: "https://www.amrapaliboutique.in/cdn/shop/products/1_12eccaa8-b8ed-4588-ade2-a41e6acb188d_800x.jpg?v=1595256724",
    image2: "https://www.amrapaliboutique.in/cdn/shop/products/2_e629aecc-a64f-483e-9f08-1a7ed5a659b7_800x.jpg?v=1595256724",
    tags: ["Chanderi"], availability: "In stock", details: { ...defaultDetails, fabric: "Chanderi Silk/Cotton Blend" }
  },
   {
    id: 50, name: "Urmi Chanderi Saree", price: 10600, originalPrice: null,
    image1: "https://www.amrapaliboutique.in/cdn/shop/products/1_3b69f818-81e3-4904-a32c-b32f4592f437_800x.jpg?v=1616063227",
    image2: "https://www.amrapaliboutique.in/cdn/shop/products/2_32c46dfa-367c-4ba9-935f-6f22842b86d5_800x.jpg?v=1616063227",
    tags: ["Chanderi"], availability: "In stock", details: { ...defaultDetails, fabric: "Chanderi Silk/Cotton Blend" }
  },
  {
    id: 51, name: "Leila Chanderi Saree", price: 4100, originalPrice: null,
    image1: "https://www.amrapaliboutique.in/cdn/shop/products/1_4_e84bf5ba-7bed-4ecf-ba0a-720039fb10c4_800x.jpg?v=1604310081",
    image2: "https://www.amrapaliboutique.in/cdn/shop/products/11_99006e92-4b13-49fd-acc2-2d031bae6ef9_800x.jpg?v=1604310081",
    tags: ["Chanderi"], availability: "In stock", details: { ...defaultDetails, fabric: "Chanderi Silk/Cotton Blend" }
  },
  {
    id: 52, name: "Ariel Chanderi Saree", price: 4150, originalPrice: null,
    image1: "https://www.amrapaliboutique.in/cdn/shop/products/1_5c7bf0fd-6bd0-4791-8145-b3b6743f4ad2_800x.jpg?v=1597349575",
    image2: "https://www.amrapaliboutique.in/cdn/shop/products/DSC08925_800x.jpg?v=1598451568",
    tags: ["Chanderi"], availability: "In stock", details: { ...defaultDetails, fabric: "Chanderi Silk/Cotton Blend" }
  },
   {
    id: 53, name: "Norma Chanderi Saree", price: 4150, originalPrice: null,
    image1: "https://www.amrapaliboutique.in/cdn/shop/products/1_a24888f0-7bfd-419a-a28a-8d92dd69ef12_800x.jpg?v=1574685371",
    image2: "https://www.amrapaliboutique.in/cdn/shop/products/2_4865b465-a346-44f6-abd4-60475d967e25_800x.jpg?v=1574685371",
    tags: ["Chanderi"], availability: "In stock", details: { ...defaultDetails, fabric: "Chanderi Silk/Cotton Blend" }
  },

];
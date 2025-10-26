// src/utils/searchUtils.js

import { products as sareeProducts } from '../data/products';
import { jewellery as jewelleryProducts } from '../data/jewellery';
import { bestsellerProducts } from '../data/bestsellerProducts';
import { blogPosts } from '../data/blogPosts';
import { soulfulWeavesProducts } from '../data/soulfulWeaves';
import { iktaraWeavesProducts } from '../data/iktaraWeaves';
import { raanjhanaWeavesProducts } from '../data/raanjhanaWeaves';
import { masakaliWeavesProducts } from '../data/masakaliWeaves';
import { popsicleCottonsProducts } from '../data/popsicleCottons';
import { doodheAaltaSareesProducts } from '../data/doodheAaltaSarees';
import { storiesFromHomeProducts } from '../data/storiesFromHome';
import { roopkathaWeavesProducts } from '../data/roopkathaWeaves';
import { candyflossCottonsProducts } from '../data/candyflossCottons';
import { noorOrganzaProducts } from '../data/noorOrganza';
import { sunkissedJewelleryProducts } from '../data/sunkissedJewellery';
import { aMidasTouchSilkProducts } from '../data/aMidasTouchSilk';
import { goldenHourJewelleryProducts } from '../data/goldenHourJewellery';
import { ekSitaraKotaProducts } from '../data/ekSitaraKota';
// --- FIX: Import missing product data ---
import { smartStaplesProducts } from '../data/smartStaples';
import { potpourriProducts } from '../data/potpourriProducts';
// --- END FIX ---

// Consolidate all products into a single unique array
const allProductArrays = [
  sareeProducts,
  jewelleryProducts,
  bestsellerProducts,
  soulfulWeavesProducts,
  iktaraWeavesProducts,
  raanjhanaWeavesProducts,
  masakaliWeavesProducts,
  popsicleCottonsProducts,
  doodheAaltaSareesProducts,
  storiesFromHomeProducts,
  roopkathaWeavesProducts,
  candyflossCottonsProducts,
  noorOrganzaProducts,
  sunkissedJewelleryProducts,
  aMidasTouchSilkProducts,
  goldenHourJewelleryProducts,
  ekSitaraKotaProducts,
  // --- FIX: Add missing product arrays ---
  smartStaplesProducts,
  potpourriProducts,
  // --- END FIX ---
];

const uniqueProductsMap = new Map();
// Ensure flat() doesn't fail on potentially undefined elements if imports failed
allProductArrays.flat().forEach(product => {
  // Add extra check for product existence
  if (product && product.id) {
    uniqueProductsMap.set(product.id, product);
  }
});

export const allProducts = Array.from(uniqueProductsMap.values());
export const allBlogPosts = blogPosts;

// Core search function
export const searchAll = (query) => {
  if (!query) {
    return { products: [], blogs: [], productCount: 0, blogCount: 0 }; // Added counts here
  }

  const lowerQuery = query.toLowerCase();

  // 1. Search Products
  const matchingProducts = allProducts.filter(p => {
    // Add safety checks for p.name and p.tags
    const nameMatch = p && p.name ? p.name.toLowerCase().includes(lowerQuery) : false;
    const tagsMatch = p && p.tags ? p.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) : false;
    return nameMatch || tagsMatch;
  });

  // 2. Search Blog Posts
  const matchingBlogs = allBlogPosts.filter(b => {
    // Add safety checks for b.title and b.excerpt
    const titleMatch = b && b.title ? b.title.toLowerCase().includes(lowerQuery) : false;
    const excerptMatch = b && b.excerpt ? b.excerpt.toLowerCase().includes(lowerQuery) : false;
    return titleMatch || excerptMatch;
  });

  // Display up to 16 products (4 rows of 4) and 4 blogs in the quick search
  return {
    products: matchingProducts.slice(0, 16),
    blogs: matchingBlogs.slice(0, 4),
    productCount: matchingProducts.length,
    blogCount: matchingBlogs.length
  };
};
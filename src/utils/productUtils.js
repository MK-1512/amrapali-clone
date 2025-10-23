// src/utils/productUtils.js
import { products as newArrivalSarees } from '../data/products'; //
import { bestsellerProducts } from '../data/bestsellerProducts'; //

// Placeholder generator
const placeholderProduct = (index, category) => ({
  id: `placeholder-${category}-${index}`,
  name: `${category} Saree Placeholder ${index}`,
  price: 0,
  originalPrice: null,
  image1: `https://placehold.co/600x800/EEE/31343C?text=${category}+${index}`,
  image2: `https://placehold.co/600x800/CCC/41444C?text=${category}+${index}+Hover`,
  tags: [category, "Placeholder"],
  availability: "Placeholder",
});

export const getFilteredSarees = (keywords = [], targetCount = null, categoryName = 'Saree') => {
  // Combine and deduplicate
  const combined = [...newArrivalSarees, ...bestsellerProducts];
  const uniqueProductsMap = new Map();
  combined.forEach(product => {
    // Basic check if product and id exist
    if (product && product.id && !uniqueProductsMap.has(product.id)) {
      uniqueProductsMap.set(product.id, product);
    }
  });
  const allSarees = Array.from(uniqueProductsMap.values());

  let filteredSarees = [];

  // Filter based on keywords (case-insensitive)
  if (keywords.length === 0) {
    filteredSarees = allSarees; // Use all if no keywords
  } else {
    const lowerKeywords = keywords.map(kw => kw.toLowerCase());
    filteredSarees = allSarees.filter(item => {
      const nameLower = typeof item.name === 'string' ? item.name.toLowerCase() : '';
      // Check if the name contains ANY of the keywords
      return lowerKeywords.some(keyword => nameLower.includes(keyword));
    });
  }

  // Add placeholders if targetCount is specified and needed
  if (targetCount !== null && filteredSarees.length < targetCount) {
    const placeholdersNeeded = targetCount - filteredSarees.length;
    for (let i = 1; i <= placeholdersNeeded; i++) {
      filteredSarees.push(placeholderProduct(i, categoryName));
    }
  }

  return filteredSarees;
};
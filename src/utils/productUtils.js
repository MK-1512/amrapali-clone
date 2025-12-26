import { products as newArrivalSarees } from '../data/products';
import { bestsellerProducts } from '../data/bestsellerProducts';

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
  const combined = [...newArrivalSarees, ...bestsellerProducts];
  const uniqueProductsMap = new Map();
  combined.forEach(product => {
    if (product && product.id && !uniqueProductsMap.has(product.id)) {
      uniqueProductsMap.set(product.id, product);
    }
  });
  const allSarees = Array.from(uniqueProductsMap.values());

  let filteredSarees = [];

  if (keywords.length === 0) {
    filteredSarees = allSarees;
  } else {
    const lowerKeywords = keywords.map(kw => kw.toLowerCase());
    filteredSarees = allSarees.filter(item => {
      const nameLower = typeof item.name === 'string' ? item.name.toLowerCase() : '';
      return lowerKeywords.some(keyword => nameLower.includes(keyword));
    });
  }

  if (targetCount !== null && filteredSarees.length < targetCount) {
    const placeholdersNeeded = targetCount - filteredSarees.length;
    for (let i = 1; i <= placeholdersNeeded; i++) {
      filteredSarees.push(placeholderProduct(i, categoryName));
    }
  }

  return filteredSarees;
};
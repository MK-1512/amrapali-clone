
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
import { smartStaplesProducts } from '../data/smartStaples';
import { potpourriProducts } from '../data/potpourriProducts';

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
  smartStaplesProducts,
  potpourriProducts,
];

const uniqueProductsMap = new Map();
allProductArrays.flat().forEach(product => {
  if (product && product.id) {
    uniqueProductsMap.set(product.id, product);
  }
});

export const allProducts = Array.from(uniqueProductsMap.values());
export const allBlogPosts = blogPosts;

export const searchAll = (query) => {
  if (!query) {
    return { products: [], blogs: [], productCount: 0, blogCount: 0 };
  }

  const lowerQuery = query.toLowerCase();

  const matchingProducts = allProducts.filter(p => {
    const nameMatch = p && p.name ? p.name.toLowerCase().includes(lowerQuery) : false;
    const tagsMatch = p && p.tags ? p.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) : false;
    return nameMatch || tagsMatch;
  });

  const matchingBlogs = allBlogPosts.filter(b => {
    const titleMatch = b && b.title ? b.title.toLowerCase().includes(lowerQuery) : false;
    const excerptMatch = b && b.excerpt ? b.excerpt.toLowerCase().includes(lowerQuery) : false;
    return titleMatch || excerptMatch;
  });

  return {
    products: matchingProducts.slice(0, 16),
    blogs: matchingBlogs.slice(0, 4),
    productCount: matchingProducts.length,
    blogCount: matchingBlogs.length
  };
};
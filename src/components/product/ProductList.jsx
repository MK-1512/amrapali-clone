// src/components/product/ProductList.jsx

import React, { useState, useEffect, useMemo } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Pagination from '../common/Pagination'; // Correct import path
import ProductCard from './ProductCard';

// --- Import necessary data ---
import { allProducts } from '../../utils/searchUtils';
import { products as sareeProducts } from '../../data/products';
import { jewellery as jewelleryProducts } from '../../data/jewellery';
// *** ADD IMPORTS FOR ALL COLLECTION-SPECIFIC PRODUCT ARRAYS ***
import { bestsellerProducts } from '../../data/bestsellerProducts';
import { soulfulWeavesProducts } from '../../data/soulfulWeaves';
import { iktaraWeavesProducts } from '../../data/iktaraWeaves';
import { raanjhanaWeavesProducts } from '../../data/raanjhanaWeaves';
import { masakaliWeavesProducts } from '../../data/masakaliWeaves';
import { popsicleCottonsProducts } from '../../data/popsicleCottons';
import { doodheAaltaSareesProducts } from '../../data/doodheAaltaSarees';
import { storiesFromHomeProducts } from '../../data/storiesFromHome';
import { roopkathaWeavesProducts } from '../../data/roopkathaWeaves';
import { candyflossCottonsProducts } from '../../data/candyflossCottons';
import { noorOrganzaProducts } from '../../data/noorOrganza';
import { sunkissedJewelleryProducts } from '../../data/sunkissedJewellery';
import { aMidasTouchSilkProducts } from '../../data/aMidasTouchSilk';
import { goldenHourJewelleryProducts } from '../../data/goldenHourJewellery';
import { ekSitaraKotaProducts } from '../../data/ekSitaraKota';
import { smartStaplesProducts } from '../../data/smartStaples';
import { potpourriProducts } from '../../data/potpourriProducts';
// *** END ADDED IMPORTS ***


// --- Define colors array locally or import ---
const colors = [
    { name: 'white', hex: '#FFFFFF' }, { name: 'beige', hex: '#f5f5dc' },
    { name: 'brown', hex: '#a52a2a' }, { name: 'orange', hex: '#ffa500' },
    { name: 'black', hex: '#000000' }, { name: 'purple', hex: '#800080' },
    { name: 'pink', hex: '#ffc0cb' }, { name: 'grey', hex: '#808080' },
    { name: 'blue', hex: '#0000ff' }, { name: 'green', hex: '#008000' },
    { name: 'red', hex: '#ff0000' }, { name: 'yellow', hex: '#ffff00' },
    { name: 'teal', hex: '#008080' }, { name: 'magenta', hex: '#ff00ff' },
    { name: 'maroon', hex: '#800000' }, { name: 'mustard', hex: '#ffdb58' },
    { name: 'silver', hex: '#c0c0c0' }, { name: 'gold', hex: '#ffd700' },
];
// ---


// *** MODIFIED: Accept appliedFilters and sortOrder props ***
const ProductList = ({ collectionName, products: productsData = null, setPage, searchQuery = null, appliedFilters = { color: null, price: null, style: null }, sortOrder = 'manual' }) => {

    let productsPerPage = 16;
    let title = ""; // Keep title logic as is

    // --- Price Range Parsing Logic (Keep existing) ---
    const parsePriceRange = (rangeString) => {
        if (!rangeString) return { min: 0, max: Infinity };
        if (rangeString.startsWith('above ')) {
            const min = parseInt(rangeString.replace('above ', ''), 10);
            return isNaN(min) ? { min: 0, max: Infinity } : { min: min, max: Infinity };
        }
        const parts = rangeString.split('-');
        if (parts.length === 2) {
            const min = parseInt(parts[0], 10);
            const max = parseInt(parts[1], 10);
            return (isNaN(min) || isNaN(max)) ? { min: 0, max: Infinity } : { min: min, max: max };
        }
        return { min: 0, max: Infinity };
    };
    // --- End Price Range Logic ---


    // *** MODIFIED: useMemo now includes filtering and sorting logic ***
    const productsToDisplay = useMemo(() => {
        let initialProducts = []; // Start with an empty list

        // 1. Determine the initial set of products (Keep existing logic)
        if (searchQuery) {
            const lowerQuery = searchQuery.toLowerCase();
            initialProducts = allProducts.filter(p => {
                const nameMatch = p && p.name ? p.name.toLowerCase().includes(lowerQuery) : false;
                const tagsMatch = p && p.tags ? p.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) : false;
                return nameMatch || tagsMatch;
            });
        } else if (productsData && Array.isArray(productsData)) {
            initialProducts = [...productsData]; // Create a copy to avoid mutating prop
        } else {
            const collectionKey = collectionName ? String(collectionName).trim().toUpperCase() : '';
            if (collectionKey === "POTPOURRI") initialProducts = [...potpourriProducts];
            else if (collectionKey === "SOULFUL WEAVES - COTTON SAREES (NEW)") initialProducts = [...soulfulWeavesProducts];
            else if (collectionKey === "IKTARA - JAMDANI WEAVES") initialProducts = [...iktaraWeavesProducts];
            else if (collectionKey === "RAANJHANA - BENARASI WEAVES") initialProducts = [...raanjhanaWeavesProducts];
            else if (collectionKey === "MASAKALI - CHANDERI WEAVES") initialProducts = [...masakaliWeavesProducts];
            else if (collectionKey === "POPSICLE - EVERYDAY COTTONS") initialProducts = [...popsicleCottonsProducts];
            else if (collectionKey === "DOODHE-AALTA - RED-BORDERED WHITE SAREES") initialProducts = [...doodheAaltaSareesProducts];
            else if (collectionKey === "STORIES FROM HOME - COTTON SAREES") initialProducts = [...storiesFromHomeProducts];
            else if (collectionKey === "ROOPKATHA - BALUCHARI AND SWARNACHARI") initialProducts = [...roopkathaWeavesProducts];
            else if (collectionKey === "CANDYFLOSS - COTTON SAREES") initialProducts = [...candyflossCottonsProducts];
            else if (collectionKey === "NOOR - ORGANZA BENARASI") initialProducts = [...noorOrganzaProducts];
            else if (collectionKey === "SUNKISSED - MINIMALIST JEWELLERY") initialProducts = [...sunkissedJewelleryProducts];
            else if (collectionKey === "A MIDAS TOUCH - TUSSAR SILK") initialProducts = [...aMidasTouchSilkProducts];
            else if (collectionKey === "GOLDEN HOUR - ECLECTIC JEWELLERY") initialProducts = [...goldenHourJewelleryProducts];
            else if (collectionKey === "EK SITARA - KOTA SAREES") initialProducts = [...ekSitaraKotaProducts];
            else if (collectionKey === "SMART STAPLES - A WORKWEAR EDIT") initialProducts = [...smartStaplesProducts];
            else if (collectionKey === 'JEWELLERY') initialProducts = [...jewelleryProducts];
            else if (collectionKey === 'ALL PRODUCTS') initialProducts = [...allProducts];
            else if (!collectionKey || collectionKey === 'SHOP' || collectionKey === 'SAREES') initialProducts = [...sareeProducts];
            else {
                 console.warn("ProductList useMemo: Unrecognized collection key:", collectionKey);
                 initialProducts = [];
            }
        }

        // --- 2. Apply filters (color, price) if they exist (Keep existing logic) ---
        let filteredProducts = initialProducts;

        // Apply Color Filter
        if (appliedFilters?.color) {
            const colorName = colors.find(c => c.hex === appliedFilters.color)?.name;
            if (colorName) {
                const lowerColor = colorName.toLowerCase();
                filteredProducts = filteredProducts.filter(p => {
                    const nameMatch = p?.name ? p.name.toLowerCase().includes(lowerColor) : false;
                    const tagsMatch = p?.tags ? p.tags.some(tag => tag.toLowerCase() === lowerColor) : false;
                    return nameMatch || tagsMatch;
                });
            } else {
                 console.warn("Could not find color name for hex:", appliedFilters.color);
            }
        }

        // Apply Price Filter
        if (appliedFilters?.price) {
            const { min, max } = parsePriceRange(appliedFilters.price);
            filteredProducts = filteredProducts.filter(p => {
                const price = p?.price ?? null;
                if (typeof price !== 'number') return false;
                return price >= min && price <= max;
            });
        }

        // --- 3. Apply Sorting (NEW) ---
        if (sortOrder === 'price-asc') {
            // Sort Low to High
            filteredProducts.sort((a, b) => (a.price || 0) - (b.price || 0));
        } else if (sortOrder === 'price-desc' || sortOrder === 'featured') {
            // Sort High to Low (Treating 'Featured' as 'Price, high to low')
            filteredProducts.sort((a, b) => (b.price || 0) - (a.price || 0));
        }
        // If sortOrder is 'manual', we do nothing and keep the original source order.

        return filteredProducts;

    }, [searchQuery, productsData, collectionName, appliedFilters, sortOrder]); // *** ADD appliedFilters and sortOrder dependency ***

    // Keep existing useMemo for title calculation
    useMemo(() => {
        // ... (keep existing title logic) ...
        if (searchQuery) {
             title = `Search Results for "${searchQuery}"`;
        } else if (collectionName) {
             // ... (keep existing title mapping logic) ...
            const upperCollectionName = String(collectionName).toUpperCase().replace(/-/g, ' ');
            if (upperCollectionName === "NECKPIECES") title = "Neckpieces";
            else if (upperCollectionName === "EARRINGS") title = "Earrings";
            else if (upperCollectionName === "BANGLES CUFFS") title = "Bangles & Cuffs";
            else if (upperCollectionName === "RINGS") title = "Rings";
            else if (upperCollectionName === "JEWELLERY") title = "Jewellery";
            else if (upperCollectionName === "NEW ARRIVALS JEWELLERY") title = "New Arrivals - Jewellery";
            else if (upperCollectionName === "COTTON SAREES") title = "Cotton Sarees";
            else if (upperCollectionName === "SILK & TUSSAR SAREES") title = "Silk & Tussar Sarees";
            else if (upperCollectionName === "LINEN SAREES") title = "Linen Sarees";
            else if (upperCollectionName === "CHANDERI SAREES") title = "Chanderi Sarees";
            else if (collectionName === 'SOULFUL WEAVES - Cotton Sarees (NEW)') title = "Soulful Weaves";
            else if (collectionName === 'IKTARA - Jamdani Weaves') title = "Iktara - Jamdani Stories";
            else if (collectionName === 'RAANJHANA - Benarasi Weaves') title = "Raanjhana - Banarasi Weaves";
            else if (collectionName === 'MASAKALI - Chanderi Weaves') title = "Masakali";
            else if (collectionName === 'POPSICLE - Everyday Cottons') title = "Popsicle - Everyday Cottons";
            else if (collectionName === 'DOODHE-AALTA - Red-Bordered White Sarees') title = "Doodhe-Aalta";
            else if (collectionName === 'STORIES FROM HOME - Cotton Sarees') title = "Stories From Home";
            else if (collectionName === 'ROOPKATHA - Baluchari and Swarnachari') title = "Roopkatha";
            else if (collectionName === 'CANDYFLOSS - Cotton Sarees') title = "Candyfloss";
            else if (collectionName === 'NOOR - Organza Benarasi') title = "Noor - A Tale of Organza";
            else if (collectionName === 'SUNKISSED - Minimalist Jewellery') title = "Sunkissed";
            else if (collectionName === 'A MIDAS TOUCH - Tussar Silk') title = "A Midas Touch";
            else if (collectionName === 'GOLDEN HOUR - Eclectic Jewellery') title = "Golden Hour";
            else if (collectionName === 'EK SITARA - Kota Sarees') title = "Ek Sitara";
            else if (collectionName === 'SMART STAPLES - A Workwear Edit') title = "Smart Staples - A Workwear Edit";
            else if (collectionName === 'POTPOURRI') title = "Potpourri";
            else if (collectionName === 'sarees' || collectionName === 'shop') title = "Sarees";
            else if (collectionName === 'All Products') title = "All Products";
            else title = collectionName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        } else {
             title = "Products";
        }
    }, [searchQuery, collectionName]);

    // Ensure productsToDisplay is always an array
    const finalProducts = useMemo(() => Array.isArray(productsToDisplay) ? productsToDisplay : [], [productsToDisplay]);

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);

    // Reset page when products change (Keep existing)
    useEffect(() => {
        setCurrentPage(1);
    }, [finalProducts]);

    const totalPages = finalProducts.length > 0 ? Math.ceil(finalProducts.length / productsPerPage) : 0;
    const firstPageIndex = (currentPage - 1) * productsPerPage;
    const lastPageIndex = firstPageIndex + productsPerPage;
    const currentProducts = finalProducts.slice(firstPageIndex, lastPageIndex);

    const handlePageChange = (pageNumber) => {
        const newPage = Math.max(1, Math.min(pageNumber, totalPages || 1));
        setCurrentPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const showPagination = totalPages > 1;

    return (
        <Container className="product-list-container py-5">
             <Row className="mb-4">
                 <Col>
                     <h2 style={{ textAlign: 'center', fontFamily: "'Cormorant Garamond', serif", fontSize: '28px', fontWeight: 600, color: '#1c1c1c' }}>
                         {title}
                        {(searchQuery || appliedFilters?.color || appliedFilters?.price) && <span style={{fontSize: '1rem', color: '#777', fontWeight: 400, marginLeft: '10px'}}>({finalProducts.length} items)</span>}
                     </h2>
                 </Col>
            </Row>
            <Row xs={2} sm={2} md={4} lg={4} className="g-3">
                {finalProducts.length > 0 ? (
                    currentProducts.map(product => (
                        product && product.id ? (
                            <Col key={product.id} className="mb-4">
                                <ProductCard product={product} setPage={setPage} />
                            </Col>
                        ) : null
                    ))
                ) : (
                    <Col xs={12}><p className="text-center">No products found{searchQuery ? ` matching "${searchQuery}"` : ''}{appliedFilters?.color || appliedFilters?.price ? ' with the selected filters' : ''}.</p></Col>
                )}
            </Row>
            {showPagination && (
                 <Row>
                     <Col className="d-flex justify-content-center mt-4">
                         <Pagination
                             currentPage={currentPage}
                             totalPages={totalPages}
                             onPageChange={handlePageChange}
                         />
                     </Col>
                 </Row>
            )}
        </Container>
    );
};

export default ProductList;
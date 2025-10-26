// src/components/product/ProductList.jsx

import React, { useState, useEffect, useMemo } from 'react'; // Import useMemo
import { Container, Row, Col, Pagination as BootstrapPagination } from 'react-bootstrap';
import ProductCard from './ProductCard';

// --- Import all products needed for search ---
import { allProducts } from '../../utils/searchUtils';
// --- Import individual collection data sources needed for COLLECTION MODE ---
// (Make sure these are correctly imported if you still support direct collection loading)
import { products as sareeProducts } from '../../data/products';
import { jewellery as jewelleryProducts } from '../../data/jewellery';
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


const ProductList = ({ collectionName, products: productsData = null, setPage, searchQuery = null }) => {

    let productsPerPage = 16;
    let title = ""; // Initialize title

    // --- FIX: Use useMemo to calculate productsToDisplay ---
    const productsToDisplay = useMemo(() => {
        console.log("Recalculating productsToDisplay..."); // Debug log
        if (searchQuery) {
            // --- SEARCH MODE ---
            console.log("Search Mode Active, Query:", searchQuery);
            const lowerQuery = searchQuery.toLowerCase();
            return allProducts.filter(p => { //
                const nameMatch = p && p.name ? p.name.toLowerCase().includes(lowerQuery) : false;
                const tagsMatch = p && p.tags ? p.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) : false;
                return nameMatch || tagsMatch;
            });
        } else if (productsData && Array.isArray(productsData)) {
            // --- CATEGORY MODE (Data passed directly) ---
            console.log("Category Mode (Direct Data) Active, Collection:", collectionName);
            return productsData;
        } else {
             // --- COLLECTION MODE (Fetching data based on collectionName) ---
            const collectionKey = collectionName ? String(collectionName).trim().toUpperCase() : '';
            console.log("Collection Mode Active, Key:", collectionKey);

            if (collectionKey === "POTPOURRI") return potpourriProducts; //
            else if (collectionKey === "SOULFUL WEAVES - COTTON SAREES (NEW)") return soulfulWeavesProducts; //
            else if (collectionKey === "IKTARA - JAMDANI WEAVES") return iktaraWeavesProducts; //
            else if (collectionKey === "RAANJHANA - BENARASI WEAVES") return raanjhanaWeavesProducts; //
            else if (collectionKey === "MASAKALI - CHANDERI WEAVES") return masakaliWeavesProducts; //
            else if (collectionKey === "POPSICLE - EVERYDAY COTTONS") return popsicleCottonsProducts; //
            else if (collectionKey === "DOODHE-AALTA - RED-BORDERED WHITE SAREES") return doodheAaltaSareesProducts; //
            else if (collectionKey === "STORIES FROM HOME - COTTON SAREES") return storiesFromHomeProducts; //
            else if (collectionKey === "ROOPKATHA - BALUCHARI AND SWARNACHARI") return roopkathaWeavesProducts; //
            else if (collectionKey === "CANDYFLOSS - COTTON SAREES") return candyflossCottonsProducts; //
            else if (collectionKey === "NOOR - ORGANZA BENARASI") return noorOrganzaProducts; //
            else if (collectionKey === "SUNKISSED - MINIMALIST JEWELLERY") return sunkissedJewelleryProducts; //
            else if (collectionKey === "A MIDAS TOUCH - TUSSAR SILK") return aMidasTouchSilkProducts; //
            else if (collectionKey === "GOLDEN HOUR - ECLECTIC JEWELLERY") return goldenHourJewelleryProducts; //
            else if (collectionKey === "EK SITARA - KOTA SAREES") return ekSitaraKotaProducts; //
            else if (collectionKey === "SMART STAPLES - A WORKWEAR EDIT") return smartStaplesProducts; //
            // General Jewellery check
            else if (collectionKey === 'JEWELLERY') return jewelleryProducts; //
            // Fallback for default '/shop', empty collectionName, or 'sarees'
            else if (!collectionKey || collectionKey === 'SHOP' || collectionKey === 'SAREES') return sareeProducts; //
            // Fallback for unrecognized collection name
            else {
                 console.warn("ProductList useMemo: Unrecognized collection key:", collectionKey);
                 return [];
            }
        }
    // --- Dependencies for useMemo ---
    }, [searchQuery, productsData, collectionName]); // Recalculate only if these change
    // --- END FIX ---


    // Determine Title based on mode AFTER productsToDisplay is calculated
    useMemo(() => {
        if (searchQuery) {
             title = `Search Results for "${searchQuery}"`;
        } else if (collectionName) {
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
            // Check specific collection names derived from data files
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
            else title = collectionName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '); // Capitalize words fallback
        } else {
             title = "Products"; // Default fallback
        }
    }, [searchQuery, collectionName]); // Update title if mode changes

    // Ensure productsToDisplay is always an array (redundant check, but safe)
    if (!Array.isArray(productsToDisplay)) {
        console.error("ProductList: productsToDisplay is not an array AFTER useMemo for:", collectionName || searchQuery);
        productsToDisplay = [];
    }


    // --- Pagination Logic (Local State) ---
    const [currentPage, setCurrentPage] = useState(1); // Use local state for pagination

    // Reset to page 1 if products change (e.g., new search, new collection)
    useEffect(() => {
        console.log("ProductList useEffect: Resetting currentPage to 1 because productsToDisplay changed."); // DEBUG
        setCurrentPage(1);
    }, [productsToDisplay]); // Reset page ONLY when the memoized list of products changes


    const totalPages = productsToDisplay.length > 0 ? Math.ceil(productsToDisplay.length / productsPerPage) : 0;
    const firstPageIndex = (currentPage - 1) * productsPerPage;
    const lastPageIndex = firstPageIndex + productsPerPage;

    // Debugging logs
    console.log(`ProductList Render: searchQuery=${searchQuery}, collectionName=${collectionName}`);
    console.log(`ProductList Render: currentPage=${currentPage}, firstPageIndex=${firstPageIndex}, lastPageIndex=${lastPageIndex}, totalPages=${totalPages}, totalProducts=${productsToDisplay.length}`);

    const currentProducts = productsToDisplay.slice(firstPageIndex, lastPageIndex);

    const handlePageChange = (pageNumber) => {
        const newPage = Math.max(1, Math.min(pageNumber, totalPages || 1));
        console.log(`ProductList handlePageChange: Changing page from ${currentPage} to ${newPage}`); // DEBUG
        setCurrentPage(newPage); // Update local state
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const showPagination = totalPages > 1;

    // --- JSX Return ---
    return (
        <Container className="product-list-container py-5">
             <Row className="mb-4">
                 <Col>
                     <h2 style={{ textAlign: 'center', fontFamily: "'Cormorant Garamond', serif", fontSize: '28px', fontWeight: 600, color: '#1c1c1c' }}>
                         {title}
                        {/* Show count for search results */}
                        {searchQuery && <span style={{fontSize: '1rem', color: '#777', fontWeight: 400, marginLeft: '10px'}}>({productsToDisplay.length} items)</span>}
                     </h2>
                 </Col>
            </Row>
            <Row xs={2} sm={2} md={4} lg={4} className="g-3">
                {productsToDisplay.length > 0 ? (
                    currentProducts.map(product => (
                        product && product.id ? (
                            <Col key={product.id} className="mb-4">
                                {/* Pass setPage down to ProductCard */}
                                <ProductCard product={product} setPage={setPage} />
                            </Col>
                        ) : null
                    ))
                ) : (
                    <Col xs={12}><p className="text-center">No products found{searchQuery ? ` matching "${searchQuery}"` : ''}.</p></Col> // More specific message
                )}
            </Row>
            {showPagination && (
                 <Row>
                     <Col className="d-flex justify-content-center mt-4">
                         <BootstrapPagination>
                             <BootstrapPagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                             {[...Array(totalPages).keys()].map(number => (
                                 <BootstrapPagination.Item
                                     key={number + 1}
                                     active={number + 1 === currentPage}
                                     onClick={() => handlePageChange(number + 1)}
                                 >
                                     {number + 1}
                                 </BootstrapPagination.Item>
                             ))}
                             <BootstrapPagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages || totalPages === 0} />
                         </BootstrapPagination>
                     </Col>
                 </Row>
            )}
        </Container>
    );
};

export default ProductList;
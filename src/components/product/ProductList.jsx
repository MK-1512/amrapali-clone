// src/components/product/ProductList.jsx

import React from 'react';
import { Container, Row, Col, Pagination as BootstrapPagination } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import ProductCard from './ProductCard';

// Import all required product data sources
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
// Import bestseller products (might be needed if a collection uses them)
// import { bestsellerProducts } from '../../data/bestsellerProducts';


// Accept setPage prop for navigation
const ProductList = ({ collectionName, products: productsData = null, setPage }) => {
    const [searchParams, setSearchParams] = useSearchParams();

    let productsToDisplay = [];
    let productsPerPage = 16;
    let title = "Products"; // Default title

    // --- Determine which product list to use ---
    if (productsData && Array.isArray(productsData)) {
        // If productsData is passed directly (e.g., filtered results from category pages)
        productsToDisplay = productsData;
        if (collectionName) {
            // Simple title based on collectionName when data is passed directly
            const upperCollectionName = String(collectionName).toUpperCase().replace(/-/g, ' '); // Replace hyphens for better display
            if (upperCollectionName === "NECKPIECES") title = "Neckpieces";
            else if (upperCollectionName === "EARRINGS") title = "Earrings";
            else if (upperCollectionName === "BANGLES CUFFS") title = "Bangles & Cuffs";
            else if (upperCollectionName === "RINGS") title = "Rings";
            else if (upperCollectionName === "JEWELLERY") title = "Jewellery";
            else if (upperCollectionName === "NEW ARRIVALS JEWELLERY") title = "New Arrivals - Jewellery";
             // Saree Categories
            else if (upperCollectionName === "COTTON SAREES") title = "Cotton Sarees";
            else if (upperCollectionName === "SILK & TUSSAR SAREES") title = "Silk & Tussar Sarees";
            else if (upperCollectionName === "LINEN SAREES") title = "Linen Sarees";
            else if (upperCollectionName === "CHANDERI SAREES") title = "Chanderi Sarees";
            else title = collectionName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '); // Capitalize words
        } else {
             title = "Products"; // Fallback if no collectionName provided with data
        }

    } else {
        // --- If no productsData passed, use collectionName to fetch data ---
        const collectionKey = collectionName ? String(collectionName).trim().toUpperCase() : '';

        // Named Collections & Specific Categories
        if (collectionKey === "POTPOURRI") { productsToDisplay = potpourriProducts; title = "Potpourri"; }
        else if (collectionKey === "SOULFUL WEAVES - COTTON SAREES (NEW)") { productsToDisplay = soulfulWeavesProducts; title = "Soulful Weaves"; }
        else if (collectionKey === "IKTARA - JAMDANI WEAVES") { productsToDisplay = iktaraWeavesProducts; title = "Iktara - Jamdani Stories"; }
        else if (collectionKey === "RAANJHANA - BENARASI WEAVES") { productsToDisplay = raanjhanaWeavesProducts; title = "Raanjhana - Banarasi Weaves"; }
        else if (collectionKey === "MASAKALI - CHANDERI WEAVES") { productsToDisplay = masakaliWeavesProducts; title = "Masakali"; }
        else if (collectionKey === "POPSICLE - EVERYDAY COTTONS") { productsToDisplay = popsicleCottonsProducts; title = "Popsicle - Everyday Cottons"; }
        else if (collectionKey === "DOODHE-AALTA - RED-BORDERED WHITE SAREES") { productsToDisplay = doodheAaltaSareesProducts; title = "Doodhe-Aalta"; }
        else if (collectionKey === "STORIES FROM HOME - COTTON SAREES") { productsToDisplay = storiesFromHomeProducts; title = "Stories From Home"; }
        else if (collectionKey === "ROOPKATHA - BALUCHARI AND SWARNACHARI") { productsToDisplay = roopkathaWeavesProducts; title = "Roopkatha"; }
        else if (collectionKey === "CANDYFLOSS - COTTON SAREES") { productsToDisplay = candyflossCottonsProducts; title = "Candyfloss"; }
        else if (collectionKey === "NOOR - ORGANZA BENARASI") { productsToDisplay = noorOrganzaProducts; title = "Noor - A Tale of Organza"; }
        else if (collectionKey === "SUNKISSED - MINIMALIST JEWELLERY") { productsToDisplay = sunkissedJewelleryProducts; title = "Sunkissed"; }
        else if (collectionKey === "A MIDAS TOUCH - TUSSAR SILK") { productsToDisplay = aMidasTouchSilkProducts; title = "A Midas Touch"; }
        else if (collectionKey === "GOLDEN HOUR - ECLECTIC JEWELLERY") { productsToDisplay = goldenHourJewelleryProducts; title = "Golden Hour"; }
        else if (collectionKey === "EK SITARA - KOTA SAREES") { productsToDisplay = ekSitaraKotaProducts; title = "Ek Sitara"; }
        else if (collectionKey === "SMART STAPLES - A WORKWEAR EDIT") { productsToDisplay = smartStaplesProducts; title = "Smart Staples - A Workwear Edit"; }
        // General Jewellery check (Shows ALL jewellery if collectionName is 'jewellery')
        else if (collectionKey === 'JEWELLERY') { productsToDisplay = jewelleryProducts; title = "Jewellery"; }
        // Fallback for default '/shop', empty collectionName, or 'sarees' -> Show main saree list
        else if (!collectionKey || collectionKey === 'SHOP' || collectionKey === 'SAREES') {
            productsToDisplay = sareeProducts;
            title = "Sarees";
        }
        // Fallback for unrecognized collection name
        else {
             productsToDisplay = [];
             title = collectionName ? collectionName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : "Unknown Collection";
             console.warn("ProductList: Unrecognized collection key:", collectionKey);
        }
    }
    // --- End data selection logic ---

    // Ensure productsToDisplay is always an array
    if (!Array.isArray(productsToDisplay)) {
        console.error("ProductList: productsToDisplay is not an array for collection:", collectionName, "Data used:", productsData);
        productsToDisplay = [];
    }


    // --- Pagination Logic ---
    const currentPage = parseInt(searchParams.get('page') || '1', 10);
    const totalPages = productsToDisplay.length > 0 ? Math.ceil(productsToDisplay.length / productsPerPage) : 0;
    const firstPageIndex = (currentPage - 1) * productsPerPage;
    const lastPageIndex = firstPageIndex + productsPerPage;
    const currentProducts = productsToDisplay.slice(firstPageIndex, lastPageIndex);
    // --- End Pagination Logic ---

    const handlePageChange = (pageNumber) => {
        const newPage = Math.max(1, Math.min(pageNumber, totalPages || 1));
        setSearchParams({ page: newPage });
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
                     </h2>
                 </Col>
            </Row>
            <Row xs={2} sm={2} md={4} lg={4} className="g-3">
                {productsToDisplay.length > 0 ? (
                    currentProducts.map(product => (
                        // Add safety check here too
                        product && product.id ? (
                            <Col key={product.id} className="mb-4">
                                {/* Pass setPage down to ProductCard */}
                                <ProductCard product={product} setPage={setPage} />
                            </Col>
                        ) : null // Skip rendering if product or id is missing
                    ))
                ) : (
                    <Col xs={12}><p className="text-center">No products found in this collection.</p></Col>
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
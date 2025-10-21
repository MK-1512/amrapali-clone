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
// --- Import the new Smart Staples data file ---
import { smartStaplesProducts } from '../../data/smartStaples'; // Ensure this file exists and path is correct


const ProductList = ({ collectionName }) => {
    const [searchParams, setSearchParams] = useSearchParams();

    let allProducts = [];
    let productsPerPage = 16;
    let title = "Products";

    // Normalize collection name
    const collectionKey = collectionName ? String(collectionName).trim().toUpperCase() : '';
    // console.log(`ProductList received collectionName: "${collectionName}" | Normalized Key: "${collectionKey}"`);

    // --- Logic to select product data based on collectionName ---
    // Specific Jewellery Collections
    if (collectionKey === "SUNKISSED - MINIMALIST JEWELLERY") { allProducts = sunkissedJewelleryProducts; title = "Sunkissed"; }
    else if (collectionKey === "GOLDEN HOUR - ECLECTIC JEWELLERY") { allProducts = goldenHourJewelleryProducts; title = "Golden Hour"; }
    // General Jewellery check
    else if (collectionKey.includes('JEWELLERY')) { allProducts = jewelleryProducts; title = collectionName ? collectionName.split('-')[0].trim() : "Jewellery"; }
    // Saree Collections
    else if (collectionKey === "SOULFUL WEAVES - COTTON SAREES (NEW)") { allProducts = soulfulWeavesProducts; title = "Soulful Weaves"; }
    else if (collectionKey === "IKTARA - JAMDANI WEAVES")           { allProducts = iktaraWeavesProducts; title = "Iktara - Jamdani Stories"; }
    else if (collectionKey === "RAANJHANA - BENARASI WEAVES")        { allProducts = raanjhanaWeavesProducts; title = "Raanjhana - Banarasi Weaves"; }
    else if (collectionKey === "MASAKALI - CHANDERI WEAVES")         { allProducts = masakaliWeavesProducts; title = "Masakali"; }
    else if (collectionKey === "POPSICLE - EVERYDAY COTTONS")        { allProducts = popsicleCottonsProducts; title = "Popsicle - Everyday Cottons"; }
    else if (collectionKey === "DOODHE-AALTA - RED-BORDERED WHITE SAREES") { allProducts = doodheAaltaSareesProducts; title = "Doodhe-Aalta"; }
    else if (collectionKey === "STORIES FROM HOME - COTTON SAREES")  { allProducts = storiesFromHomeProducts; title = "Stories From Home"; }
    else if (collectionKey === "ROOPKATHA - BALUCHARI AND SWARNACHARI") { allProducts = roopkathaWeavesProducts; title = "Roopkatha"; }
    else if (collectionKey === "CANDYFLOSS - COTTON SAREES")         { allProducts = candyflossCottonsProducts; title = "Candyfloss"; }
    else if (collectionKey === "NOOR - ORGANZA BENARASI")            { allProducts = noorOrganzaProducts; title = "Noor - A Tale of Organza"; }
    else if (collectionKey === "A MIDAS TOUCH - TUSSAR SILK")        { allProducts = aMidasTouchSilkProducts; title = "A Midas Touch"; }
    else if (collectionKey === "EK SITARA - KOTA SAREES")            { allProducts = ekSitaraKotaProducts; title = "Ek Sitara"; }
    // --- Add 'else if' block for SMART STAPLES ---
    else if (collectionKey === "SMART STAPLES - A WORKWEAR EDIT") {
        allProducts = smartStaplesProducts; // Use the imported data
        title = "Smart Staples - A Workwear Edit"; // Set the title
        // productsPerPage defaults to 16, handles 13 items (1 page)
    }
    // --- END SMART STAPLES block ---

    // Fallback for default '/shop' or empty collectionName
    else if (!collectionKey || collectionKey === 'SHOP' || collectionKey === 'SAREES') { // Added SAREES check just in case
        allProducts = sareeProducts;
        title = "Sarees";
    }
    // Fallback for unrecognized collection name
    else {
         allProducts = []; // Set to empty
         title = collectionName ? collectionName.split('-')[0].trim() : "Unknown Collection";
         console.warn("Unrecognized collection key:", collectionKey);
    }
    // --- End data selection logic ---

    // --- Pagination Logic ---
    const currentPage = parseInt(searchParams.get('page') || '1', 10);
    const totalPages = allProducts.length > 0 ? Math.ceil(allProducts.length / productsPerPage) : 0;
    const firstPageIndex = (currentPage - 1) * productsPerPage;
    const lastPageIndex = firstPageIndex + productsPerPage;
    const currentProducts = allProducts.slice(firstPageIndex, lastPageIndex);
    // --- End Pagination Logic ---

    const handlePageChange = (pageNumber) => {
        setSearchParams({ page: pageNumber });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const showPagination = totalPages > 1;

    // --- JSX Return ---
    return (
        <Container className="product-list-container py-5">
             <Row className="mb-4"> <Col> <h2 style={{ textAlign: 'center', fontFamily: "'Cormorant Garamond', serif", fontSize: '28px', fontWeight: 600, color: '#1c1c1c' }}> {title} </h2> </Col> </Row>
            <Row xs={2} sm={2} md={4} lg={4} className="g-3">
                {allProducts.length > 0 ? ( currentProducts.map(product => ( product && product.id ? ( <Col key={product.id} className="mb-4"> <ProductCard product={product} /> </Col> ) : null )) ) : ( <Col><p className="text-center">No products found in this collection.</p></Col> )}
            </Row>
            {showPagination && ( <Row> <Col className="d-flex justify-content-center mt-4"> <BootstrapPagination> <BootstrapPagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} /> {[...Array(totalPages).keys()].map(number => ( <BootstrapPagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => handlePageChange(number + 1)}> {number + 1} </BootstrapPagination.Item> ))} <BootstrapPagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages || totalPages === 0} /> </BootstrapPagination> </Col> </Row> )}
        </Container>
    );
};

export default ProductList;
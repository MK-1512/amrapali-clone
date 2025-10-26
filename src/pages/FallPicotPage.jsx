// src/pages/FallPicotPage.jsx
import React, { useState, useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import FilterBar from '../components/filters/FilterBar';
import FilterDrawer from '../components/filters/FilterDrawer';
import FallPicotHeroBanner from '../components/common/FallPicotHeroBanner';
import { CurrencyContext } from '../context/CurrencyContext';
import { formatPrice } from '../utils/currencyUtils';
import ProductCard from '../components/product/ProductCard'; // <-- Import ProductCard

// Define the Fall & Picot product/service details
const fallPicotItem = {
  id: 'fall-picot-service', // Unique ID
  name: "Fall & Picot",
  price: 125, // Price is hardcoded in INR
  originalPrice: null,
  image1: "https://www.amrapaliboutique.in/cdn/shop/products/fall_and_pico_image_1_900x.png?v=1570130620",
  // Add image2 if you want hover effect (can be same as image1)
  image2: "https://www.amrapaliboutique.in/cdn/shop/products/fall_and_pico_image_1_900x.png?v=1570130620",
  tags: ["Service"],
  availability: "Available",
};

// Accept setPage prop
const FallPicotPage = ({ setPage }) => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const handleOpenFilter = () => setIsFilterOpen(true);
    const handleCloseFilter = () => setIsFilterOpen(false);

    // Currency context is needed if ProductCard uses it, otherwise optional here
    // const { selectedCurrency } = useContext(CurrencyContext);
    // const getFormattedPrice = (price) => formatPrice(price, selectedCurrency.code);

    // Navigation is now handled by ProductCard internally linking to product detail
    // and its Quick View modal uses setPage

    return (
        <>
            <FallPicotHeroBanner />
            <FilterBar handleOpenFilter={handleOpenFilter} />

            <Container className="product-list-container py-5">
                 <Row className="justify-content-center">
                    <Col xs={6} sm={4} md={3} className="mb-4">
                         {/* --- Use ProductCard --- */}
                         <ProductCard
                             product={fallPicotItem}
                             setPage={setPage} // Pass setPage for Quick View's "View Details"
                         />
                         {/* --- End ProductCard --- */}
                    </Col>
                 </Row>
            </Container>

            <FilterDrawer show={isFilterOpen} handleClose={handleCloseFilter} />
        </>
    );
};

export default FallPicotPage;
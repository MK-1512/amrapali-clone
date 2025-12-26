import React, { useState, useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import FilterBar from '../components/filters/FilterBar';
import FilterDrawer from '../components/filters/FilterDrawer';
import FallPicotHeroBanner from '../components/common/FallPicotHeroBanner';
import { CurrencyContext } from '../context/CurrencyContext';
import { formatPrice } from '../utils/currencyUtils';
import ProductCard from '../components/product/ProductCard';

const fallPicotItem = {
  id: 'fall-picot-service',
  name: "Fall & Picot",
  price: 125,
  originalPrice: null,
  image1: "https://www.amrapaliboutique.in/cdn/shop/products/fall_and_pico_image_1_900x.png?v=1570130620",
  image2: "https://www.amrapaliboutique.in/cdn/shop/products/fall_and_pico_image_1_900x.png?v=1570130620",
  tags: ["Service"],
  availability: "Available",
};

const FallPicotPage = ({ setPage }) => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const handleOpenFilter = () => setIsFilterOpen(true);
    const handleCloseFilter = () => setIsFilterOpen(false);



    return (
        <>
            <FallPicotHeroBanner />
            <FilterBar handleOpenFilter={handleOpenFilter} />

            <Container className="product-list-container py-5">
                 <Row className="justify-content-center">
                    <Col xs={6} sm={4} md={3} className="mb-4">
                         <ProductCard
                             product={fallPicotItem}
                             setPage={setPage}
                         />
                    </Col>
                 </Row>
            </Container>

            <FilterDrawer show={isFilterOpen} handleClose={handleCloseFilter} />
        </>
    );
};

export default FallPicotPage;
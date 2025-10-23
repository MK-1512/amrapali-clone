// src/pages/FallPicotPage.jsx
import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import FilterBar from '../components/filters/FilterBar';
import FilterDrawer from '../components/filters/FilterDrawer';
import FallPicotHeroBanner from '../components/common/FallPicotHeroBanner';
// No longer need ProductCard for this simple display

// Define the Fall & Picot product/service details
const fallPicotItem = {
  id: 'fall-picot-service',
  name: "Fall & Picot",
  price: 125,
  originalPrice: null,
  image1: "https://www.amrapaliboutique.in/cdn/shop/products/fall_and_pico_image_1_900x.png?v=1570130620", // Use the local path
  // image2 is not needed if we don't use ProductCard hover
  tags: ["Service"],
  availability: "Available",
  // reviews: 224 // Add back if you display them
};

const FallPicotPage = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const handleOpenFilter = () => setIsFilterOpen(true);
    const handleCloseFilter = () => setIsFilterOpen(false);

    return (
        <>
            <FallPicotHeroBanner />
            {/* FilterBar might be optional here */}
            <FilterBar handleOpenFilter={handleOpenFilter} />

            <Container className="product-list-container py-5">
                 {/* Display Single Item Directly - No Hover Effect */}
                 <Row className="justify-content-center">
                    {/* Centered column, adjust width as needed */}
                    <Col xs={6} sm={4} md={3} className="mb-4">
                         {/* Simple div structure */}
                         <div className="text-center"> {/* Basic centering */}
                             <div className="product-image-container mb-2"> {/* Optional: reuse class for border */}
                                <img src={fallPicotItem.image1} alt={fallPicotItem.name} className="img-fluid" />
                             </div>
                             <div className="product-info"> {/* Reuse class for styling */}
                                <h6 className="product-name">{fallPicotItem.name}</h6>
                                <p className="product-price">
                                    ₹{fallPicotItem.price.toLocaleString('en-IN')}
                                </p>
                                {/* Add review stars if needed */}
                                {/* Example: */}
                                {/* <div className="product-rating justify-content-center">
                                    <span className="stars">★★★★★</span>
                                    <span className="review-count small ms-2">224 reviews</span>
                                </div> */}
                             </div>
                         </div>
                    </Col>
                 </Row>

                 {/* Recently Viewed Section Placeholder */}
                 {/*
                 <Row className="mt-5">
                    <Col>
                        <h4 className="text-center" style={{fontFamily: "'Cormorant Garamond', serif", fontWeight: 600}}>
                            RECENTLY VIEWED
                        </h4>
                    </Col>
                 </Row>
                 <Row> */}
                     {/* Add ProductCard components for recently viewed items here */}
                 {/* </Row> */}

            </Container>

            <FilterDrawer show={isFilterOpen} handleClose={handleCloseFilter} />
        </>
    );
};

export default FallPicotPage;
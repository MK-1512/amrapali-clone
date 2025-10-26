// src/components/product/RecentlyViewed.jsx
import React, { useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Slider from 'react-slick';
import { RecentlyViewedContext } from '../../context/RecentlyViewedContext';
import ProductCard from './ProductCard';

// This component needs the 'setPage' prop to pass to ProductCard
const RecentlyViewed = ({ setPage }) => {
    const { viewedProducts } = useContext(RecentlyViewedContext);

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1, // Scroll one at a time
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    // Don't render the section if there are no viewed products
    if (!viewedProducts || viewedProducts.length === 0) {
        return null;
    }

    return (
        <Container className="recently-viewed-section homepage-section">
            <h3 className="section-main-title">RECENTLY VIEWED</h3>
            <Slider {...settings}>
                {viewedProducts.map(product => (
                    product && product.id ? (
                        <div key={product.id} className="p-2">
                            {/* Pass setPage prop down to ProductCard */}
                            <ProductCard product={product} setPage={setPage} />
                        </div>
                    ) : null 
                ))}
            </Slider>
        </Container>
    );
};

export default RecentlyViewed;
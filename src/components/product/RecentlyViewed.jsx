import React, { useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Slider from 'react-slick';
import { RecentlyViewedContext } from '../../context/RecentlyViewedContext';
import ProductCard from './ProductCard';

const RecentlyViewed = ({ setPage }) => {
    const { viewedProducts } = useContext(RecentlyViewedContext);

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
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
                            <ProductCard product={product} setPage={setPage} />
                        </div>
                    ) : null 
                ))}
            </Slider>
        </Container>
    );
};

export default RecentlyViewed;
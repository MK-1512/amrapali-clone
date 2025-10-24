// src/components/common/CustomerReviewSlider.jsx
import React from 'react';
import Slider from 'react-slick';
import { Container, Row, Col } from 'react-bootstrap';
import { customerReviews, totalReviewsCount, averageRating } from '../../data/customerReviews';

// Star Rating Component
const StarRating = ({ rating }) => {
    const totalStars = 5;
    return (
        <div style={{ color: '#ffb3ba', fontSize: '14px', marginBottom: '10px' }}>
            {[...Array(totalStars)].map((_, index) => (
                <span key={index}>{index < rating ? '★' : '☆'}</span>
            ))}
        </div>
    );
};

// Individual Review Card
const ReviewCard = ({ review }) => {
    const cardStyle = {
        padding: '20px',
        textAlign: 'center',
        fontFamily: "'Jost', sans-serif",
        color: '#555',
        fontSize: '14px',
        lineHeight: 1.7,
        margin: '0 10px', // Add horizontal margin for spacing between cards
    };
    const imageStyle = {
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        margin: '0 auto 10px auto',
        objectFit: 'cover',
        display: 'block',
    };
     const nameStyle = {
        fontWeight: 500,
        color: '#1c1c1c',
        marginTop: '15px',
        fontSize: '13px',
     };

    return (
        <div style={cardStyle}>
            <StarRating rating={review.rating} />
            <p style={{ minHeight: '100px', marginBottom: '15px' }}>{review.review}</p>
            <img src={review.image} alt={review.name} style={imageStyle} />
            <p style={nameStyle}>{review.name}</p>
        </div>
    );
};


// Main Slider Component
const CustomerReviewSlider = () => {
    const settings = {
        dots: false, // Hide dots
        infinite: true,
        speed: 500,
        slidesToShow: 3, // Show 3 reviews at a time
        slidesToScroll: 1, // Scroll one review at a time
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true,
        arrows: true, // Show arrows
        responsive: [
            {
                breakpoint: 992, // Medium screens
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 768, // Small screens
                settings: {
                    slidesToShow: 1,
                }
            }
        ],
         // Custom Arrows (Optional, but matches video better)
        // prevArrow: <button className="slick-prev slick-arrow" aria-label="Previous" type="button" style={{left: '-25px'}}>‹</button>,
        // nextArrow: <button className="slick-next slick-arrow" aria-label="Next" type="button" style={{right: '-25px'}}>›</button>,
    };

    const overallRatingStyle = {
        color: '#ffb3ba',
        fontSize: '18px',
        marginBottom: '5px'
    };
    const totalReviewsStyle = {
        fontSize: '13px',
        color: '#777',
        marginBottom: '30px'
    };

    return (
        <Container className="homepage-section customer-review-slider-section">
            {/* Title */}
            <p className="section-title">SERVICES</p> {/* Changed title as per video */}
            <h3 className="section-main-title">Let customers speak for us</h3>

            {/* Overall Rating */}
            <div className="text-center">
                 <div style={overallRatingStyle}>
                     {[...Array(5)].map((_, index) => (
                         <span key={index}>{index < averageRating ? '★' : '☆'}</span>
                     ))}
                 </div>
                 <p style={totalReviewsStyle}>from {totalReviewsCount} reviews</p>
            </div>


            {/* Slider */}
            <Slider {...settings}>
                {customerReviews.map(review => (
                    <div key={review.id}> {/* Key on the wrapper div */}
                        <ReviewCard review={review} />
                    </div>
                ))}
            </Slider>
        </Container>
    );
};

export default CustomerReviewSlider;


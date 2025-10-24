// src/pages/GiftCardPage.jsx
import React, { useState, useContext } from 'react';
import { Accordion } from 'react-bootstrap';
import CustomerReviews from '../components/common/CustomerReviews'; 
import { CurrencyContext } from '../context/CurrencyContext'; 
import { formatPrice } from '../utils/currencyUtils'; 
import { WishlistContext } from '../context/WishlistContext'; // <-- NEW IMPORT

const GiftCardPage = () => {
    const { selectedCurrency } = useContext(CurrencyContext); 
    const { addToWishlist, isProductInWishlist } = useContext(WishlistContext); // <-- NEW

    const denominations = [
        { value: 2000, label: '₹2,000.00' },
        { value: 3500, label: '₹3,500.00' },
        { value: 5000, label: '₹5,000.00' },
        { value: 10000, label: '₹10,000.00' }
    ];
    
    // Helper to format a single price
    const getFormattedPrice = (price) => {
        return formatPrice(price, selectedCurrency.code); 
    };

    const [selectedDenomination, setSelectedDenomination] = useState(denominations[0].value);
    const [quantity, setQuantity] = useState(1);
    
    // NOTE: isInWishlist state moved to context logic, but we keep this one 
    // to map to a mock product for simplicity if needed. We'll use a mock item ID for check.
    const mockGiftCardProduct = { id: 'gift-card', name: 'E-GIFT CARD', price: selectedDenomination };
    const isInWishlist = isProductInWishlist(mockGiftCardProduct.id); // <-- USE CONTEXT

    const handleQuantityChange = (amount) => {
        setQuantity((prevQuantity) => Math.max(1, prevQuantity + amount));
    };

    const handleDenominationChange = (e) => {
        setSelectedDenomination(Number(e.target.value));
    };
    
    const totalDenominationINR = selectedDenomination * quantity;
    const formattedPrice = getFormattedPrice(totalDenominationINR);

    return (
        <div className="product-page-container container my-5">
            <div className="row">
                {/* Left Column: Image */}
                <div className="col-lg-6">
                    <img 
                        src="/images/gift-card.jpg" 
                        alt="E-Gift Card" 
                        className="img-fluid product-main-image" 
                    />
                </div>

                {/* Right Column: Details */}
                <div className="col-lg-6">
                    <div className="product-details">
                        <h1 className="product-title">E-GIFT CARD</h1>
                        
                        <div className="product-rating mb-3">
                            <span className="stars">★★★★★</span>
                            <span className="review-count">1 review</span>
                        </div>

                        <p className="product-price">
                            {formattedPrice} 
                        </p>

                        <div className="mb-3">
                             <label className="form-label" style={{ display: 'none' }}>Denominations</label>
                            <select 
                                className="denomination-dropdown"
                                value={selectedDenomination}
                                onChange={handleDenominationChange}
                            >
                                {denominations.map((denom) => (
                                    <option key={denom.value} value={denom.value}>
                                        Denominations: {getFormattedPrice(denom.value)} 
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-3">
                            <div className="quantity-selector">
                                <button 
                                    type="button"
                                    onClick={() => handleQuantityChange(-1)}
                                    disabled={quantity <= 1}
                                >
                                    −
                                </button>
                                <span>{quantity}</span>
                                <button 
                                    type="button"
                                    onClick={() => handleQuantityChange(1)}
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <div className="action-buttons">
                            <button className="btn-add-to-cart" type="button">
                                ADD TO CART
                            </button>
                            <button className="btn-buy-it-now" type="button">
                                BUY IT NOW
                            </button>
                            <button 
                                className={`btn-add-to-wishlist ${isInWishlist ? 'added' : ''}`}
                                type="button"
                                // Use the general addToWishlist function
                                onClick={() => addToWishlist({ id: 'gift-card', name: 'E-GIFT CARD', price: selectedDenomination, image1: '/images/gift-card.jpg' })}
                            >
                                {/* NOTE: wishlistCount is now global, using mock value in original file for visual matching */}
                                {isInWishlist ? 'ADDED TO WISHLIST' : 'ADD TO WISHLIST'}
                                <span className="wishlist-count">26</span> 
                            </button>
                        </div>
                        
                        <div className="product-description-section mt-4">
                            <h4>Need The Perfect Gift in No Time?</h4>
                            <p>
                             Why take the stress of ‘will they like it or won’t they’; when you can leave the choice up to your gift recipient, by sending them an e-gift card? It’s their choice, but it’ll still be your gift! :)
                            </p>
                        </div>

                        
                    </div>
                </div>
            </div>

            {/* 2. ADD THE CUSTOMER REVIEWS SECTION AT THE BOTTOM */}
            <div className="row mt-5">
                <div className="col-12">
                    <CustomerReviews />
                </div>
            </div>
        </div>
    );
};

export default GiftCardPage;
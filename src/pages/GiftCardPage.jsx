// src/pages/GiftCardPage.jsx
import React, { useState, useContext, useEffect } from 'react';
import { Accordion } from 'react-bootstrap';
import CustomerReviews from '../components/common/CustomerReviews';
import { CurrencyContext } from '../context/CurrencyContext';
import { formatPrice } from '../utils/currencyUtils';
import { WishlistContext } from '../context/WishlistContext';
import { CartContext } from '../context/CartContext'; // <-- 1. IMPORT CartContext

// --- Added setPage prop ---
const GiftCardPage = ({ setPage }) => {
    const { selectedCurrency } = useContext(CurrencyContext);
    const { addToWishlist, isProductInWishlist, wishlistItems, wishlistCount } = useContext(WishlistContext);
    const { addToCart } = useContext(CartContext); // <-- 2. GET addToCart function

    const denominations = [
        { value: 2000, label: '₹2,000.00' },
        { value: 3500, label: '₹3,500.00' },
        { value: 5000, label: '₹5,000.00' },
        { value: 10000, label: '₹10,000.00' }
    ];

    const getFormattedPrice = (price) => {
        return formatPrice(price, selectedCurrency.code);
    };

    const [selectedDenomination, setSelectedDenomination] = useState(denominations[0].value);
    const [quantity, setQuantity] = useState(1);

    const giftCardProduct = {
        id: `gift-card-${selectedDenomination}`, // <-- Make ID unique per denomination
        name: `E-GIFT CARD - ${getFormattedPrice(selectedDenomination)}`, // <-- Include denomination in name
        price: selectedDenomination,
        image1: '/images/gift-card.jpg',
        // Important: Ensure addToCart can handle items without image2, tags etc.
    };

    // --- Check based on the *specific* denomination ID ---
    const isInWishlist = isProductInWishlist(giftCardProduct.id);

    const handleQuantityChange = (amount) => {
        setQuantity((prevQuantity) => Math.max(1, prevQuantity + amount));
    };

    const handleDenominationChange = (e) => {
        setSelectedDenomination(Number(e.target.value));
    };

    const handleWishlistToggle = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addToWishlist(giftCardProduct); // Use the current giftCardProduct object
    };

    // --- 3. ADD handleAddToCart function ---
    const handleAddToCart = () => {
        const itemToAdd = { ...giftCardProduct, quantity: quantity, options: {} };
        addToCart(itemToAdd);
        // Optionally: Add user feedback (e.g., toast notification)
        console.log(`${quantity} x ${giftCardProduct.name} added to cart`);
    };

    // --- 4. ADD handleBuyNow function ---
    const handleBuyNow = () => {
        handleAddToCart(); // Add to cart first
        if (setPage) {
            setPage('checkout'); // Navigate to checkout
        } else {
             console.error("setPage function not provided to GiftCardPage");
        }
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
                            {/* --- 5. ATTACH onClick handlers --- */}
                            <button className="btn-add-to-cart" type="button" onClick={handleAddToCart}>
                                ADD TO CART
                            </button>
                            <button className="btn-buy-it-now" type="button" onClick={handleBuyNow}>
                                BUY IT NOW
                            </button>
                             {/* --- END ATTACH --- */}

                            <button
                                className={`btn-add-to-wishlist icon-button ${isInWishlist ? 'added' : ''}`}
                                type="button"
                                onClick={handleWishlistToggle}
                                aria-label={isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24" height="24" viewBox="0 0 24 24"
                                    fill={isInWishlist ? 'currentColor' : 'none'}
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round" strokeLinejoin="round"
                                    className="feather feather-heart wishlist-heart-icon"
                                >
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                </svg>
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

            {/* Customer Reviews Section */}
            <div className="row mt-5">
                <div className="col-12">
                    <CustomerReviews />
                </div>
            </div>
        </div>
    );
};

export default GiftCardPage;
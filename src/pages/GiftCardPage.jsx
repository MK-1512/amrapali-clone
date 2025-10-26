// src/pages/GiftCardPage.jsx
import React, { useState, useContext, useEffect } from 'react'; // <-- Added useEffect
import { Accordion } from 'react-bootstrap';
import CustomerReviews from '../components/common/CustomerReviews';
import { CurrencyContext } from '../context/CurrencyContext';
import { formatPrice } from '../utils/currencyUtils';
import { WishlistContext } from '../context/WishlistContext'; // Keep WishlistContext

const GiftCardPage = () => {
    const { selectedCurrency } = useContext(CurrencyContext);
    // Get wishlistItems as well to trigger re-renders when the list changes
    const { addToWishlist, isProductInWishlist, wishlistItems, wishlistCount } = useContext(WishlistContext); // <-- Get wishlistItems and wishlistCount

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

    // Create the gift card product object dynamically based on selection
    const giftCardProduct = {
        id: 'gift-card', // Use a consistent ID for the gift card type
        name: 'E-GIFT CARD',
        price: selectedDenomination, // Price is the selected denomination
        image1: '/images/gift-card.jpg', // Main image
        // Add quantity if your wishlist context needs it, otherwise, it's usually 1 per wishlist item
    };

    // Determine if the current gift card ID is in the wishlist
    const isInWishlist = isProductInWishlist(giftCardProduct.id);

    // --- Add useEffect to potentially update state if needed, though isInWishlist from context should be reactive ---
    // (Optional: If direct context usage isn't updating UI reliably, add local state synced with useEffect)
    // const [isWishlistedState, setIsWishlistedState] = useState(isInWishlist);
    // useEffect(() => {
    //    setIsWishlistedState(isProductInWishlist(giftCardProduct.id));
    // }, [wishlistItems, giftCardProduct.id, isProductInWishlist]);
    // ---

    const handleQuantityChange = (amount) => {
        setQuantity((prevQuantity) => Math.max(1, prevQuantity + amount));
    };

    const handleDenominationChange = (e) => {
        setSelectedDenomination(Number(e.target.value));
        // Note: If a gift card with a different denomination was already added,
        // this change won't affect the wishlist state unless you re-check or handle updates.
        // The isProductInWishlist check is based on ID only.
    };

    const handleWishlistToggle = (e) => {
        e.preventDefault();
        e.stopPropagation();
        // Add/Remove using the current gift card object details
        addToWishlist(giftCardProduct);
        // Optional: Update local state if used
        // setIsWishlistedState(!isWishlistedState);
    };

    // Calculate total price based on denomination and quantity for display
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

                        {/* Display Price based on selection and quantity */}
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

                            {/* --- MODIFIED WISHLIST BUTTON --- */}
                            <button
                                className={`btn-add-to-wishlist icon-button ${isInWishlist ? 'added' : ''}`} // Add 'icon-button' class
                                type="button"
                                onClick={handleWishlistToggle} // Use the correct handler
                                aria-label={isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24" height="24" viewBox="0 0 24 24"
                                    fill={isInWishlist ? 'currentColor' : 'none'} // Use 'currentColor' for filled state
                                    stroke="currentColor" // Always use current text color for stroke
                                    strokeWidth="1.5"
                                    strokeLinecap="round" strokeLinejoin="round"
                                    className="feather feather-heart wishlist-heart-icon"
                                >
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                </svg>
                                {/* Optional: Display count - adjust styling as needed */}
                                {/* {wishlistCount > 0 && <span className="wishlist-count-badge-inline">{wishlistCount}</span>} */}
                            </button>
                            {/* --- END MODIFIED WISHLIST BUTTON --- */}
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
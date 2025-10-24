// src/components/product/ProductCard.jsx
import React, { useState, useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { WishlistContext } from '../../context/WishlistContext'; // <-- NEW IMPORT
import ProductModal from './ProductModal';
import { CurrencyContext } from '../../context/CurrencyContext'; 
import { formatPrice } from '../../utils/currencyUtils'; 

const ProductCard = ({ product }) => {
    // ✅ THIS IS THE FIX: If for any reason the product is missing, render nothing.
    // This prevents the entire application from crashing.
    if (!product) {
        return null;
    }

    const [isHovered, setIsHovered] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const { addToCart } = useContext(CartContext);
    const { selectedCurrency } = useContext(CurrencyContext);
    // --- NEW: Wishlist Context ---
    const { addToWishlist, isProductInWishlist } = useContext(WishlistContext);
    const isInWishlist = isProductInWishlist(product.id);
    // ----------------------------

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    // Helper to format a single price
    const getFormattedPrice = (price) => {
        if (!price) return '';
        return formatPrice(price, selectedCurrency.code);
    };

    return (
        <div 
            className="product-card"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="product-image-container">
                <img 
                    src={isHovered ? product.image2 : product.image1} 
                    alt={product.name} 
                    className="img-fluid" 
                />
                {product.availability === 'Sold out' && <span className="sold-out-badge">Sold Out</span>}
                
                <div className={`product-actions ${isHovered ? 'visible' : ''}`}>
                    <button className="btn-quick-view" onClick={handleOpenModal}>Quick View</button>
                    <button 
                        className="btn-add-to-cart-grid" 
                        onClick={() => addToCart(product)}
                        disabled={product.availability === 'Sold out'}
                    >
                        {product.availability === 'Sold out' ? 'Sold Out' : 'Add to Cart'}
                    </button>
                </div>
            </div>
            <div className="product-info">
                <h6 className="product-name">{product.name}</h6>
                <p className="product-price">
                    {/* Use formatted price */}
                    {getFormattedPrice(product.price)}
                    {product.originalPrice && 
                        <span className="text-muted text-decoration-line-through ms-2">
                            {getFormattedPrice(product.originalPrice)} {/* <-- Use formatted price */}
                        </span>
                    }
                </p>
                
                {/* NEW: Wishlist icon for grid item */}
                <button
                    className={`btn-product-wishlist ${isInWishlist ? 'added' : ''}`}
                    onClick={() => addToWishlist(product)}
                    style={{ position: 'absolute', top: '10px', right: '10px', background: 'none', border: 'none', padding: 0, zIndex: 10 }}
                >
                    <svg style={{ width: '18px', height: '18px', fill: isInWishlist ? '#d13f4b' : 'none', stroke: isInWishlist ? '#d13f4b' : '#333' }} viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                </button>
            </div>

            {showModal && <ProductModal product={product} show={showModal} handleClose={handleCloseModal} />}
        </div>
    );
};

export default ProductCard;
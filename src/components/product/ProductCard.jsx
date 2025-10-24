import React, { useState, useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import ProductModal from './ProductModal';
import { CurrencyContext } from '../../context/CurrencyContext'; // <-- NEW
import { formatPrice } from '../../utils/currencyUtils'; // <-- NEW

const ProductCard = ({ product }) => {
    // ✅ THIS IS THE FIX: If for any reason the product is missing, render nothing.
    // This prevents the entire application from crashing.
    if (!product) {
        return null;
    }

    const [isHovered, setIsHovered] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const { addToCart } = useContext(CartContext);
    const { selectedCurrency } = useContext(CurrencyContext); // <-- NEW

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    // Helper to format a single price
    const getFormattedPrice = (price) => {
        if (!price) return '';
        // Pass the price (in INR) and the selected currency code
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
            </div>

            {showModal && <ProductModal product={product} show={showModal} handleClose={handleCloseModal} />}
        </div>
    );
};

export default ProductCard;
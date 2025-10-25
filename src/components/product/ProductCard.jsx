// src/components/product/ProductCard.jsx
import React, { useState, useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { WishlistContext } from '../../context/WishlistContext';
import ProductModal from './ProductModal';
import { CurrencyContext } from '../../context/CurrencyContext';
import { formatPrice } from '../../utils/currencyUtils';

// Accept setPage prop
const ProductCard = ({ product, setPage }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const { addToCart } = useContext(CartContext);
    const { selectedCurrency } = useContext(CurrencyContext);
    const { addToWishlist, isProductInWishlist } = useContext(WishlistContext);

    if (!product || !product.id) {
        console.warn("ProductCard received invalid product data:", product);
        return null;
    }

    const isInWishlist = isProductInWishlist(product.id);

    const handleOpenModal = (e) => {
        e.stopPropagation(); // Prevent navigation
        setShowModal(true);
    };
    const handleCloseModal = () => setShowModal(false);

    // Navigation Handler
    const handleNavigateToDetail = (e) => {
        // Allow default link behavior if it's explicitly an anchor, otherwise prevent if it's div/h6 etc.
        if (e.target.tagName !== 'A') {
             e.preventDefault();
        }
        e.stopPropagation(); // Prevent potential nested click issues if needed

        if (setPage && product && product.id) {
            setPage(`product-detail-${product.id}`);
        } else if (!setPage) {
            console.error("setPage function not passed to ProductCard for product:", product.name);
        }
    };

    const getFormattedPrice = (price) => {
        if (price === null || price === undefined) return '';
        return formatPrice(price, selectedCurrency.code);
    };

    const displayImage1 = product.image1 || 'https://placehold.co/600x800/EEE/31343C?text=Image+1';
    const displayImage2 = product.image2 || displayImage1;

    return (
        <div
            className="product-card"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            // REMOVED onClick={handleNavigateToDetail} from here
        >
            {/* --- Make Image Container clickable --- */}
            <div
                className="product-image-container"
                onClick={handleNavigateToDetail} // Navigate on image click
                style={{ cursor: 'pointer'}} // Indicate clickable
            >
                <img
                    src={isHovered ? displayImage2 : displayImage1}
                    alt={product.name}
                    className="img-fluid base-image"
                />
                {product.availability === 'Sold out' && <span className="sold-out-badge">Sold Out</span>}

                <div className={`product-actions ${isHovered ? 'visible' : ''}`}>
                    {/* Keep stopPropagation here */}
                    <button className="btn-quick-view" onClick={handleOpenModal}>Quick View</button>
                    <button
                        className="btn-add-to-cart-grid"
                         onClick={(e) => {
                            e.stopPropagation();
                            addToCart(product);
                         }}
                        disabled={product.availability === 'Sold out'}
                    >
                        {product.availability === 'Sold out' ? 'Sold Out' : 'Add to Cart'}
                    </button>
                </div>

                 <button
                    className={`btn-product-wishlist ${isInWishlist ? 'added' : ''}`}
                     onClick={(e) => {
                        e.stopPropagation();
                        addToWishlist(product);
                     }}
                    aria-label={isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                    style={{ position: 'absolute', top: '10px', right: '10px', background: 'none', border: 'none', padding: 0, zIndex: 10, cursor: 'pointer' }}
                 >
                    <svg style={{ width: '18px', height: '18px', fill: isInWishlist ? '#d13f4b' : 'none', stroke: isInWishlist ? '#d13f4b' : '#333' }} viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                </button>
            </div>
            <div className="product-info">
                 {/* --- Make Name clickable --- */}
                 <h6
                    className="product-name"
                    onClick={handleNavigateToDetail} // Navigate on name click
                    style={{ cursor: 'pointer'}} // Indicate clickable
                 >
                    {product.name}
                 </h6>
                <p className="product-price">
                    {getFormattedPrice(product.price)}
                    {product.originalPrice != null && // Check originalPrice is not null/undefined
                        <span className="text-muted text-decoration-line-through ms-2 original-price">
                            {getFormattedPrice(product.originalPrice)}
                        </span>
                    }
                </p>
            </div>

            {showModal && <ProductModal product={product} show={showModal} handleClose={handleCloseModal} setPage={setPage} />}
        </div>
    );
};

export default ProductCard;
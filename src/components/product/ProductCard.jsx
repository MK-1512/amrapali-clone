import React, { useState, useContext, useRef, useEffect } from 'react';
import { CartContext } from '../../context/CartContext';
import { WishlistContext } from '../../context/WishlistContext';
import ProductModal from './ProductModal';
import { CurrencyContext } from '../../context/CurrencyContext';
import { formatPrice } from '../../utils/currencyUtils';

const ProductCard = ({ product, setPage }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const { addToCart } = useContext(CartContext);
    const { selectedCurrency } = useContext(CurrencyContext);
    const { addToWishlist, isProductInWishlist } = useContext(WishlistContext);
    const [imageKey, setImageKey] = useState(0);

    if (!product || !product.id) {
        console.warn("ProductCard received invalid product data:", product);
        return null;
    }

    const isInWishlist = isProductInWishlist(product.id);

    const handleOpenModal = (e) => {
        e.stopPropagation();
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setImageKey(prevKey => prevKey + 1);
        setIsHovered(false);
    };


    const handleNavigateToDetail = (e) => {
        if (e.target.tagName !== 'A') {
             e.preventDefault();
        }
        e.stopPropagation();

        if (setPage && product && product.id) {
            if (product.id === 'fall-picot-service') {
                setPage(`service-detail-${product.id}`);
            } else {
                setPage(`product-detail-${product.id}`);
            }
        } else if (!setPage) {
            console.error("setPage function not passed to ProductCard for product:", product.name);
        }
    };

    const getFormattedPrice = (price) => {
        if (price === null || price === undefined) return '';
        return formatPrice(price, selectedCurrency.code);
    };

    const displayImage1 = product.image1 || 'https://placehold.co/600x800/EEE/3134C?text=Image+1';
    const displayImage2 = product.image2 || displayImage1;

    return (
        <div
            className="product-card"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                key={imageKey}
                className="product-image-container"
                onClick={handleNavigateToDetail}
                style={{ cursor: 'pointer'}}
            >
                <img
                    src={displayImage1}
                    alt={product.name}
                    className="img-fluid base-image"
                />
                <img
                    src={displayImage2}
                    alt={`${product.name} (Hover)`}
                    className="img-fluid hover-image"
                />
                {product.availability === 'Sold out' && <span className="sold-out-badge">Sold Out</span>}

                <div className="product-actions">
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
                 <h6
                    className="product-name"
                    onClick={handleNavigateToDetail}
                    style={{ cursor: 'pointer'}}
                 >
                    {product.name}
                 </h6>
                <p className="product-price">
                    {getFormattedPrice(product.price)}
                    {product.originalPrice != null &&
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
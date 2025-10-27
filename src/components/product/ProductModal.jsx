// src/components/product/ProductModal.jsx
import React, { useContext, useState, useEffect } from 'react';
import { Modal, Button, Form, Image, Row, Col } from 'react-bootstrap';
import { CartContext } from '../../context/CartContext';
import { CurrencyContext } from '../../context/CurrencyContext';
import { formatPrice } from '../../utils/currencyUtils';

// NOTE: FALL_PICOT_PRICE_INR is no longer needed here, but removing it is optional.
// const FALL_PICOT_PRICE_INR = 125; 

const ProductModal = ({ product, show, handleClose, setPage }) => {
    const { addToCart } = useContext(CartContext);
    const { selectedCurrency } = useContext(CurrencyContext);
    const [quantity, setQuantity] = useState(1);
    // --- REMOVED addFallPicot state ---
    // const [addFallPicot, setAddFallPicot] = useState(false); 
    const [mainImage, setMainImage] = useState(product?.image1 || 'https://placehold.co/600x800/EEE/31343C?text=Image+1');

    useEffect(() => {
        if (show && product) {
            setQuantity(1);
            // --- REMOVED addFallPicot reset ---
            // setAddFallPicot(false); 
            setMainImage(product.image1 || 'https://placehold.co/600x800/EEE/31343C?text=Image+1');
        }
    }, [show, product]);


    const handleQuantityChange = (amount) => {
        setQuantity(prev => Math.max(1, prev + amount));
    };

    const handleAddToCart = () => {
        if (!product) return;
        
        // --- MODIFIED productToAdd (options hardcoded to empty) ---
        const productToAdd = {
            ...product,
            quantity: quantity,
            options: {} // Always add with no options
        };
        // --- END MODIFICATION ---

        addToCart(productToAdd);
        
        setQuantity(1);
        // --- REMOVED addFallPicot reset ---
        // setAddFallPicot(false); 
        handleClose();
    };

    const handleViewDetails = () => {
        if (!product || !setPage) {
             console.error("Product or setPage function missing for View Details");
             return;
        }
        handleClose();

        if (product.id === 'fall-picot-service') {
            setPage(`service-detail-${product.id}`);
        } else {
            setPage(`product-detail-${product.id}`);
        }
    };

    const getFormattedPrice = (price) => {
        return formatPrice(price === null || price === undefined ? 0 : price, selectedCurrency.code || 'INR');
    };

    if (!product) {
        return (
            <Modal show={show} onHide={handleClose} centered>
                 <Modal.Header closeButton></Modal.Header>
                 <Modal.Body><p>Error: Product data is missing.</p></Modal.Body>
            </Modal>
        );
    }

    // --- MODIFIED Price Calculation (removed addon cost) ---
    const basePriceINR = product.price || 0;
    const totalPriceINR = basePriceINR * quantity; // Removed fallPicotCostINR
    // --- END MODIFICATION ---

    const image1 = product.image1 || null;
    const image2 = product.image2 || null;
    const availableImages = [image1, image2].filter(Boolean);

    // --- REMOVED showFallPicotAddon logic ---
    // const isSaree = ...
    // const showFallPicotAddon = ...


    return (
        <Modal show={show} onHide={handleClose} size="lg" centered className="quick-view-modal">
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
                <Row>
                    <Col md={6} className="quick-view-image-col">
                        <Image src={mainImage} alt={product.name} fluid className="quick-view-main-image mb-2" />
                         <div className="d-flex gap-2 justify-content-center">
                            {availableImages.map((img, index) => (
                               <Image key={index} src={img} thumbnail style={{ width: '60px', height: '80px', objectFit: 'cover', cursor: 'pointer', border: mainImage === img ? '2px solid #a8853d' : '1px solid #ddd' }} onClick={() => setMainImage(img)} />
                            ))}
                        </div>
                    </Col>
                    <Col md={6} className="quick-view-details-col">
                        <h2>{product.name}</h2>
                        <p className="product-price fs-4 mb-3">
                            {getFormattedPrice(totalPriceINR)}
                            {/* --- MODIFIED Original Price display (removed addFallPicot check) --- */}
                            {product.originalPrice != null && quantity === 1 && (
                                <span className="text-muted text-decoration-line-through ms-2 fs-5">
                                    {getFormattedPrice(product.originalPrice)}
                                </span>
                            )}
                            {/* --- END MODIFICATION --- */}
                        </p>

                        <div className="mb-3">
                             <label className="form-label d-block mb-1 small">Quantity</label>
                            <div className="quantity-selector quick-view-quantity">
                                <button onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>−</button>
                                <span>{quantity}</span>
                                <button onClick={() => handleQuantityChange(1)}>+</button>
                            </div>
                        </div>

                        {/* --- REMOVED Addon Checkbox Block --- */}
                        {/* {showFallPicotAddon && ( ... )} */}
                        {/* --- END REMOVAL --- */}

                        <Button
                            variant="dark"
                            className="w-100 py-2 mb-2"
                            onClick={handleAddToCart}
                            disabled={product.availability === 'Sold out'}
                        >
                            {product.availability === 'Sold out' ? 'Sold Out' : 'ADD TO CART'}
                        </Button>

                         <Button
                            variant="link"
                            className="w-100 p-0 text-center view-details-link"
                            onClick={handleViewDetails}
                         >
                            View Details
                        </Button>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    );
};

export default ProductModal;
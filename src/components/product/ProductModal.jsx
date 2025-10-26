// src/components/product/ProductModal.jsx
import React, { useContext, useState, useEffect } from 'react';
import { Modal, Button, Form, Image, Row, Col } from 'react-bootstrap';
import { CartContext } from '../../context/CartContext';
import { CurrencyContext } from '../../context/CurrencyContext';
import { formatPrice } from '../../utils/currencyUtils';

// Placeholder for Fall & Picot price
const FALL_PICOT_PRICE_INR = 125;

// Added setPage prop
const ProductModal = ({ product, show, handleClose, setPage }) => {
    const { addToCart } = useContext(CartContext);
    const { selectedCurrency } = useContext(CurrencyContext);
    const [quantity, setQuantity] = useState(1);
    const [addFallPicot, setAddFallPicot] = useState(false);
    const [mainImage, setMainImage] = useState(product?.image1 || 'https://placehold.co/600x800/EEE/31343C?text=Image+1');

    // Reset local state when modal opens
    useEffect(() => {
        if (show && product) {
            setQuantity(1);
            setAddFallPicot(false);
            setMainImage(product.image1 || 'https://placehold.co/600x800/EEE/31343C?text=Image+1');
        }
    }, [show, product]);


    const handleQuantityChange = (amount) => {
        setQuantity(prev => Math.max(1, prev + amount));
    };

    const handleAddToCart = () => {
        if (!product) return;
        
        // Determine if addon should be included in the cart item
        const includeAddon = product.id !== 'fall-picot-service' && addFallPicot;

        const productToAdd = {
            ...product,
            quantity: quantity,
            options: includeAddon ? { 'Fall & Picot': true } : {}
        };

        addToCart(productToAdd);
        // Reset local state *after* adding to cart
        setQuantity(1);
        setAddFallPicot(false);
        handleClose();
    };

    // --- FIX: Conditional Navigation for View Details ---
    const handleViewDetails = () => {
        if (!product || !setPage) {
             console.error("Product or setPage function missing for View Details");
             return;
        }
        handleClose(); // Close modal first

        // Check if it's the Fall & Picot service
        if (product.id === 'fall-picot-service') {
            setPage(`service-detail-${product.id}`); // Navigate to service detail page
        } else {
            setPage(`product-detail-${product.id}`); // Navigate to product detail page
        }
    };
    // --- END FIX ---

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

    // Only add Fall & Picot cost if it's selected AND it's NOT the service item itself
    const fallPicotCostINR = (product.id !== 'fall-picot-service' && addFallPicot) ? FALL_PICOT_PRICE_INR : 0;
    const basePriceINR = product.price || 0;
    const totalPriceINR = (basePriceINR + fallPicotCostINR) * quantity;

    const image1 = product.image1 || null;
    const image2 = product.image2 || null;
    const availableImages = [image1, image2].filter(Boolean);

    // Conditionally show Addon Checkbox
    const isSaree = product.tags?.includes('Saree') || product.tags?.includes('Banarasi') || product.tags?.includes('Linen') || product.tags?.includes('Cotton') || product.tags?.includes('Chanderi') || product.tags?.includes('Silk') || product.tags?.includes('Tussar');
    const showFallPicotAddon = product.id !== 'fall-picot-service' && isSaree;


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
                            {product.originalPrice != null && quantity === 1 && !addFallPicot && (
                                <span className="text-muted text-decoration-line-through ms-2 fs-5">
                                    {getFormattedPrice(product.originalPrice)}
                                </span>
                            )}
                        </p>

                        <div className="mb-3">
                             <label className="form-label d-block mb-1 small">Quantity</label>
                            <div className="quantity-selector quick-view-quantity">
                                <button onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>−</button>
                                <span>{quantity}</span>
                                <button onClick={() => handleQuantityChange(1)}>+</button>
                            </div>
                        </div>

                        {/* Conditionally show Add-ons */}
                        {showFallPicotAddon && (
                            <div className="product-addons mb-4">
                                <h6 className="small text-muted mb-2">Product Add-ons</h6>
                                <Form.Check
                                    type="checkbox"
                                    id={`modal-fall-picot-${product.id}`}
                                    checked={addFallPicot}
                                    onChange={(e) => setAddFallPicot(e.target.checked)}
                                    className="addon-checkbox"
                                >
                                    <Form.Check.Input type="checkbox" />
                                    <Form.Check.Label>
                                        <span className="addon-label-text">Fall & Picot</span>
                                        <span className="addon-label-price ms-2">({getFormattedPrice(FALL_PICOT_PRICE_INR)})</span>
                                    </Form.Check.Label>
                                </Form.Check>
                            </div>
                        )}

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
                            onClick={handleViewDetails} // <-- Uses the fixed function
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
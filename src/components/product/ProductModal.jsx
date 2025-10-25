// src/components/product/ProductModal.jsx
import React, { useContext, useState, useEffect } from 'react'; // Added useEffect
// *** Ensure Row and Col are imported ***
import { Modal, Button, Form, Image, Row, Col } from 'react-bootstrap';
import { CartContext } from '../../context/CartContext';
import { CurrencyContext } from '../../context/CurrencyContext';
import { formatPrice } from '../../utils/currencyUtils';
// Removed useNavigate

// Placeholder for Fall & Picot price
const FALL_PICOT_PRICE_INR = 125;

// Added setPage prop
const ProductModal = ({ product, show, handleClose, setPage }) => {
    const { addToCart } = useContext(CartContext);
    const { selectedCurrency } = useContext(CurrencyContext);
    const [quantity, setQuantity] = useState(1);
    const [addFallPicot, setAddFallPicot] = useState(false);

    // Reset local state when modal opens
    useEffect(() => {
        if (show) {
            setQuantity(1);
            setAddFallPicot(false);
        }
    }, [show, product]);


    const handleQuantityChange = (amount) => {
        setQuantity(prev => Math.max(1, prev + amount));
    };

    const handleAddToCart = () => {
        if (!product) return;
        const productToAdd = {
            ...product,
            quantity: quantity,
            options: addFallPicot ? { 'Fall & Picot': true } : {}
        };
        addToCart(productToAdd);
        handleClose();
    };

    const handleViewDetails = () => {
        if (!product || !setPage) {
             console.error("Product or setPage function missing for View Details");
             return;
        }
        handleClose();
        setPage(`product-detail-${product.id}`);
    };

    const getFormattedPrice = (price) => {
        return formatPrice(price === null || price === undefined ? 0 : price, selectedCurrency.code || 'INR');
    };

    if (!product) {
        // Optionally, render something inside the modal to indicate an error
        return (
            <Modal show={show} onHide={handleClose} centered>
                 <Modal.Header closeButton></Modal.Header>
                 <Modal.Body><p>Error: Product data is missing.</p></Modal.Body>
            </Modal>
        );
    }

    const basePriceINR = product.price || 0;
    const fallPicotCostINR = addFallPicot ? FALL_PICOT_PRICE_INR : 0;
    const totalPriceINR = (basePriceINR + fallPicotCostINR) * quantity;

    const image1 = product.image1 || 'https://placehold.co/600x800/EEE/31343C?text=Image+1';
    const image2 = product.image2 || image1;

    return (
        <Modal show={show} onHide={handleClose} size="lg" centered className="quick-view-modal">
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
                {/* Use the imported Row and Col */}
                <Row>
                    <Col md={6} className="quick-view-image-col">
                        <Image src={image1} alt={product.name} fluid className="quick-view-main-image mb-2" />
                         <div className="d-flex gap-2 justify-content-center">
                            {[image1, image2].filter(Boolean).map((img, index) => (
                               <Image key={index} src={img} thumbnail style={{ width: '60px', height: '80px', objectFit: 'cover', cursor: 'default' }} />
                            ))}
                        </div>
                    </Col>
                    <Col md={6} className="quick-view-details-col">
                        <h2>{product.name}</h2>
                        <p className="product-price fs-4 mb-3">
                            {getFormattedPrice(totalPriceINR)}
                            {product.originalPrice != null && quantity === 1 && !addFallPicot && ( // Check originalPrice is not null/undefined
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
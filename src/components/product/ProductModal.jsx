// src/components/ProductModal.jsx

import React, { useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { CartContext } from '../../context/CartContext';
import { CurrencyContext } from '../../context/CurrencyContext'; // <-- NEW
import { formatPrice } from '../../utils/currencyUtils'; // <-- NEW

const ProductModal = ({ product, show, handleClose }) => {
    const { addToCart } = useContext(CartContext);
    const { selectedCurrency } = useContext(CurrencyContext); // <-- NEW

    const handleAddToCart = () => {
        addToCart(product);
        handleClose();
    };
    
    // Helper to format a single price
    const getFormattedPrice = (price) => {
        if (!price) return '';
        // Pass the price (in INR) and the selected currency code
        return formatPrice(price, selectedCurrency.code); 
    };

    return (
        <Modal show={show} onHide={handleClose} size="lg" centered>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="col-md-6">
                        <img src={product.image1} alt={product.name} className="img-fluid" />
                    </div>
                    <div className="col-md-6">
                        <h2>{product.name}</h2>
                        <p className="product-price fs-4">
                            {/* Use formatted price */}
                            {getFormattedPrice(product.price)}
                            {product.originalPrice && (
                                <span className="text-muted text-decoration-line-through ms-2 fs-5">
                                    {getFormattedPrice(product.originalPrice)} {/* <-- Use formatted price */}
                                </span>
                            )}
                        </p>
                        
                        {/* <p>Availability: {product.availability}</p> */} {/* <-- REMOVED */}
                        
                        <Button 
                            variant="dark" 
                            className="w-100 py-2" 
                            onClick={handleAddToCart}
                            // disabled={product.availability === 'Sold out'} // <-- REMOVED
                        >
                            ADD TO CART
                        </Button>
                        <p className="mt-3 small">A beautiful Banarasi Silk Saree to grace your festive occasions.</p>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ProductModal;
// src/pages/ProductDetailPage.jsx
import React, { useState, useContext, useEffect, useMemo } from 'react';
import { Container, Row, Col, Button, Form, Tabs, Tab, Image } from 'react-bootstrap';
import { CartContext } from '../context/CartContext';
import { CurrencyContext } from '../context/CurrencyContext';
import { WishlistContext } from '../context/WishlistContext';
import { formatPrice } from '../utils/currencyUtils';
import { allProducts } from '../utils/searchUtils';
import ProductCard from '../components/product/ProductCard';

const FALL_PICOT_PRICE_INR = 125; // Define globally or import from config

const ProductDetailPage = ({ productId, setPage }) => {
    const [quantity, setQuantity] = useState(1);
    const [addFallPicot, setAddFallPicot] = useState(false);
    const [mainImage, setMainImage] = useState('');

    const { addToCart } = useContext(CartContext);
    const { selectedCurrency } = useContext(CurrencyContext);
    const { addToWishlist, isProductInWishlist, wishlistCount } = useContext(WishlistContext);

    const product = useMemo(() => allProducts.find(p => p && String(p.id) === String(productId)), [productId]);

    useEffect(() => {
        if (product?.image1) { // Use optional chaining
            setMainImage(product.image1);
            // Reset quantity and addon when product changes
            setQuantity(1);
            setAddFallPicot(false);
        } else if (product) {
            // If image1 is missing but product exists, maybe set a placeholder
             setMainImage('https://placehold.co/600x800/EEE/31343C?text=Image+Not+Found');
        }
    }, [product]);

    // Add useEffect for body class
    useEffect(() => {
        document.body.classList.add('product-detail-active');
        return () => {
            document.body.classList.remove('product-detail-active');
        };
    }, []);


    const isInWishlist = product ? isProductInWishlist(product.id) : false;

    const getFormattedPrice = (price) => formatPrice(price || 0, selectedCurrency.code || 'INR');

    const handleQuantityChange = (amount) => {
        setQuantity(prev => Math.max(1, prev + amount));
    };

    const handleAddToCart = () => {
        if (!product) return;
        const productToAdd = {
            ...product,
            quantity: quantity,
            // Include options only if Fall & Picot is relevant and selected
            options: (product.tags?.includes('Saree') || product.tags?.includes('Banarasi')) && addFallPicot
                     ? { 'Fall & Picot': true }
                     : {}
        };
        addToCart(productToAdd);
    };

     const handleBuyNow = () => {
        if (!product) return;
        handleAddToCart(); // Add to cart first
        setPage('checkout'); // Navigate
    };

    const relatedProducts = useMemo(() =>
        allProducts.filter(p => p && p.id !== product?.id).slice(0, 4),
    [product?.id]);


    if (!product) {
        return (
            <Container className="text-center py-5">
                <h2>Product Not Found</h2>
                <Button onClick={() => setPage('shop')} variant="outline-dark">Back to Shop</Button>
            </Container>
        );
    }

    const basePriceINR = product.price || 0;
    // Check if product is a saree before adding fall/picot cost
    const isSaree = product.tags?.includes('Saree') || product.tags?.includes('Banarasi') || product.tags?.includes('Linen') || product.tags?.includes('Cotton') || product.tags?.includes('Chanderi') || product.tags?.includes('Silk') || product.tags?.includes('Tussar');
    const fallPicotCostINR = isSaree && addFallPicot ? FALL_PICOT_PRICE_INR : 0;
    const totalPriceINR = (basePriceINR + fallPicotCostINR) * quantity;

    // Use product.details if available, otherwise provide sensible fallbacks
    const details = product.details || {};
    const description = details.description || "No description available.";
    const care = details.care || "Care instructions unavailable.";
    const shipping = details.shipping || "Shipping details unavailable.";

    // Determine which thumbnails to show (handle missing images)
    const thumbnails = [product.image1, product.image2].filter(Boolean);
    // Add duplicates if less than 2 images for layout consistency (optional)
    while (thumbnails.length > 0 && thumbnails.length < 2) {
       thumbnails.push(thumbnails[0]);
    }
     // Create more thumbnails if needed for visual example
     const displayThumbnails = [...thumbnails, ...thumbnails, thumbnails[0]].slice(0, 5);


    return (
        <Container className="product-detail-page-container my-5">
             {/* Back button */}
             <Button variant="link" onClick={() => window.history.back()} className="mb-3 ps-0 text-dark text-decoration-none">&lt; Back</Button>
            <Row>
                <Col md={1} className="d-none d-md-block">
                    {/* Thumbnails */}
                    <div className="d-flex flex-column gap-2">
                        {displayThumbnails.map((img, index) => (
                           <Image
                                key={index}
                                src={img}
                                thumbnail
                                className={`product-thumbnail ${mainImage === img ? 'active' : ''}`}
                                onClick={() => setMainImage(img)}
                                style={{ cursor: 'pointer', border: mainImage === img ? '2px solid #a8853d' : '1px solid #ddd' }}
                            />
                        ))}
                    </div>
                </Col>
                <Col md={5}>
                    <Image src={mainImage} fluid className="product-main-detail-image mb-3 mb-md-0" />
                     {/* Thumbnails for mobile */}
                     <div className="d-flex d-md-none gap-2 mt-2 overflow-auto">
                        {displayThumbnails.map((img, index) => (
                           <Image
                                key={index}
                                src={img}
                                thumbnail
                                className={`product-thumbnail ${mainImage === img ? 'active' : ''}`}
                                onClick={() => setMainImage(img)}
                                style={{ cursor: 'pointer', width: '60px', height: '80px', objectFit: 'cover', flexShrink: 0, border: mainImage === img ? '2px solid #a8853d' : '1px solid #ddd' }}
                            />
                        ))}
                    </div>
                </Col>

                <Col md={6}>
                    <h1 className="product-detail-title">{product.name}</h1>
                    <p className="product-detail-price">
                        {getFormattedPrice(totalPriceINR)}
                         {product.originalPrice != null && quantity === 1 && fallPicotCostINR === 0 && ( // Show original only if no addon/qty change
                            <span className="text-muted text-decoration-line-through ms-2">
                                {getFormattedPrice(product.originalPrice)}
                            </span>
                        )}
                    </p>

                    <div className="mb-3">
                         <label className="form-label d-block mb-1 small">Quantity</label>
                        <div className="quantity-selector product-detail-quantity">
                            <button onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>−</button>
                            <span>{quantity}</span>
                            <button onClick={() => handleQuantityChange(1)}>+</button>
                        </div>
                    </div>

                    {/* Conditionally render Add-ons only for sarees */}
                    {isSaree && (
                        <div className="product-addons mb-4">
                            <Form.Check
                                type="checkbox"
                                id="fall-picot-checkbox"
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


                    <div className="d-grid gap-2 mb-3">
                         <Button
                            variant="outline-dark"
                            className="btn-add-to-cart-detail"
                            onClick={handleAddToCart}
                            disabled={product.availability === 'Sold out'}
                        >
                             {product.availability === 'Sold out' ? 'Sold Out' : 'Add to Cart'}
                        </Button>
                        <Button
                            variant="primary"
                            className="btn-buy-now-detail"
                            onClick={handleBuyNow}
                            disabled={product.availability === 'Sold out'}
                        >
                            Buy it now
                        </Button>
                    </div>

                      <Button
                        variant="link"
                        className={`btn-product-wishlist-detail ${isInWishlist ? 'added' : ''}`}
                        onClick={() => addToWishlist(product)}
                        disabled={!product}
                     >
                        <svg style={{ width: '18px', height: '18px', fill: isInWishlist ? '#d13f4b' : 'none', stroke: isInWishlist ? '#d13f4b' : '#333', verticalAlign: 'middle', marginRight: '5px' }} viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                        {isInWishlist ? 'Added to Wishlist' : 'Add to Wishlist'}
                    </Button>


                    {/* Details Tabs - Adjusted Content */}
                    <div className="product-detail-tabs mt-4">
                        <Tabs defaultActiveKey="details" id="product-info-tabs" className="mb-3">
                            <Tab eventKey="details" title="Details">
                                <p>{description}</p>
                                {/* Display relevant details based on product type */}
                                {details.colors && <p><strong>Colors:</strong> {details.colors}</p>}
                                {details.fabric && <p><strong>Fabric:</strong> {details.fabric}</p>}
                                {details.baseMaterial && <p><strong>Base Material:</strong> {details.baseMaterial}</p>}
                                {details.finish && <p><strong>Finish:</strong> {details.finish}</p>}
                                {details.technique && <p><strong>Technique:</strong> {details.technique}</p>}
                                {details.origin && <p><strong>Origin:</strong> {details.origin}</p>}
                                {details.measurements && <p><strong>Measurements:</strong> {details.measurements}</p>}
                                {details.weight && <p><strong>Weight:</strong> {details.weight}</p>}
                                {details.blousePiece && <p><strong>Blouse Piece:</strong> {details.blousePiece}</p>}
                                {details.disclaimer && <p className="mt-2"><small><strong>Disclaimer:</strong> {details.disclaimer}</small></p>}
                            </Tab>
                            <Tab eventKey="care" title="Care">
                                {/* Use dangerouslySetInnerHTML if care instructions might contain HTML or newlines */}
                                <p dangerouslySetInnerHTML={{ __html: care.replace(/\n/g, '<br />') }}></p>
                            </Tab>
                            <Tab eventKey="shipping" title="Shipping & Returns">
                                {/* Use dangerouslySetInnerHTML for shipping as well */}
                                <p dangerouslySetInnerHTML={{ __html: shipping.replace(/\n/g, '<br />') }}></p>
                            </Tab>
                        </Tabs>
                    </div>
                </Col>
            </Row>

             {relatedProducts.length > 0 && (
                <div className="related-products-section mt-5 pt-5 border-top">
                    <h3 className="section-main-title text-center mb-4">You may also like</h3>
                     <Row xs={2} md={4} className="g-3">
                        {relatedProducts.map(related => (
                             related && related.id ? (
                                <Col key={related.id}>
                                    {/* Pass setPage down */}
                                    <ProductCard product={related} setPage={setPage} />
                                </Col>
                             ) : null
                        ))}
                    </Row>
                </div>
             )}
        </Container>
    );
};

export default ProductDetailPage;
// src/pages/FallPicotDetailPage.jsx
import React, { useContext, useState, useMemo } from 'react'; // Import useMemo
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import { CurrencyContext } from '../context/CurrencyContext';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';
import { formatPrice } from '../utils/currencyUtils';
import ProductCard from '../components/product/ProductCard'; // Import ProductCard for related items
import { allProducts } from '../utils/searchUtils'; // Import all products for related items

// Static details for Fall & Picot service
const fallPicotService = {
  id: 'fall-picot-service',
  name: "FALL & PICOT",
  sku: "W - 143 (FP)",
  price: 125, // INR
  image1: "https://www.amrapaliboutique.in/cdn/shop/products/fall_and_pico_image_1_900x.png?v=1570130620",
  image2: "https://www.amrapaliboutique.in/cdn/shop/products/fall_and_pico_image_1_900x.png?v=1570130620",
  availability: "Available",
  details: { // Add a details object for consistency if needed, though simpler here
      description: [
          "Saree fall picot serves as a foundation for a good drape...", // Keep full description array
          "All you need to do is tick off the fall and picot option box...",
          "Please note, once fall and picot is done on a saree, we do not honour any exchange or returns.",
          "Happy shopping!"
      ].join('\n\n'), // Join with double newline for paragraph breaks
      // Add other detail fields if relevant for display (likely not needed for service)
      colors: "-", fabric: "-", technique: "-", measurements: "-", weight: "-", blousePiece: "-", disclaimer: "-", care: "-", shipping: "-"
  }
};

// Accept setPage prop for navigation
const FallPicotDetailPage = ({ setPage }) => {
    const { selectedCurrency } = useContext(CurrencyContext);
    const { addToCart } = useContext(CartContext);
    const { addToWishlist, isProductInWishlist } = useContext(WishlistContext);
    const [quantity, setQuantity] = useState(1);

    const isInWishlist = isProductInWishlist(fallPicotService.id);

    const getFormattedPrice = (price) => {
        return formatPrice(price || 0, selectedCurrency.code || 'INR');
    };

    const handleQuantityChange = (amount) => {
        setQuantity(prev => Math.max(1, prev + amount));
    };

    // Standard Add to Cart Handler
    const handleAddToCart = () => {
        const itemToAdd = {
            ...fallPicotService,
            quantity: quantity,
            options: {} // No specific options for the service itself
        };
        addToCart(itemToAdd);
        alert(`${quantity} x ${fallPicotService.name} added to cart! Remember this is usually added as an option to a saree.`);
    };

    // Standard Buy Now Handler
    const handleBuyNow = () => {
        handleAddToCart();
        if (setPage) {
            setPage('checkout');
        }
    };

    // --- Related Products Logic (similar to ProductDetailPage) ---
    const relatedProducts = useMemo(() =>
        // Filter out the service itself and take some random products
        allProducts.filter(p => p && p.id !== fallPicotService.id && p.tags && !p.tags.includes('Service'))
                   .slice(0, 4), // Show 4 related products
    []); // Only depends on allProducts

    return (
        <Container className="product-detail-page-container my-5">
             <Button variant="link" onClick={() => setPage('fall-picot')} className="mb-3 ps-0 text-dark text-decoration-none">&lt; Back</Button>
            <Row>
                {/* --- Adjusted Image Column Size --- */}
                <Col md={5}> {/* Reduced from 6 */}
                    <Image src={fallPicotService.image1} fluid className="product-main-detail-image mb-3 mb-md-0" />
                </Col>
                {/* --- End Image Column --- */}

                {/* Right: Details */}
                <Col md={7}> {/* Increased from 6 */}
                    <h1 className="product-detail-title">{fallPicotService.name}</h1>
                    <p className="product-sku">SKU: {fallPicotService.sku}</p>
                    <p className="product-detail-price">
                        {getFormattedPrice(fallPicotService.price * quantity)}
                    </p>

                    {/* Quantity Selector */}
                    <div className="mb-3">
                         <label className="form-label d-block mb-1 small">Quantity</label>
                        <div className="quantity-selector product-detail-quantity">
                            <button onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>−</button>
                            <span>{quantity}</span>
                            <button onClick={() => handleQuantityChange(1)}>+</button>
                        </div>
                    </div>

                     {/* --- Standard Action Buttons --- */}
                     <div className="d-grid gap-2 mb-3">
                         <Button
                            variant="outline-dark"
                            className="btn-add-to-cart-detail"
                            onClick={handleAddToCart}
                        >
                             ADD TO CART
                        </Button>
                        <Button
                            variant="primary"
                            className="btn-buy-now-detail"
                            onClick={handleBuyNow}
                        >
                            BUY IT NOW
                        </Button>
                    </div>
                    {/* --- Add to Wishlist Button --- */}
                     <Button
                        variant="link"
                        className={`btn-product-wishlist-detail ${isInWishlist ? 'added' : ''}`}
                        onClick={() => addToWishlist(fallPicotService)}
                     >
                        <svg style={{ width: '18px', height: '18px', fill: isInWishlist ? '#d13f4b' : 'none', stroke: isInWishlist ? '#d13f4b' : '#333', verticalAlign: 'middle', marginRight: '5px' }} viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                        {isInWishlist ? 'Added to Wishlist' : 'Add to Wishlist'}
                    </Button>
                    {/* --- End Action Buttons --- */}


                    {/* Description */}
                    <div className="product-detail-tabs mt-4">
                         <h4 style={{ fontSize: '14px', fontWeight: '600', textTransform:'uppercase', marginBottom:'15px'}}>Description</h4>
                         {/* Display description paragraphs */}
                         {fallPicotService.details.description.split('\n\n').map((para, index) => (
                            <p key={index} style={{fontSize: '14px', lineHeight: '1.8', color: '#555'}}>
                                {para}
                            </p>
                         ))}
                    </div>
                </Col>
            </Row>

             {/* --- You May Also Like Section --- */}
             {relatedProducts.length > 0 && (
                <div className="related-products-section mt-5 pt-5 border-top">
                    <h3 className="section-main-title text-center mb-4">You may also like</h3>
                     <Row xs={2} md={4} className="g-3">
                        {relatedProducts.map(related => (
                             related && related.id ? (
                                <Col key={related.id}>
                                    {/* Pass setPage down for navigation from related items */}
                                    <ProductCard product={related} setPage={setPage} />
                                </Col>
                             ) : null
                        ))}
                    </Row>
                </div>
             )}
             {/* --- End You May Also Like Section --- */}
        </Container>
    );
};

export default FallPicotDetailPage;
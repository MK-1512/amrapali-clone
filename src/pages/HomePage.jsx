// src/pages/HomePage.jsx
import React, { useState, useContext } from 'react';
import { Container, Row, Col, Button, Carousel, Card, Tabs, Tab } from 'react-bootstrap';
import Slider from 'react-slick';
import ProductCard from '../components/product/ProductCard';
import { products as sareeProducts } from '../data/products';
import { jewellery as jewelleryProducts } from '../data/jewellery';
import { blogPosts } from '../data/blogPosts';
import { CurrencyContext } from '../context/CurrencyContext'; // <-- NEW
import { formatPrice } from '../utils/currencyUtils'; // <-- NEW

// --- Data Definitions ---

const heroSlides = [
  { img: 'https://www.amrapaliboutique.in/cdn/shop/files/IMG_0577_1600x.jpg?v=1756621375', buttons: 1, btn1Text: 'OUR BLOG', btn1Link: '#' },
  { img: 'https://www.amrapaliboutique.in/cdn/shop/files/shared102_1600x.jpg?v=1650086293', buttons: 1, btn1Text: 'SHOP NOW', btn1Link: '#' },
  { img: 'https://www.amrapaliboutique.in/cdn/shop/files/BeautyPlus_20200813064613423_save-01_1600x.jpeg?v=1613792330', buttons: 1, btn1Text: 'EXPLORE SOULFUL WEAVES', btn1Link: '#' },
  { img: 'https://www.amrapaliboutique.in/cdn/shop/files/BeautyPlus_20200814010950628_save_1600x.jpg?v=1613792369', buttons: 1, btn1Text: 'VIEW POPSICLE', btn1Link: '#' },
  { img: 'https://www.amrapaliboutique.in/cdn/shop/files/5_desktop_1600x.jpg?v=1613543282', buttons: 2, btn1Text: 'SHOP LINEN', btn1Link: '#', btn2Text: 'SHOP COTTON', btn2Link: '#' },
  { img: 'https://www.amrapaliboutique.in/cdn/shop/files/shared102_1600x.jpg?v=1650086293', buttons: 2, btn1Text: 'SHOP SILK AND TUSSAR', btn1Link: '#', btn2Text: 'SHOP CHANDERI', btn2Link: '#' },
];

// --- Components ---

// Real Product Slider using React Slick
const ProductSlider = ({ products }) => {
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          }
        }
      ]
    };
    return (
        <Slider {...settings}>
            {products.map(product => (
                 product && (
                    <div key={product.id} className="p-2">
                        <ProductCard product={product} />
                    </div>
                 )
            ))}
        </Slider>
    );
};

// Blog Card Component
const SimpleBlogPostCard = ({ post }) => (
    <Card className="border-0 text-center h-100">
         <Card.Img variant="top" src={post.image} style={{ aspectRatio: '16/10.5', objectFit: 'cover' }}/>
         <Card.Body className="d-flex flex-column">
             <Card.Title style={{fontFamily: "'Cormorant Garamond', serif", fontSize: '1.3rem', fontWeight: 600, marginBottom: '15px' }}>
                 <a href="#" className="text-decoration-none text-dark">{post.title}</a>
             </Card.Title>
             <Card.Text style={{fontSize: '15px', color: '#555', flexGrow: 1, marginBottom: '20px'}}>
                 {post.excerpt}
             </Card.Text>
             <a href="#" className="blog-post-read-more mt-auto">Read more</a>
         </Card.Body>
     </Card>
 );

// --- HomePage Component ---
const HomePage = () => {
    const { selectedCurrency } = useContext(CurrencyContext); // <-- NEW

    // Helper to format a single price
    const getFormattedPrice = (price) => {
        if (!price) return '';
        return formatPrice(price, selectedCurrency.code);
    };

    const firstEightSarees = sareeProducts.slice(0, 8);
    const firstTwelveJewellery = jewelleryProducts.slice(0, 12);
    const firstThreeBlogs = blogPosts.slice(0, 3);
    const productOfTheWeek = sareeProducts.find(p => p.id === 24) || sareeProducts[0];

    const [powQuantity, setPowQuantity] = useState(1);
    const handlePowQuantityChange = (amount) => {
        setPowQuantity(prev => Math.max(1, prev + amount));
    };

    const powDetails = {
        description: "Handloom, lightweight, translucent, chanderi cotton silk saree, embellished with golden thin stripes on body.",
        colors: "Magenta, Golden",
        fabric: "Warp - Silk | Weft - Mercerised Cotton",
        technique: "Handloom",
        measurements: "6.50 m x 1.15 m approx.",
        weight: "330 gms.",
        blousePiece: "Yes (Showcased blouse is from our in-house wardrobe)",
        disclaimer: "The actual color may vary slightly due to different screen calibration. Please Note: Orders with fall and picot are not eligible for return or exchange.",
        care: "Dry clean only. Avoid bringing in contact with direct sunlight & liquids, especially perfumes.",
        shipping: "Ships within 3-5 business days. Free shipping across India. International shipping available.",
    };

    // Calculate total price for POW in INR (assuming individual price is already INR)
    const powPriceINR = productOfTheWeek ? productOfTheWeek.price * powQuantity : 0;

    const pageStyles = `
        .homepage-section { padding: 40px 0; }
        .section-title { text-align: center; font-family: 'Jost', sans-serif; font-size: 14px; font-weight: 400; margin-bottom: 10px; letter-spacing: 0.15em; text-transform: uppercase; color: #999; }
        .section-main-title { text-align: center; font-family: 'Cormorant Garamond', serif; font-size: 28px; font-weight: 600; margin-bottom: 30px; color: #1c1c1c; }
        .category-card { position: relative; overflow: hidden; text-align: center; color: white; }
        .category-card img { width: 100%; height: auto; transition: transform 0.4s ease; }
        .category-card:hover img { transform: scale(1.05); }
        .category-card .card-img-overlay { background: rgba(0,0,0,0.3); display: flex; flex-direction: column; justify-content: center; align-items: center; }
        .category-card .btn-category { background-color: #fff; color: #1c1c1c; border: none; padding: 8px 20px; font-size: 11px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.1em; margin-top: 15px; transition: all 0.3s ease; border-radius: 0;}
        .category-card .btn-category:hover { background-color: #f0f0f0; }
        .category-card h4 { font-family: 'Cormorant Garamond', serif; font-size: 24px; font-weight: 600; margin-bottom: 0; }
        .product-of-week-details h5 { font-family: 'Cormorant Garamond', serif; font-size: 24px; margin-bottom: 5px; }
        .product-of-week-details .sku { font-size: 12px; color: #999; margin-bottom: 15px; }
        .product-of-week-details .price { font-size: 18px; color: #1c1c1c; margin-bottom: 10px; }
        .product-of-week-details .btn-action { border-radius: 0; width: 100%; padding: 12px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; margin-top: 10px; }
        .btn-add-to-cart-week { background-color: #ffffff; color: #1c1c1c; border: 1px solid #e5e5e5; }
        .btn-buy-now-week { background-color: #ffb3ba; color: #ffffff; border: none; }
        .btn-view-details-week { background: transparent; border: none; color: #1c1c1c; text-decoration: underline; font-size: 13px; padding: 10px 0; }
        .pow-quantity-selector { display: inline-flex; align-items: center; border: 1px solid #e5e5e5; margin-bottom: 20px; margin-top: 15px; background-color: #ffffff; height: 45px; }
        .pow-quantity-selector button { background-color: transparent; border: none; font-size: 20px; padding: 10px 18px; cursor: pointer; color: #999; transition: color 0.2s ease; font-weight: 300; width: 45px; height: 100%; display: flex; align-items: center; justify-content: center; }
        .pow-quantity-selector button:hover:not(:disabled) { color: #1c1c1c; }
        .pow-quantity-selector button:disabled { opacity: 0.3; cursor: not-allowed; }
        .pow-quantity-selector span { padding: 0 15px; border-left: 1px solid #e5e5e5; border-right: 1px solid #e5e5e5; font-size: 15px; min-width: 50px; text-align: center; color: #1c1c1c; height: 100%; display: flex; align-items: center; justify-content: center; }
        .product-of-week-details .nav-tabs { border-bottom: 1px solid #e5e5e5; margin-bottom: 15px; }
        .product-of-week-details .nav-tabs .nav-link { font-size: 12px; text-transform: uppercase; color: #999; border: none; border-bottom: 2px solid transparent; padding: 10px 0; margin-right: 25px; font-weight: 500; letter-spacing: 0.08em; }
        .product-of-week-details .nav-tabs .nav-link.active { color: #1c1c1c; border-bottom-color: #1c1c1c; background-color: transparent; }
        .product-of-week-details .tab-content { font-size: 13px; color: #555; line-height: 1.8; padding-top: 0; min-height: 100px; }
        .product-of-week-details .tab-content p { margin-bottom: 0.5rem; }
        .explore-section { background: url('https://cdn.shopify.com/s/files/1/0082/5091/6915/files/Amrapali_30_July190014_1_1920x.jpg?v=1566497224') no-repeat center center; background-size: cover; min-height: 400px; display: flex; align-items: center; justify-content: center; text-align: center; position: relative; color: white; }
        .explore-section::before { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.4); }
        .explore-content { position: relative; z-index: 1; }
        .explore-content p { font-size: 18px; max-width: 400px; margin: 0 auto 25px auto; }
        .explore-content .btn-explore { background-color: transparent; color: #ffffff; border: 1px solid #ffffff; padding: 10px 30px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; transition: all 0.3s ease; border-radius: 0;}
        .explore-content .btn-explore:hover { background-color: #ffffff; color: #1c1c1c; }
        .info-section { background-color: #f9f9f9; padding: 30px 0; border-top: 1px solid #e5e5e5; border-bottom: 1px solid #e5e5e5; }
        .info-item { text-align: center; }
        .info-item img { height: 35px; margin-bottom: 10px; opacity: 0.7; }
        .info-item p { font-size: 12px; color: #555; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 0;}
        .customer-reviews-placeholder { text-align: center; padding: 50px 20px; background-color: #fff; border: 1px dashed #ccc; margin: 40px 0; color: #999; }

        /* React Slick Arrow Styles */
        .slick-prev, .slick-next { font-size: 0; line-height: 0; position: absolute; top: 50%; display: block; width: 30px; height: 30px; padding: 0; transform: translate(0, -50%); cursor: pointer; color: transparent; border: none; outline: none; background: #fff; border-radius: 50%; z-index: 1; box-shadow: 0 2px 5px rgba(0,0,0,0.15); }
        .slick-prev { left: -10px; }
        .slick-next { right: -10px; }
        .slick-prev:before, .slick-next:before { font-family: 'slick'; font-size: 20px; line-height: 1; opacity: .75; color: #333; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
        .slick-prev:before { content: '<'; }
        .slick-next:before { content: '>'; }
        .slick-disabled { opacity: 0.3; cursor: default; }
    `;

    return (
        <>
            <style>{pageStyles}</style>

            <Carousel fade indicators={true} controls={false} interval={5000} className="hero-carousel">
                {heroSlides.map((slide, index) => (
                    <Carousel.Item key={index} style={{ backgroundImage: `url(${slide.img})` }}>
                        <Carousel.Caption>
                            <Button href={slide.btn1Link} className="btn-hero">{slide.btn1Text}</Button>
                            {slide.buttons === 2 && slide.btn2Text && (
                                <Button href={slide.btn2Link} className="btn-hero">{slide.btn2Text}</Button>
                            )}
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>

            <Container className="homepage-section">
                <p className="section-title">Tales of Effortless Yards Wrapped in Love</p>
                <h3 className="section-main-title">SAREES</h3>
                <ProductSlider products={firstEightSarees} />
                <div className="text-center mt-4">
                    <Button variant="outline-dark" style={{borderRadius: 0, padding: '10px 30px', fontSize: '12px', letterSpacing: '0.1em'}}>VIEW ALL PRODUCTS</Button>
                </div>
            </Container>

            <Container className="homepage-section">
                 <p className="section-title">Specs of Sparkle</p>
                <h3 className="section-main-title">JEWELLERY</h3>
                <ProductSlider products={firstTwelveJewellery} />
                <div className="text-center mt-4">
                    <Button variant="outline-dark" style={{borderRadius: 0, padding: '10px 30px', fontSize: '12px', letterSpacing: '0.1em'}}>VIEW ALL PRODUCTS</Button>
                </div>
            </Container>

             <Container fluid className="homepage-section px-md-0">
                <Row className="g-0">
                    <Col md={4}><Card className="text-white category-card border-0 rounded-0"><Card.Img src="https://www.amrapaliboutique.in/cdn/shop/files/IMG_3982_800x.jpg?v=1756625166" alt="Potpourri" /><Card.ImgOverlay><h4>POTPOURRI</h4><Button href="#" className="btn-category">VIEW PRODUCTS</Button></Card.ImgOverlay></Card></Col>
                    <Col md={4}><Card className="text-white category-card border-0 rounded-0"><Card.Img src="https://www.amrapaliboutique.in/cdn/shop/files/IMG_8253_800x.jpg?v=1755240083" alt="Soulful Weaves" /><Card.ImgOverlay><h4>SOULFUL WEAVES</h4><Button href="#" className="btn-category">VIEW PRODUCTS</Button></Card.ImgOverlay></Card></Col>
                    <Col md={4}><Card className="text-white category-card border-0 rounded-0"><Card.Img src="https://www.amrapaliboutique.in/cdn/shop/files/IMG_7022_c6106c85-7b92-48ec-ab73-0af24a719b72_800x.jpg?v=1704601509" alt="Popsicle" /><Card.ImgOverlay><h4>POPSICLE</h4><Button href="#" className="btn-category">VIEW PRODUCTS</Button></Card.ImgOverlay></Card></Col>
                </Row>
            </Container>

            <Container className="homepage-section">
                <h3 className="section-main-title">PRODUCT OF THE WEEK</h3>
                <Row>
                    <Col md={6}>
                        {productOfTheWeek && <img src={productOfTheWeek.image1} alt={productOfTheWeek.name} className="img-fluid" />}
                    </Col>
                    <Col md={6}>
                       {productOfTheWeek && (
                         <div className="product-of-week-details w-100">
                             <h5>{productOfTheWeek.name}</h5>
                             <p className="sku">SKU: W-195(C) CH(SA)</p>
                             <p className="price">
                                 {getFormattedPrice(powPriceINR)} {/* <-- USE FORMATTED PRICE */}
                             </p>
                            <div className="pow-quantity-selector">
                                <button type="button" onClick={() => handlePowQuantityChange(-1)} disabled={powQuantity <= 1}> − </button>
                                <span>{powQuantity}</span>
                                <button type="button" onClick={() => handlePowQuantityChange(1)}> + </button>
                            </div>
                             <Tabs defaultActiveKey="details" id="pow-details-tabs" className="mb-3">
                                <Tab eventKey="details" title="Details">
                                     <p>{powDetails.description}</p>
                                     <p><strong>Colors:</strong> {powDetails.colors}</p>
                                     <p><strong>Fabric:</strong> {powDetails.fabric}</p>
                                     <p><strong>Technique:</strong> {powDetails.technique}</p>
                                     <p><strong>Measurements:</strong> {powDetails.measurements}</p>
                                     <p><strong>Weight:</strong> {powDetails.weight}</p>
                                     <p><strong>Blouse Piece:</strong> {powDetails.blousePiece}</p>
                                     <p className="mt-2"><small><strong>Disclaimer:</strong> {powDetails.disclaimer}</small></p>
                                </Tab>
                                <Tab eventKey="care" title="Care"><p>{powDetails.care}</p></Tab>
                                <Tab eventKey="shipping" title="Shipping"><p>{powDetails.shipping}</p></Tab>
                            </Tabs>
                            <Button className="btn-action btn-add-to-cart-week">ADD TO CART</Button>
                            <Button className="btn-action btn-buy-now-week">BUY IT NOW</Button>
                             <div className="text-center">
                                <Button variant="link" className="btn-view-details-week">View product details</Button>
                            </div>
                        </div>
                       )}
                    </Col>
                </Row>
            </Container>

           {/* 7. Explore Section */}
          {/* 7. Explore Section */}
            <div className="explore-section homepage-section px-0"
             style={{
        backgroundImage: "url('https://cdn.shopify.com/s/files/1/0082/5091/6915/files/6_-_desktop_3d2f31ce-b65a-4d5e-9af6-704544a78b95_large.jpg?v=1587220369')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '500px'
    }}
            >
                <div className="explore-content">
                    <p>Created for women who enjoy the feeling of empowerment through their choice of clothing</p>
                    <Button href="#" className="btn-explore">EXPLORE</Button>
                </div>
            </div>

            <Container className="homepage-section">
                 <h3 className="section-main-title">STORIES BY AMRAPALI</h3>
                <Row xs={1} md={3} className="g-4">
                    {firstThreeBlogs.map(post => (
                        <Col key={post.id}><SimpleBlogPostCard post={post} /></Col>
                    ))}
                </Row>
                <div className="text-center mt-4">
                     <Button variant="outline-dark" style={{borderRadius: 0, padding: '10px 30px', fontSize: '12px', letterSpacing: '0.1em'}}>VIEW ALL ARTICLES</Button>
                </div>
            </Container>

             <Container fluid className="info-section">
                 <Container>
                     <Row>
                         <Col className="info-item"><img src="https://cdn.shopify.com/s/files/1/0082/5091/6915/files/1_free_shipping_2.png?1635" alt="Free Shipping" /><p>Free Shipping</p></Col>
                         <Col className="info-item"><img src="https://cdn.shopify.com/s/files/1/0082/5091/6915/files/2_fall_and_picot_services.png?1559" alt="Fall and Picot Services" /><p>Fall and Picot Services</p></Col>
                         <Col className="info-item"><img src="https://cdn.shopify.com/s/files/1/0082/5091/6915/files/3_handmade.png?1559" alt="Hand Made" /><p>Hand Made</p></Col>
                         <Col className="info-item"><img src="https://cdn.shopify.com/s/files/1/0082/5091/6915/files/4_pure_fabrics.png?1559" alt="Pure Fabrics" /><p>Pure Fabrics</p></Col>
                         <Col className="info-item"><img src="https://cdn.shopify.com/s/files/1/0082/5091/6915/files/5_quality_assurance_1.png?1632" alt="Quality Assurance" /><p>Quality Assurance</p></Col>
                     </Row>
                 </Container>
            </Container>

            <Container className="homepage-section">
                 <h3 className="section-main-title">Let customers speak for us</h3>
                <div className="customer-reviews-placeholder">Customer Reviews Section (Integration Needed)</div>
            </Container>
        </>
    );
};

export default HomePage;
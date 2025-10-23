// src/components/common/ShopDropdownMenu.jsx
import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';

// Assume handleNavClick is passed down to handle navigation
const ShopDropdownMenu = ({ handleNavClick }) => {

  // Placeholder function for sub-category clicks for Sarees if specific logic is needed later
  const handleSareeSubCategoryClick = (e, category) => {
    e.preventDefault();
    console.log("Clicked Saree Category:", category); // Log for now
    // For now, navigate to the main shop/sarees page
    handleNavClick(e, 'shop');
  };

  return (
    <div className="shop-dropdown-menu">
      <Container>
        <Row>
          {/* Column 1: Sarees */}
          <Col md={2} className="dropdown-col">
            <h6 className="dropdown-col-title">SAREES</h6>
            <Nav className="flex-column dropdown-links">
              {/* These still use the placeholder or go to main shop */}
              <Nav.Link href="#" onClick={(e) => handleSareeSubCategoryClick(e, 'sarees-all')}>All</Nav.Link>
              <Nav.Link href="#" onClick={(e) => handleSareeSubCategoryClick(e, 'sarees-cotton')}>Cotton</Nav.Link> {/* Added Cotton example */}
              <Nav.Link href="#" onClick={(e) => handleSareeSubCategoryClick(e, 'sarees-silk-tussar')}>Silk & Tussar</Nav.Link>
              <Nav.Link href="#" onClick={(e) => handleSareeSubCategoryClick(e, 'sarees-linen')}>Linen</Nav.Link>
              <Nav.Link href="#" onClick={(e) => handleSareeSubCategoryClick(e, 'sarees-chanderi')}>Chanderi</Nav.Link>
            </Nav>
          </Col>

          {/* Column 2: Jewellery - UPDATED onClick handlers */}
          <Col md={2} className="dropdown-col">
            <h6 className="dropdown-col-title">JEWELLERY</h6>
            <Nav className="flex-column dropdown-links">
              {/* Use handleNavClick directly with correct page keys */}
              <Nav.Link href="#" onClick={(e) => handleNavClick(e, 'jewellery')}>All</Nav.Link>
              <Nav.Link href="#" onClick={(e) => handleNavClick(e, 'neckpieces')}>Neckpieces</Nav.Link>
              <Nav.Link href="#" onClick={(e) => handleNavClick(e, 'earrings')}>Earrings</Nav.Link>
              <Nav.Link href="#" onClick={(e) => handleNavClick(e, 'bangles-cuffs')}>Bangles & Cuffs</Nav.Link>
              <Nav.Link href="#" onClick={(e) => handleNavClick(e, 'rings')}>Rings</Nav.Link>
            </Nav>
          </Col>

          {/* Column 3: Fall and Picot */}
          <Col md={2} className="dropdown-col">
            <h6 className="dropdown-col-title">FALL AND PICOT</h6>
             {/* Add links if applicable, e.g., */}
             {/* <Nav.Link href="#" onClick={(e) => handleNavClick(e, 'fall-picot')}>Learn More</Nav.Link> */}
          </Col>

          {/* Column 4 & 5: Images */}
          <Col md={3}>
            {/* Link to general shop/sarees page */}
            <a href="#" className="dropdown-image-link" onClick={(e) => handleNavClick(e, 'shop')}>
              <img src="https://www.amrapaliboutique.in/cdn/shop/collections/Tales_of_Handwoven_Yards_-_Desktop_Banner_1400x.jpg?v=1686309836" alt="Tales of Handwoven Yards" className="img-fluid" />
              <p className="dropdown-image-caption">TALES OF HANDWOVEN YARDS</p>
            </a>
          </Col>
          <Col md={3}>
             {/* Link to jewellery main page */}
            <a href="#" className="dropdown-image-link" onClick={(e) => handleNavClick(e, 'jewellery')}>
               <img src="https://www.amrapaliboutique.in/cdn/shop/collections/Specks_of_Sparkle_-_Desktop_Banner_1400x.jpg?v=1686310091" alt="Specks of Sparkle" className="img-fluid" />
               <p className="dropdown-image-caption">SPECKS OF SPARKLE</p>
            </a>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ShopDropdownMenu;
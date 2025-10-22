// src/components/common/ShopDropdownMenu.jsx
import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';

// Assume handleNavClick is passed down to handle navigation
const ShopDropdownMenu = ({ handleNavClick }) => {

  // Placeholder function for sub-category clicks if specific logic is needed later
  const handleSubCategoryClick = (e, category) => {
    e.preventDefault();
    console.log("Clicked:", category); // Replace with actual navigation/filtering
    // Example: Potentially call handleNavClick or a different function
    // handleNavClick(e, 'shop', { filter: category }); // Hypothetical
    handleNavClick(e, 'shop'); // Navigate to main shop page for now
  };

  return (
    <div className="shop-dropdown-menu">
      <Container>
        <Row>
          {/* Column 1: Sarees */}
          <Col md={2} className="dropdown-col">
            <h6 className="dropdown-col-title">SAREES</h6>
            <Nav className="flex-column dropdown-links">
              <Nav.Link href="#" onClick={(e) => handleSubCategoryClick(e, 'sarees-all')}>All</Nav.Link>
              <Nav.Link href="#" onClick={(e) => handleSubCategoryClick(e, 'sarees-silk-tussar')}>Silk & Tussar</Nav.Link>
              <Nav.Link href="#" onClick={(e) => handleSubCategoryClick(e, 'sarees-linen')}>Linen</Nav.Link>
              <Nav.Link href="#" onClick={(e) => handleSubCategoryClick(e, 'sarees-chanderi')}>Chanderi</Nav.Link>
              {/* Add more saree categories if needed */}
            </Nav>
          </Col>

          {/* Column 2: Jewellery */}
          <Col md={2} className="dropdown-col">
            <h6 className="dropdown-col-title">JEWELLERY</h6>
            <Nav className="flex-column dropdown-links">
              <Nav.Link href="#" onClick={(e) => handleSubCategoryClick(e, 'jewellery-all')}>All</Nav.Link>
              <Nav.Link href="#" onClick={(e) => handleSubCategoryClick(e, 'jewellery-neckpieces')}>Neckpieces</Nav.Link>
              <Nav.Link href="#" onClick={(e) => handleSubCategoryClick(e, 'jewellery-earrings')}>Earrings</Nav.Link>
              <Nav.Link href="#" onClick={(e) => handleSubCategoryClick(e, 'jewellery-bangles-cuffs')}>Bangles & Cuffs</Nav.Link>
              <Nav.Link href="#" onClick={(e) => handleSubCategoryClick(e, 'jewellery-rings')}>Rings</Nav.Link>
              {/* Add more jewellery categories if needed */}
            </Nav>
          </Col>

          {/* Column 3: Fall and Picot */}
          <Col md={2} className="dropdown-col">
            <h6 className="dropdown-col-title">FALL AND PICOT</h6>
             {/* Add links if applicable */}
          </Col>

          {/* Column 4 & 5: Images */}
          <Col md={3}>
            <a href="#" className="dropdown-image-link" onClick={(e) => handleNavClick(e, 'shop')}> {/* Link to general shop or specific collection */}
              <img src="https://www.amrapaliboutique.in/cdn/shop/collections/Tales_of_Handwoven_Yards_-_Desktop_Banner_1400x.jpg?v=1686309836" alt="Tales of Handwoven Yards" className="img-fluid" />
              <p className="dropdown-image-caption">TALES OF HANDWOVEN YARDS</p>
            </a>
          </Col>
          <Col md={3}>
            <a href="#" className="dropdown-image-link" onClick={(e) => handleNavClick(e, 'jewellery')}> {/* Link to jewellery */}
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
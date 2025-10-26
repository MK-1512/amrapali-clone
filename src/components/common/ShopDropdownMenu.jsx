// src/components/common/ShopDropdownMenu.jsx
import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';

// Receives hover handlers from Header
const ShopDropdownMenu = ({ handleNavClick, onMouseEnter, onMouseLeave }) => {

  return (
    <div
        className="shop-dropdown-menu"
       // Attach the handlers passed from Header
       onMouseEnter={onMouseEnter}
       onMouseLeave={onMouseLeave}
    >
      <Container>
        <Row>
          {/* Column 1: Sarees */}
          <Col md={2} className="dropdown-col">
            <Nav.Link href="#" onClick={(e) => handleNavClick(e, 'shop')} className="dropdown-col-title-link">
                <h6 className="dropdown-col-title">SAREES</h6>
            </Nav.Link>
            <Nav className="flex-column dropdown-links">
              <Nav.Link href="#" onClick={(e) => handleNavClick(e, 'shop')}>All</Nav.Link>
              <Nav.Link href="#" onClick={(e) => handleNavClick(e, 'sarees-cotton')}>Cotton</Nav.Link>
              <Nav.Link href="#" onClick={(e) => handleNavClick(e, 'sarees-silk-tussar')}>Silk & Tussar</Nav.Link>
              <Nav.Link href="#" onClick={(e) => handleNavClick(e, 'sarees-linen')}>Linen</Nav.Link>
              <Nav.Link href="#" onClick={(e) => handleNavClick(e, 'sarees-chanderi')}>Chanderi</Nav.Link>
            </Nav>
          </Col>

          {/* Column 2: Jewellery */}
          <Col md={2} className="dropdown-col">
             <Nav.Link href="#" onClick={(e) => handleNavClick(e, 'jewellery')} className="dropdown-col-title-link">
                <h6 className="dropdown-col-title">JEWELLERY</h6>
             </Nav.Link>
            <Nav className="flex-column dropdown-links">
              <Nav.Link href="#" onClick={(e) => handleNavClick(e, 'jewellery')}>All</Nav.Link>
              <Nav.Link href="#" onClick={(e) => handleNavClick(e, 'neckpieces')}>Neckpieces</Nav.Link>
              <Nav.Link href="#" onClick={(e) => handleNavClick(e, 'earrings')}>Earrings</Nav.Link>
              <Nav.Link href="#" onClick={(e) => handleNavClick(e, 'bangles-cuffs')}>Bangles & Cuffs</Nav.Link>
              <Nav.Link href="#" onClick={(e) => handleNavClick(e, 'rings')}>Rings</Nav.Link>
            </Nav>
          </Col>

          {/* Column 3: Fall and Picot */}
          <Col md={2} className="dropdown-col">
             <Nav.Link href="#" onClick={(e) => handleNavClick(e, 'fall-picot')} className="dropdown-col-title-link">
                <h6 className="dropdown-col-title">FALL AND PICOT</h6>
             </Nav.Link>
          </Col>

          {/* Column 4 & 5: Images */}
          <Col md={3}>
            <a href="#" className="dropdown-image-link" onClick={(e) => handleNavClick(e, 'shop')}>
              <img src="/images/dropdown-tales-handwoven.jpg" alt="Tales of Handwoven Yards" className="img-fluid" />
              <p className="dropdown-image-caption">TALES OF HANDWOVEN YARDS</p>
            </a>
          </Col>
          <Col md={3}>
            <a href="#" className="dropdown-image-link" onClick={(e) => handleNavClick(e, 'jewellery')}>
              <img src="/images/dropdown-specks-sparkle.jpg" alt="Specks of Sparkle" className="img-fluid" />
               <p className="dropdown-image-caption">SPECKS OF SPARKLE</p>
            </a>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ShopDropdownMenu;
// src/components/filters/FilterDrawer.jsx

import React, { useState } from 'react';
import { Offcanvas, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

// --- DATA MOCKUPS (based on your video) ---

const collections = [
  'All Products',
  'All Sarees',
  'All Jewellery',
  'chanderi',
  'cotton',
  'silk and tussar'
];

const priceRanges = [
  '2000-4000',
  '4000-6000',
  '6000-10000',
  'above 10000'
];

const styles = [
  'casual',
  'special occasion'
];

// All 18 colors from the video
const colors = [
  { name: 'white', hex: '#FFFFFF' },
  { name: 'beige', hex: '#f5f5dc' },
  { name: 'brown', hex: '#a52a2a' },
  { name: 'orange', hex: '#ffa500' },
  { name: 'black', hex: '#000000' },
  { name: 'purple', hex: '#800080' },
  { name: 'pink', hex: '#ffc0cb' },
  { name: 'grey', hex: '#808080' },
  { name: 'blue', hex: '#0000ff' },
  { name: 'green', hex: '#008000' },
  { name: 'red', hex: '#ff0000' },
  { name: 'yellow', hex: '#ffff00' },
  { name: 'teal', hex: '#008080' },
  { name: 'magenta', hex: '#ff00ff' },
  { name: 'maroon', hex: '#800000' },
  { name: 'mustard', hex: '#ffdb58' },
  { name: 'silver', hex: '#c0c0c0' },
  { name: 'gold', hex: '#ffd700' },
];

// --- STYLES (can be moved to main.css) ---
const filterStyles = `
  .filter-section h5 {
    font-size: 13px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 15px;
  }
  .filter-list {
    list-style: none;
    padding-left: 0;
    font-size: 14px;
    text-transform: capitalize;
  }
  .filter-list li {
    padding: 6px 0;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  .filter-list li:hover {
    color: #a8853d;
  }
  .filter-list li.selected {
    font-weight: 600;
  }
  /* This adds the selection dot */
  .filter-list li.selected::before {
    content: '•';
    margin-right: 8px;
    color: #a8853d;
    font-size: 16px;
    line-height: 1;
  }

  .offcanvas-footer {
    background-color: #f9f9f9;
    border-top: 1px solid #e5e5e5;
  }
  .color-swatch {
    width: 24px; 
    height: 24px;
    border: 1px solid #ccc;
    cursor: pointer;
    transition: all 0.2s ease;
    /* This makes the inner color look clean */
    background-clip: content-box;
    padding: 2px;
  }
  .color-swatch:hover {
    transform: scale(1.15);
  }
  /* This adds the selection border */
  .color-swatch.selected {
    border: 2px solid #a8853d;
    transform: scale(1.15);
  }
  .btn-reset {
    text-decoration: none;
    color: #6c757d;
  }
  .btn-reset:hover {
    color: #1c1c1c;
  }
`;

// --- COMPONENT ---

const FilterDrawer = ({ show, handleClose }) => {
  // 1. Add state for all filter types
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState(null);

  // 2. Handle resetting all filters
  const handleReset = () => {
    setSelectedCollection(null);
    setSelectedColor(null);
    setSelectedPrice(null);
    setSelectedStyle(null);
  };
  
  // 3. Handle applying filters (for now, it just logs)
  const handleApply = () => {
    console.log("Applying filters:", {
      collection: selectedCollection,
      color: selectedColor,
      price: selectedPrice,
      style: selectedStyle,
    });
    // In the future, this will pass the state up to SareesPage
    handleClose();
  };

  // Helper to render the color swatch with a tooltip
  const renderColorSwatch = (color) => (
    <OverlayTrigger
      key={color.name}
      placement="top"
      overlay={<Tooltip id={`tooltip-${color.name}`}>{color.name}</Tooltip>}
    >
      <div
        className={`color-swatch ${selectedColor === color.hex ? 'selected' : ''}`}
        style={{ backgroundColor: color.hex }}
        onClick={() => setSelectedColor(color.hex)}
      />
    </OverlayTrigger>
  );

  return (
    <>
      <style>{filterStyles}</style>
      
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>FILTERS</Offcanvas.Title>
        </Offcanvas.Header>
        
        <Offcanvas.Body>
          {/* COLLECTION Section */}
          <div className="filter-section mb-4">
            <h5>COLLECTION</h5>
            <ul className="filter-list">
              {collections.map(item => (
                <li
                  key={item}
                  className={selectedCollection === item ? 'selected' : ''}
                  onClick={() => setSelectedCollection(item)}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          
          {/* COLOR Section */}
          <div className="filter-section mb-4">
            <h5>COLOR</h5>
            <div className="d-flex flex-wrap gap-2">
              {colors.map(renderColorSwatch)}
            </div>
          </div>

          {/* PRICE RANGE Section */}
          <div className="filter-section mb-4">
            <h5>PRICE RANGE</h5>
            <ul className="filter-list">
              {priceRanges.map(item => (
                <li
                  key={item}
                  className={selectedPrice === item ? 'selected' : ''}
                  onClick={() => setSelectedPrice(item)}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* STYLE Section */}
          <div className="filter-section mb-4">
            <h5>STYLE</h5>
            <ul className="filter-list">
              {styles.map(item => (
                <li
                  key={item}
                  className={selectedStyle === item ? 'selected' : ''}
                  onClick={() => setSelectedStyle(item)}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Offcanvas.Body>
        
        {/* Footer with Apply/Reset buttons */}
        <div className="offcanvas-footer p-3">
          <Button variant="dark" className="w-100 mb-2" onClick={handleApply}>
            APPLY
          </Button>
          <Button variant="link" className="w-100 btn-reset p-0" onClick={handleReset}>
            RESET
          </Button>
        </div>
      </Offcanvas>
    </>
  );
};

export default FilterDrawer;
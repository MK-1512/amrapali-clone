// src/components/common/JewelleryHeroBanner.jsx

import React from 'react';

const JewelleryHeroBanner = () => {
  return (
    <div className="collection-hero-banner jewellery-hero-banner">
      <h1 className="hero-title" style={{ color: '#ffffff', fontSize: '28px', margin: 0 }}>
        NEW ARRIVALS
      </h1>
      <p className="hero-subtitle" style={{ color: '#ffffff', margin: '10px 0 0 0', opacity: 0.9, textAlign: 'center' }}>
        Building up a jewellery collection takes some serious thought. <br/>
        Choose from an assorted range of handcrafted, contemporary jewellery.
      </p>
    </div>
  );
};

export default JewelleryHeroBanner;
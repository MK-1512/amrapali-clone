// src/components/common/NewArrivalsJewelleryHeroBanner.jsx
import React from 'react';

const NewArrivalsJewelleryHeroBanner = () => {
  return (
    <div
      className="collection-hero-banner jewellery-hero-banner" // Reuse existing class for styling
      style={{ backgroundImage: `url('/images/jewellery-hero-bg.jpg')` }} // Use the same image for now
    >
      <div className="hero-overlay"></div>
      <div className="hero-content">
        {/* Content matching the second screenshot */}
        <h1 className="hero-title" style={{ color: '#ffffff', fontSize: '28px', margin: 0 }}>
          NEW ARRIVALS {/* Title from screenshot */}
        </h1>
        <p className="hero-subtitle" style={{ color: '#ffffff', margin: '10px 0 0 0', opacity: 0.9, textAlign: 'center' }}>
          Building up a jewellery collection takes some serious thought. <br/>
          Choose from an assorted range of handcrafted, contemporary jewellery. {/* Subtitle from screenshot */}
        </p>
      </div>
    </div>
  );
};

export default NewArrivalsJewelleryHeroBanner;
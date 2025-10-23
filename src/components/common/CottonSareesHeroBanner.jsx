// src/components/common/CottonSareesHeroBanner.jsx
import React from 'react';

const CottonSareesHeroBanner = () => {
  return (
    <div
      className="collection-hero-banner" // Base class
      style={{ backgroundImage: `url('/images/cotton-hero-bg.jpg')` }} // <-- UPDATE IMAGE PATH
    >
      <div className="hero-overlay" style={{ backgroundColor: 'rgba(0, 0, 0, 0.45)' }}></div> {/* Slightly darker overlay like video */}
      <div className="hero-content">
        <h1 className="hero-title" style={{ color: '#ffffff', fontSize: '28px', margin: 0 }}>
          COTTON SAREES {/* Title from video */}
        </h1>
        {/* Subtitle from video */}
        <p className="hero-subtitle" style={{ color: '#ffffff', margin: '10px 0 0 0', opacity: 0.9, textAlign: 'center' }}>
          Explore our comfortable and stylish collection of cotton sarees.
        </p>
      </div>
    </div>
  );
};

export default CottonSareesHeroBanner;
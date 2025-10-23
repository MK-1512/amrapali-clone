// src/components/common/SilkTussarSareesHeroBanner.jsx
import React from 'react';

const SilkTussarSareesHeroBanner = () => {
  return (
    <div
      className="collection-hero-banner" // Base class
      style={{ backgroundImage: `url('/images/silk-tussar-hero-bg.jpg')` }} // <-- UPDATE IMAGE PATH
    >
      <div className="hero-overlay" style={{ backgroundColor: 'rgba(0, 0, 0, 0.45)' }}></div> {/* Slightly darker overlay like video */}
      <div className="hero-content">
        <h1 className="hero-title" style={{ color: '#ffffff', fontSize: '28px', margin: 0 }}>
          SILK & TUSSAR SAREES {/* Title from video */}
        </h1>
        {/* Subtitle from video */}
        <p className="hero-subtitle" style={{ color: '#ffffff', margin: '10px 0 0 0', opacity: 0.9, textAlign: 'center' }}>
          Discover the elegance of our Silk and Tussar saree collection.
        </p>
      </div>
    </div>
  );
};

export default SilkTussarSareesHeroBanner;
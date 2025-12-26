import React from 'react';

const SilkTussarSareesHeroBanner = () => {
  return (
    <div
      className="collection-hero-banner"
      style={{ backgroundImage: `url('/images/silk-tussar-hero-bg.jpg')` }}
    >
      <div className="hero-overlay" style={{ backgroundColor: 'rgba(0, 0, 0, 0.45)' }}></div>
      <div className="hero-content">
        <h1 className="hero-title" style={{ color: '#ffffff', fontSize: '28px', margin: 0 }}>
          SILK & TUSSAR SAREES
        </h1>
        <p className="hero-subtitle" style={{ color: '#ffffff', margin: '10px 0 0 0', opacity: 0.9, textAlign: 'center' }}>
          Discover the elegance of our Silk and Tussar saree collection.
        </p>
      </div>
    </div>
  );
};

export default SilkTussarSareesHeroBanner;
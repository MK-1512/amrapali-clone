import React from 'react';

const CottonSareesHeroBanner = () => {
  return (
    <div
      className="collection-hero-banner"
      style={{ backgroundImage: `url('/images/cotton-hero-bg.jpg')` }}
    >
      <div className="hero-overlay" style={{ backgroundColor: 'rgba(0, 0, 0, 0.45)' }}></div>
      <div className="hero-content">
        <h1 className="hero-title" style={{ color: '#ffffff', fontSize: '28px', margin: 0 }}>
          COTTON SAREES
        </h1>
        <p className="hero-subtitle" style={{ color: '#ffffff', margin: '10px 0 0 0', opacity: 0.9, textAlign: 'center' }}>
          Explore our comfortable and stylish collection of cotton sarees.
        </p>
      </div>
    </div>
  );
};

export default CottonSareesHeroBanner;
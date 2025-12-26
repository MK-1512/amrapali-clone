import React from 'react';

const EarringsHeroBanner = () => {
  return (
    <div
      className="collection-hero-banner"
      style={{ backgroundImage: `url('/images/earrings-hero-bg.jpg')` }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1 className="hero-title" style={{ color: '#ffffff', fontSize: '28px', margin: 0 }}>
          EARRINGS
        </h1>
        <p className="hero-subtitle" style={{ color: '#ffffff', margin: '10px 0 0 0', opacity: 0.9, textAlign: 'center', maxWidth: '650px' }}>
          No other piece of jewellery complements a hairstyle or frames the face as much as a lovely pair of earrings. Up your accessory game by picking your favorites from our striking collection of handcrafted contemporary jewellery.
        </p>
      </div>
    </div>
  );
};

export default EarringsHeroBanner;
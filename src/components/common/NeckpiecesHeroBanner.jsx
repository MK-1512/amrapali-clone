import React from 'react';

const NeckpiecesHeroBanner = () => {
  return (
    <div
      className="collection-hero-banner"
      style={{ backgroundImage: `url('/images/neckpieces-hero-bg.jpg')` }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1 className="hero-title" style={{ color: '#ffffff', fontSize: '28px', margin: 0 }}>
          NECKPIECES
        </h1>
        <p className="hero-subtitle" style={{ color: '#ffffff', margin: '10px 0 0 0', opacity: 0.9, textAlign: 'center', maxWidth: '600px' }}>
          Neckpieces are the most versatile form of accessory and can make for great fashion conversation starters. Find your own version of beauty from our range of sterling silver pendants, edgy chokers, understated fabric neckpieces and much more.
        </p>
      </div>
    </div>
  );
};

export default NeckpiecesHeroBanner;
import React from 'react';

const BanglesCuffsHeroBanner = () => {
  return (
    <div
      className="collection-hero-banner"
      style={{ backgroundImage: `url('/images/bangles-hero-bg.jpg')` }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1 className="hero-title" style={{ color: '#ffffff', fontSize: '28px', margin: 0 }}>
          BANGLES & CUFFS
        </h1>
        <p className="hero-subtitle" style={{ color: '#ffffff', margin: '10px 0 0 0', opacity: 0.9, textAlign: 'center', maxWidth: '700px' }}>
          Add a touch of craft to your jewelry box with our charming pieces of bangles and cuffs in appealing textures, shapes and embellishments. Make a statement with an eye-catching ghungroo cuff or play on your subtlety with a minimalistic everyday-wear bangle, the choice is yours.
        </p>
      </div>
    </div>
  );
};

export default BanglesCuffsHeroBanner;
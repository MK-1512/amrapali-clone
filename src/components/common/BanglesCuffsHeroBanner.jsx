import React from 'react';

const BanglesCuffsHeroBanner = () => {
  return (
    <div
      className="collection-hero-banner" // Use the general class for layout
      // Apply the specific background image using inline style
      style={{ backgroundImage: `url('/images/bangles-hero-bg.jpg')` }} // <-- UPDATE IMAGE PATH
    >
      <div className="hero-overlay"></div> {/* Keep overlay if desired */}
      <div className="hero-content"> {/* Keep content structure */}
        <h1 className="hero-title" style={{ color: '#ffffff', fontSize: '28px', margin: 0 }}>
          BANGLES & CUFFS
        </h1>
        {/* Updated subtitle based on video */}
        <p className="hero-subtitle" style={{ color: '#ffffff', margin: '10px 0 0 0', opacity: 0.9, textAlign: 'center', maxWidth: '700px' }}>
          Add a touch of craft to your jewelry box with our charming pieces of bangles and cuffs in appealing textures, shapes and embellishments. Make a statement with an eye-catching ghungroo cuff or play on your subtlety with a minimalistic everyday-wear bangle, the choice is yours.
        </p>
      </div>
    </div>
  );
};

export default BanglesCuffsHeroBanner;
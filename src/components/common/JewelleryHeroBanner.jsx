// src/components/common/JewelleryHeroBanner.jsx

import React from 'react';

const JewelleryHeroBanner = () => {
  return (
    <div
      className="collection-hero-banner jewellery-hero-banner" // Keep classes for styling
      style={{ backgroundImage: `url('/images/jewellery-hero-bg.jpg')` }} // Keep background image
    >
      <div className="hero-overlay"></div> {/* Optional overlay */}
      <div className="hero-content">
        {/* --- Updated Title --- */}
        <h1 className="hero-title" style={{ color: '#ffffff', fontSize: '28px', margin: 0 }}>
          JEWELLERY {/* Changed from NEW ARRIVALS */}
        </h1>
        {/* --- Updated Subtitle --- */}
        <p className="hero-subtitle" style={{ color: '#ffffff', margin: '15px 0 0 0', opacity: 0.9, textAlign: 'center', maxWidth: '750px', lineHeight: '1.7' }}>
          We believe jewellery is a form of self-expression, much like the clothes we wear. And there are times, when a piece of jewellery makes more of a statement than the outfit in itself. Browse through our stunning collection of classic and eclectic jewellery pieces in both sterling silver and non-silver lines.
          <br /> {/* Added line break for similarity */}
          We all love a little bit of sparkle in our lives, don't we?
        </p>
      </div>
    </div>
  );
};

export default JewelleryHeroBanner; //
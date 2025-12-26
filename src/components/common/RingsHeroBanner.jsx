import React from 'react';

const RingsHeroBanner = () => {
  return (
    <div
      className="collection-hero-banner"
      style={{ backgroundImage: `url('/images/rings-hero-bg.jpg')` }}
    >
       <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1 className="hero-title" style={{ color: '#ffffff', fontSize: '28px', margin: 0 }}>
          RINGS
        </h1>
        <p className="hero-subtitle" style={{ color: '#ffffff', margin: '10px 0 0 0', opacity: 0.9, textAlign: 'center', maxWidth: '700px' }}>
           No Jewellery collection is complete without some chunky statements rings, that make you stand out in a crowd. Browse through our exquisite selection of large and dramatic, bold statement rings that is bound to leave a lasting impression and a speck of sparkle wherever you go.
        </p>
      </div>
    </div>
  );
};

export default RingsHeroBanner;
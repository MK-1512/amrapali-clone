import React from 'react';

const FallPicotHeroBanner = () => {
  const bannerStyle = {
    backgroundImage: `url('/images/fall-picot-hero-bg.png')`,
    backgroundPosition: 'center center',
  };

  return (
    <div
      className="collection-hero-banner"
      style={bannerStyle}
    >
      <div className="hero-overlay" style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}></div>
      <div className="hero-content">
        <h1 className="hero-title" style={{ color: '#ffffff', fontSize: '28px', margin: 0 }}>
          FALL AND PICOT
        </h1>
        <p className="hero-subtitle" style={{ color: '#ffffff', margin: '10px 0 0 0', opacity: 0.9, textAlign: 'center' }}>
          Make your saree shopping experience more hassle-free with our customised fall and picot services.
        </p>
      </div>
    </div>
  );
};

export default FallPicotHeroBanner;
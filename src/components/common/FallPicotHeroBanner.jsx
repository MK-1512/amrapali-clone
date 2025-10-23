// src/components/common/FallPicotHeroBanner.jsx
import React from 'react';

const FallPicotHeroBanner = () => {
  // Define inline style for the background image
  const bannerStyle = {
    // --- CORRECTED PATH ---
    backgroundImage: `url('/images/fall-picot-hero-bg.png')`, // Assumes image is in public/images/
    // --- END CORRECTION ---
    backgroundPosition: 'center center', // Center the image
  };

  return (
    <div
      className="collection-hero-banner" // Base class for layout
      style={bannerStyle}
    >
      <div className="hero-overlay" style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}></div> {/* Overlay */}
      <div className="hero-content">
        <h1 className="hero-title" style={{ color: '#ffffff', fontSize: '28px', margin: 0 }}>
          FALL AND PICOT {/* Title from video */}
        </h1>
        {/* Subtitle from video */}
        <p className="hero-subtitle" style={{ color: '#ffffff', margin: '10px 0 0 0', opacity: 0.9, textAlign: 'center' }}>
          Make your saree shopping experience more hassle-free with our customised fall and picot services.
        </p>
      </div>
    </div>
  );
};

export default FallPicotHeroBanner;
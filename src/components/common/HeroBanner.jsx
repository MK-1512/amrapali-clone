import React from 'react';

const HeroBanner = () => {
  return (
    <div className="hero-banner">
      <div className="hero-overlay"></div>
      
      {/* The hero-content is now a direct child of hero-banner */}
      <div className="hero-content">
        <h1 className="hero-title">NEW ARRIVALS</h1>
        <p className="hero-subtitle">Is it time to give your wardrobe a zing?<br/>Choose from an assorted range of handwoven six yards fresh off the loom.</p>
      </div>

    </div>
  );
};

export default HeroBanner;
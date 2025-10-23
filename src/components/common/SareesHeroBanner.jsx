// src/components/common/SareesHeroBanner.jsx

import React from 'react';

const SareesHeroBanner = () => {
  return (
    <div
      className="collection-hero-banner saree-hero-banner" // Keep base class
      // Use a relevant background image for the main saree page
      style={{ backgroundImage: `url('/images/sarees-all-hero-bg.jpg')` }} // <-- UPDATE IMAGE PATH if needed
    >
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1 className="hero-title" style={{ color: '#ffffff', fontSize: '28px', margin: 0 }}>
          SAREES {/* Changed Title */}
        </h1>
        {/* You can keep or adjust this subtitle */}
        <p className="hero-subtitle" style={{ color: '#ffffff', margin: '10px 0 0 0', opacity: 0.9, textAlign: 'center' }}>
          Is it time to give your wardrobe a zing? <br/>
          Choose from an assorted range of handwoven six yards, fresh off the loom.
        </p>
      </div>
    </div>
  );
};

export default SareesHeroBanner; //
// src/components/common/NewArrivalsSareesHeroBanner.jsx
import React from 'react';

const NewArrivalsSareesHeroBanner = () => {
  return (
    <div
      className="collection-hero-banner saree-hero-banner" // Reuse saree styling
      style={{ backgroundImage: `url('/images/hero-bg.jpg')` }} // Use original hero image or a specific new arrivals one
    >
      <div className="hero-overlay"></div>
      <div className="hero-content">
        {/* Content for New Arrivals Sarees */}
        <h1 className="hero-title" style={{ color: '#ffffff', fontSize: '28px', margin: 0 }}>
          NEW ARRIVALS {/* Title for this specific view */}
        </h1>
        <p className="hero-subtitle" style={{ color: '#ffffff', margin: '10px 0 0 0', opacity: 0.9, textAlign: 'center' }}>
          Is it time to give your wardrobe a zing? <br/>
          Choose from an assorted range of handwoven six yards, fresh off the loom. {/* Original subtitle */}
        </p>
      </div>
    </div>
  );
};

export default NewArrivalsSareesHeroBanner;
// src/components/common/ChanderiSareesHeroBanner.jsx
import React from 'react';

const ChanderiSareesHeroBanner = () => {
  return (
    <div
      className="collection-hero-banner" // Base class
      style={{ backgroundImage: `url('/images/chanderi-hero-bg.jpg')` }} // <-- UPDATE IMAGE PATH
    >
      <div className="hero-overlay" style={{ backgroundColor: 'rgba(0, 0, 0, 0.45)' }}></div> {/* Slightly darker overlay like video */}
      <div className="hero-content">
        <h1 className="hero-title" style={{ color: '#ffffff', fontSize: '28px', margin: 0 }}>
          CHANDERI {/* Title from video */}
        </h1>
        {/* Subtitle from video */}
        <p className="hero-subtitle" style={{ color: '#ffffff', margin: '10px 0 0 0', opacity: 0.9, textAlign: 'center', maxWidth: '750px' }}>
          Lightweight, delicate and handwoven with utmost care and affection, our collection of gossamer Chanderi handloom sarees are best of breed. The understated opulence and effortless glamour of these yards, exude a remarkable aura around its wearer. Coming straight from the weavers' looms of Chanderi, here's our selection of this fascinating small town, that boasts of its legendary weave.
        </p>
      </div>
    </div>
  );
};

export default ChanderiSareesHeroBanner;
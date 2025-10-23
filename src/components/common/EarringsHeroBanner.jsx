import React from 'react';

const EarringsHeroBanner = () => {
  return (
    <div
      className="collection-hero-banner" // Use the general class for layout
      // Apply the specific background image using inline style
      style={{ backgroundImage: `url('/images/earrings-hero-bg.jpg')` }} // <-- UPDATE IMAGE PATH
    >
      <div className="hero-overlay"></div> {/* Keep overlay if desired */}
      <div className="hero-content"> {/* Keep content structure */}
        <h1 className="hero-title" style={{ color: '#ffffff', fontSize: '28px', margin: 0 }}>
          EARRINGS
        </h1>
        {/* Updated subtitle based on video */}
        <p className="hero-subtitle" style={{ color: '#ffffff', margin: '10px 0 0 0', opacity: 0.9, textAlign: 'center', maxWidth: '650px' }}>
          No other piece of jewellery complements a hairstyle or frames the face as much as a lovely pair of earrings. Up your accessory game by picking your favorites from our striking collection of handcrafted contemporary jewellery.
        </p>
      </div>
    </div>
  );
};

export default EarringsHeroBanner;
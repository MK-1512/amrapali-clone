import React from 'react';

const RingsHeroBanner = () => {
  return (
    <div
      className="collection-hero-banner" // Use the general class for layout
      // Apply the specific background image using inline style
      style={{ backgroundImage: `url('/images/rings-hero-bg.jpg')` }} // <-- UPDATE IMAGE PATH
    >
       <div className="hero-overlay"></div> {/* Keep overlay if desired */}
      <div className="hero-content"> {/* Keep content structure */}
        <h1 className="hero-title" style={{ color: '#ffffff', fontSize: '28px', margin: 0 }}>
          RINGS
        </h1>
         {/* Updated subtitle based on video */}
        <p className="hero-subtitle" style={{ color: '#ffffff', margin: '10px 0 0 0', opacity: 0.9, textAlign: 'center', maxWidth: '700px' }}>
           No Jewellery collection is complete without some chunky statements rings, that make you stand out in a crowd. Browse through our exquisite selection of large and dramatic, bold statement rings that is bound to leave a lasting impression and a speck of sparkle wherever you go.
        </p>
      </div>
    </div>
  );
};

export default RingsHeroBanner;
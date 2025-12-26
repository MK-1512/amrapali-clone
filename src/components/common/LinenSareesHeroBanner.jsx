import React from 'react';

const LinenSareesHeroBanner = () => {
  return (
    <div
      className="collection-hero-banner"
      style={{ backgroundImage: `url('/images/linen-hero-bg.jpg')` }}
    >
      <div className="hero-overlay" style={{ backgroundColor: 'rgba(0, 0, 0, 0.45)' }}></div>
      <div className="hero-content">
        <h1 className="hero-title" style={{ color: '#ffffff', fontSize: '28px', margin: 0 }}>
          LINEN
        </h1>
        <p className="hero-subtitle" style={{ color: '#ffffff', margin: '10px 0 0 0', opacity: 0.9, textAlign: 'center', maxWidth: '700px' }}>
          Sometimes all we need is a simple silhouette to make an impactful statement and that's what linen sarees are all about. Look effortlessly stylish all year round with our collection of buttery handwoven linen drapes, that are easy, comfy, chic and carefree; tastefully interlaced with classic vintage weaving techniques and a hint of modern aesthetics.
        </p>
      </div>
    </div>
  );
};

export default LinenSareesHeroBanner;
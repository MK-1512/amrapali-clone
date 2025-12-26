import React from 'react';

const getBannerClassFromTitle = (title) => {
    if (!title) return '';

    return 'hero-bg-' + title.toLowerCase()
                           .replace(/\s+-\s+/g, '-')
                           .replace(/\s+/g, '-')
                           .replace(/[^\w-]+/g, '');
};

const CollectionHeroBanner = ({ title, subtitle }) => {

  const backgroundClass = getBannerClassFromTitle(title);

  const bannerClasses = `collection-hero-banner ${backgroundClass}`;

  return (
    <div className={bannerClasses}>

      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1 className="hero-title">
          {title || "Collection"}
        </h1>
        {subtitle && (
          <p className="hero-subtitle">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default CollectionHeroBanner;
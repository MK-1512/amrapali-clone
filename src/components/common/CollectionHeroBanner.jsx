// src/components/common/CollectionHeroBanner.jsx
import React from 'react';

// Helper function to convert title to CSS class name
const getBannerClassFromTitle = (title) => {
    if (!title) return ''; // Return empty if no title

    // Convert to lowercase, replace spaces/special chars with hyphens
    // Basic conversion - adjust if needed for complex names
    return 'hero-bg-' + title.toLowerCase()
                           .replace(/\s+-\s+/g, '-') // Replace " - " with "-"
                           .replace(/\s+/g, '-')      // Replace spaces with "-"
                           .replace(/[^\w-]+/g, ''); // Remove remaining non-alphanumeric chars (except hyphen)
};

const CollectionHeroBanner = ({ title, subtitle }) => {

  // Generate the specific background class based on the title
  const backgroundClass = getBannerClassFromTitle(title);

  // Combine base class with specific background class
  const bannerClasses = `collection-hero-banner ${backgroundClass}`;

  return (
    // Apply the combined classes
    <div className={bannerClasses}>
      {/* Remove the inline style */}
      {/* style={bannerStyle} */}

      <div className="hero-overlay"></div> {/* Keep overlay */}
      <div className="hero-content">
        <h1 className="hero-title">
          {title || "Collection"}
        </h1>
        {subtitle && (
          <p className="hero-subtitle">
            {/* Render subtitle (potentially with line breaks handled by App.jsx) */}
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default CollectionHeroBanner;
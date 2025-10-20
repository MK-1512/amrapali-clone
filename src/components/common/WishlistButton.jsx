import React from 'react';

const WishlistButton = ({ onClick, itemCount = 0 }) => {
  return (
    <button 
      className="wishlist-button" 
      onClick={onClick}
      aria-label="Wishlist"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        style={{ width: '24px', height: '24px', color: 'white' }}
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
      </svg>
      {itemCount > 0 && (
        <span className="wishlist-badge">{itemCount}</span>
      )}
    </button>
  );
};

export default WishlistButton;
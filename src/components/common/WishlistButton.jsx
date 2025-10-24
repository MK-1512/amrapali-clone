import React, { useContext } from 'react';
import { WishlistContext } from '../../context/WishlistContext'; // <-- NEW IMPORT

const WishlistButton = () => { // Removed props, now uses context
  const { toggleWishlist, wishlistCount } = useContext(WishlistContext); // <-- USE CONTEXT

  return (
    <button 
      className="wishlist-button" 
      onClick={toggleWishlist} // <-- USE CONTEXT HANDLER
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
      {wishlistCount > 0 && ( // <-- USE CONTEXT COUNT
        <span className="wishlist-badge">{wishlistCount}</span>
      )}
    </button>
  );
};

export default WishlistButton;
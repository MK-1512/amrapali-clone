import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.find((item) => item.id === product.id);
      if (itemExists) {
        // If item exists, update quantity and MERGE options
        return prevItems.map((item) =>
          item.id === product.id ? {
              ...item, // Keep existing item properties
              quantity: item.quantity + (product.quantity || 1),
              // --- FIX: Merge existing options with new options ---
              // This ensures if Fall & Picot was added later, it persists.
              // If product.options is empty {}, it won't overwrite existing.
              options: { ...(item.options || {}), ...(product.options || {}) }
            } : item
        );
      }
      // If item is new, add it with specified quantity AND options
      return [...prevItems, {
          ...product,
          quantity: product.quantity || 1,
          // --- FIX: Ensure options are included when adding new item ---
          options: product.options || {} // Make sure options object exists
        }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, isCartOpen, toggleCart }}>
      {children}
    </CartContext.Provider>
  );
};
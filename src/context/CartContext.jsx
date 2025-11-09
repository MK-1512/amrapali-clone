// src/context/CartContext.jsx
import React, { createContext, useState, useEffect } from 'react'; // <-- IMPORT useEffect

export const CartContext = createContext();

// --- 1. NEW FUNCTION: Load initial cart from localStorage ---
const getInitialCart = () => {
  try {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (error) {
    console.error("Failed to parse cart from localStorage", error);
    return [];
  }
};
// --- END NEW FUNCTION ---


export const CartProvider = ({ children }) => {
  // --- 2. UPDATED: Use the new function to set initial state ---
  const [cartItems, setCartItems] = useState(getInitialCart());
  const [isCartOpen, setIsCartOpen] = useState(false);

  // --- 3. NEW useEffect: Save cart to localStorage on any change ---
  useEffect(() => {
    try {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    } catch (error) {
      console.error("Failed to save cart to localStorage", error);
    }
  }, [cartItems]);
  // --- END NEW useEffect ---

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      // --- Ensure product is valid ---
      if (!product || typeof product.id === 'undefined') {
        console.error("Invalid product added to cart:", product);
        return prevItems;
      }
      // --- End validation ---

      const itemExists = prevItems.find((item) => item.id === product.id);
      if (itemExists) {
        // If item exists, update quantity and MERGE options
        return prevItems.map((item) =>
          item.id === product.id ? {
              ...item, // Keep existing item properties
              quantity: (item.quantity || 1) + (product.quantity || 1), // Use 1 as fallback for quantity
              // --- FIX: Merge existing options with new options ---
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

  const clearCart = () => {
   setCartItems([]);
   // Optional: Close cart drawer after clearing
   // setIsCartOpen(false);
   console.log("Cart cleared."); // Optional logging
 };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      isCartOpen,
      toggleCart,
      clearCart // <-- Expose the new function
     }}>
      {children}
    </CartContext.Provider>
  );
};
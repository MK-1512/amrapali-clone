import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

const getInitialCart = () => {
  try {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (error) {
    console.error("Failed to parse cart from localStorage", error);
    return [];
  }
};


export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(getInitialCart());
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    } catch (error) {
      console.error("Failed to save cart to localStorage", error);
    }
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      if (!product || typeof product.id === 'undefined') {
        console.error("Invalid product added to cart:", product);
        return prevItems;
      }

      const itemExists = prevItems.find((item) => item.id === product.id);
      if (itemExists) {
        return prevItems.map((item) =>
          item.id === product.id ? {
              ...item,
              quantity: (item.quantity || 1) + (product.quantity || 1),
              options: { ...(item.options || {}), ...(product.options || {}) }
            } : item
        );
      }
      return [...prevItems, {
          ...product,
          quantity: product.quantity || 1,
          options: product.options || {}
        }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
   setCartItems([]);
   console.log("Cart cleared.");
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
      clearCart
     }}>
      {children}
    </CartContext.Provider>
  );
};
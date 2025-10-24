import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { CurrencyContext } from '../../context/CurrencyContext'; // <-- NEW
import { formatPrice } from '../../utils/currencyUtils'; // <-- NEW

const CartDrawer = () => {
  const { isCartOpen, toggleCart, cartItems, removeFromCart } = useContext(CartContext);
  const { selectedCurrency } = useContext(CurrencyContext); // <-- NEW
    
  // Subtotal calculated in INR, then converted
  const subtotalINR = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  
  // Helper to format a single price
  const getFormattedPrice = (price) => {
      // Since item.price is already in INR, we convert it here
      return formatPrice(price, selectedCurrency.code); 
  };
  
  const subtotalFormatted = getFormattedPrice(subtotalINR); // <-- NEW

  return (
    <>
      <div className={`cart-overlay ${isCartOpen ? 'open' : ''}`} onClick={toggleCart}></div>
      <div className={`cart-drawer ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-header d-flex justify-content-between align-items-center p-3 border-bottom">
          <h5>SHOPPING CART</h5>
          <button className="btn-close" onClick={toggleCart}>×</button>
        </div>
        <div className="cart-body p-3">
          {cartItems.length === 0 ? (
            <p>Your cart is currently empty.</p>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="cart-item d-flex mb-3">
                <img src={item.image1} alt={item.name} width="80" />
                <div className="ms-3 flex-grow-1">
                  <h6>{item.name}</h6>
                  <p>{item.quantity} x {getFormattedPrice(item.price)}</p> {/* <-- USE FORMATTED PRICE */}
                </div>
                <button className="btn btn-sm" onClick={() => removeFromCart(item.id)}>×</button>
              </div>
            ))
          )}
        </div>
        <div className="cart-footer p-3 border-top">
          <div className="d-flex justify-content-between mb-3">
            <strong>Subtotal:</strong>
            <strong>{subtotalFormatted}</strong> {/* <-- USE FORMATTED SUBTOTOAL */}
          </div>
          <button className="btn btn-dark w-100 mb-2">VIEW CART</button>
          <button className="btn btn-secondary w-100">CHECKOUT</button>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
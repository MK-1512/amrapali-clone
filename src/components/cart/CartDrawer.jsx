import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { CurrencyContext } from '../../context/CurrencyContext';
import { formatPrice } from '../../utils/currencyUtils';

// *** ADD setPage AS A PROP ***
const CartDrawer = ({ setPage }) => {
  const { isCartOpen, toggleCart, cartItems, removeFromCart } = useContext(CartContext);
  const { selectedCurrency } = useContext(CurrencyContext);

  const subtotalINR = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const getFormattedPrice = (price) => {
      return formatPrice(price, selectedCurrency.code || 'INR'); // Added fallback
  };

  const subtotalFormatted = getFormattedPrice(subtotalINR);

  // *** FUNCTION TO HANDLE CHECKOUT NAVIGATION ***
  const handleCheckout = () => {
    if (setPage) { // Check if the function is passed
        setPage('checkout'); // Navigate to the checkout page
        toggleCart(); // Close the cart drawer
    } else {
        console.error("setPage function not passed to CartDrawer");
    }
  };

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
                {/* *** Make sure item.image1 exists or provide a fallback *** */}
                <img src={item.image1 || '/images/placeholder.jpg'} alt={item.name} width="80" />
                <div className="ms-3 flex-grow-1">
                  <h6>{item.name}</h6>
                  {/* *** Ensure item.price exists *** */}
                  {/* --- FIX 3: Display options --- */}
                  {item.options && item.options['Fall & Picot'] && (
                      <small className="d-block text-muted"> + Fall & Picot</small>
                  )}
                  <p>{item.quantity} x {getFormattedPrice(item.price || 0)}</p>
                </div>
                <button className="btn btn-sm" onClick={() => removeFromCart(item.id)}>×</button>
              </div>
            ))
          )}
        </div>
        <div className="cart-footer p-3 border-top">
          <div className="d-flex justify-content-between mb-3">
            <strong>Subtotal:</strong>
            <strong>{subtotalFormatted}</strong>
          </div>
          {/* Optional: Add onClick handler for View Cart if needed */}
          <button className="btn btn-dark w-100 mb-2">VIEW CART</button>
          {/* *** ADD onClick HANDLER TO CHECKOUT BUTTON *** */}
          <button className="btn btn-secondary w-100" onClick={handleCheckout}>CHECKOUT</button>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
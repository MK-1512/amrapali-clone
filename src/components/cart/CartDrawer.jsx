// src/components/cart/CartDrawer.jsx
import React, { useContext, useState } from 'react'; // Import useState
import { CartContext } from '../../context/CartContext';
import { CurrencyContext } from '../../context/CurrencyContext';
import { formatPrice } from '../../utils/currencyUtils';

// --- Sub-Component: Confirmation Modal ---
const ClearConfirmationModal = ({ show, handleClose, handleConfirm, itemType = 'cart' }) => {
    if (!show) return null;
    return (
        <div className="guest-shopper-modal-overlay" style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1070, // Ensure high z-index
            display: 'flex', justifyContent: 'center', alignItems: 'center'
        }} onClick={handleClose}>
            <div className="clear-confirm-modal" style={{
                backgroundColor: '#fff', padding: '30px', borderRadius: '5px',
                width: '350px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', textAlign: 'center'
            }} onClick={(e) => e.stopPropagation()}>
                <h5 style={{ margin: '0 0 15px 0', fontSize: '18px' }}>Are you sure?</h5>
                <p style={{ fontSize: '14px', color: '#555', lineHeight: '1.6', marginBottom: '25px' }}>
                    Do you want to remove all products from your {itemType}?
                </p>
                <button
                    onClick={handleConfirm}
                    style={{ width: '100%', padding: '10px', backgroundColor: '#d13f4b', color: 'white', border: 'none', marginBottom: '10px', textTransform: 'uppercase', fontSize: '12px', cursor: 'pointer', outline: 'none' }}
                >
                    Yes, remove all items
                </button>
                <button
                    onClick={handleClose}
                    style={{ width: '100%', padding: '10px', backgroundColor: '#fff', color: '#1c1c1c', border: '1px solid #e5e5e5', textTransform: 'uppercase', fontSize: '12px', cursor: 'pointer', outline: 'none' }}
                >
                    No, keep items
                </button>
            </div>
        </div>
    );
};
// --- End Confirmation Modal ---


// *** ADD setPage AS A PROP ***
const CartDrawer = ({ setPage }) => {
 const { isCartOpen, toggleCart, cartItems, removeFromCart, clearCart } = useContext(CartContext); // <-- Import clearCart
  const { selectedCurrency } = useContext(CurrencyContext);
 const [showClearConfirm, setShowClearConfirm] = useState(false); // <-- State for confirmation

  const subtotalINR = cartItems.reduce((total, item) => total + (item.price || 0) * (item.quantity || 1), 0); // Added fallback for price/quantity

  const getFormattedPrice = (price) => {
      return formatPrice(price || 0, selectedCurrency.code || 'INR'); // Added fallback
  };

  const subtotalFormatted = getFormattedPrice(subtotalINR);

  // *** FUNCTION TO HANDLE CHECKOUT NAVIGATION ***
  const handleCheckout = () => {
    if (setPage) { // Check if the function is passed
        setPage('checkout'); // Navigate to the checkout page
        toggleCart(); // Close the cart drawer
    } else {
        console.error("setPage function not passed to CartDrawer"); //
    }
  };

 const handleConfirmClearCart = () => {
   clearCart(); //
   setShowClearConfirm(false); // Close modal after confirming
 };

  return (
    <>
     {/* Confirmation Modal */}
     <ClearConfirmationModal
        show={showClearConfirm}
        handleClose={() => setShowClearConfirm(false)}
        handleConfirm={handleConfirmClearCart}
        itemType="cart"
      />

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
                  {item.options && item.options['Fall & Picot'] && ( //
                      <small className="d-block text-muted"> + Fall & Picot</small>
                  )}
                  <p>{item.quantity || 1} x {getFormattedPrice(item.price || 0)}</p> {/* */}
                </div>
                {/* Ensure removeFromCart uses item.id */}
                <button className="btn btn-sm" onClick={() => removeFromCart(item.id)}>×</button> {/* */}
              </div>
            ))
          )}
        </div>
       {cartItems.length > 0 && ( // <-- Only show footer if cart is not empty
         <div className="cart-footer p-3 border-top">
            <div className="d-flex justify-content-between mb-3">
              <strong>Subtotal:</strong>
              <strong>{subtotalFormatted}</strong>
            </div>
           {/* Clear Cart Button */}
           <button
             className="btn btn-outline-danger w-100 mb-2" // Basic styling
             style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', borderRadius: 0 }}
             onClick={() => setShowClearConfirm(true)} // <-- Open confirmation modal
           >
             Clear Cart
           </button>
            {/* Optional: Add onClick handler for View Cart if needed */}
            <button className="btn btn-dark w-100 mb-2">VIEW CART</button>
            {/* *** ADD onClick HANDLER TO CHECKOUT BUTTON *** */}
            <button className="btn btn-secondary w-100" onClick={handleCheckout}>CHECKOUT</button>
          </div>
       )}
      </div>
    </>
  );
};

export default CartDrawer;
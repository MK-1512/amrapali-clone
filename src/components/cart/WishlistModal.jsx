// src/components/cart/WishlistModal.jsx
import React, { useContext, useState, useEffect } from 'react';
// Corrected import paths
import { WishlistContext } from '../../context/WishlistContext';
import { CurrencyContext } from '../../context/CurrencyContext';
import { CartContext } from '../../context/CartContext';
// Assuming AuthContext might be needed directly for logout if not passed through WishlistContext
import { AuthContext } from '../../context/AuthContext';
import { formatPrice } from '../../utils/currencyUtils';

// --- Sub-Component: Confirmation Modal for Clearing List ---
// (Keep this as it might be useful later, though not triggered by ellipsis when logged in)
const ClearListConfirmationModal = ({ show, handleClose, handleConfirm }) => {
    // ... (Modal code remains the same) ...
     if (!show) return null;
    return (
        <div className="guest-shopper-modal-overlay" style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1070, // Higher Z-Index
            display: 'flex', justifyContent: 'center', alignItems: 'center'
        }} onClick={handleClose}>
            <div className="clear-list-modal" style={{
                backgroundColor: '#fff', padding: '30px', borderRadius: '5px',
                width: '350px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', textAlign: 'center'
            }} onClick={(e) => e.stopPropagation()}>
                <h5 style={{ margin: '0 0 15px 0', fontSize: '18px' }}>Are you sure?</h5>
                <p style={{ fontSize: '14px', color: '#555', lineHeight: '1.6', marginBottom: '25px' }}>
                    Do you want to remove all products from My Wishlist?
                </p>
                <button
                    onClick={handleConfirm}
                    style={{ width: '100%', padding: '10px', backgroundColor: '#d13f4b', color: 'white', border: 'none', marginBottom: '10px', textTransform: 'uppercase', fontSize: '12px', cursor: 'pointer', outline: 'none' }}
                >
                    Yes, remove the items in my list
                </button>
                <button
                    onClick={handleClose}
                    style={{ width: '100%', padding: '10px', backgroundColor: '#fff', color: '#1c1c1c', border: '1px solid #e5e5e5', textTransform: 'uppercase', fontSize: '12px', cursor: 'pointer', outline: 'none' }}
                >
                    No, I changed my mind
                </button>
            </div>
        </div>
    );
};
// --- End Clear List Confirmation Modal ---

// --- NEW Sub-Component: Logout Confirmation Modal (mimics reference video's logged-in modal) ---
const LogoutConfirmationModal = ({ show, handleClose, handleLogout, userEmail }) => {
    if (!show) return null;

    const handleConfirmLogout = () => {
        handleLogout(); // Call the logout function from context
        handleClose(); // Close this modal
    };

    return (
        <div className="guest-shopper-modal-overlay" style={{ // Reusing overlay style
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1070, // Ensure it's above main modal
            display: 'flex', justifyContent: 'center', alignItems: 'center'
        }} onClick={handleClose}> {/* Close on overlay click */}
            <div className="logout-confirm-modal" style={{ // Similar style to other modals
                backgroundColor: '#fff', padding: '30px', borderRadius: '5px',
                width: '350px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', textAlign: 'center'
            }} onClick={(e) => e.stopPropagation()}> {/* Prevent closing on inner click */}
                {/* Header like reference video */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                     <h5 style={{ margin: 0, fontSize: '18px', textAlign: 'left' }}>Save Your List</h5>
                     <button onClick={handleClose} style={{ border: 'none', background: 'none', fontSize: '24px', cursor: 'pointer', padding: 0, lineHeight: 1 }}>×</button>
                </div>
                {/* Content like reference video */}
                <p style={{ fontSize: '14px', color: '#555', lineHeight: '1.6', marginBottom: '25px', textAlign: 'left' }}>
                    You are logged in as <br />
                    <strong>{userEmail || 'User'}</strong>
                </p>
                {/* Buttons like reference video */}
                 <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', marginTop: '10px' }}>
                    <button
                        onClick={handleClose} // Just close the modal
                        style={{ flex: 1, padding: '10px', backgroundColor: '#fff', color: '#555', border: '1px solid #ccc', textTransform: 'uppercase', fontSize: '12px', cursor: 'pointer', outline: 'none' }}>
                        CANCEL
                    </button>
                    <button
                        onClick={handleConfirmLogout} // Trigger logout
                        style={{ flex: 2, padding: '10px', backgroundColor: '#ffb3ba', color: 'white', border: 'none', textTransform: 'uppercase', fontSize: '12px', cursor: 'pointer', outline: 'none' }}>
                        LOG OUT
                    </button>
                </div>
            </div>
        </div>
    );
};
// --- End Logout Confirmation Modal ---


// --- Sub-Component: Wishlist Item Card ---
const WishlistItemCard = ({ item, getFormattedPrice, removeFromWishlist, addToCart }) => { // Removed toggleWishlist temporarily

    const handleAddToCartAndRemove = () => {
        addToCart(item);
        removeFromWishlist(item.id);
        // We might not want to close the whole modal here automatically
        // toggleWishlist();
    }

    return (
        <div className="wishlist-item-card" style={{
            border: '1px solid #e5e5e5', padding: '10px', width: '250px', // Adjust width as needed for layout
            textAlign: 'center', position: 'relative', margin: '0 auto',
            backgroundColor: '#fff'
        }}>
            <img
                src={item.image1}
                alt={item.name}
                style={{ width: '100%', height: 'auto', maxHeight: '300px', objectFit: 'cover', display: 'block', marginBottom: '10px' }}
            />
            {/* Remove Button (Consider making this hover-only later if needed) */}
            <button
                onClick={() => removeFromWishlist(item.id)}
                style={{ position: 'absolute', top: '5px', right: '5px', background: 'none', border: 'none', fontSize: '20px', color: '#999', cursor: 'pointer', padding: '0 5px', zIndex: 5 /* Ensure above image */ }}
                aria-label={`Remove ${item.name} from wishlist`}
            >
                ×
            </button>
            <h6 style={{ fontSize: '16px', fontWeight: '500', margin: '0 0 5px 0', minHeight: '40px' }}>{item.name}</h6>
            <p style={{ fontSize: '14px', color: '#333', marginBottom: '15px' }}>{getFormattedPrice(item.price)}</p>
            {/* Add to Cart Button */}
            <button
                className="btn btn-sm"
                onClick={handleAddToCartAndRemove}
                style={{ fontSize: '12px', padding: '8px 15px', borderRadius: 0, backgroundColor: '#1c1c1c', color: '#fff', border: 'none', textTransform: 'uppercase', cursor: 'pointer', outline: 'none' }}
            >
                ADD TO CART
            </button>
        </div>
    );
};
// --- End Wishlist Item Card ---


const WishlistModal = ({ handleNavClick }) => {
    // Get necessary context values
    const {
        isWishlistOpen,
        toggleWishlist,
        wishlistItems,
        removeFromWishlist,
        toggleGuestModal, // Still needed for the guest flow (handled by provider)
        clearWishlist,
        isLoggedIn
    } = useContext(WishlistContext);
    const { addToCart } = useContext(CartContext);
    const { selectedCurrency } = useContext(CurrencyContext);
    // Get logout function and current user directly from AuthContext
    const { logout, currentUser } = useContext(AuthContext);

    // Local state for modals within this component
    const [showClearConfirm, setShowClearConfirm] = useState(false);
    // NEW state for the logout confirmation modal
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);


    // Format price based on selected currency
    const getFormattedPrice = (price) => {
        if (!price) return '';
        return formatPrice(price, selectedCurrency.code);
    };

    // Handler for the ellipsis button click
    const handleEllipsisClick = (e) => {
         e.stopPropagation(); // Prevent modal close
         if (isLoggedIn) {
             setShowLogoutConfirm(true); // Show logout modal if logged in
         } else {
             // Potentially show 'Clear List' or do nothing if guest (reference doesn't show ellipsis for guest)
             // For now, let's keep the clear list option for guests if items exist
             if (wishlistItems.length > 0) {
                 setShowClearConfirm(true);
             }
         }
    };

    // Handler to confirm clearing the wishlist (remains the same)
    const handleConfirmClear = () => {
        clearWishlist();
        setShowClearConfirm(false);
    };

    // --- Render Logic ---
    if (!isWishlistOpen) return null; // Don't render if closed

    return (
        // Overlay for the main modal
        <div className="wishlist-modal-overlay" style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050,
            display: 'flex', justifyContent: 'center', alignItems: 'center', // Center vertically too
            overflowY: 'auto',
            padding: '20px' // Add some padding around the modal
        }} onClick={toggleWishlist}> {/* Close modal on overlay click */}

            {/* Main Modal Content Window */}
            <div className="wishlist-modal-window" style={{
                backgroundColor: '#fff',
                minHeight: '300px', // Min height
                height: 'auto', // Allow height to adjust
                maxHeight: '90vh', // Max height relative to viewport
                width: '90%',
                maxWidth: '600px', // Reduced max-width to look closer to reference
                margin: 'auto', // Center horizontally and vertically
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '5px' // Add slight rounding like reference
            }} onClick={(e) => e.stopPropagation()}> {/* Prevent closing when clicking inside */}

                {/* Header Section - Updated */}
                <div className="wishlist-header d-flex justify-content-between align-items-center p-3 border-bottom" style={{ flexShrink: 0 }}>
                    {/* Display Email if logged in, otherwise empty or placeholder */}
                    <h5 style={{ fontSize: '14px', margin: 0, fontWeight: 400, color: '#555' }}>
                        {isLoggedIn ? (currentUser?.email || 'My Wishlist') : 'My Wishlist'}
                    </h5>
                    {/* Right side icons */}
                    <div className="d-flex align-items-center gap-3">
                         {/* More options button (ellipsis) */}
                         <div
                            className="wishlist-actions-dropdown-container" // Keep class for potential styling
                            style={{ position: 'relative' }}
                         >
                            {/* Show ellipsis only if there are items OR if logged in (per reference video) */}
                            {(wishlistItems.length > 0 || isLoggedIn) && (
                                <span
                                    onClick={handleEllipsisClick} // Use updated handler
                                    style={{ fontSize: '20px', cursor: 'pointer', padding: '0 5px', color: '#555' }}
                                    aria-label="Wishlist Actions"
                                >⋮</span>
                            )}
                         </div>

                         {/* Close button (X) */}
                         <button onClick={toggleWishlist} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', padding: '0 5px', lineHeight: 1, color: '#555' }}>×</button>
                    </div>
                </div>

                {/* Body Content (Scrollable) */}
                <div className="wishlist-body p-4" style={{ flexGrow: 1, overflowY: 'auto' }}> {/* Make body scrollable */}
                    {wishlistItems.length === 0 ? (
                        // Empty Wishlist Message
                        <div className="text-center py-5">
                            <h5 style={{ fontSize: '18px', margin: '0 0 15px 0' }}>Love It? Add To My Wishlist</h5>
                            <p style={{ fontSize: '15px', color: '#555', marginBottom: '25px', maxWidth: '400px', margin: '0 auto 25px auto' }}> {/* Reduced max-width */}
                                My Wishlist allows you to keep track of all your favorites and shopping activity...
                            </p>
                            <button
                                onClick={toggleWishlist} // Close modal on click
                                style={{
                                    padding: '12px 25px', fontSize: '12px', fontWeight: '500',
                                    textTransform: 'uppercase', backgroundColor: '#1c1c1c',
                                    color: '#fff', border: 'none', borderRadius: 0,
                                    cursor: 'pointer', outline: 'none'
                                }}
                            >
                                Continue shopping
                            </button>
                        </div>
                    ) : (
                        // Grid of Wishlist Item Cards (Adjust columns for smaller modal)
                        <div className="row g-3 justify-content-center"> {/* Use g-3 for less gap */}
                            {wishlistItems.map(item => (
                                // Use Bootstrap columns for responsiveness
                                <div className="col-6 d-flex justify-content-center" key={item.id}>
                                    <WishlistItemCard
                                        item={item}
                                        getFormattedPrice={getFormattedPrice}
                                        removeFromWishlist={removeFromWishlist}
                                        addToCart={addToCart}
                                        // toggleWishlist={toggleWishlist} // Removed toggleWishlist passing
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Render Nested Modals */}
            <ClearListConfirmationModal
                show={showClearConfirm}
                handleClose={() => setShowClearConfirm(false)}
                handleConfirm={handleConfirmClear}
            />
            {/* NEW Logout Confirmation Modal */}
            <LogoutConfirmationModal
                show={showLogoutConfirm}
                handleClose={() => setShowLogoutConfirm(false)}
                handleLogout={logout} // Pass logout function from AuthContext
                userEmail={currentUser?.email} // Pass current user's email
            />
            {/* SaveListModal (for guest users) is still rendered by WishlistProvider */}

        </div>
    );
};

export default WishlistModal;


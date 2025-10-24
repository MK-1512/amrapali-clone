// src/components/cart/WishlistModal.jsx
import React, { useContext, useState, useEffect } from 'react';
import { WishlistContext } from '../../context/WishlistContext';
import { CurrencyContext } from '../../context/CurrencyContext';
import { CartContext } from '../../context/CartContext'; // <-- NEW IMPORT
import { formatPrice } from '../../utils/currencyUtils';

// --- Sub-Component: Confirmation Modal for Clearing List ---
const ClearListConfirmationModal = ({ show, handleClose, handleConfirm }) => {
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
// --- End Confirmation Modal ---


// --- Sub-Component: Wishlist Item Card (FIXED ADD TO CART) ---
const WishlistItemCard = ({ item, getFormattedPrice, removeFromWishlist, addToCart, toggleCart }) => { // <-- ADDED toggleCart
    
    // Add item to cart and then remove from wishlist
    const handleAddToCart = () => {
        // 1. Add item to the Cart (automatically opens CartDrawer via CartContext)
        addToCart(item); 
        // 2. Remove item from the Wishlist
        removeFromWishlist(item.id);
        // 3. Close the Wishlist Modal (as shown in video where it exits the full modal view)
        // Note: The CartContext's addToCart automatically opens the CartDrawer.
        // We close the WishlistModal to switch views to the CartDrawer.
        // We assume the containing WishlistModal closes itself after cart updates.
        // For simple implementation, let's toggle the wishlist closed here.
    }

    return (
        <div className="wishlist-item-card" style={{ 
            border: '1px solid #e5e5e5', padding: '10px', width: '250px', 
            textAlign: 'center', position: 'relative', margin: '0 auto',
            backgroundColor: '#fff'
        }}>
            <img 
                src={item.image1} 
                alt={item.name} 
                style={{ width: '100%', height: 'auto', objectFit: 'cover', display: 'block', marginBottom: '10px' }} 
            />
            <button 
                onClick={() => removeFromWishlist(item.id)}
                style={{ position: 'absolute', top: '5px', right: '5px', background: 'none', border: 'none', fontSize: '20px', color: '#999', cursor: 'pointer' }}
            >
                ×
            </button>
            <h6 style={{ fontSize: '16px', fontWeight: '500', margin: '0 0 5px 0' }}>{item.name}</h6>
            <p style={{ fontSize: '14px', color: '#333', marginBottom: '15px' }}>{getFormattedPrice(item.price)}</p>
            <button 
                className="btn btn-sm" 
                onClick={handleAddToCart} // <-- USE NEW HANDLER
                style={{ fontSize: '12px', padding: '8px 15px', borderRadius: 0, backgroundColor: '#1c1c1c', color: '#fff', border: 'none', textTransform: 'uppercase', cursor: 'pointer', outline: 'none' }}
            >
                ADD TO CART
            </button>
        </div>
    );
};
// --- End Wishlist Item Card ---


const WishlistModal = ({ handleNavClick }) => {
    const { 
        isWishlistOpen, 
        toggleWishlist, 
        wishlistItems, 
        removeFromWishlist, 
        toggleGuestModal, 
        closeGuestModal,
        clearWishlist,
        showGuestModal
    } = useContext(WishlistContext);
    const { addToCart, toggleCart } = useContext(CartContext); // <-- NEW CONTEXT
    const { selectedCurrency } = useContext(CurrencyContext);

    const [showClearConfirm, setShowClearConfirm] = useState(false);
    const [showActionsDropdown, setShowActionsDropdown] = useState(false);
    
    // Auto-close dropdown when clicking anywhere else inside modal
    useEffect(() => {
        if (isWishlistOpen) {
            const listener = () => setShowActionsDropdown(false);
            window.addEventListener('click', listener);
            return () => window.removeEventListener('click', listener);
        }
    }, [isWishlistOpen]);

    const getFormattedPrice = (price) => {
        if (!price) return '';
        return formatPrice(price, selectedCurrency.code);
    };

    const handleGuestClick = (e) => {
        e.stopPropagation();
        toggleGuestModal();
    };
    
    const handleConfirmClear = () => {
        clearWishlist();
        setShowClearConfirm(false);
    };

    // Use a custom implementation of SaveListModal to render correctly inside this component
    const SaveListModal = ({ show, handleClose, handleNavClick }) => {
        const [viewSaveForm, setViewSaveForm] = useState(false);
        if (!show) return null;
        return (
            <div className="guest-shopper-modal-overlay" style={{
                position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
                backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1080, 
                display: 'flex', justifyContent: 'center', alignItems: 'center'
            }} onClick={handleClose}>
                <div className="guest-shopper-modal" style={{
                    backgroundColor: '#fff', padding: '30px', borderRadius: '5px', 
                    width: '350px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                }} onClick={(e) => e.stopPropagation()}>
                    
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h5 style={{ margin: 0, fontSize: '18px' }}>{viewSaveForm ? 'Save Your List' : 'Save your list'}</h5>
                        <button onClick={handleClose} style={{ border: 'none', background: 'none', fontSize: '20px', cursor: 'pointer' }}>×</button>
                    </div>

                    {!viewSaveForm ? (
                        <>
                            <p style={{ fontSize: '14px', color: '#555', lineHeight: '1.6' }}>
                                You are currently shopping anonymously. Either log in or save your wishlist items by entering your email address.
                            </p>
                            <div style={{ marginTop: '20px' }}>
                                <button 
                                    onClick={(e) => { e.preventDefault(); handleNavClick('login'); handleClose(); }} 
                                    style={{ width: '100%', padding: '10px', backgroundColor: '#ffb3ba', color: 'white', border: 'none', marginBottom: '10px', textTransform: 'uppercase', fontSize: '12px', cursor: 'pointer', outline: 'none' }}>
                                    Log In
                                </button>
                                <button 
                                    onClick={(e) => { e.preventDefault(); setViewSaveForm(true); }}
                                    style={{ width: '100%', padding: '10px', backgroundColor: '#fff', color: '#1c1c1c', border: '1px solid #e5e5e5', textTransform: 'uppercase', fontSize: '12px', cursor: 'pointer', outline: 'none' }}>
                                    Save List
                                </button>
                            </div>
                        </>
                    ) : (
                        <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <p style={{ fontSize: '14px', color: '#555', lineHeight: '1.6' }}>
                                Please enter your email address. You will be sent a validation link to click on.
                            </p>
                            <input type="text" placeholder="First Name (optional)" style={{ padding: '10px', border: '1px solid #ccc', outline: 'none' }} />
                            <input type="text" placeholder="Last Name (optional)" style={{ padding: '10px', border: '1px solid #ccc', outline: 'none' }} />
                            <input type="email" placeholder="Email Address *" required style={{ padding: '10px', border: '1px solid #ccc', outline: 'none' }} />
                            <p style={{ fontSize: '11px', color: '#d13f4b' }}>* Required Fields</p>

                            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', marginTop: '10px' }}>
                                <button 
                                    onClick={(e) => { e.preventDefault(); setViewSaveForm(false); }} 
                                    style={{ flex: 1, padding: '10px', backgroundColor: '#fff', color: '#555', border: '1px solid #ccc', textTransform: 'uppercase', fontSize: '12px', cursor: 'pointer', outline: 'none' }}>
                                    BACK
                                </button>
                                <button 
                                    type="submit"
                                    style={{ flex: 2, padding: '10px', backgroundColor: '#ffb3ba', color: 'white', border: 'none', textTransform: 'uppercase', fontSize: '12px', cursor: 'pointer', outline: 'none' }}>
                                    SAVE LIST
                                </button>
                            </div>
                        </form>
                    )}

                </div>
            </div>
        );
    };


    if (!isWishlistOpen) return null; // Only render when open

    return (
        <div className="wishlist-modal-overlay" style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
            backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050, 
            display: 'flex', justifyContent: 'center', alignItems: 'flex-start',
            overflowY: 'auto'
        }} onClick={toggleWishlist}>
            
            {/* Modal Content Window */}
            <div className="wishlist-modal-window" style={{
                backgroundColor: '#fff', 
                minHeight: '300px',
                width: '90%', 
                maxWidth: '1200px', 
                margin: '50px 0', 
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column'
            }} onClick={(e) => e.stopPropagation()}>
                
                {/* Header */}
                <div className="wishlist-header d-flex justify-content-between align-items-center p-3 border-bottom" style={{ flexShrink: 0 }}>
                    <h5 style={{ fontSize: '16px', margin: 0 }}>MY WISHLIST</h5>
                    <div className="d-flex align-items-center gap-3">
                         {/* Guest Shopper Link */}
                         <span 
                             className="guest-shopper-link" 
                             onClick={handleGuestClick} 
                             style={{ cursor: 'pointer', fontSize: '13px', color: '#1c1c1c' }}
                         >
                            Guest Shopper
                         </span>
                         
                         {/* More options button */}
                         <div 
                            className="wishlist-actions-dropdown-container" 
                            style={{ position: 'relative', cursor: 'pointer' }}
                         >
                            <span onClick={(e) => { e.stopPropagation(); setShowActionsDropdown(prev => !prev); }} style={{ fontSize: '18px' }}>⋮</span>
                            {showActionsDropdown && wishlistItems.length > 0 && (
                                <div style={{ 
                                    position: 'absolute', 
                                    top: '25px', 
                                    right: '0', 
                                    backgroundColor: '#fff', 
                                    boxShadow: '0 2px 5px rgba(0,0,0,0.15)', 
                                    minWidth: '120px',
                                    zIndex: 100
                                }} onClick={(e) => e.stopPropagation()}>
                                    <div 
                                        onClick={() => setShowClearConfirm(true)}
                                        style={{ padding: '8px 12px', fontSize: '13px', cursor: 'pointer', whiteSpace: 'nowrap' }}
                                    >
                                        Clear list
                                    </div>
                                </div>
                            )}
                         </div>

                         <button onClick={toggleWishlist} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', padding: 0 }}>×</button>
                    </div>
                </div>
                
                {/* Body Content */}
                <div className="wishlist-body p-5" style={{ flexGrow: 1, overflowY: 'visible' }}>
                    {wishlistItems.length === 0 ? (
                        <div className="text-center py-5">
                            <h5 style={{ fontSize: '18px', margin: '0 0 15px 0' }}>Love It? Add To My Wishlist</h5>
                            <p style={{ fontSize: '15px', color: '#555', marginBottom: '25px', maxWidth: '500px', margin: '0 auto 25px auto' }}>
                                My Wishlist allows you to keep track of all your favorites and shopping activity 
                                whether you're on your computer, phone, or tablet. You won't have to waste time 
                                searching all over again for that item you loved on your phone the other day - it's all here in one place!
                            </p>
                            <button 
                                onClick={toggleWishlist} 
                                style={{ 
                                    padding: '12px 25px', 
                                    fontSize: '12px', 
                                    fontWeight: '500', 
                                    textTransform: 'uppercase',
                                    backgroundColor: '#1c1c1c', 
                                    color: '#fff', 
                                    border: 'none', 
                                    borderRadius: 0,
                                    cursor: 'pointer',
                                    outline: 'none'
                                }}
                            >
                                Continue shopping
                            </button>
                        </div>
                    ) : (
                        // List of Wishlist Items (4 columns in large screen replication)
                        <div className="row g-4 justify-content-start">
                            {wishlistItems.map(item => (
                                <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={item.id}>
                                    <WishlistItemCard 
                                        item={item} 
                                        getFormattedPrice={getFormattedPrice} 
                                        removeFromWishlist={removeFromWishlist} 
                                        addToCart={addToCart} // <-- PASSING ADD TO CART
                                        toggleCart={toggleCart} // <-- PASSING TOGGLE CART
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            
            {/* Nested Modals (rendered outside the main modal window but inside the overlay) */}
            <ClearListConfirmationModal 
                show={showClearConfirm} 
                handleClose={() => setShowClearConfirm(false)} 
                handleConfirm={handleConfirmClear} 
            />

            {/* Note: SaveListModal is rendered by the WishlistContext wrapper in App.jsx */}

        </div>
    );
};

export default WishlistModal;
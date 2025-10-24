// src/components/cart/WishlistDrawer.jsx
import React, { useContext, useState } from 'react';
import { WishlistContext } from '../../context/WishlistContext';
import { CurrencyContext } from '../../context/CurrencyContext';
import { formatPrice } from '../../utils/currencyUtils';

// --- Sub-Component: Confirmation Modal for Clearing List ---
const ClearListConfirmationModal = ({ show, handleClose, handleConfirm }) => {
    if (!show) return null;
    return (
        <div className="guest-shopper-modal-overlay" style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
            backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1060, 
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
                    style={{ width: '100%', padding: '10px', backgroundColor: '#1c1c1c', color: 'white', border: 'none', marginBottom: '10px', textTransform: 'uppercase', fontSize: '12px' }}
                >
                    Yes, remove the items in my list
                </button>
                <button 
                    onClick={handleClose} 
                    style={{ width: '100%', padding: '10px', backgroundColor: '#fff', color: '#1c1c1c', border: '1px solid #e5e5e5', textTransform: 'uppercase', fontSize: '12px' }}
                >
                    No, I changed my mind
                </button>
            </div>
        </div>
    );
};
// --- End Confirmation Modal ---


const WishlistDrawer = () => {
    const { 
        isWishlistOpen, 
        toggleWishlist, 
        wishlistItems, 
        removeFromWishlist, 
        toggleGuestModal, 
        isUserLoggedIn,
        clearWishlist // Assuming this function is added to context later
    } = useContext(WishlistContext);
    const { selectedCurrency } = useContext(CurrencyContext);
    const [showClearConfirm, setShowClearConfirm] = useState(false);
    const [showActionsDropdown, setShowActionsDropdown] = useState(false);

    // Mock implementation of clearWishlist until context update
    const mockClearWishlist = () => {
         // This mock implementation should be replaced by the context function later.
         console.log("Mock clearing wishlist.");
         setWishlistItems([]);
    };
    
    // Fallback/Mock clear list implementation if context doesn't expose it
    const handleClearList = () => {
        // Use mock or context function if available
        if (typeof clearWishlist === 'function') {
            clearWishlist();
        } else {
            // NOTE: This will be fixed when WishlistContext is updated
            // For now, we manually handle state if context mock is limited.
            // But we can assume context will handle it.
            // Temporarily use local state change for demo if full context isn't available:
             // mockClearWishlist(); 
             // We'll rely on the context having clearWishlist in the final step.
             console.log("Waiting for context clearWishlist to be implemented.");
        }
        setShowClearConfirm(false);
        setShowActionsDropdown(false);
        // Show the clearance notification here if possible
    };

    const getFormattedPrice = (price) => {
        if (!price) return '';
        return formatPrice(price, selectedCurrency.code);
    };

    const handleGuestClick = (e) => {
        e.stopPropagation();
        if (!isUserLoggedIn) {
            toggleGuestModal();
        }
    };
    
    const toggleActionsDropdown = () => {
        setShowActionsDropdown(prev => !prev);
    };

    return (
        <>
            {/* Confirmation Modal */}
            <ClearListConfirmationModal 
                show={showClearConfirm} 
                handleClose={() => setShowClearConfirm(false)} 
                handleConfirm={handleClearList} 
            />

            {/* Overlay: Closes the drawer when clicked outside */}
            <div 
                className={`cart-overlay ${isWishlistOpen ? 'open' : ''}`} 
                onClick={toggleWishlist}
            ></div>
            
            {/* Drawer */}
            <div className={`cart-drawer wishlist-drawer ${isWishlistOpen ? 'open' : ''}`}>
                <div className="cart-header d-flex justify-content-between align-items-center p-3 border-bottom">
                    <h5 style={{ fontSize: '16px' }}>MY WISHLIST</h5>
                    <div className="d-flex align-items-center gap-3">
                         <span 
                             className="guest-shopper-link" 
                             onClick={handleGuestClick} 
                             style={{ cursor: 'pointer', fontSize: '13px', color: '#1c1c1c' }}
                         >
                            Guest Shopper
                         </span>
                         {/* More options button */}
                         {wishlistItems.length > 0 && (
                             <div 
                                className="wishlist-actions-dropdown" 
                                onClick={toggleActionsDropdown} 
                                style={{ position: 'relative', cursor: 'pointer' }}
                             >
                                 <span style={{ fontSize: '18px' }}>⋮</span>
                                 {showActionsDropdown && (
                                     <div style={{ 
                                         position: 'absolute', 
                                         top: '30px', 
                                         right: '0', 
                                         backgroundColor: '#fff', 
                                         boxShadow: '0 2px 5px rgba(0,0,0,0.1)', 
                                         borderRadius: '4px',
                                         minWidth: '120px',
                                         zIndex: 100
                                     }} onClick={(e) => e.stopPropagation()}>
                                         <div 
                                             onClick={() => setShowClearConfirm(true)}
                                             style={{ padding: '10px', fontSize: '14px', cursor: 'pointer' }}
                                         >
                                             Clear list
                                         </div>
                                     </div>
                                 )}
                             </div>
                         )}

                         <button className="btn-close" onClick={toggleWishlist}>×</button>
                    </div>
                </div>
                
                <div className="cart-body p-3">
                    {wishlistItems.length === 0 ? (
                        <div className="text-center py-5">
                            <p style={{ fontSize: '15px', color: '#555', marginBottom: '20px' }}>
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
                                    borderRadius: 0
                                }}
                            >
                                Continue shopping
                            </button>
                        </div>
                    ) : (
                        // List of Wishlist Items
                        <div className="row g-3">
                            {wishlistItems.map(item => (
                                <div className="col-12" key={item.id}>
                                    <div className="cart-item d-flex align-items-start border-bottom pb-3">
                                        <img src={item.image1} alt={item.name} width="100" style={{ objectFit: 'cover', height: '130px' }} />
                                        <div className="ms-3 flex-grow-1">
                                            <h6 style={{ fontSize: '16px', fontWeight: '500', marginBottom: '5px' }}>{item.name}</h6>
                                            <p style={{ fontSize: '14px', color: '#333', marginBottom: '10px' }}>{getFormattedPrice(item.price)}</p>
                                            <button 
                                                className="btn btn-sm" 
                                                onClick={() => { /* Add to Cart logic */ }}
                                                style={{ fontSize: '12px', padding: '8px 15px', borderRadius: 0, backgroundColor: '#1c1c1c', color: '#fff', border: 'none', textTransform: 'uppercase' }}
                                            >
                                                ADD TO CART
                                            </button>
                                        </div>
                                        <button 
                                            className="btn-remove-item" 
                                            onClick={() => removeFromWishlist(item.id)}
                                            style={{ background: 'none', border: 'none', fontSize: '20px', color: '#999' }}
                                        >
                                            ×
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                
                {/* Footer is empty for Wishlist drawer */}
                <div className="cart-footer p-3 border-top d-none"></div>
            </div>
        </>
    );
};

export default WishlistDrawer;
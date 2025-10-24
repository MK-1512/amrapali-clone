// src/context/WishlistContext.jsx
import React, { createContext, useState, useCallback, useMemo } from 'react';

export const WishlistContext = createContext();

// --- Sub-Component: Save Your List Modal (Nested) ---
const SaveListModal = ({ show, handleClose, handleNavClick }) => {
    const [viewSaveForm, setViewSaveForm] = useState(false);

    if (!show) return null;
    return (
        <div className="guest-shopper-modal-overlay" style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
            backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1060, 
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
                                onClick={(e) => { 
                                    e.preventDefault();
                                    if (handleNavClick) handleNavClick('login'); 
                                    handleClose(); 
                                }} 
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
// --- End Sub-Component ---

export const WishlistProvider = ({ children, handleNavClick }) => { // <-- RECEIVES handleNavClick
    const isUserLoggedIn = false; 
    
    const [wishlistItems, setWishlistItems] = useState([]);
    const [isWishlistOpen, setIsWishlistOpen] = useState(false);
    const [showGuestModal, setShowGuestModal] = useState(false);

    const toggleWishlist = useCallback(() => {
        setIsWishlistOpen(prev => !prev);
        if (showGuestModal) setShowGuestModal(false);
    }, [showGuestModal]);

    const addToWishlist = useCallback((product) => {
        setWishlistItems(prevItems => {
            const exists = prevItems.some(item => item.id === product.id);
            const newItems = exists 
                ? prevItems.filter(item => item.id !== product.id)
                : [...prevItems, product];
            
            return newItems;
        });
        setIsWishlistOpen(true);
    }, []);

    const removeFromWishlist = useCallback((productId) => {
        setWishlistItems(prevItems => prevItems.filter(item => item.id !== productId));
    }, []);
    
    const clearWishlist = useCallback(() => {
        setWishlistItems([]);
    }, []);

    const isProductInWishlist = useCallback((productId) => {
        return wishlistItems.some(item => item.id === productId);
    }, [wishlistItems]);

    const wishlistCount = useMemo(() => wishlistItems.length, [wishlistItems]);
    
    const toggleGuestModal = useCallback(() => {
        if (!isUserLoggedIn) {
             setShowGuestModal(prev => !prev);
        }
    }, [isUserLoggedIn]);

    const closeGuestModal = useCallback(() => {
        setShowGuestModal(false);
    }, []);

    const contextValue = {
        wishlistItems,
        isWishlistOpen,
        wishlistCount,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        toggleWishlist,
        isProductInWishlist,
        showGuestModal,
        toggleGuestModal,
        closeGuestModal,
        isUserLoggedIn
    };

    return (
        <>
            <WishlistContext.Provider value={contextValue}>
                {children}
            </WishlistContext.Provider>
            {/* Render the SaveListModal here, passing the navigation handler */}
            <SaveListModal 
                show={showGuestModal} 
                handleClose={closeGuestModal} 
                handleNavClick={handleNavClick} // <-- PASSING NAV HANDLER
            />
        </>
    );
};
// src/context/WishlistContext.jsx
import React, { createContext, useState, useCallback, useMemo, useContext } from 'react';
// Corrected import path
import { AuthContext } from './AuthContext'; // Import AuthContext

export const WishlistContext = createContext();

// --- Sub-Component: Save Your List Modal (Nested within Provider) ---
// This modal is shown to guest users when they interact with certain wishlist features.
const SaveListModal = ({ show, handleClose, handleNavClick }) => {
    // State to toggle between the initial prompt and the email form
    const [viewSaveForm, setViewSaveForm] = useState(false); //

    // Don't render the modal if 'show' prop is false
    if (!show) return null; //

    return (
        // Overlay for the modal
        <div className="guest-shopper-modal-overlay" style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1060, // Ensure high z-index
            display: 'flex', justifyContent: 'center', alignItems: 'center'
        }} onClick={handleClose}> {/* Close modal on overlay click */} {/* */}
            {/* Modal Content */}
            <div className="guest-shopper-modal" style={{
                backgroundColor: '#fff', padding: '30px', borderRadius: '5px',
                width: '350px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
            }} onClick={(e) => e.stopPropagation()}> {/* Prevent closing when clicking inside modal */} {/* */}

                {/* Modal Header */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h5 style={{ margin: 0, fontSize: '18px' }}>{viewSaveForm ? 'Save Your List' : 'Save your list'}</h5>
                    <button onClick={handleClose} style={{ border: 'none', background: 'none', fontSize: '20px', cursor: 'pointer' }}>×</button>
                </div>

                {/* Conditional Content: Initial Prompt or Save Form */}
                {!viewSaveForm ? ( //
                    // Initial Prompt View
                    <>
                        <p style={{ fontSize: '14px', color: '#555', lineHeight: '1.6' }}>
                            You are currently shopping anonymously. Either log in or save your wishlist items by entering your email address.
                        </p>
                        <div style={{ marginTop: '20px' }}>
                            {/* Log In Button */}
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    // Navigate to login page using the passed handler
                                    if (handleNavClick) handleNavClick('login'); //
                                    handleClose(); // Close this modal
                                }}
                                style={{ width: '100%', padding: '10px', backgroundColor: '#ffb3ba', color: 'white', border: 'none', marginBottom: '10px', textTransform: 'uppercase', fontSize: '12px', cursor: 'pointer', outline: 'none' }}>
                                Log In
                            </button>
                            {/* Save List Button (switches view within this modal) */}
                            <button
                                onClick={(e) => { e.preventDefault(); setViewSaveForm(true); }} //
                                style={{ width: '100%', padding: '10px', backgroundColor: '#fff', color: '#1c1c1c', border: '1px solid #e5e5e5', textTransform: 'uppercase', fontSize: '12px', cursor: 'pointer', outline: 'none' }}>
                                Save List
                            </button>
                        </div>
                    </>
                ) : (
                    // Save List Form View
                    <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <p style={{ fontSize: '14px', color: '#555', lineHeight: '1.6' }}>
                            Please enter your email address. You will be sent a validation link to click on.
                        </p>
                        {/* Form Inputs (functionality not implemented) */}
                        <input type="text" placeholder="First Name (optional)" style={{ padding: '10px', border: '1px solid #ccc', outline: 'none' }} />
                        <input type="text" placeholder="Last Name (optional)" style={{ padding: '10px', border: '1px solid #ccc', outline: 'none' }} />
                        <input type="email" placeholder="Email Address *" required style={{ padding: '10px', border: '1px solid #ccc', outline: 'none' }} />
                        <p style={{ fontSize: '11px', color: '#d13f4b' }}>* Required Fields</p>

                        {/* Form Buttons */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', marginTop: '10px' }}>
                            {/* Back Button (switches view back) */}
                            <button
                                onClick={(e) => { e.preventDefault(); setViewSaveForm(false); }} //
                                style={{ flex: 1, padding: '10px', backgroundColor: '#fff', color: '#555', border: '1px solid #ccc', textTransform: 'uppercase', fontSize: '12px', cursor: 'pointer', outline: 'none' }}>
                                BACK
                            </button>
                            {/* Save List Submit Button (no action currently) */}
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


// --- Wishlist Context Provider ---
// Manages wishlist state and logic, uses AuthContext to check login status.
export const WishlistProvider = ({ children }) => {
    // Get isLoggedIn state from AuthContext
    const { isLoggedIn } = useContext(AuthContext); //

    // State for wishlist items, modal visibility, and guest modal visibility
    const [wishlistItems, setWishlistItems] = useState([]); //
    const [isWishlistOpen, setIsWishlistOpen] = useState(false); //
    const [showGuestModal, setShowGuestModal] = useState(false); //

    // Memoized navigation handler (passed down from AppContent via context value)
    // Attempt to access handleNavClick passed down through context.
    // NOTE: This relies on App.jsx passing handleNavClick to WishlistProvider correctly,
    // which might need adjustments depending on how App.jsx is structured.
    const contextValueFromHigherProvider = useContext(WishlistContext); //
    const handleNavClick = contextValueFromHigherProvider?.handleNavClick; //


    // Function to toggle the main wishlist modal/drawer
    const toggleWishlist = useCallback(() => { //
        setIsWishlistOpen(prev => !prev); //
        if (showGuestModal) setShowGuestModal(false); // Close guest modal if wishlist is toggled //
    }, [showGuestModal]); // Dependency: re-create if showGuestModal changes //

    // Function to add or remove an item from the wishlist
    const addToWishlist = useCallback((product) => { //
        setWishlistItems(prevItems => { //
            const exists = prevItems.some(item => item.id === product.id); //
            // If item exists, remove it; otherwise, add it
            const newItems = exists //
                ? prevItems.filter(item => item.id !== product.id) //
                : [...prevItems, product]; //
            return newItems; //
        });
        // Open the wishlist only if an item was *added*
         if (!wishlistItems.some(item => item.id === product.id)) { //
            setIsWishlistOpen(true); //
         }
    }, [wishlistItems]); // Dependency: re-create if wishlistItems changes //

    // Function to remove a specific item by ID
    const removeFromWishlist = useCallback((productId) => { //
        setWishlistItems(prevItems => prevItems.filter(item => item.id !== productId)); //
    }, []); //

    // Function to clear all items from the wishlist
    const clearWishlist = useCallback(() => { //
        setWishlistItems([]); // Sets the items array to empty //
        console.log("Wishlist cleared."); // Optional logging //
    }, []); // No dependencies needed //

    // Function to check if a product is currently in the wishlist
    const isProductInWishlist = useCallback((productId) => { //
        return wishlistItems.some(item => item.id === productId); //
    }, [wishlistItems]); // Dependency: re-create if wishlistItems changes //

    // Memoized count of items in the wishlist
    const wishlistCount = useMemo(() => wishlistItems.length, [wishlistItems]); //

    // Function to toggle the guest modal (only opens if user is not logged in)
    const toggleGuestModal = useCallback(() => { //
        if (!isLoggedIn) { // Use the actual login state from AuthContext //
          setShowGuestModal(prev => !prev); //
        }
    }, [isLoggedIn]); // Dependency: re-create if login state changes //

    // Function to explicitly close the guest modal
    const closeGuestModal = useCallback(() => { //
        setShowGuestModal(false); //
    }, []); //

    // Value provided by the context to consuming components
    const contextValue = {
        wishlistItems,
        isWishlistOpen,
        wishlistCount,
        addToWishlist,
        removeFromWishlist,
        clearWishlist, // <-- Make sure it's included here
        toggleWishlist,
        isProductInWishlist,
        showGuestModal,
        toggleGuestModal,
        closeGuestModal,
        isLoggedIn, // Expose isLoggedIn state from AuthContext
        handleNavClick // Pass down the navigation handler for SaveListModal
    };

    return (
        <>
            {/* Provide the context value to children */}
            <WishlistContext.Provider value={contextValue}>
                {children}
            </WishlistContext.Provider>
            {/* Render the SaveListModal outside the provider but controlled by its state */}
            {/* It receives handleNavClick from the contextValue */}
            <SaveListModal
                show={showGuestModal} //
                handleClose={closeGuestModal} //
                handleNavClick={handleNavClick} //
            />
        </>
    );
};
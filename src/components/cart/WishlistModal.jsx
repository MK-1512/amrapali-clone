import React, { useContext, useState, useEffect } from 'react';
import { WishlistContext } from '../../context/WishlistContext';
import { CurrencyContext } from '../../context/CurrencyContext';
import { CartContext } from '../../context/CartContext';
import { AuthContext } from '../../context/AuthContext';
import { formatPrice } from '../../utils/currencyUtils';

const ClearListConfirmationModal = ({ show, handleClose, handleConfirm, itemType = 'wishlist' }) => {
    if (!show) return null;
    return (
        <div className="guest-shopper-modal-overlay" style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1070,
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

const LogoutConfirmationModal = ({ show, handleClose, handleLogout, userEmail }) => {
    if (!show) return null;

    const handleConfirmLogout = () => {
        handleLogout();
        handleClose();
    };

    return (
        <div className="guest-shopper-modal-overlay" style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1070,
            display: 'flex', justifyContent: 'center', alignItems: 'center'
        }} onClick={handleClose}>
            <div className="logout-confirm-modal" style={{
                backgroundColor: '#fff', padding: '30px', borderRadius: '5px',
                width: '350px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', textAlign: 'center'
            }} onClick={(e) => e.stopPropagation()}>
                <div className="d-flex justify-content-between align-items-center mb-3">
                     <h5 style={{ margin: 0, fontSize: '18px', textAlign: 'left' }}>Save Your List</h5>
                     <button onClick={handleClose} style={{ border: 'none', background: 'none', fontSize: '24px', cursor: 'pointer', padding: 0, lineHeight: 1 }}>×</button>
                </div>
                <p style={{ fontSize: '14px', color: '#555', lineHeight: '1.6', marginBottom: '25px', textAlign: 'left' }}>
                    You are logged in as <br />
                    <strong>{userEmail || 'User'}</strong>
                </p>
                 <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', marginTop: '10px' }}>
                    <button
                        onClick={handleClose}
                        style={{ flex: 1, padding: '10px', backgroundColor: '#fff', color: '#555', border: '1px solid #ccc', textTransform: 'uppercase', fontSize: '12px', cursor: 'pointer', outline: 'none' }}>
                        CANCEL
                    </button>
                    <button
                        onClick={handleConfirmLogout}
                        style={{ flex: 2, padding: '10px', backgroundColor: '#ffb3ba', color: 'white', border: 'none', textTransform: 'uppercase', fontSize: '12px', cursor: 'pointer', outline: 'none' }}>
                        LOG OUT
                    </button>
                </div>
            </div>
        </div>
    );
};


const WishlistItemCard = ({ item, getFormattedPrice, removeFromWishlist, addToCart }) => {

    const handleAddToCartAndRemove = () => {
        addToCart(item);
        removeFromWishlist(item.id);
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
                style={{ width: '100%', height: 'auto', maxHeight: '300px', objectFit: 'cover', display: 'block', marginBottom: '10px' }}
            />
            <button
                onClick={() => removeFromWishlist(item.id)}
                style={{ position: 'absolute', top: '5px', right: '5px', background: 'none', border: 'none', fontSize: '20px', color: '#1c1c1c', cursor: 'pointer', padding: '0 5px', zIndex: 5 }}
                aria-label={`Remove ${item.name} from wishlist`}
            >
                ×
            </button>
            <h6 style={{ fontSize: '16px', fontWeight: '500', margin: '0 0 5px 0', minHeight: '40px' }}>{item.name}</h6>
            <p style={{ fontSize: '14px', color: '#333', marginBottom: '15px' }}>{getFormattedPrice(item.price)}</p>
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


const WishlistModal = ({ handleNavClick }) => {
    const {
        isWishlistOpen,
        toggleWishlist,
        wishlistItems,
        removeFromWishlist,
        toggleGuestModal,
        clearWishlist,
        isLoggedIn
    } = useContext(WishlistContext);
    const { addToCart } = useContext(CartContext);
    const { selectedCurrency } = useContext(CurrencyContext);
    const { logout, currentUser } = useContext(AuthContext);

    const [showClearConfirm, setShowClearConfirm] = useState(false);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
   const [showActionsDropdown, setShowActionsDropdown] = useState(false);


    const getFormattedPrice = (price) => {
        if (!price) return '';
        return formatPrice(price, selectedCurrency.code);
    };

    const handleEllipsisClick = (e) => {
         e.stopPropagation();
        setShowActionsDropdown(prev => !prev);
    };

    const handleConfirmClear = () => {
        clearWishlist();
        setShowClearConfirm(false);
       setShowActionsDropdown(false);
    };

   const handleOpenClearConfirm = () => {
       setShowClearConfirm(true);
       setShowActionsDropdown(false);
   };

    if (!isWishlistOpen) return null;

    return (
        <div className="wishlist-modal-overlay" style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050,
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            overflowY: 'auto',
            padding: '20px'
        }} onClick={toggleWishlist}>

            <div className="wishlist-modal-window" style={{
                backgroundColor: '#fff',
                minHeight: '300px',
                height: 'auto',
                maxHeight: '90vh',
                width: '90%',
                maxWidth: '600px',
                margin: 'auto',
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '5px'
            }} onClick={(e) => e.stopPropagation()}>

                <div className="wishlist-header d-flex justify-content-between align-items-center p-3 border-bottom" style={{ flexShrink: 0 }}>
                    <h5 style={{ fontSize: '14px', margin: 0, fontWeight: 400, color: '#555' }}>
                        {isLoggedIn ? (currentUser?.email || 'My Wishlist') : 'My Wishlist'}
                    </h5>
                    <div className="d-flex align-items-center gap-3">
                         <div
                            className="wishlist-actions-dropdown-container"
                            style={{ position: 'relative' }}
                         >
                            {(wishlistItems.length > 0) && (
                                <span
                                    onClick={handleEllipsisClick}
                                    style={{ fontSize: '20px', cursor: 'pointer', padding: '0 5px', color: '#555' }}
                                    aria-label="Wishlist Actions"
                                >⋮</span>
                            )}
                           {showActionsDropdown && (
                               <div style={{
                                   position: 'absolute',
                                   top: '30px',
                                   right: '0',
                                   backgroundColor: '#fff',
                                   boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                                   borderRadius: '4px',
                                   minWidth: '120px',
                                   zIndex: 1061
                               }} onClick={(e) => e.stopPropagation()}>
                                   <div
                                       onClick={handleOpenClearConfirm}
                                       style={{ padding: '10px 15px', fontSize: '14px', cursor: 'pointer', color: '#d13f4b' }}
                                   >
                                       Clear list
                                   </div>
                               </div>
                           )}
                         </div>
                         <button onClick={toggleWishlist} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', padding: '0 5px', lineHeight: 1, color: '#555' }}>×</button>
                    </div>
                </div>

                <div className="wishlist-body p-4" style={{ flexGrow: 1, overflowY: 'auto' }}>
                    {wishlistItems.length === 0 ? (
                        <div className="text-center py-5">
                            <h5 style={{ fontSize: '18px', margin: '0 0 15px 0' }}>Love It? Add To My Wishlist</h5>
                            <p style={{ fontSize: '15px', color: '#555', marginBottom: '25px', maxWidth: '400px', margin: '0 auto 25px auto' }}>
                                My Wishlist allows you to keep track of all your favorites and shopping activity...
                            </p>
                            <button
                                onClick={toggleWishlist}
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
                        <div className="row g-3 justify-content-center">
                            {wishlistItems.map(item => (
                                <div className="col-6 d-flex justify-content-center" key={item.id}>
                                    <WishlistItemCard
                                        item={item}
                                        getFormattedPrice={getFormattedPrice}
                                        removeFromWishlist={removeFromWishlist}
                                        addToCart={addToCart}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <ClearListConfirmationModal
                show={showClearConfirm}
                handleClose={() => setShowClearConfirm(false)}
                handleConfirm={handleConfirmClear}
               itemType="wishlist"
            />
            <LogoutConfirmationModal
                show={showLogoutConfirm}
                handleClose={() => setShowLogoutConfirm(false)}
                handleLogout={logout}
                userEmail={currentUser?.email}
            />

        </div>
    );
};

export default WishlistModal;
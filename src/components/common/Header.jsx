// src/components/common/Header.jsx
import React, { useState, useEffect, useContext } from 'react';
// Corrected context import paths
import { CartContext } from '../../context/CartContext';
import { AuthContext } from '../../context/AuthContext'; // Import AuthContext
import { NavDropdown } from 'react-bootstrap';
// Corrected component import path
import ShopDropdownMenu from './ShopDropdownMenu';

// Added handleLogout to props
const Header = ({ setPage, currentPage, resetTeamView, handleSelectCollection, viewingMemberId, isSearchOpen, toggleSearch, handleLogout }) => {
    const { toggleCart, cartItems } = useContext(CartContext);
    const { isLoggedIn, currentUser } = useContext(AuthContext); // Use AuthContext
    const cartItemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

    // List of pages where the header can start transparent and become solid on scroll
    const pagesWithHeroBannerEffect = [
        'home', 'shop', 'jewellery', 'collection', 'bestsellers',
        'neckpieces', 'earrings', 'bangles-cuffs', 'rings',
        'new-arrivals-jewellery', 'new-arrivals-sarees',
        'sarees-cotton', 'sarees-silk-tussar', 'sarees-linen', 'sarees-chanderi',
        'fall-picot', 'all-collections' // Added all-collections
    ];

    // State to track if the header background should be solid or transparent
    const [isHeaderSolid, setIsHeaderSolid] = useState(() => {
        const isViewingMemberInitially = !!viewingMemberId;
        // Check if the current page allows transparent header initially
        const isHeroPageInitially = pagesWithHeroBannerEffect.includes(currentPage);
        // Header starts solid if NOT on a hero page OR if viewing a team member
        return !isHeroPageInitially || isViewingMemberInitially || currentPage === 'login' || currentPage === 'register'; // Also solid for login/register
    });

    // State to track if the top announcement bar should be hidden
    const [isTopBarHidden, setIsTopBarHidden] = useState(() => window.scrollY > 10);
    // State to track if the navigation area is being hovered (affects styles when header is transparent)
    const [isNavHovered, setIsNavHovered] = useState(false);

    // State for managing the visibility of dropdown menus
    const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
    const [isNewArrivalsOpen, setIsNewArrivalsOpen] = useState(false);
    const [isCollectionsOpen, setIsCollectionsOpen] = useState(false);
    // Timer state for delaying the closing of the shop dropdown
    const [shopDropdownTimer, setShopDropdownTimer] = useState(null);

    // Cleanup timer on component unmount
    useEffect(() => {
        return () => {
            if (shopDropdownTimer) clearTimeout(shopDropdownTimer);
        };
    }, [shopDropdownTimer]);

    // Effect to update header style (solid/transparent) and top bar visibility based on scroll position and current page
    useEffect(() => {
        const handleStateUpdate = () => {
            const isScrolledPastThreshold = window.scrollY > 10;
            const isViewingMember = !!viewingMemberId;
            const isHeroPage = pagesWithHeroBannerEffect.includes(currentPage);
            const isAuthPage = currentPage === 'login' || currentPage === 'register';

            // Determine if header should be solid
            const shouldBeSolid = isViewingMember ||
                                  isAuthPage || // Always solid on login/register
                                  !isHeroPage || // Solid if not on a hero page
                                  (isHeroPage && isScrolledPastThreshold); // Solid on hero page only after scrolling

            setIsHeaderSolid(shouldBeSolid);
            setIsTopBarHidden(isScrolledPastThreshold); // Hide top bar based on scroll
        };

        handleStateUpdate(); // Run once on mount/update
        window.addEventListener('scroll', handleStateUpdate); // Add scroll listener
        // Cleanup listener on unmount
        return () => window.removeEventListener('scroll', handleStateUpdate);
    }, [currentPage, viewingMemberId]); // Re-run effect if page or team member view changes


    // Helper function to close all dropdown menus
    const closeAllDropdowns = () => {
        setIsShopDropdownOpen(false);
        setIsNewArrivalsOpen(false);
        setIsCollectionsOpen(false);
    };

    // Click handler for navigation links
    const handleNavClick = (e, pageName) => {
        e.preventDefault(); // Prevent default link behavior
        closeAllDropdowns(); // Close any open dropdowns
        if (shopDropdownTimer) clearTimeout(shopDropdownTimer); // Clear shop dropdown timer
        if (resetTeamView) resetTeamView(); // Reset team view state if function provided
        if (handleSelectCollection) handleSelectCollection(null); // Clear selected collection if function provided
        setPage(pageName); // Call the main navigation function passed from App.jsx
    };

    // Click handler specifically for collection items in dropdowns
    const onCollectionItemClick = (e, collectionName) => {
        e.preventDefault();
        closeAllDropdowns();
        if (shopDropdownTimer) clearTimeout(shopDropdownTimer);
        if (resetTeamView) resetTeamView();
        if (handleSelectCollection) handleSelectCollection(collectionName); // Set the selected collection
        setPage('collection'); // Navigate to the generic 'collection' page
    };

    // Mouse enter handler for the Shop navigation item area (opens dropdown)
    const handleShopAreaMouseEnter = () => {
        if (shopDropdownTimer) clearTimeout(shopDropdownTimer); // Clear any pending close timer
        setIsShopDropdownOpen(true); // Open the dropdown
    };

    // Mouse leave handler for the Shop navigation item area (starts timer to close dropdown)
    const handleShopAreaMouseLeave = () => {
        // Set a timer to close the dropdown after a short delay
        const timer = setTimeout(() => {
            setIsShopDropdownOpen(false);
        }, 150); // 150ms delay allows moving mouse into the dropdown
        setShopDropdownTimer(timer);
    };

    // Helper function to determine if a navigation link should be marked as active
    const isLinkActive = (pageName) => {
        // Special cases for parent menu items
       if (pageName === 'shop-parent') return ['shop', 'home', 'sarees-cotton', 'sarees-silk-tussar', 'sarees-linen', 'sarees-chanderi'].includes(currentPage);
       if (pageName === 'jewellery-parent') return ['jewellery', 'neckpieces', 'earrings', 'bangles-cuffs', 'rings'].includes(currentPage);
       if (pageName === 'new-arrivals-parent') return ['new-arrivals-sarees', 'new-arrivals-jewellery'].includes(currentPage);
       // Check if currently viewing any collection page
       if (pageName === 'collection') return currentPage === 'collection';
       // Default check for direct page match
       return currentPage === pageName;
    };

    // Dynamically set header classes based on state
    const headerClasses = `
      header-container
      ${isHeaderSolid ? 'scrolled' : ''}
      ${isTopBarHidden ? 'top-bar-hidden' : ''}
      ${isNavHovered ? 'nav-hovered' : ''}
    `;

    // List of collections for the dropdown menu
    const collections = [
        "SOULFUL WEAVES - Cotton Sarees (NEW)", "IKTARA - Jamdani Weaves", "RAANJHANA - Benarasi Weaves",
        "MASAKALI - Chanderi Weaves", "POPSICLE - Everyday Cottons", "DOODHE-AALTA - Red-Bordered White Sarees",
        "STORIES FROM HOME - Cotton Sarees", "ROOPKATHA - Baluchari and Swarnachari", "CANDYFLOSS - Cotton Sarees",
        "NOOR - Organza Benarasi", "SUNKISSED - Minimalist Jewellery", "A MIDAS TOUCH - Tussar Silk",
        "GOLDEN HOUR - Eclectic Jewellery", "EK SITARA - Kota Sarees", "SMART STAPLES - A Workwear Edit",
        "POTPOURRI" // Added Potpourri
    ];

    // --- Render Logic ---
    return (
        <header className={headerClasses}>
            {/* Top Announcement Bar */}
             <div className="top-bar text-center py-2">
                5% OFF ON YOUR FIRST ORDER | WELCOME 5
            </div>
            {/* Main Header Area (Logo, Icons, Nav) */}
            <div
                className="main-header-content"
                onMouseEnter={() => setIsNavHovered(true)} // Apply hover styles when mouse enters nav area
                onMouseLeave={() => setIsNavHovered(false)} // Remove hover styles when mouse leaves nav area
            >
                {/* Logo and Icons Row */}
                <div className="main-header container d-flex justify-content-between align-items-center py-3">
                   {/* Left spacer */}
                   <div className="flex-grow-1"></div>
                    {/* Logo (centered absolutely) */}
                    <div className="logo text-center">
                       <a href="#" onClick={(e) => handleNavClick(e, 'home')}>
                            <img src="/images/logo.png" alt="Amrapali Boutique" className="amrapali-logo" />
                        </a>
                    </div>
                     {/* Right Icons */}
                    <div className="header-icons d-flex align-items-center justify-content-end gap-3 flex-grow-1">
                        {/* Conditional Rendering: Show user info/logout OR login icon */}
                        {isLoggedIn ? (
                            <>
                                {/* Greeting */}
                                <span style={{ fontSize: '13px', color: isHeaderSolid || isNavHovered ? '#1c1c1c' : '#ffffff', marginRight: '10px' }}>
                                    Hi, {currentUser?.firstName || 'User'}
                                </span>
                                {/* Logout Button */}
                                <button onClick={handleLogout} className="btn btn-link p-0" style={{ textDecoration: 'none' }}>
                                    <span style={{ fontSize: '13px', color: isHeaderSolid || isNavHovered ? '#a8853d' : '#ffffff', textTransform: 'uppercase' }}>Logout</span>
                                </button>
                            </>
                        ) : (
                            // Login Icon (shown when logged out)
                            <img src="/images/icons/user-icon.svg" alt="Login" onClick={() => setPage('login')} style={{ cursor: 'pointer' }} />
                        )}
                        {/* Search Icon */}
                        <img
                           src="/images/icons/search-icon.svg"
                           alt="Search"
                           onClick={toggleSearch} // Calls the toggleSearch function from App.jsx
                           style={{ cursor: 'pointer' }}
                        />
                        {/* Cart Icon and Badge */}
                        <button onClick={toggleCart} className="btn btn-link text-dark p-0 position-relative">
                            <img src="/images/icons/cart-icon.svg" alt="Cart" />
                            {/* Show badge only if cart has items */}
                            {cartItemCount > 0 && <span className="cart-count-badge">{cartItemCount}</span>}
                        </button>
                    </div>
                </div>

                {/* Navigation Row */}
                <div
                    className="main-nav-container"
                    onMouseLeave={handleShopAreaMouseLeave} // Trigger timer to close shop dropdown when leaving nav area
                >
                     <nav className="main-nav container">
                        {/* Main navigation links */}
                        <ul className="list-unstyled d-flex justify-content-center gap-5 mb-0 py-2">
                            {/* SHOP Dropdown (manual implementation) */}
                            <li
                                className="nav-item-shop"
                                onMouseEnter={handleShopAreaMouseEnter} // Open dropdown on hover
                            >
                                <a href="#"
                                  className={`nav-link ${isLinkActive('shop-parent') ? 'active' : ''}`}
                                  onClick={(e) => handleNavClick(e, 'shop')}>
                                   SHOP
                                </a>
                                {/* Render ShopDropdownMenu conditionally */}
                                {isShopDropdownOpen && (
                                    <ShopDropdownMenu
                                        handleNavClick={handleNavClick} // Pass nav click handler
                                        onMouseEnter={handleShopAreaMouseEnter} // Keep dropdown open if mouse enters it
                                    />
                                )}
                            </li>
                             {/* NEW ARRIVALS Dropdown (using react-bootstrap) */}
                            <li
                                className="nav-item dropdown"
                                onMouseEnter={() => setIsNewArrivalsOpen(true)} // Open on hover
                                onMouseLeave={() => setIsNewArrivalsOpen(false)} // Close on leave
                            >
                                <NavDropdown
                                    title="NEW ARRIVALS"
                                    id="new-arrivals-dropdown"
                                    show={isNewArrivalsOpen} // Control visibility with state
                                    onToggle={() => {}} // Prevent default toggle behavior
                                    className={`nav-link p-0 ${isLinkActive('new-arrivals-parent') ? 'active' : ''}`} // Apply active class if relevant page is active
                                >
                                   {/* Dropdown items */}
                                   <NavDropdown.Item onClick={(e) => handleNavClick(e, 'new-arrivals-sarees')}>
                                        Sarees
                                    </NavDropdown.Item>
                                    <NavDropdown.Item onClick={(e) => handleNavClick(e, 'new-arrivals-jewellery')}>
                                        Jewellery
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </li>
                             {/* COLLECTIONS Dropdown (using react-bootstrap) */}
                            <li
                                className="nav-item dropdown"
                                onMouseEnter={() => setIsCollectionsOpen(true)} // Open on hover
                                onMouseLeave={() => setIsCollectionsOpen(false)} // Close on leave
                            >
                                <NavDropdown
                                    title="COLLECTIONS"
                                    id="collections-dropdown"
                                    show={isCollectionsOpen} // Control visibility with state
                                    onToggle={() => {}} // Prevent default toggle
                                    className={`nav-link p-0 ${isLinkActive('collection') ? 'active' : ''}`} // Apply active class if on a collection page
                                >
                                    {/* Map through collections array to create dropdown items */}
                                    {collections.map(collection => (
                                        <NavDropdown.Item key={collection} onClick={(e) => onCollectionItemClick(e, collection)}>
                                            {collection}
                                        </NavDropdown.Item>
                                    ))}
                                     {/* Link to All Collections Page */}
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={(e) => handleNavClick(e, 'all-collections')}>
                                        View All Collections
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </li>
                            {/* Other standard navigation links */}
                             <li> <a href="#" className={`nav-link ${isLinkActive('bestsellers') ? 'active' : ''}`} onClick={(e) => handleNavClick(e, 'bestsellers')}> BESTSELLERS </a> </li>
                             <li> <a href="#" className={`nav-link ${isLinkActive('meet-the-team') ? 'active' : ''}`} onClick={(e) => handleNavClick(e, 'meet-the-team')}> MEET THE TEAM </a> </li>
                             <li> <a href="#" className={`nav-link ${isLinkActive('blog') ? 'active' : ''}`} onClick={(e) => handleNavClick(e, 'blog')}> BLOG </a> </li>
                             <li> <a href="#" className={`nav-link ${isLinkActive('gift-card') ? 'active' : ''}`} onClick={(e) => handleNavClick(e, 'gift-card')}> GIFT CARD </a> </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;


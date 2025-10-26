// src/components/common/Header.jsx
import React, { useState, useEffect, useContext, useRef } from 'react'; // Import useRef
import { CartContext } from '../../context/CartContext'; //
import { AuthContext } from '../../context/AuthContext'; // Import AuthContext
import { NavDropdown } from 'react-bootstrap';
import ShopDropdownMenu from './ShopDropdownMenu'; //

// Added handleLogout to props
const Header = ({ setPage, currentPage, resetTeamView, handleSelectCollection, viewingMemberId, isSearchOpen, toggleSearch, handleLogout }) => {
    const { toggleCart, cartItems } = useContext(CartContext); //
    const { isLoggedIn, currentUser } = useContext(AuthContext); // Use AuthContext
    const cartItemCount = cartItems.reduce((count, item) => count + (item.quantity || 0), 0); // Added fallback for quantity

    // List of pages where the header can start transparent and become solid on scroll
    const pagesWithHeroBannerEffect = [
        'home', 'shop', 'jewellery', 'collection', 'bestsellers',
        'neckpieces', 'earrings', 'bangles-cuffs', 'rings',
        'new-arrivals-jewellery', 'new-arrivals-sarees',
        'sarees-cotton', 'sarees-silk-tussar', 'sarees-linen', 'sarees-chanderi',
        'fall-picot', 'all-collections',
        'search-results' // Include search results page
    ]; //

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
    const [isNavHovered, setIsNavHovered] = useState(false); // Keep for header background style

    // Dropdown states
    const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false); //
    const [isNewArrivalsOpen, setIsNewArrivalsOpen] = useState(false); //
    const [isCollectionsOpen, setIsCollectionsOpen] = useState(false); //

    // --- NEW: Timer state for closing dropdowns ---
    const closeTimerRef = useRef(null); // Use useRef to store the timer ID

    // --- Cleanup timer on component unmount ---
    useEffect(() => {
        // Clear any lingering timer when the component unmounts
        return () => {
            if (closeTimerRef.current) {
                clearTimeout(closeTimerRef.current);
            }
        };
    }, []);

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
        // Allow default behavior for external links if needed in the future
        if (e) e.preventDefault(); // Prevent default link behavior
        // --- Clear timer on click ---
        if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
        closeAllDropdowns(); // Close any open dropdowns
        if (resetTeamView) resetTeamView(); // Reset team view state if function provided
        if (handleSelectCollection) handleSelectCollection(null); // Clear selected collection if function provided
        setPage(pageName); // Call the main navigation function passed from App.jsx
    };

    // Click handler specifically for collection items in dropdowns
    const onCollectionItemClick = (e, collectionName) => {
        e.preventDefault();
         // --- Clear timer on click ---
        if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
        closeAllDropdowns();
        if (resetTeamView) resetTeamView();
        if (handleSelectCollection) handleSelectCollection(collectionName); // Set the selected collection
        setPage('collection'); // Navigate to the generic 'collection' page
    };

    // --- REVISED: Hover Logic with Delay (Focus on Clearing/Setting Timer) ---
    const DROPDOWN_CLOSE_DELAY = 150; // ms delay before closing

    // Function to call when mouse enters ANY nav item or dropdown area
    const handleMouseEnter = (menu = null) => { // Accept null for non-dropdown items
        // Clear any pending close timer immediately
        if (closeTimerRef.current) {
            clearTimeout(closeTimerRef.current);
            closeTimerRef.current = null;
        }
        // Open the target menu and close others if a menu is specified
        if (menu) {
            setIsShopDropdownOpen(menu === 'shop');
            setIsNewArrivalsOpen(menu === 'new-arrivals');
            setIsCollectionsOpen(menu === 'collections');
        } else {
             // If entering a non-dropdown link, close any open dropdowns immediately
             closeAllDropdowns();
        }
    };

    // --- FIX: Rename function back to handleMouseLeave ---
    // Function to call ONLY when mouse leaves the ENTIRE nav container
    const handleMouseLeave = () => { // Renamed from handleMouseLeaveNavArea
        // Set a timer to close all dropdowns after a delay
        closeTimerRef.current = setTimeout(() => {
            closeAllDropdowns();
            closeTimerRef.current = null; // Clear ref after execution
        }, DROPDOWN_CLOSE_DELAY);
    };
    // --- END: Revised Hover Logic ---


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
    `; //

    // List of collections for the dropdown menu
    const collections = [
        "SOULFUL WEAVES - Cotton Sarees (NEW)", "IKTARA - Jamdani Weaves", "RAANJHANA - Benarasi Weaves",
        "MASAKALI - Chanderi Weaves", "POPSICLE - Everyday Cottons", "DOODHE-AALTA - Red-Bordered White Sarees",
        "STORIES FROM HOME - Cotton Sarees", "ROOPKATHA - Baluchari and Swarnachari", "CANDYFLOSS - Cotton Sarees",
        "NOOR - Organza Benarasi", "SUNKISSED - Minimalist Jewellery", "A MIDAS TOUCH - Tussar Silk",
        "GOLDEN HOUR - Eclectic Jewellery", "EK SITARA - Kota Sarees", "SMART STAPLES - A Workwear Edit",
        "POTPOURRI" // Added Potpourri
    ]; //

    // --- Render Logic ---
    return (
        <header className={headerClasses}>
            {/* Top Announcement Bar */}
             <div className="top-bar text-center py-2"> {/* */}
                5% OFF ON YOUR FIRST ORDER | WELCOME 5
            </div>
            {/* Main Header Area (Logo, Icons, Nav) */}
            <div
                className="main-header-content"
                // --- Keep hover for background style ---
                onMouseEnter={() => setIsNavHovered(true)} // Apply hover styles when mouse enters nav area
                onMouseLeave={() => setIsNavHovered(false)} // Remove hover styles when mouse leaves nav area
                // --- REMOVE handleMouseLeaveNavArea from here ---
            >
                {/* Logo and Icons Row */}
                <div className="main-header container d-flex justify-content-between align-items-center py-3"> {/* */}
                   {/* Left spacer */}
                   <div className="flex-grow-1"></div>
                    {/* Logo (centered absolutely) */}
                    <div className="logo text-center"> {/* */}
                       <a href="#" onClick={(e) => handleNavClick(e, 'home')}>
                            <img src="/images/logo.png" alt="Amrapali Boutique" className="amrapali-logo" /> {/* */}
                        </a>
                    </div>
                     {/* Right Icons */}
                    <div className="header-icons d-flex align-items-center justify-content-end gap-3 flex-grow-1"> {/* */}
                        {/* Conditional Rendering: Show user info/logout OR login icon */}
                        {isLoggedIn ? ( //
                            <>
                                {/* Greeting */}
                                <span style={{ fontSize: '13px', color: isHeaderSolid || isNavHovered ? '#1c1c1c' : '#ffffff', marginRight: '10px' }}> {/* */}
                                    Hi, {currentUser?.firstName || 'User'} {/* */}
                                </span>
                                {/* Logout Button */}
                                <button onClick={handleLogout} className="btn btn-link p-0" style={{ textDecoration: 'none' }}>
                                    <span style={{ fontSize: '13px', color: isHeaderSolid || isNavHovered ? '#a8853d' : '#ffffff', textTransform: 'uppercase' }}>Logout</span> {/* */}
                                </button>
                            </>
                        ) : (
                            // Login Icon (shown when logged out)
                            <img src="/images/icons/user-icon.svg" alt="Login" onClick={() => setPage('login')} style={{ cursor: 'pointer' }} /> //
                        )}
                        {/* Search Icon */}
                        <img
                           src="/images/icons/search-icon.svg" // <-- Verify this path is correct
                           alt="Search"
                           onClick={toggleSearch} // Calls the toggleSearch function from App.jsx
                           style={{ cursor: 'pointer' }}
                        />
                        {/* Cart Icon and Badge */}
                        <button onClick={toggleCart} className="btn btn-link text-dark p-0 position-relative"> {/* */}
                            <img src="/images/icons/cart-icon.svg" alt="Cart" /> {/* */}
                            {/* Show badge only if cart has items */}
                            {cartItemCount > 0 && <span className="cart-count-badge">{cartItemCount}</span>} {/* */}
                        </button>
                    </div>
                </div>

                {/* Navigation Row */}
                <div
                    className="main-nav-container" //
                    // --- ADD: Attach the main leave handler here ---
                    onMouseLeave={handleMouseLeave} // Use the renamed function
                >
                     <nav className="main-nav container">
                        {/* Main navigation links */}
                        <ul className="list-unstyled d-flex justify-content-center gap-5 mb-0 py-2">
                            {/* SHOP Dropdown */}
                            <li
                                className="nav-item-shop" //
                                // --- Use only handleMouseEnter here ---
                                onMouseEnter={() => handleMouseEnter('shop')}
                                // --- REMOVE onMouseLeave ---
                            >
                                <a href="#"
                                   className={`nav-link d-flex align-items-center ${isLinkActive('shop-parent') ? 'active' : ''}`} // Added d-flex and align-items-center
                                   onClick={(e) => handleNavClick(e, 'shop')}>
                                  <span>SHOP</span>
                                  {/* --- CHANGE Arrow Style & Remove Rotation --- */}
                                  <span className="dropdown-toggle-arrow ms-1"></span> {/* Use CSS class for arrow */}
                                </a>
                                {/* Render ShopDropdownMenu conditionally */}
                                {isShopDropdownOpen && ( //
                                    <ShopDropdownMenu //
                                        handleNavClick={handleNavClick} // Pass nav click handler
                                        // --- Pass handleMouseEnter to clear timer ---
                                        onMouseEnter={() => handleMouseEnter('shop')} // Keep open when entering menu
                                        // --- REMOVE onMouseLeave from here ---
                                    />
                                )}
                            </li>
                             {/* NEW ARRIVALS Dropdown */}
                             <li
                                 className="nav-item dropdown"
                                 // --- Use only handleMouseEnter here ---
                                onMouseEnter={() => handleMouseEnter('new-arrivals')}
                                 // --- REMOVE onMouseLeave ---
                             >
                                 <NavDropdown
                                     title="NEW ARRIVALS"
                                     id="new-arrivals-dropdown"
                                     show={isNewArrivalsOpen} // Control visibility with state
                                     onToggle={() => {}} // Keep this empty
                                     className={`nav-link p-0 ${isLinkActive('new-arrivals-parent') ? 'active' : ''}`} // Apply active class if relevant page is active
                                     // --- Add handleMouseEnter to the NavDropdown container ---
                                     onMouseEnter={() => handleMouseEnter('new-arrivals')}
                                     // --- REMOVE onMouseLeave ---
                                 >
                                    {/* Dropdown items */}
                                    <NavDropdown.Item onClick={(e) => handleNavClick(e, 'new-arrivals-sarees')}>Sarees</NavDropdown.Item> {/* */}
                                    <NavDropdown.Item onClick={(e) => handleNavClick(e, 'new-arrivals-jewellery')}>Jewellery</NavDropdown.Item> {/* */}
                                 </NavDropdown>
                             </li>
                              {/* COLLECTIONS Dropdown */}
                             <li
                                 className="nav-item dropdown"
                                  // --- Use only handleMouseEnter here ---
                                onMouseEnter={() => handleMouseEnter('collections')}
                                 // --- REMOVE onMouseLeave ---
                             >
                                 <NavDropdown
                                     title="COLLECTIONS"
                                     id="collections-dropdown"
                                     show={isCollectionsOpen} // Control visibility with state
                                     onToggle={() => {}} // Keep this empty
                                     className={`nav-link p-0 ${isLinkActive('collection') ? 'active' : ''}`} // Apply active class if on a collection page
                                     // --- Add handleMouseEnter to the NavDropdown container ---
                                     onMouseEnter={() => handleMouseEnter('collections')}
                                     // --- REMOVE onMouseLeave ---
                                 >
                                     {/* Map through collections array to create dropdown items */}
                                     {collections.map(collection => (
                                         <NavDropdown.Item key={collection} onClick={(e) => onCollectionItemClick(e, collection)}>
                                             {collection}
                                         </NavDropdown.Item>
                                     ))}
                                      {/* Link to All Collections Page */}
                                     <NavDropdown.Divider />
                                     <NavDropdown.Item onClick={(e) => handleNavClick(e, 'all-collections')}> {/* */}
                                         View All Collections
                                     </NavDropdown.Item>
                                 </NavDropdown>
                             </li>
                             {/* Other standard navigation links */}
                             {/* --- Add mouseEnter handler to clear timers/close dropdowns --- */}
                             <li onMouseEnter={() => handleMouseEnter(null)}><a href="#" className={`nav-link ${isLinkActive('bestsellers') ? 'active' : ''}`} onClick={(e) => handleNavClick(e, 'bestsellers')}> BESTSELLERS </a></li> {/* */}
                             <li onMouseEnter={() => handleMouseEnter(null)}><a href="#" className={`nav-link ${isLinkActive('meet-the-team') ? 'active' : ''}`} onClick={(e) => handleNavClick(e, 'meet-the-team')}> MEET THE TEAM </a></li> {/* */}
                             <li onMouseEnter={() => handleMouseEnter(null)}><a href="#" className={`nav-link ${isLinkActive('blog') ? 'active' : ''}`} onClick={(e) => handleNavClick(e, 'blog')}> BLOG </a></li> {/* */}
                             <li onMouseEnter={() => handleMouseEnter(null)}><a href="#" className={`nav-link ${isLinkActive('gift-card') ? 'active' : ''}`} onClick={(e) => handleNavClick(e, 'gift-card')}> GIFT CARD </a></li> {/* */}
                         </ul>
                     </nav>
                 </div>
            </div>
        </header>
    );
};

export default Header;
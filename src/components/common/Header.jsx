// src/components/common/Header.jsx
import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { NavDropdown } from 'react-bootstrap';
import ShopDropdownMenu from './ShopDropdownMenu'; // <-- 1. Import ShopDropdownMenu

// Use the exact props from your stable code, adding onUserIconClick and viewingMemberId
const Header = ({ setPage, currentPage, resetTeamView, onUserIconClick, handleSelectCollection, viewingMemberId }) => {
    const { toggleCart, cartItems } = useContext(CartContext);
    const cartItemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

    // --- Identify pages that SHOULD start transparent (EXCLUDING homepage) ---
    const pagesWithHeroBannerEffect = ['shop', 'jewellery', 'collection', 'bestsellers'];

    // --- State Initialization ---
    // Start solid *unless* it's initially a page designated for the hero banner effect AND not viewing a member.
    const [isHeaderSolid, setIsHeaderSolid] = useState(() => {
        const isViewingMemberInitially = !!viewingMemberId;
        const isHeroPageInitially = pagesWithHeroBannerEffect.includes(currentPage);
        // Should be solid? True if NOT (hero page AND not viewing member)
        return !(isHeroPageInitially && !isViewingMemberInitially);
    });
    // Top bar hidden depends only on initial scroll position.
    const [isTopBarHidden, setIsTopBarHidden] = useState(() => window.scrollY > 10);
    // Keep isNavHovered state for link color changes on hover (as provided by user)
    const [isNavHovered, setIsNavHovered] = useState(false);


    // --- useEffect for SCROLL and PAGE CHANGES --- (Using the last working logic)
    useEffect(() => {
        const handleStateUpdate = () => {
            const isScrolledPastThreshold = window.scrollY > 10;
            const isViewingMember = !!viewingMemberId;
            // Check if the current page is one that should have the hero banner effect
            const isHeroPageCondition = pagesWithHeroBannerEffect.includes(currentPage) && !isViewingMember;

            // Determine header solidity
            if (isHeroPageCondition) {
                // On specific Hero Banner Pages (shop, jewellery, etc., and not viewing member): Solid state depends ONLY on scroll
                setIsHeaderSolid(isScrolledPastThreshold);
            } else {
                // For ALL OTHER pages (including homepage) OR if viewing a member: Header is ALWAYS solid
                setIsHeaderSolid(true);
            }

            // Top bar visibility is ALWAYS based on scroll position
            setIsTopBarHidden(isScrolledPastThreshold);
        };

        // Run the check immediately when the component mounts or dependencies change
        handleStateUpdate();

        // Add scroll listener
        window.addEventListener('scroll', handleStateUpdate);

        // Cleanup listener
        return () => window.removeEventListener('scroll', handleStateUpdate);
    // Re-run this effect if the current page or viewing state changes
    }, [currentPage, viewingMemberId]); // Dependencies


    // handleNavClick function exactly as provided in your stable code
    const handleNavClick = (e, pageName) => {
        e.preventDefault();
        if (resetTeamView) resetTeamView();
        handleSelectCollection(null);
        setPage(pageName);
        window.scrollTo(0, 0);
    };

     // onCollectionItemClick function exactly as provided in your stable code
    const onCollectionItemClick = (e, collectionName) => {
        e.preventDefault();
        if (resetTeamView) resetTeamView();
        handleSelectCollection(collectionName);
        setPage('collection');
        window.scrollTo(0, 0);
    };

    // isLinkActive function exactly as provided in your stable code
    const isLinkActive = (pageName) => {
       if (pageName === 'shop') return currentPage === 'shop';
       if (pageName === 'home') return currentPage === 'home';
       if (pageName === 'jewellery') return currentPage === 'jewellery';
       if (pageName === 'collection') return currentPage === 'collection';
       return currentPage === pageName;
    };

    // headerClasses definition exactly as provided in your stable code
    const headerClasses = `
      header-container
      ${isHeaderSolid ? 'scrolled' : ''}
      ${isTopBarHidden ? 'top-bar-hidden' : ''}
      ${isNavHovered ? 'nav-hovered' : ''}
    `;


    // --- Collection Dropdown Items --- (Exactly as provided)
    const collections = [
        "SOULFUL WEAVES - Cotton Sarees (NEW)",
        "IKTARA - Jamdani Weaves",
        "RAANJHANA - Benarasi Weaves",
        "MASAKALI - Chanderi Weaves",
        "POPSICLE - Everyday Cottons",
        "DOODHE-AALTA - Red-Bordered White Sarees",
        "STORIES FROM HOME - Cotton Sarees",
        "ROOPKATHA - Baluchari and Swarnachari",
        "CANDYFLOSS - Cotton Sarees",
        "NOOR - Organza Benarasi",
        "SUNKISSED - Minimalist Jewellery",
        "A MIDAS TOUCH - Tussar Silk",
        "GOLDEN HOUR - Eclectic Jewellery",
        "EK SITARA - Kota Sarees",
        "SMART STAPLES - A Workwear Edit"
        // Add more if needed from the image
    ];


    // --- Return Statement ---
    return (
        <header className={headerClasses}>
            <div className="top-bar text-center py-2">
                5% OFF ON YOUR FIRST ORDER | WELCOME 5
            </div>
            {/* Keep hover handlers as provided by user */}
            <div
                className="main-header-content"
                onMouseEnter={() => setIsNavHovered(true)}
                onMouseLeave={() => setIsNavHovered(false)}
            >
                {/* Logo and Icons Row */}
                <div className="main-header container d-flex justify-content-between align-items-center py-3">
                   <div className="flex-grow-1"></div>
                    <div className="logo text-center">
                       <a href="#" onClick={(e) => handleNavClick(e, 'home')}>
                            <img src="/images/logo.png" alt="Amrapali Boutique" className="amrapali-logo" />
                        </a>
                    </div>
                    <div className="header-icons d-flex align-items-center justify-content-end gap-3 flex-grow-1">
                        <img
                            src="/images/icons/user-icon.svg"
                            alt="User"
                            onClick={onUserIconClick} // Use the prop passed from App.jsx
                            style={{ cursor: 'pointer' }}
                        />
                        <img src="/images/icons/search-icon.svg" alt="Search" />
                        <button onClick={toggleCart} className="btn btn-link text-dark p-0 position-relative">
                            <img src="/images/icons/cart-icon.svg" alt="Cart" />
                            {cartItemCount > 0 && <span className="cart-count-badge">{cartItemCount}</span>}
                        </button>
                    </div>
                </div>

                {/* Navigation Row */}
                <div className="main-nav-container">
                     <nav className="main-nav container">
                        <ul className="list-unstyled d-flex justify-content-center gap-5 mb-0 py-2">
                            {/* --- SHOP with Dropdown --- */}
                            <li className="nav-item-shop"> {/* 2. Add wrapper class */}
                                <a href="#"
                                  className={`nav-link ${isLinkActive('shop') ? 'active' : ''}`}
                                  onClick={(e) => handleNavClick(e, 'shop')}>
                                   SHOP
                                </a>
                                {/* 3. Render the dropdown */}
                                <ShopDropdownMenu handleNavClick={handleNavClick} /> {/* Pass handler */}
                            </li>
                            {/* --- END SHOP --- */}

                            {/* NEW ARRIVALS (Original) */}
                            <li className="nav-item dropdown">
                                <NavDropdown
                                    title="NEW ARRIVALS"
                                    id="new-arrivals-dropdown"
                                    className={`nav-link p-0 ${isLinkActive('jewellery') ? 'active' : ''}`}
                                >
                                   {/* Corrected to navigate to 'shop' (SareesPage) */}
                                   <NavDropdown.Item onClick={(e) => handleNavClick(e, 'shop')}>
                                        Sarees
                                    </NavDropdown.Item>
                                    <NavDropdown.Item onClick={(e) => handleNavClick(e, 'jewellery')}>
                                        Jewellery
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </li>

                            {/* COLLECTIONS DROPDOWN (Original) */}
                            <li className="nav-item dropdown">
                                <NavDropdown
                                    title="COLLECTIONS"
                                    id="collections-dropdown"
                                    // Make active if the current page is 'collection'
                                    className={`nav-link p-0 ${isLinkActive('collection') ? 'active' : ''}`}
                                >
                                    {collections.map(collection => (
                                        // Use the specific collection handler
                                        <NavDropdown.Item key={collection} onClick={(e) => onCollectionItemClick(e, collection)}>
                                            {collection}
                                        </NavDropdown.Item>
                                    ))}
                                </NavDropdown>
                            </li>

                             {/* BESTSELLERS (Original) */}
                             <li>
                                <a href="#" className={`nav-link ${isLinkActive('bestsellers') ? 'active' : ''}`} onClick={(e) => handleNavClick(e, 'bestsellers')}>
                                    BESTSELLERS
                                </a>
                             </li>
                             {/* MEET THE TEAM (Original) */}
                             <li>
                                 <a href="#"
                                    className={`nav-link ${isLinkActive('meet-the-team') ? 'active' : ''}`}
                                    onClick={(e) => handleNavClick(e, 'meet-the-team')}>
                                    MEET THE TEAM
                                 </a>
                             </li>
                             {/* BLOG (Original) */}
                             <li>
                                <a href="#" className={`nav-link ${isLinkActive('blog') ? 'active' : ''}`} onClick={(e) => handleNavClick(e, 'blog')}>
                                    BLOG
                                </a>
                             </li>
                             {/* GIFT CARD (Original) */}
                             <li>
                                 <a href="#"
                                    className={`nav-link ${isLinkActive('gift-card') ? 'active' : ''}`}
                                    onClick={(e) => handleNavClick(e, 'gift-card')}>
                                    GIFT CARD
                                </a>
                             </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header; // Original export
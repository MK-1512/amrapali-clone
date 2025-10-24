// src/components/common/Header.jsx
import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../../context/CartContext'; //
import { NavDropdown } from 'react-bootstrap'; //
import ShopDropdownMenu from './ShopDropdownMenu'; //

// Note: isSearchOpen and toggleSearch are passed from App.jsx
const Header = ({ setPage, currentPage, resetTeamView, onUserIconClick, handleSelectCollection, viewingMemberId, isSearchOpen, toggleSearch }) => { 
    const { toggleCart, cartItems } = useContext(CartContext); 
    const cartItemCount = cartItems.reduce((count, item) => count + item.quantity, 0); 

    const pagesWithHeroBannerEffect = [ 
        'shop', 'jewellery', 'collection', 'bestsellers',
        'neckpieces', 'earrings', 'bangles-cuffs', 'rings',
        'new-arrivals-jewellery', 'new-arrivals-sarees',
        'sarees-cotton', 'sarees-silk-tussar', 'sarees-linen', 'sarees-chanderi',
        'fall-picot' 
    ];

    const [isHeaderSolid, setIsHeaderSolid] = useState(() => { 
        const isViewingMemberInitially = !!viewingMemberId; 
        const isHeroPageInitially = pagesWithHeroBannerEffect.includes(currentPage); 
        // Start solid if it's NOT a hero page, OR if viewing a member
        return !isHeroPageInitially || isViewingMemberInitially;
    });
    const [isTopBarHidden, setIsTopBarHidden] = useState(() => window.scrollY > 10); 
    const [isNavHovered, setIsNavHovered] = useState(false); 

    // --- DROPDOWN STATES (New for Bootstrap and Shop) ---
    const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false); 
    const [isNewArrivalsOpen, setIsNewArrivalsOpen] = useState(false); // <-- DEFINED
    const [isCollectionsOpen, setIsCollectionsOpen] = useState(false); // <-- DEFINED
    const [shopDropdownTimer, setShopDropdownTimer] = useState(null); 
    // ----------------------------------------------------

    // Clear timer on unmount
    useEffect(() => {
        return () => {
            if (shopDropdownTimer) clearTimeout(shopDropdownTimer);
        };
    }, [shopDropdownTimer]);


    useEffect(() => { 
        const handleStateUpdate = () => { 
            const isScrolledPastThreshold = window.scrollY > 10; 
            const isViewingMember = !!viewingMemberId; 
            const isHeroPage = pagesWithHeroBannerEffect.includes(currentPage); 

            // Corrected solid state logic 
            const shouldBeSolid = isViewingMember ||
                                  currentPage === 'login' ||
                                  currentPage === 'register' ||
                                  !isHeroPage ||
                                  (isHeroPage && isScrolledPastThreshold);
            
            setIsHeaderSolid(shouldBeSolid); 
            setIsTopBarHidden(isScrolledPastThreshold); 
        };
        handleStateUpdate(); 
        window.addEventListener('scroll', handleStateUpdate); 
        return () => window.removeEventListener('scroll', handleStateUpdate); 
    }, [currentPage, viewingMemberId]); 

    // Helper to close all dropdowns (used on navigation)
    const closeAllDropdowns = () => {
        setIsShopDropdownOpen(false);
        setIsNewArrivalsOpen(false);
        setIsCollectionsOpen(false);
    };

    const handleNavClick = (e, pageName) => { 
        e.preventDefault(); 
        
        closeAllDropdowns(); // <-- Close all dropdowns
        if (shopDropdownTimer) clearTimeout(shopDropdownTimer); 
        
        if (resetTeamView) resetTeamView(); 
        if (handleSelectCollection) handleSelectCollection(null); 
        setPage(pageName); 
        // window.scrollTo(0, 0); // Rely on App.jsx for scroll
    };

    const onCollectionItemClick = (e, collectionName) => { 
        e.preventDefault(); 
        
        closeAllDropdowns(); // <-- Close all dropdowns
        if (shopDropdownTimer) clearTimeout(shopDropdownTimer); 
        
        if (resetTeamView) resetTeamView(); 
        if (handleSelectCollection) handleSelectCollection(collectionName); 
        setPage('collection'); 
        // window.scrollTo(0, 0); // Rely on App.jsx for scroll
    };

    // --- Handlers for Shop Dropdown ---
    const handleShopAreaMouseEnter = () => { 
        if (shopDropdownTimer) clearTimeout(shopDropdownTimer); 
        setIsShopDropdownOpen(true); 
    };

    const handleShopAreaMouseLeave = () => {
        const timer = setTimeout(() => { 
            setIsShopDropdownOpen(false); 
        }, 150); 
        setShopDropdownTimer(timer); 
    };
    // --- END Handlers ---

    // *** UPDATED isLinkActive function ***
    const isLinkActive = (pageName) => { 
       if (pageName === 'shop-parent') return ['shop', 'home', 'sarees-cotton', 'sarees-silk-tussar', 'sarees-linen', 'sarees-chanderi'].includes(currentPage); 
       if (pageName === 'jewellery-parent') return ['jewellery', 'neckpieces', 'earrings', 'bangles-cuffs', 'rings'].includes(currentPage); 
       // ** ADDED **
       if (pageName === 'new-arrivals-parent') return ['new-arrivals-sarees', 'new-arrivals-jewellery'].includes(currentPage);
       if (pageName === 'collection') return currentPage === 'collection'; 
       return currentPage === pageName; 
    };

    // Note: If isSearchOpen is true, the class is handled by the root App component.
    const headerClasses = `
      header-container
      ${isHeaderSolid ? 'scrolled' : ''}
      ${isTopBarHidden ? 'top-bar-hidden' : ''}
      ${isNavHovered ? 'nav-hovered' : ''}
    `; 

    const collections = [ 
        "SOULFUL WEAVES - Cotton Sarees (NEW)", "IKTARA - Jamdani Weaves", "RAANJHANA - Benarasi Weaves",
        "MASAKALI - Chanderi Weaves", "POPSICLE - Everyday Cottons", "DOODHE-AALTA - Red-Bordered White Sarees",
        "STORIES FROM HOME - Cotton Sarees", "ROOPKATHA - Baluchari and Swarnachari", "CANDYFLOSS - Cotton Sarees",
        "NOOR - Organza Benarasi", "SUNKISSED - Minimalist Jewellery", "A MIDAS TOUCH - Tussar Silk",
        "GOLDEN HOUR - Eclectic Jewellery", "EK SITARA - Kota Sarees", "SMART STAPLES - A Workwear Edit"
    ]; 

    return ( 
        <header className={headerClasses}> 
            <div className="top-bar text-center py-2"> 
                5% OFF ON YOUR FIRST ORDER | WELCOME 5
            </div>
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
                        <img src="/images/icons/user-icon.svg" alt="User" onClick={onUserIconClick} style={{ cursor: 'pointer' }} /> 
                        
                        {/* Search Icon with Toggle Handler */}
                        <img 
                           src="/images/icons/search-icon.svg" 
                           alt="Search" 
                           onClick={toggleSearch} 
                           style={{ cursor: 'pointer' }}
                        /> 
                        
                        <button onClick={toggleCart} className="btn btn-link text-dark p-0 position-relative"> 
                            <img src="/images/icons/cart-icon.svg" alt="Cart" /> 
                            {cartItemCount > 0 && <span className="cart-count-badge">{cartItemCount}</span>} 
                        </button>
                    </div>
                </div>

                {/* Navigation Row */}
                <div 
                    className="main-nav-container" 
                    onMouseLeave={handleShopAreaMouseLeave} 
                > 
                     <nav className="main-nav container"> 
                        <ul className="list-unstyled d-flex justify-content-center gap-5 mb-0 py-2"> 
                            
                            {/* --- SHOP with Dropdown (Manual) --- */}
                            <li
                                className="nav-item-shop" 
                                onMouseEnter={handleShopAreaMouseEnter} 
                            >
                                <a href="#"
                                  className={`nav-link ${isLinkActive('shop-parent') ? 'active' : ''}`} 
                                  onClick={(e) => handleNavClick(e, 'shop')}> 
                                   SHOP
                                </a>
                                {isShopDropdownOpen && (
                                    <ShopDropdownMenu 
                                        handleNavClick={handleNavClick} 
                                        onMouseEnter={handleShopAreaMouseEnter} 
                                    />
                                )}
                            </li>
                            {/* --- END SHOP --- */}

                            {/* NEW ARRIVALS (Bootstrap Dropdown) */}
                            <li 
                                className="nav-item dropdown"
                                onMouseEnter={() => setIsNewArrivalsOpen(true)} // <-- Open on hover
                                onMouseLeave={() => setIsNewArrivalsOpen(false)} // <-- Close on hover out
                            > 
                                <NavDropdown
                                    title="NEW ARRIVALS" 
                                    id="new-arrivals-dropdown" 
                                    show={isNewArrivalsOpen} // <-- Controlled visibility
                                    onToggle={() => {}} // Mandatory but empty function
                                    className={`nav-link p-0 ${isLinkActive('new-arrivals-parent') ? 'active' : ''}`} 
                                >
                                   <NavDropdown.Item onClick={(e) => handleNavClick(e, 'new-arrivals-sarees')}> 
                                        Sarees
                                    </NavDropdown.Item>
                                    <NavDropdown.Item onClick={(e) => handleNavClick(e, 'new-arrivals-jewellery')}> 
                                        Jewellery
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </li>

                            {/* COLLECTIONS DROPDOWN (Bootstrap Dropdown) */}
                            <li 
                                className="nav-item dropdown"
                                onMouseEnter={() => setIsCollectionsOpen(true)} // <-- Open on hover
                                onMouseLeave={() => setIsCollectionsOpen(false)} // <-- Close on hover out
                            > 
                                <NavDropdown
                                    title="COLLECTIONS" 
                                    id="collections-dropdown" 
                                    show={isCollectionsOpen} // <-- Controlled visibility
                                    onToggle={() => {}} // Mandatory but empty function
                                    className={`nav-link p-0 ${isLinkActive('collection') ? 'active' : ''}`} 
                                >
                                    {collections.map(collection => ( 
                                        <NavDropdown.Item key={collection} onClick={(e) => onCollectionItemClick(e, collection)}> 
                                            {collection}
                                        </NavDropdown.Item>
                                    ))}
                                </NavDropdown>
                            </li>

                             {/* --- Rest of nav items --- */}
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
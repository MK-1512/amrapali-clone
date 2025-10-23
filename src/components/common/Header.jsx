// src/components/common/Header.jsx
import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../../context/CartContext'; //
import { NavDropdown } from 'react-bootstrap'; //
import ShopDropdownMenu from './ShopDropdownMenu'; //

const Header = ({ setPage, currentPage, resetTeamView, onUserIconClick, handleSelectCollection, viewingMemberId }) => { //
    const { toggleCart, cartItems } = useContext(CartContext); //
    const cartItemCount = cartItems.reduce((count, item) => count + item.quantity, 0); //

    const pagesWithHeroBannerEffect = [ //
        'shop', 'jewellery', 'collection', 'bestsellers',
        'neckpieces', 'earrings', 'bangles-cuffs', 'rings',
        'new-arrivals-jewellery', 'new-arrivals-sarees',
        'sarees-cotton', 'sarees-silk-tussar', 'sarees-linen', 'sarees-chanderi',
        'fall-picot' //
    ];

    const [isHeaderSolid, setIsHeaderSolid] = useState(() => { //
        const isViewingMemberInitially = !!viewingMemberId; //
        const isHeroPageInitially = pagesWithHeroBannerEffect.includes(currentPage); //
        // ** FIX for Issue 2: Correct initial state logic **
        // Start solid if it's NOT a hero page, OR if viewing a member
        return !isHeroPageInitially || isViewingMemberInitially;
    });
    const [isTopBarHidden, setIsTopBarHidden] = useState(() => window.scrollY > 10); //
    const [isNavHovered, setIsNavHovered] = useState(false); //

    const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false); //
    const [shopDropdownTimer, setShopDropdownTimer] = useState(null); //

    // Clear timer on unmount
    useEffect(() => {
        return () => {
            if (shopDropdownTimer) clearTimeout(shopDropdownTimer);
        };
    }, [shopDropdownTimer]);


    useEffect(() => { //
        const handleStateUpdate = () => { //
            const isScrolledPastThreshold = window.scrollY > 10; //
            const isViewingMember = !!viewingMemberId; //
            const isHeroPage = pagesWithHeroBannerEffect.includes(currentPage); //

            // ** FIX for Issue 2: Corrected solid state logic **
            const shouldBeSolid = isViewingMember ||
                                  currentPage === 'login' ||
                                  currentPage === 'register' ||
                                  !isHeroPage ||
                                  (isHeroPage && isScrolledPastThreshold);
            
            setIsHeaderSolid(shouldBeSolid); //
            setIsTopBarHidden(isScrolledPastThreshold); //
        };
        handleStateUpdate(); //
        window.addEventListener('scroll', handleStateUpdate); //
        return () => window.removeEventListener('scroll', handleStateUpdate); //
    }, [currentPage, viewingMemberId]); //

    const handleNavClick = (e, pageName) => { //
        e.preventDefault(); //
        setIsShopDropdownOpen(false); //
        if (shopDropdownTimer) clearTimeout(shopDropdownTimer); //
        if (resetTeamView) resetTeamView(); //
        if (handleSelectCollection) handleSelectCollection(null); //
        setPage(pageName); //
        window.scrollTo(0, 0); //
    };

    const onCollectionItemClick = (e, collectionName) => { //
        e.preventDefault(); //
        setIsShopDropdownOpen(false); //
        if (shopDropdownTimer) clearTimeout(shopDropdownTimer); //
        if (resetTeamView) resetTeamView(); //
        if (handleSelectCollection) handleSelectCollection(collectionName); //
        setPage('collection'); //
        window.scrollTo(0, 0); //
    };

    // --- Handlers for Shop Dropdown ---
    const handleShopAreaMouseEnter = () => { //
        if (shopDropdownTimer) clearTimeout(shopDropdownTimer); //
        setIsShopDropdownOpen(true); //
    };

    const handleShopAreaMouseLeave = () => {
        const timer = setTimeout(() => { //
            setIsShopDropdownOpen(false); //
        }, 150); // 150ms delay
        setShopDropdownTimer(timer); //
    };
    // --- END Handlers ---

    // *** UPDATED isLinkActive function ***
    const isLinkActive = (pageName) => { //
       if (pageName === 'shop-parent') return ['shop', 'home', 'sarees-cotton', 'sarees-silk-tussar', 'sarees-linen', 'sarees-chanderi'].includes(currentPage); // Removed 'new-arrivals-sarees'
       if (pageName === 'jewellery-parent') return ['jewellery', 'neckpieces', 'earrings', 'bangles-cuffs', 'rings'].includes(currentPage); // Removed 'new-arrivals-jewellery'
       // ** ADDED **
       if (pageName === 'new-arrivals-parent') return ['new-arrivals-sarees', 'new-arrivals-jewellery'].includes(currentPage);
       if (pageName === 'collection') return currentPage === 'collection'; //
       return currentPage === pageName; //
    };

    const headerClasses = `
      header-container
      ${isHeaderSolid ? 'scrolled' : ''}
      ${isTopBarHidden ? 'top-bar-hidden' : ''}
      ${isNavHovered ? 'nav-hovered' : ''}
    `; //

    const collections = [ //
        "SOULFUL WEAVES - Cotton Sarees (NEW)", "IKTARA - Jamdani Weaves", "RAANJHANA - Benarasi Weaves",
        "MASAKALI - Chanderi Weaves", "POPSICLE - Everyday Cottons", "DOODHE-AALTA - Red-Bordered White Sarees",
        "STORIES FROM HOME - Cotton Sarees", "ROOPKATHA - Baluchari and Swarnachari", "CANDYFLOSS - Cotton Sarees",
        "NOOR - Organza Benarasi", "SUNKISSED - Minimalist Jewellery", "A MIDAS TOUCH - Tussar Silk",
        "GOLDEN HOUR - Eclectic Jewellery", "EK SITARA - Kota Sarees", "SMART STAPLES - A Workwear Edit"
    ]; //

    return ( //
        <header className={headerClasses}> {/* */}
            <div className="top-bar text-center py-2"> {/* */}
                5% OFF ON YOUR FIRST ORDER | WELCOME 5
            </div>
            <div
                className="main-header-content" //
                onMouseEnter={() => setIsNavHovered(true)} //
                onMouseLeave={() => setIsNavHovered(false)} //
            >
                {/* Logo and Icons Row */}
                <div className="main-header container d-flex justify-content-between align-items-center py-3"> {/* */}
                   <div className="flex-grow-1"></div> {/* */}
                    <div className="logo text-center"> {/* */}
                       <a href="#" onClick={(e) => handleNavClick(e, 'home')}> {/* */}
                            <img src="/images/logo.png" alt="Amrapali Boutique" className="amrapali-logo" /> {/* */}
                        </a>
                    </div>
                    <div className="header-icons d-flex align-items-center justify-content-end gap-3 flex-grow-1"> {/* */}
                        <img src="/images/icons/user-icon.svg" alt="User" onClick={onUserIconClick} style={{ cursor: 'pointer' }} /> {/* */}
                        <img src="/images/icons/search-icon.svg" alt="Search" /> {/* */}
                        <button onClick={toggleCart} className="btn btn-link text-dark p-0 position-relative"> {/* */}
                            <img src="/images/icons/cart-icon.svg" alt="Cart" /> {/* */}
                            {cartItemCount > 0 && <span className="cart-count-badge">{cartItemCount}</span>} {/* */}
                        </button>
                    </div>
                </div>

                {/* Navigation Row */}
                {/* --- FIX: Attach mouse handler to the container --- */}
                <div 
                    className="main-nav-container" //
                    onMouseLeave={handleShopAreaMouseLeave} // Close when mouse leaves nav area
                > 
                     <nav className="main-nav container"> {/* */}
                        <ul className="list-unstyled d-flex justify-content-center gap-5 mb-0 py-2"> {/* */}
                            {/* --- SHOP with Dropdown --- */}
                            <li
                                className="nav-item-shop" //
                                onMouseEnter={handleShopAreaMouseEnter} // Open on enter
                                // onMouseLeave is handled by parent .main-nav-container
                            >
                                <a href="#"
                                  className={`nav-link ${isLinkActive('shop-parent') ? 'active' : ''}`} //
                                  onClick={(e) => handleNavClick(e, 'shop')}> {/* */}
                                   SHOP
                                </a>
                                {/* --- FIX: Conditionally render AND pass mouseEnter --- */}
                                {isShopDropdownOpen && (
                                    <ShopDropdownMenu 
                                        handleNavClick={handleNavClick} 
                                        onMouseEnter={handleShopAreaMouseEnter} // Keep open
                                    />
                                )}
                            </li>
                            {/* --- END SHOP --- */}

                            {/* NEW ARRIVALS */}
                            <li className="nav-item dropdown"> {/* */}
                                <NavDropdown
                                    title="NEW ARRIVALS" //
                                    id="new-arrivals-dropdown" //
                                    className={`nav-link p-0 ${isLinkActive('new-arrivals-parent') ? 'active' : ''}`} // UPDATED
                                >
                                   <NavDropdown.Item onClick={(e) => handleNavClick(e, 'new-arrivals-sarees')}> {/* */}
                                        Sarees
                                    </NavDropdown.Item>
                                    <NavDropdown.Item onClick={(e) => handleNavClick(e, 'new-arrivals-jewellery')}> {/* */}
                                        Jewellery
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </li>

                            {/* COLLECTIONS DROPDOWN */}
                            <li className="nav-item dropdown"> {/* */}
                                <NavDropdown
                                    title="COLLECTIONS" //
                                    id="collections-dropdown" //
                                    className={`nav-link p-0 ${isLinkActive('collection') ? 'active' : ''}`} //
                                >
                                    {collections.map(collection => ( //
                                        <NavDropdown.Item key={collection} onClick={(e) => onCollectionItemClick(e, collection)}> {/* */}
                                            {collection}
                                        </NavDropdown.Item>
                                    ))}
                                </NavDropdown>
                            </li>

                             {/* --- Rest of nav items --- */}
                             <li> <a href="#" className={`nav-link ${isLinkActive('bestsellers') ? 'active' : ''}`} onClick={(e) => handleNavClick(e, 'bestsellers')}> BESTSELLERS </a> </li> {/* */}
                             <li> <a href="#" className={`nav-link ${isLinkActive('meet-the-team') ? 'active' : ''}`} onClick={(e) => handleNavClick(e, 'meet-the-team')}> MEET THE TEAM </a> </li> {/* */}
                             <li> <a href="#" className={`nav-link ${isLinkActive('blog') ? 'active' : ''}`} onClick={(e) => handleNavClick(e, 'blog')}> BLOG </a> </li> {/* */}
                             <li> <a href="#" className={`nav-link ${isLinkActive('gift-card') ? 'active' : ''}`} onClick={(e) => handleNavClick(e, 'gift-card')}> GIFT CARD </a> </li> {/* */}
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header; //
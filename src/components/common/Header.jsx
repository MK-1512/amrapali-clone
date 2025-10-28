// src/components/common/Header.jsx
import React, { useState, useEffect, useContext, useRef } from 'react';
import { CartContext } from '../../context/CartContext';
import { AuthContext } from '../../context/AuthContext';
import { NavDropdown } from 'react-bootstrap';
import ShopDropdownMenu from './ShopDropdownMenu';

// Added handleLogout to props
const Header = ({ setPage, currentPage, resetTeamView, handleSelectCollection, viewingMemberId, isSearchOpen, toggleSearch, handleLogout }) => {
    const { toggleCart, cartItems } = useContext(CartContext);
    const { isLoggedIn, currentUser } = useContext(AuthContext);
    const cartItemCount = cartItems.reduce((count, item) => count + (item.quantity || 0), 0);

    const pagesWithHeroBannerEffect = [
        'home', 'shop', 'jewellery', 'collection', 'bestsellers',
        'neckpieces', 'earrings', 'bangles-cuffs', 'rings',
        'new-arrivals-jewellery', 'new-arrivals-sarees',
        'sarees-cotton', 'sarees-silk-tussar', 'sarees-linen', 'sarees-chanderi',
        'fall-picot', 'all-collections',
        'search-results', 'all-products'
    ];

     const staticSolidHeaderPages = [
       'login', 'register', 'our-story', 'faq',
       'shipping-policy', 'refund-policy', 'contact',
       'terms-service', 'terms-conditions', 'privacy-policy', 'disclaimer-policy',
       'meet-the-team', 'team-member-detail',
       'blog', 'blog-detail', 'gift-card',
       'account', 'addresses'
    ];

    const [isHeaderSolid, setIsHeaderSolid] = useState(() => {
        const isViewingMemberInitially = !!viewingMemberId;
        const isHeroPageInitially = pagesWithHeroBannerEffect.includes(currentPage);
        const isStaticSolidPage = staticSolidHeaderPages.includes(currentPage);
        return isStaticSolidPage || !isHeroPageInitially || isViewingMemberInitially;
    });

    const [isTopBarHidden, setIsTopBarHidden] = useState(() => window.scrollY > 10);
    const [isNavHovered, setIsNavHovered] = useState(false);

    const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
    const [isNewArrivalsOpen, setIsNewArrivalsOpen] = useState(false);
    const [isCollectionsOpen, setIsCollectionsOpen] = useState(false);

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [expandedSubmenu, setExpandedSubmenu] = useState(null);

    const closeTimerRef = useRef(null);

    useEffect(() => {
        return () => {
            if (closeTimerRef.current) {
                clearTimeout(closeTimerRef.current);
            }
        };
    }, []);

    useEffect(() => {
        const handleStateUpdate = () => {
            const isScrolledPastThreshold = window.scrollY > 10;
            const isViewingMember = !!viewingMemberId;
            const isHeroPage = pagesWithHeroBannerEffect.includes(currentPage);
            const isStaticSolidPage = staticSolidHeaderPages.includes(currentPage);

            const shouldBeSolid = isStaticSolidPage ||
                                  isViewingMember ||
                                  !isHeroPage ||
                                  (isHeroPage && isScrolledPastThreshold);

            setIsHeaderSolid(shouldBeSolid);
            setIsTopBarHidden(isScrolledPastThreshold);
        };

        handleStateUpdate();
        window.addEventListener('scroll', handleStateUpdate);
        return () => window.removeEventListener('scroll', handleStateUpdate);
    }, [currentPage, viewingMemberId]);


    const closeAllDropdowns = () => {
        setIsShopDropdownOpen(false);
        setIsNewArrivalsOpen(false);
        setIsCollectionsOpen(false);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        setExpandedSubmenu(null);
    };

    const toggleSubmenu = (submenu) => {
        setExpandedSubmenu(expandedSubmenu === submenu ? null : submenu);
    };

    const handleNavClick = (e, pageName) => {
        if (e) e.preventDefault();
        if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
        closeAllDropdowns();

        if (isMobileMenuOpen) {
            toggleMobileMenu();
        }

        if (resetTeamView) resetTeamView();
        if (handleSelectCollection) handleSelectCollection(null);
        setPage(pageName);
    };

    const onCollectionItemClick = (e, collectionName) => {
        e.preventDefault();
        if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
        closeAllDropdowns();

        if (isMobileMenuOpen) {
            toggleMobileMenu();
        }

        if (resetTeamView) resetTeamView();
        if (handleSelectCollection) handleSelectCollection(collectionName);
        setPage('collection');
    };

    const DROPDOWN_CLOSE_DELAY = 150;

    const handleMouseEnter = (menu = null) => {
        if (closeTimerRef.current) {
            clearTimeout(closeTimerRef.current);
            closeTimerRef.current = null;
        }
        if (menu) {
            setIsShopDropdownOpen(menu === 'shop');
            setIsNewArrivalsOpen(menu === 'new-arrivals');
            setIsCollectionsOpen(menu === 'collections');
        } else {
             closeAllDropdowns();
        }
    };

    const handleMouseLeave = () => {
        closeTimerRef.current = setTimeout(() => {
            closeAllDropdowns();
            closeTimerRef.current = null;
        }, DROPDOWN_CLOSE_DELAY);
    };

    const isLinkActive = (pageName) => {
       if (pageName === 'shop-parent') return ['shop', 'sarees-cotton', 'sarees-silk-tussar', 'sarees-linen', 'sarees-chanderi', 'jewellery', 'neckpieces', 'earrings', 'bangles-cuffs', 'rings', 'fall-picot'].includes(currentPage);
       if (pageName === 'new-arrivals-parent') return ['new-arrivals-sarees', 'new-arrivals-jewellery'].includes(currentPage);
       if (pageName === 'collection') return currentPage === 'collection';
       return currentPage === pageName;
    };

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
        "GOLDEN HOUR - Eclectic Jewellery", "EK SITARA - Kota Sarees", "SMART STAPLES - A Workwear Edit",
        "POTPOURRI"
    ];

    return (
        <>
            <header className={headerClasses}>
                 <div className="top-bar text-center py-2">
                    5% OFF ON YOUR FIRST ORDER | WELCOME 5
                </div>
                <div
                    className="main-header-content"
                    onMouseEnter={() => setIsNavHovered(true)}
                    onMouseLeave={() => setIsNavHovered(false)}
                >
                    <div className="main-header container d-flex justify-content-between align-items-center py-3">
                       <div className="flex-grow-1 header-left-section">
                            <div className={`hamburger-menu ${isMobileMenuOpen ? 'open' : ''}`} onClick={toggleMobileMenu}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                       </div>
                        <div className="logo text-center header-center-section">
                           <a href="#" onClick={(e) => handleNavClick(e, 'home')}>
                                <img src="/images/logo.png" alt="Amrapali Boutique" className="amrapali-logo" />
                            </a>
                        </div>
                         {/* Right Icons */}
                        <div className="header-icons d-flex align-items-center justify-content-end gap-3 flex-grow-1 header-right-section">
                            {isLoggedIn ? (
                                <>
                                    {/* --- REMOVED GREETING --- */}
                                    {/* <span style={{ fontSize: '13px', color: isHeaderSolid || isNavHovered ? '#1c1c1c' : '#ffffff', marginRight: '10px' }}>
                                        Hi, {currentUser?.firstName || 'User'}
                                    </span> */}
                                    {/* User Icon links to Account Page */}
                                    <img src="/images/icons/user-icon.svg"
                                         alt="Account"
                                         onClick={() => handleNavClick(null, 'account')}
                                         style={{ cursor: 'pointer' }} />
                                    {/* --- REMOVED LOGOUT TEXT BUTTON --- */}
                                    {/* <button onClick={handleLogout} className="btn btn-link p-0" style={{ textDecoration: 'none' }}>
                                        <span style={{ fontSize: '13px', color: isHeaderSolid || isNavHovered ? '#a8853d' : '#ffffff', textTransform: 'uppercase' }}>Logout</span>
                                    </button> */}
                                </>
                            ) : (
                                // Login Icon (shown when logged out)
                                <img src="/images/icons/user-icon.svg" alt="Login" onClick={() => handleNavClick(null, 'login')} style={{ cursor: 'pointer' }} />
                            )}
                            {/* Search Icon */}
                            <img
                               src="/images/icons/search-icon.svg"
                               alt="Search"
                               onClick={toggleSearch}
                               style={{ cursor: 'pointer' }}
                            />
                            {/* Cart Icon and Badge */}
                            <button onClick={toggleCart} className="btn btn-link text-dark p-0 position-relative">
                                <img src="/images/icons/cart-icon.svg" alt="Cart" />
                                {cartItemCount > 0 && <span className="cart-count-badge">{cartItemCount}</span>}
                            </button>
                        </div>
                    </div>

                    {/* Navigation Row */}
                    <div
                        className="main-nav-container"
                        onMouseLeave={handleMouseLeave}
                    >
                         <nav className="main-nav container">
                            <ul className="list-unstyled d-flex justify-content-center gap-5 mb-0 py-2">
                                {/* SHOP Dropdown */}
                                <li
                                    className="nav-item-shop"
                                    onMouseEnter={() => handleMouseEnter('shop')}
                                >
                                    <a href="#"
                                       className={`nav-link d-flex align-items-center ${isLinkActive('shop-parent') ? 'active' : ''}`}
                                       onClick={(e) => handleNavClick(e, 'shop')}>
                                      <span>SHOP</span>
                                      <span className="dropdown-toggle-arrow ms-1"></span>
                                    </a>
                                    {isShopDropdownOpen && (
                                        <ShopDropdownMenu
                                            handleNavClick={handleNavClick}
                                            onMouseEnter={() => handleMouseEnter('shop')}
                                        />
                                    )}
                                </li>
                                 {/* NEW ARRIVALS Dropdown */}
                                 <li
                                     className="nav-item dropdown"
                                    onMouseEnter={() => handleMouseEnter('new-arrivals')}
                                 >
                                     <NavDropdown
                                         title="NEW ARRIVALS"
                                         id="new-arrivals-dropdown"
                                         show={isNewArrivalsOpen}
                                         onToggle={() => {}}
                                         className={`nav-link p-0 ${isLinkActive('new-arrivals-parent') ? 'active' : ''}`}
                                         onMouseEnter={() => handleMouseEnter('new-arrivals')}
                                     >
                                        <NavDropdown.Item onClick={(e) => handleNavClick(e, 'new-arrivals-sarees')}>Sarees</NavDropdown.Item>
                                        <NavDropdown.Item onClick={(e) => handleNavClick(e, 'new-arrivals-jewellery')}>Jewellery</NavDropdown.Item>
                                     </NavDropdown>
                                 </li>
                                  {/* COLLECTIONS Dropdown */}
                                 <li
                                     className="nav-item dropdown"
                                    onMouseEnter={() => handleMouseEnter('collections')}
                                 >
                                     <NavDropdown
                                         title="COLLECTIONS"
                                         id="collections-dropdown"
                                         show={isCollectionsOpen}
                                         onToggle={() => {}}
                                         className={`nav-link p-0 ${isLinkActive('collection') ? 'active' : ''}`}
                                         onMouseEnter={() => handleMouseEnter('collections')}
                                     >
                                         {collections.map(collection => (
                                             <NavDropdown.Item key={collection} onClick={(e) => onCollectionItemClick(e, collection)}>
                                                 {collection}
                                             </NavDropdown.Item>
                                         ))}
                                         <NavDropdown.Divider />
                                         <NavDropdown.Item onClick={(e) => handleNavClick(e, 'all-collections')}>
                                             View All Collections
                                         </NavDropdown.Item>
                                     </NavDropdown>
                                 </li>
                                 {/* Other standard navigation links */}
                                 <li onMouseEnter={() => handleMouseEnter(null)}><a href="#" className={`nav-link ${isLinkActive('bestsellers') ? 'active' : ''}`} onClick={(e) => handleNavClick(e, 'bestsellers')}> BESTSELLERS </a></li>
                                 <li onMouseEnter={() => handleMouseEnter(null)}><a href="#" className={`nav-link ${isLinkActive('meet-the-team') ? 'active' : ''}`} onClick={(e) => handleNavClick(e, 'meet-the-team')}> MEET THE TEAM </a></li>
                                 <li onMouseEnter={() => handleMouseEnter(null)}><a href="#" className={`nav-link ${isLinkActive('blog') ? 'active' : ''}`} onClick={(e) => handleNavClick(e, 'blog')}> BLOG </a></li>
                                 <li onMouseEnter={() => handleMouseEnter(null)}><a href="#" className={`nav-link ${isLinkActive('gift-card') ? 'active' : ''}`} onClick={(e) => handleNavClick(e, 'gift-card')}> GIFT CARD </a></li>
                             </ul>
                         </nav>
                     </div>
                </div>
            </header>

            {/* Mobile Navigation Overlay */}
            <div className={`mobile-nav-overlay ${isMobileMenuOpen ? 'open' : ''}`}>
                <div className="mobile-nav-content">
                    <ul className="mobile-nav-list">
                        <li>
                            <button onClick={() => toggleSubmenu('shop')} className={expandedSubmenu === 'shop' ? 'expanded' : ''}>
                                Shop
                            </button>
                            <div className={`mobile-submenu ${expandedSubmenu === 'shop' ? 'open' : ''}`}>
                                <a href="#" onClick={(e) => { handleNavClick(e, 'shop'); }}>All Sarees</a>
                                <a href="#" onClick={(e) => { handleNavClick(e, 'sarees-cotton'); }}>Cotton</a>
                                <a href="#" onClick={(e) => { handleNavClick(e, 'sarees-silk-tussar'); }}>Silk & Tussar</a>
                                <a href="#" onClick={(e) => { handleNavClick(e, 'sarees-linen'); }}>Linen</a>
                                <a href="#" onClick={(e) => { handleNavClick(e, 'sarees-chanderi'); }}>Chanderi</a>
                                <a href="#" onClick={(e) => { handleNavClick(e, 'jewellery'); }} style={{marginTop: '10px', fontWeight: 'bold'}}>All Jewellery</a>
                                <a href="#" onClick={(e) => { handleNavClick(e, 'neckpieces'); }}>Neckpieces</a>
                                <a href="#" onClick={(e) => { handleNavClick(e, 'earrings'); }}>Earrings</a>
                                <a href="#" onClick={(e) => { handleNavClick(e, 'bangles-cuffs'); }}>Bangles & Cuffs</a>
                                <a href="#" onClick={(e) => { handleNavClick(e, 'rings'); }}>Rings</a>
                                <a href="#" onClick={(e) => { handleNavClick(e, 'fall-picot'); }} style={{marginTop: '10px', fontWeight: 'bold'}}>Fall & Picot</a>
                            </div>
                        </li>
                        <li>
                            <button onClick={() => toggleSubmenu('new-arrivals')} className={expandedSubmenu === 'new-arrivals' ? 'expanded' : ''}>
                                New Arrivals
                            </button>
                            <div className={`mobile-submenu ${expandedSubmenu === 'new-arrivals' ? 'open' : ''}`}>
                                <a href="#" onClick={(e) => { handleNavClick(e, 'new-arrivals-sarees'); }}>Sarees</a>
                                <a href="#" onClick={(e) => { handleNavClick(e, 'new-arrivals-jewellery'); }}>Jewellery</a>
                            </div>
                        </li>
                        <li>
                             <button onClick={() => toggleSubmenu('collections')} className={expandedSubmenu === 'collections' ? 'expanded' : ''}>
                                Collections
                             </button>
                             <div className={`mobile-submenu ${expandedSubmenu === 'collections' ? 'open' : ''}`}>
                                 {collections.map(collection => (
                                     <a key={collection} href="#" onClick={(e) => { onCollectionItemClick(e, collection); }}>{collection}</a>
                                 ))}
                                 <a href="#" onClick={(e) => { handleNavClick(e, 'all-collections'); }} style={{marginTop: '10px', fontWeight: 'bold'}}>View All Collections</a>
                            </div>
                        </li>
                        <li>
                            <a href="#" onClick={(e) => { handleNavClick(e, 'bestsellers'); }}>Bestsellers</a>
                        </li>
                        <li>
                            <a href="#" onClick={(e) => { handleNavClick(e, 'meet-the-team'); }}>Meet the Team</a>
                        </li>
                        <li>
                            <a href="#" onClick={(e) => { handleNavClick(e, 'blog'); }}>Blog</a>
                        </li>
                        <li>
                            <a href="#" onClick={(e) => { handleNavClick(e, 'gift-card'); }}>Gift Card</a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Mobile Nav Backdrop */}
            <div
                className={`mobile-nav-backdrop ${isMobileMenuOpen ? 'open' : ''}`}
                onClick={toggleMobileMenu}
            ></div>
        </>
    );
};

export default Header;
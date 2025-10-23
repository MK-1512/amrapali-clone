// src/components/common/Header.jsx
import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../../context/CartContext'; //
import { NavDropdown } from 'react-bootstrap'; //
import ShopDropdownMenu from './ShopDropdownMenu'; //

// Props based on your App.jsx structure
const Header = ({ setPage, currentPage, resetTeamView, onUserIconClick, handleSelectCollection, viewingMemberId }) => { //
    const { toggleCart, cartItems } = useContext(CartContext); //
    const cartItemCount = cartItems.reduce((count, item) => count + item.quantity, 0); //

    // UPDATED pagesWithHeroBannerEffect to include new-arrivals-jewellery
    const pagesWithHeroBannerEffect = ['shop', 'jewellery', 'collection', 'bestsellers', 'neckpieces', 'earrings', 'bangles-cuffs', 'rings', 'new-arrivals-jewellery']; //

    // State Initialization (no changes here)
    const [isHeaderSolid, setIsHeaderSolid] = useState(() => { //
        const isViewingMemberInitially = !!viewingMemberId; //
        const isHeroPageInitially = pagesWithHeroBannerEffect.includes(currentPage); //
        return !(isHeroPageInitially && !isViewingMemberInitially); //
    });
    const [isTopBarHidden, setIsTopBarHidden] = useState(() => window.scrollY > 10); //
    const [isNavHovered, setIsNavHovered] = useState(false); //

    // useEffect for SCROLL and PAGE CHANGES (no changes here)
    useEffect(() => { //
        const handleStateUpdate = () => { //
            const isScrolledPastThreshold = window.scrollY > 10; //
            const isViewingMember = !!viewingMemberId; //
            const isHeroPageCondition = pagesWithHeroBannerEffect.includes(currentPage) && !isViewingMember; //

            if (isHeroPageCondition) { //
                setIsHeaderSolid(isScrolledPastThreshold); //
            } else { //
                setIsHeaderSolid(true); //
            }
            setIsTopBarHidden(isScrolledPastThreshold); //
        };

        handleStateUpdate(); //
        window.addEventListener('scroll', handleStateUpdate); //
        return () => window.removeEventListener('scroll', handleStateUpdate); //
    }, [currentPage, viewingMemberId]); //

    // Navigation click handler (no changes here)
    const handleNavClick = (e, pageName) => { //
        e.preventDefault(); //
        if (resetTeamView) resetTeamView(); //
        if (handleSelectCollection) handleSelectCollection(null); // Ensure collection is reset
        setPage(pageName); //
        window.scrollTo(0, 0); //
    };

    // Collection item click handler (no changes here)
    const onCollectionItemClick = (e, collectionName) => { //
        e.preventDefault(); //
        if (resetTeamView) resetTeamView(); //
        if (handleSelectCollection) handleSelectCollection(collectionName); //
        setPage('collection'); //
        window.scrollTo(0, 0); //
    };

    // Active link check - UPDATED 'jewellery-parent' logic
    const isLinkActive = (pageName) => { //
       if (pageName === 'shop') return currentPage === 'shop' || currentPage === 'home'; //
       // Make 'jewellery-parent' active for ALL jewellery related pages
       if (pageName === 'jewellery-parent') return ['jewellery', 'new-arrivals-jewellery', 'neckpieces', 'earrings', 'bangles-cuffs', 'rings'].includes(currentPage); //
       if (pageName === 'collection') return currentPage === 'collection'; //
       return currentPage === pageName; //
    };

    // Header classes calculation (no changes here)
    const headerClasses = `
      header-container
      ${isHeaderSolid ? 'scrolled' : ''}
      ${isTopBarHidden ? 'top-bar-hidden' : ''}
      ${isNavHovered ? 'nav-hovered' : ''}
    `; //

    // Collections list (no changes here)
    const collections = [ //
        "SOULFUL WEAVES - Cotton Sarees (NEW)", "IKTARA - Jamdani Weaves", "RAANJHANA - Benarasi Weaves",
        "MASAKALI - Chanderi Weaves", "POPSICLE - Everyday Cottons", "DOODHE-AALTA - Red-Bordered White Sarees",
        "STORIES FROM HOME - Cotton Sarees", "ROOPKATHA - Baluchari and Swarnachari", "CANDYFLOSS - Cotton Sarees",
        "NOOR - Organza Benarasi", "SUNKISSED - Minimalist Jewellery", "A MIDAS TOUCH - Tussar Silk",
        "GOLDEN HOUR - Eclectic Jewellery", "EK SITARA - Kota Sarees", "SMART STAPLES - A Workwear Edit"
    ]; //

    // Return JSX
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
                        <img
                            src="/images/icons/user-icon.svg" //
                            alt="User"
                            onClick={onUserIconClick} //
                            style={{ cursor: 'pointer' }} //
                        />
                        <img src="/images/icons/search-icon.svg" alt="Search" /> {/* */}
                        <button onClick={toggleCart} className="btn btn-link text-dark p-0 position-relative"> {/* */}
                            <img src="/images/icons/cart-icon.svg" alt="Cart" /> {/* */}
                            {cartItemCount > 0 && <span className="cart-count-badge">{cartItemCount}</span>} {/* */}
                        </button>
                    </div>
                </div>

                {/* Navigation Row */}
                <div className="main-nav-container"> {/* */}
                     <nav className="main-nav container"> {/* */}
                        <ul className="list-unstyled d-flex justify-content-center gap-5 mb-0 py-2"> {/* */}
                            {/* --- SHOP with Dropdown --- */}
                            <li className="nav-item-shop"> {/* */}
                                <a href="#"
                                  className={`nav-link ${isLinkActive('shop') ? 'active' : ''}`} //
                                  onClick={(e) => handleNavClick(e, 'shop')}> {/* */}
                                   SHOP
                                </a>
                                <ShopDropdownMenu handleNavClick={handleNavClick} /> {/* */}
                            </li>
                            {/* --- END SHOP --- */}

                            {/* NEW ARRIVALS */}
                            <li className="nav-item dropdown"> {/* */}
                                <NavDropdown
                                    title="NEW ARRIVALS" //
                                    id="new-arrivals-dropdown" //
                                    className={`nav-link p-0 ${isLinkActive('jewellery-parent') ? 'active' : ''}`} //
                                >
                                   <NavDropdown.Item onClick={(e) => handleNavClick(e, 'shop')}> {/* */}
                                        Sarees
                                    </NavDropdown.Item>
                                    {/* UPDATED onClick */}
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

                             {/* BESTSELLERS */}
                             <li> {/* */}
                                <a href="#" className={`nav-link ${isLinkActive('bestsellers') ? 'active' : ''}`} onClick={(e) => handleNavClick(e, 'bestsellers')}> {/* */}
                                    BESTSELLERS
                                </a>
                             </li>
                             {/* MEET THE TEAM */}
                             <li> {/* */}
                                 <a href="#"
                                    className={`nav-link ${isLinkActive('meet-the-team') ? 'active' : ''}`} //
                                    onClick={(e) => handleNavClick(e, 'meet-the-team')}> {/* */}
                                    MEET THE TEAM
                                 </a>
                             </li>
                             {/* BLOG */}
                             <li> {/* */}
                                <a href="#" className={`nav-link ${isLinkActive('blog') ? 'active' : ''}`} onClick={(e) => handleNavClick(e, 'blog')}> {/* */}
                                    BLOG
                                </a>
                             </li>
                             {/* GIFT CARD */}
                             <li> {/* */}
                                 <a href="#"
                                    className={`nav-link ${isLinkActive('gift-card') ? 'active' : ''}`} //
                                    onClick={(e) => handleNavClick(e, 'gift-card')}> {/* */}
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

export default Header; //
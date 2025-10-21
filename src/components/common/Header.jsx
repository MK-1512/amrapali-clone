// src/components/common/Header.jsx
import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { NavDropdown } from 'react-bootstrap';

// Pass handleSelectCollection from App.jsx
const Header = ({ setPage, currentPage, resetTeamView, onUserIconClick, handleSelectCollection }) => {
    const { toggleCart, cartItems } = useContext(CartContext);
    const cartItemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

    const [isHeaderSolid, setIsHeaderSolid] = useState(false);
    const [isTopBarHidden, setIsTopBarHidden] = useState(false);
    const [isNavHovered, setIsNavHovered] = useState(false);

    const pagesRequiringSolidHeaderImmediately = ['meet-the-team', 'blog', 'gift-card'];

    useEffect(() => {
        const handleScroll = () => {
           const requiresSolidInitially = currentPage === 'home' || pagesRequiringSolidHeaderImmediately.includes(currentPage);
           const isScrolledPastThreshold = window.scrollY > 10;
           setIsHeaderSolid(requiresSolidInitially || isScrolledPastThreshold);
           setIsTopBarHidden(isScrolledPastThreshold);
        };
        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [currentPage]);

    const handleNavClick = (e, pageName) => {
        e.preventDefault();
        if (resetTeamView) resetTeamView();
        // Reset collection when navigating to a main page
        handleSelectCollection(null); // Clear selected collection
        setPage(pageName);
        window.scrollTo(0, 0);
    };

     // Function specifically for handling collection item clicks
    const onCollectionItemClick = (e, collectionName) => {
        e.preventDefault();
        if (resetTeamView) resetTeamView();
        handleSelectCollection(collectionName); // Set the selected collection in App.jsx
        setPage('collection'); // Set a generic page state for collections
        window.scrollTo(0, 0);
    };


    const isLinkActive = (pageName) => {
       if (pageName === 'shop') return currentPage === 'shop';
       if (pageName === 'home') return currentPage === 'home';
       if (pageName === 'jewellery') return currentPage === 'jewellery';
       // Make 'collection' active when viewing any collection
       if (pageName === 'collection') return currentPage === 'collection';
       return currentPage === pageName;
    };

    const headerClasses = `
      header-container
      ${isHeaderSolid ? 'scrolled' : ''}
      ${isTopBarHidden ? 'top-bar-hidden' : ''}
      ${isNavHovered ? 'nav-hovered' : ''}
    `;

    // --- Collection Dropdown Items --- (Based on Screenshot 2025-10-21 at 11.10.25 AM.jpg)
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
                   {/* ... logo and icons ... */}
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
                            onClick={onUserIconClick}
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
                            {/* SHOP */}
                            <li>
                                <a href="#"
                                  className={`nav-link ${isLinkActive('shop') ? 'active' : ''}`}
                                  onClick={(e) => handleNavClick(e, 'shop')}>
                                   SHOP
                                </a>
                            </li>
                            {/* NEW ARRIVALS */}
                            <li className="nav-item dropdown">
                                <NavDropdown
                                    title="NEW ARRIVALS"
                                    id="new-arrivals-dropdown"
                                    className={`nav-link p-0 ${isLinkActive('jewellery') ? 'active' : ''}`}
                                >
                                   <NavDropdown.Item onClick={(e) => handleNavClick(e, 'shop')}>
                                        Sarees
                                    </NavDropdown.Item>
                                    <NavDropdown.Item onClick={(e) => handleNavClick(e, 'jewellery')}>
                                        Jewellery
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </li>

                            {/* --- COLLECTIONS DROPDOWN --- */}
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

                             {/* BESTSELLERS */}
                             <li>
                                <a href="#" className={`nav-link ${isLinkActive('bestsellers') ? 'active' : ''}`} onClick={(e) => handleNavClick(e, 'bestsellers')}>
                                    BESTSELLERS
                                </a>
                             </li>
                             {/* MEET THE TEAM */}
                             <li>
                                 <a href="#"
                                    className={`nav-link ${isLinkActive('meet-the-team') ? 'active' : ''}`}
                                    onClick={(e) => handleNavClick(e, 'meet-the-team')}>
                                    MEET THE TEAM
                                 </a>
                             </li>
                             {/* BLOG */}
                             <li>
                                <a href="#" className={`nav-link ${isLinkActive('blog') ? 'active' : ''}`} onClick={(e) => handleNavClick(e, 'blog')}>
                                    BLOG
                                </a>
                             </li>
                             {/* GIFT CARD */}
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

export default Header;
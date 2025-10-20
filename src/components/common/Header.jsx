// src/components/common/Header.jsx
import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { NavDropdown } from 'react-bootstrap';

const Header = ({ setPage, currentPage, resetTeamView }) => {
    const { toggleCart, cartItems } = useContext(CartContext);
    const cartItemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

    // State for making the main header background solid
    const [isHeaderSolid, setIsHeaderSolid] = useState(false);
    // State specifically for hiding the top bar (only on actual scroll)
    const [isTopBarHidden, setIsTopBarHidden] = useState(false);

    const [isNavHovered, setIsNavHovered] = useState(false);

    // Define pages that should have a solid header right away (excluding 'home' for now)
    const pagesRequiringSolidHeaderImmediately = ['meet-the-team', 'blog', 'gift-card'];

    useEffect(() => {
        const handleScroll = () => {
           // Determine if the main header background should be solid
           // NEW LOGIC: Solid if currentPage is 'home', OR if it's another page requiring immediate solid, OR if scrolled
           const requiresSolidInitially = currentPage === 'home' || pagesRequiringSolidHeaderImmediately.includes(currentPage);
           const isScrolledPastThreshold = window.scrollY > 10;

           setIsHeaderSolid(requiresSolidInitially || isScrolledPastThreshold);

           // Determine if the top bar should be hidden (only based on scroll)
           setIsTopBarHidden(isScrolledPastThreshold);
        };

        // Run handler immediately on mount and page change
        handleScroll();

        // Add scroll listener
        window.addEventListener('scroll', handleScroll);

        // Cleanup listener
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [currentPage]); // Depend on currentPage to set initial solid state correctly

    const handleNavClick = (e, pageName) => {
        e.preventDefault();
        if (resetTeamView) {
            resetTeamView();
        }
        setPage(pageName);
        window.scrollTo(0, 0);
    };

    // Active link logic (remains the same)
    const isLinkActive = (pageName) => {
       if (pageName === 'shop') return currentPage === 'shop';
       if (pageName === 'home') return currentPage === 'home';
       if (pageName === 'jewellery') return currentPage === 'jewellery';
       return currentPage === pageName;
    };

    // Apply classes based on the two separate states
    const headerClasses = `
      header-container
      ${isHeaderSolid ? 'scrolled' : ''}
      ${isTopBarHidden ? 'top-bar-hidden' : ''}
      ${isNavHovered ? 'nav-hovered' : ''}
    `;

    // The rest of the JSX remains the same
    return (
        <header className={headerClasses}>
            {/* Top Bar */}
            <div className="top-bar text-center py-2">
                5% OFF ON YOUR FIRST ORDER | WELCOME 5
            </div>

            {/* Main Header Content */}
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
                        <img src="/images/icons/user-icon.svg" alt="User" />
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
                            {/* COLLECTIONS */}
                            <li>
                                <a href="#"
                                  className={`nav-link ${isLinkActive('shop') ? 'active' : ''}`}
                                  onClick={(e) => handleNavClick(e, 'shop')}>
                                   COLLECTIONS
                                </a>
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
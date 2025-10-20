// src/components/common/Header.jsx
import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { NavDropdown } from 'react-bootstrap';

const Header = ({ setPage, currentPage, resetTeamView }) => {
    const { toggleCart, cartItems } = useContext(CartContext);
    const cartItemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

    const [scrolled, setScrolled] = useState(false);
    const [isNavHovered, setIsNavHovered] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
           // Header becomes solid if scrolled OR if not on the 'home' or 'shop' page initially
           const isScrolled = window.scrollY > 10 || !['home', 'shop'].includes(currentPage);
            setScrolled(isScrolled);
        };

        handleScroll(); // Run on mount to set initial state based on current page

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [currentPage]); // Re-run effect when currentPage changes

    const handleNavClick = (e, pageName) => {
        e.preventDefault();
        if (resetTeamView) {
            resetTeamView(); // Reset team view if navigating away
        }
        setPage(pageName);
        window.scrollTo(0, 0); // Scroll to top on page change
    };

    const isLinkActive = (pageName) => {
       // 'shop' is active for SHOP/COLLECTIONS only when on the shop (Sarees) page
       if (pageName === 'shop') {
           return currentPage === 'shop';
       }
       // 'home' is active only when on the actual homepage (logo click)
       if (pageName === 'home') {
           return currentPage === 'home';
       }
        // Jewellery under New Arrivals dropdown
        if (pageName === 'jewellery') {
            return currentPage === 'jewellery';
        }
        // All other links are active only on their specific page
        return currentPage === pageName;
    };


    const headerClasses = `
      header-container
      ${scrolled ? 'scrolled' : ''}
      ${isNavHovered ? 'nav-hovered' : ''}
    `;

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
                <div className="main-header container d-flex justify-content-between align-items-center py-3">
                    <div className="flex-grow-1"></div> {/* Left spacer */}
                    <div className="logo text-center">
                       {/* Logo click navigates to 'home' */}
                       <a href="#" onClick={(e) => handleNavClick(e, 'home')}>
                            <img src="/images/logo.png" alt="Amrapali Boutique" className="amrapali-logo" />
                        </a>
                    </div>
                    <div className="header-icons d-flex align-items-center justify-content-end gap-3 flex-grow-1">
                        {/* Icons */}
                        <img src="/images/icons/user-icon.svg" alt="User" />
                        <img src="/images/icons/search-icon.svg" alt="Search" />
                        <button onClick={toggleCart} className="btn btn-link text-dark p-0 position-relative">
                            <img src="/images/icons/cart-icon.svg" alt="Cart" />
                            {cartItemCount > 0 && <span className="cart-count-badge">{cartItemCount}</span>}
                        </button>
                    </div>
                </div>

                <div className="main-nav-container">
                     <nav className="main-nav container">
                        <ul className="list-unstyled d-flex justify-content-center gap-5 mb-0 py-2">
                            {/* SHOP Link */}
                            <li>
                                <a href="#"
                                  className={`nav-link ${isLinkActive('shop') ? 'active' : ''}`}
                                  onClick={(e) => handleNavClick(e, 'shop')}>
                                   SHOP
                                </a>
                            </li>

                            {/* NEW ARRIVALS Dropdown */}
                            <li className="nav-item dropdown">
                                <NavDropdown
                                    title="NEW ARRIVALS"
                                    id="new-arrivals-dropdown"
                                    // Apply 'active' based on whether the jewellery page is active
                                    className={`nav-link p-0 ${isLinkActive('jewellery') ? 'active' : ''}`}
                                >
                                   {/* Dropdown item for Sarees should go to 'shop' */}
                                   <NavDropdown.Item onClick={(e) => handleNavClick(e, 'shop')}>
                                        Sarees
                                    </NavDropdown.Item>
                                    <NavDropdown.Item onClick={(e) => handleNavClick(e, 'jewellery')}>
                                        Jewellery
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </li>

                            {/* COLLECTIONS Link */}
                            <li>
                                <a href="#"
                                  className={`nav-link ${isLinkActive('shop') ? 'active' : ''}`} // Active when shop is active
                                  onClick={(e) => handleNavClick(e, 'shop')}>
                                   COLLECTIONS
                                </a>
                            </li>

                            {/* BESTSELLERS Link */}
                             <li>
                                <a href="#" className={`nav-link ${isLinkActive('bestsellers') ? 'active' : ''}`} onClick={(e) => handleNavClick(e, 'bestsellers')}>
                                    BESTSELLERS
                                </a>
                             </li>

                             {/* MEET THE TEAM Link */}
                             <li>
                                 <a href="#"
                                    className={`nav-link ${isLinkActive('meet-the-team') ? 'active' : ''}`}
                                    onClick={(e) => handleNavClick(e, 'meet-the-team')}>
                                    MEET THE TEAM
                                 </a>
                             </li>

                             {/* BLOG Link */}
                             <li>
                                <a href="#" className={`nav-link ${isLinkActive('blog') ? 'active' : ''}`} onClick={(e) => handleNavClick(e, 'blog')}>
                                    BLOG
                                </a>
                             </li>

                             {/* GIFT CARD Link */}
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
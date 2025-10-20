import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { NavDropdown } from 'react-bootstrap';

// Accept the 'resetTeamView' function as a prop
const Header = ({ setPage, currentPage, resetTeamView }) => {
    const { toggleCart, cartItems } = useContext(CartContext);
    const cartItemCount = cartItems.reduce((count, item) => count + item.quantity, 0);
    
    const [scrolled, setScrolled] = useState(false);
    const [isNavHovered, setIsNavHovered] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            
            // Always update scrolled state based on actual scroll position
            setScrolled(isScrolled);
        };

        // Set initial state - check scroll position on mount
        handleScroll();
        
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [currentPage]);

    const handleNavClick = (e, pageName) => {
        e.preventDefault(); 
        
        if (resetTeamView) {
            resetTeamView();
        }

        setPage(pageName);
        window.scrollTo(0, 0);
    };
    
    const isLinkActive = (pageName) => {
        // 'home' is active for SHOP/COLLECTIONS only when on the home page
        if (pageName === 'home') {
            return ['home', 'collections'].includes(currentPage);
        }
        // All other links are active only on their specific page
        return currentPage === pageName;
    };

    // Determine if this page should start with a solid header
    const hasSolidHeader = currentPage !== 'home' && currentPage !== 'jewellery' && currentPage !== 'bestsellers';

    const headerClasses = `
      header-container 
      ${scrolled ? 'scrolled' : ''} 
      ${isNavHovered ? 'nav-hovered' : ''}
      ${hasSolidHeader ? 'solid-header' : ''}
    `.trim();

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
                
                <div className="main-nav-container">
                     <nav className="main-nav container">
                        <ul className="list-unstyled d-flex justify-content-center gap-5 mb-0 py-2">
                            <li>
                                <a href="#" 
                                   className={`nav-link ${isLinkActive('home') ? 'active' : ''}`} 
                                   onClick={(e) => handleNavClick(e, 'home')}>
                                   SHOP
                                </a>
                            </li>
                            
                            <li className="nav-item dropdown">
                                <NavDropdown 
                                    title="NEW ARRIVALS" 
                                    id="new-arrivals-dropdown" 
                                    className={`nav-link p-0 ${isLinkActive('jewellery') ? 'active' : ''}`}
                                >
                                    <NavDropdown.Item onClick={(e) => handleNavClick(e, 'home')}>
                                        Sarees
                                    </NavDropdown.Item>
                                    <NavDropdown.Item onClick={(e) => handleNavClick(e, 'jewellery')}>
                                        Jewellery
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </li>
                            
                            <li>
                                <a href="#" 
                                   className="nav-link" 
                                   onClick={(e) => handleNavClick(e, 'home')}>
                                   COLLECTIONS
                                </a>
                            </li>
                            <li><a href="#" className={`nav-link ${isLinkActive('bestsellers') ? 'active' : ''}`} onClick={(e) => handleNavClick(e, 'bestsellers')}>BESTSELLERS</a></li>
                            <li>
                                <a href="#" 
                                   className={`nav-link ${isLinkActive('meet-the-team') ? 'active' : ''}`} 
                                   onClick={(e) => handleNavClick(e, 'meet-the-team')}>
                                   MEET THE TEAM
                                </a>
                            </li>
                            <li>
                               <a href="#" className={`nav-link ${isLinkActive('blog') ? 'active' : ''}`} onClick={(e) => handleNavClick(e, 'blog')}>BLOG</a>
                            </li>
                            
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
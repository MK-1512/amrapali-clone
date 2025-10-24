import React from 'react';

// Simple inline SVG components for social icons (Keep these as they are)
const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.142v3.24h-1.918c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.323-1.325z"/></svg>
);
const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.85s.012-3.584.07-4.85c.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44c0-.795-.645-1.44-1.441-1.44z"/></svg>
);
const PinterestIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.117.223.084.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.318.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg>
);

// Accept setPage and toggleSearch from App.jsx
const Footer = ({ setPage, toggleSearch }) => {

  // Navigation handler for internal page links
  const handleFooterNav = (e, pageKey) => {
    e.preventDefault();
    setPage(pageKey); // Use the setPage function passed from App
  };

  // Handler specifically for the Search link
  const handleSearchClick = (e) => {
    e.preventDefault();
    toggleSearch(); // Use the toggleSearch function passed from App
  };


  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row">
          {/* Column 1: Explore */}
          <div className="col-md-3">
            <h5>EXPLORE</h5>
            <ul className="footer-links">
              <li><a href="#" onClick={(e) => handleFooterNav(e, 'our-story')}>Our Story</a></li>
              <li><a href="#" onClick={(e) => handleFooterNav(e, 'faq')}>FAQs</a></li>
              <li><a href="#" onClick={(e) => handleFooterNav(e, 'all-collections')}>Shop</a></li> {/* Navigate to All Collections */}
              <li><a href="#" onClick={handleSearchClick}>Search</a></li> {/* Activate Search Bar */}
              <li><a href="#" onClick={(e) => handleFooterNav(e, 'blog')}>Blog</a></li>
            </ul>
          </div>

          {/* Column 2: Customer Service */}
          <div className="col-md-3">
            <h5>CUSTOMER SERVICE</h5>
            <ul className="footer-links">
              <li><a href="#" onClick={(e) => handleFooterNav(e, 'shipping-policy')}>Shipping & Delivery Policy</a></li>
              <li><a href="#" onClick={(e) => handleFooterNav(e, 'refund-policy')}>Cancellation & Refund Policy</a></li>
              <li><a href="#" onClick={(e) => handleFooterNav(e, 'contact')}>Contact Us</a></li>
              <li><a href="#" onClick={(e) => handleFooterNav(e, 'terms-service')}>Terms of Service</a></li>
            </ul>
          </div>

          {/* Column 3: Terms */}
          <div className="col-md-2">
            <h5>TERMS</h5>
            <ul className="footer-links">
              <li><a href="#" onClick={(e) => handleFooterNav(e, 'terms-conditions')}>Terms and Conditions</a></li>
              <li><a href="#" onClick={(e) => handleFooterNav(e, 'privacy-policy')}>Privacy Policy</a></li>
              <li><a href="#" onClick={(e) => handleFooterNav(e, 'disclaimer-policy')}>Disclaimer Policy</a></li>
            </ul>
          </div>

          {/* Column 4: About the Store */}
          <div className="col-md-4">
            <h5>ABOUT THE STORE</h5>
            <p className="footer-about">
              We endeavor to blend India's artistic traditions, hinged with modern functionality and aesthetics. Join us in our journey as we strive to bring the finest woven stories straight out of the looms of India, hand-crafted with love.
            </p>
            <div className="social-icons">
              {/* Keep actual URLs for social media */}
              <a href="https://www.facebook.com/amrapaliboutique" target="_blank" rel="noopener noreferrer"><FacebookIcon /></a>
              <a href="https://www.instagram.com/amrapaliboutique/" target="_blank" rel="noopener noreferrer"><InstagramIcon /></a>
              <a href="https://in.pinterest.com/amrapali_boutique/" target="_blank" rel="noopener noreferrer"><PinterestIcon /></a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="d-flex justify-content-between align-items-center">
            <span className="copyright-text">
              © {new Date().getFullYear()} AMRAPALI BOUTIQUE {/* Dynamic Year */}
            </span>
            {/* Payment icons are likely static, keep as is or update if needed */}
            {/* <div className="payment-icons">
                 <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/PayPal_Logo_Icon_2014.svg/250px-PayPal_Logo_Icon_2014.svg.png" alt="Paypal" />
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

// src/components/common/SearchBar.jsx

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProductCard from '../product/ProductCard';
// Import allProducts/allBlogPosts if needed for counts
import { searchAll, allProducts, allBlogPosts } from '../../utils/searchUtils';
import useOnClickOutside from '../../hooks/useOnClickOutside';

// Sub-component for a small blog preview in search results
const SearchBlogPreview = ({ post, handleNavClick }) => { // Added handleNavClick
    const handleBlogClick = (e) => {
        e.preventDefault();
        // Use handleNavClick to navigate to the blog detail page
        if (handleNavClick && post && post.id) {
            handleNavClick(`blog-detail-${post.id}`);
        }
    };
    return (
        // Make the whole preview clickable
        <a href="#" className="search-blog-preview-link" onClick={handleBlogClick}>
            <div className="search-blog-preview">
                <img src={post.image} alt={post.title} className="img-fluid mb-2" />
                <p className="search-blog-title">{post.title}</p>
            </div>
        </a>
    );
};


// Main Search Bar Component
// --- Add new prop: onSearchSubmit ---
const SearchBar = ({ isSearchOpen, handleCloseSearch, handleNavClick, onSearchSubmit }) => {
    const [searchTerm, setSearchTerm] = useState('');
    // --- State now includes full lists and sliced lists ---
    const [results, setResults] = useState({
        initialProducts: [],
        initialBlogs: [],
        fullProductList: [], // Store all matching products
        fullBlogList: [],     // Store all matching blogs
        productCount: 0,
        blogCount: 0
    });
    const searchRef = useRef(null);

    // Debounced search logic
    const debounce = (func, delay) => {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(null, args);
            }, delay);
        };
     };

    // Perform search
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const performSearch = useCallback(debounce((query) => {
        if (!query) {
             setResults({ initialProducts: [], initialBlogs: [], fullProductList: [], fullBlogList: [], productCount: 0, blogCount: 0 });
             return;
        }
        const lowerQuery = query.toLowerCase();

        // --- Search through ALL products/blogs ---
        const matchingProducts = allProducts.filter(p => { //
            const nameMatch = p && p.name ? p.name.toLowerCase().includes(lowerQuery) : false; //
            const tagsMatch = p && p.tags ? p.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) : false; //
            return nameMatch || tagsMatch; //
        });
        const matchingBlogs = allBlogPosts.filter(b => { //
            const titleMatch = b && b.title ? b.title.toLowerCase().includes(lowerQuery) : false; //
            const excerptMatch = b && b.excerpt ? b.excerpt.toLowerCase().includes(lowerQuery) : false; //
            return titleMatch || excerptMatch; //
        });


        setResults({
           initialProducts: matchingProducts.slice(0, 3), // <-- Show only first 3 products initially
           initialBlogs: matchingBlogs.slice(0, 3),    // <-- Show only first 3 blogs initially
           fullProductList: matchingProducts, // Keep the full list
           fullBlogList: matchingBlogs,      // Keep the full list
            productCount: matchingProducts.length, //
            blogCount: matchingBlogs.length //
        });
    }, 250), [allProducts, allBlogPosts]); // Added dependencies

    useEffect(() => {
        if (isSearchOpen) {
            performSearch(searchTerm);
        }
    }, [searchTerm, isSearchOpen, performSearch]);


    useOnClickOutside(searchRef, () => { //
        if (isSearchOpen) {
            handleClearAndClose();
        }
    });

    const handleClearAndClose = () => {
        setSearchTerm('');
       setResults({ initialProducts: [], initialBlogs: [], fullProductList: [], fullBlogList: [], productCount: 0, blogCount: 0 });
        handleCloseSearch(); //
    }

    const handleViewAllProducts = (e) => {
        e.preventDefault();
       // --- Use the onSearchSubmit prop to trigger navigation ---
       if (onSearchSubmit) {
           onSearchSubmit(searchTerm, 'products'); // Pass term and type
       }
    };

    const handleViewAllBlogs = (e) => {
        e.preventDefault();
        // --- Navigate to the main blog page ---
        handleNavClick(e, 'blog'); //
        handleCloseSearch(); // Close the search bar
    };

    const handleClearSearch = (e) => {
        e.preventDefault();
        setSearchTerm('');
        setResults({ initialProducts: [], initialBlogs: [], fullProductList: [], fullBlogList: [], productCount: 0, blogCount: 0 });
    };


    return (
        // Set the search bar's vertical placement using CSS (main.css updated for this)
        <div className={`search-bar-overlay ${isSearchOpen ? 'open' : ''}`} ref={searchRef}>
            <Container>
                <div className="search-container">
                    <input
                        type="text"
                        className="search-input"
                       placeholder="SEARCH..." // <-- Just the text
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        autoFocus={isSearchOpen}
                    />
                    {/* FIXED: The close button now calls the dedicated handler */}
                    <button className="btn-clear" onClick={handleClearAndClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>

                {/* Search Results Area - Only visible if search term exists */}
                {searchTerm && (
                    <Row className="search-results-area pt-4">

                        {/* Left Column: Product Results */}
                        <Col md={9} className="search-products-col">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                {/* Display total count */}
                                <h6 className="search-results-heading">{results.productCount} RESULTS</h6>
                                {/* Link triggers full search results view */}
                                {results.productCount > 3 && ( // Only show if more than 3 results exist
                                  <a href="#" className="search-view-all-link" onClick={handleViewAllProducts}>VIEW ALL</a>
                                )}
                            </div>

                            {/* Display initial products */}
                           {results.initialProducts.length > 0 ? (
                                <Row xs={2} sm={3} md={3} className="g-3"> {/* Adjusted md columns to 3 */}
                                   {results.initialProducts.map(product => (
                                       // Pass handleNavClick down to ProductCard
                                       // Make sure handleNavClick is passed as 'setPage' prop
                                       <Col key={product.id}><ProductCard product={product} setPage={(pageId) => handleNavClick(null, pageId)} /></Col>
                                    ))}
                                </Row>
                            ) : (
                               <p className="text-center text-muted">No products found matching "{searchTerm}".</p>
                            )}
                        </Col>

                        {/* Right Column: Blog/Journal Results */}
                        <Col md={3} className="search-journal-col">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                {/* Display total count */}
                                <h6 className="search-results-heading">{results.blogCount} JOURNAL</h6>
                                {/* Link navigates to blog page */}
                                {results.blogCount > 3 && ( // Only show if more than 3 results exist
                                  <a href="#" className="search-view-all-link" onClick={handleViewAllBlogs}>VIEW ALL</a>
                                )}
                            </div>

                            {/* Display initial blogs */}
                           {results.initialBlogs.length > 0 ? (
                                <div className="d-grid gap-3">
                                   {results.initialBlogs.map(blog => (
                                       // Pass handleNavClick for blog preview navigation
                                       <SearchBlogPreview key={blog.id} post={blog} handleNavClick={(pageId) => handleNavClick(null, pageId)} />
                                    ))}
                                </div>
                            ) : (
                               <p className="text-center text-muted">No blog posts found matching "{searchTerm}".</p>
                            )}
                        </Col>
                    </Row>
                )}
            </Container>
        </div>
    );
};

export default SearchBar;
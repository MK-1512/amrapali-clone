// src/components/common/SearchBar.jsx

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProductCard from '../product/ProductCard';
import { searchAll } from '../../utils/searchUtils';
import useOnClickOutside from '../../hooks/useOnClickOutside';

// Sub-component for a small blog preview in search results
const SearchBlogPreview = ({ post }) => {
    // Use App.handleNavigation here if you want to close the search bar immediately.
    // For now, we'll keep it as a placeholder link.
    return (
        <a href="#" className="search-blog-preview-link">
            <div className="search-blog-preview">
                <img src={post.image} alt={post.title} className="img-fluid mb-2" />
                <p className="search-blog-title">{post.title}</p>
            </div>
        </a>
    );
};

// Main Search Bar Component
const SearchBar = ({ isSearchOpen, handleCloseSearch, handleNavClick }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState({ products: [], blogs: [], productCount: 0, blogCount: 0 });
    const searchRef = useRef(null);

    // Debounced search logic for smoother typing experience
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
        setResults(searchAll(query));
    }, 250), []);

    useEffect(() => {
        if (isSearchOpen) {
            performSearch(searchTerm);
        }
    }, [searchTerm, isSearchOpen, performSearch]);


    // Close search when clicking outside
    // The issue was here: we were only closing the search, not clearing the term.
    useOnClickOutside(searchRef, () => {
        if (isSearchOpen) {
            handleClearAndClose();
        }
    });

    const handleClearAndClose = () => {
        setSearchTerm('');
        setResults({ products: [], blogs: [], productCount: 0, blogCount: 0 });
        handleCloseSearch(); // This is the prop that calls toggleSearch in App.jsx
    }

    const handleViewAllProducts = (e) => {
        e.preventDefault();
        // Placeholder for navigating to a full search results page
        handleNavClick(e, 'shop'); // Assuming generic shop page for now
        handleCloseSearch(); // Close the search bar
    };
    
    const handleViewAllBlogs = (e) => {
        e.preventDefault();
        handleNavClick(e, 'blog'); 
        handleCloseSearch(); // Close the search bar
    };

    const handleClearSearch = (e) => {
        e.preventDefault();
        setSearchTerm('');
        setResults({ products: [], blogs: [], productCount: 0, blogCount: 0 });
    };

    return (
        // Set the search bar's vertical placement using CSS (main.css updated for this)
        <div className={`search-bar-overlay ${isSearchOpen ? 'open' : ''}`} ref={searchRef}>
            <Container>
                <div className="search-container">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="SEARCH..."
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
                                <h6 className="search-results-heading">{results.productCount} RESULTS</h6>
                                <a href="#" className="search-view-all-link" onClick={handleViewAllProducts}>VIEW ALL</a>
                            </div>
                            
                            {results.products.length > 0 ? (
                                <Row xs={2} sm={3} md={4} className="g-3">
                                    {results.products.map(product => (
                                        <Col key={product.id}><ProductCard product={product} /></Col> 
                                    ))}
                                </Row>
                            ) : (
                                <p className="text-center text-muted">No products found matching **"{searchTerm}"**.</p>
                            )}
                        </Col>

                        {/* Right Column: Blog/Journal Results */}
                        <Col md={3} className="search-journal-col">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h6 className="search-results-heading">{results.blogCount} JOURNAL</h6>
                                <a href="#" className="search-view-all-link" onClick={handleViewAllBlogs}>VIEW ALL</a>
                            </div>
                            
                            {results.blogs.length > 0 ? (
                                <div className="d-grid gap-3">
                                    {results.blogs.map(blog => (
                                        <SearchBlogPreview key={blog.id} post={blog} />
                                    ))}
                                </div>
                            ) : (
                                <p className="text-center text-muted">No blog posts found matching **"{searchTerm}"**.</p>
                            )}
                        </Col>
                    </Row>
                )}
            </Container>
        </div>
    );
};

export default SearchBar;

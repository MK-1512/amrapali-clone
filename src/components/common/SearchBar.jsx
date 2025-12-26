
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProductCard from '../product/ProductCard';
import { searchAll, allProducts, allBlogPosts } from '../../utils/searchUtils';
import useOnClickOutside from '../../hooks/useOnClickOutside';

const SearchBlogPreview = ({ post, handleNavClick }) => {
    const handleBlogClick = (e) => {
        e.preventDefault();
        if (handleNavClick && post && post.id) {
            handleNavClick(`blog-detail-${post.id}`);
        }
    };
    return (
        <a href="#" className="search-blog-preview-link" onClick={handleBlogClick}>
            <div className="search-blog-preview">
                <img src={post.image} alt={post.title} className="img-fluid mb-2" />
                <p className="search-blog-title">{post.title}</p>
            </div>
        </a>
    );
};


const SearchBar = ({ isSearchOpen, handleCloseSearch, handleNavClick, onSearchSubmit }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState({
        initialProducts: [],
        initialBlogs: [],
        fullProductList: [],
        fullBlogList: [],
        productCount: 0,
        blogCount: 0
    });
    const searchRef = useRef(null);

    const debounce = (func, delay) => {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(null, args);
            }, delay);
        };
     };

    const performSearch = useCallback(debounce((query) => {
        if (!query) {
             setResults({ initialProducts: [], initialBlogs: [], fullProductList: [], fullBlogList: [], productCount: 0, blogCount: 0 });
             return;
        }
        const lowerQuery = query.toLowerCase();

        const matchingProducts = allProducts.filter(p => {
            const nameMatch = p && p.name ? p.name.toLowerCase().includes(lowerQuery) : false;
            const tagsMatch = p && p.tags ? p.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) : false;
            return nameMatch || tagsMatch;
        });
        const matchingBlogs = allBlogPosts.filter(b => {
            const titleMatch = b && b.title ? b.title.toLowerCase().includes(lowerQuery) : false;
            const excerptMatch = b && b.excerpt ? b.excerpt.toLowerCase().includes(lowerQuery) : false;
            return titleMatch || excerptMatch;
        });


        setResults({
           initialProducts: matchingProducts.slice(0, 3),
           initialBlogs: matchingBlogs.slice(0, 3),
           fullProductList: matchingProducts,
           fullBlogList: matchingBlogs,
            productCount: matchingProducts.length,
            blogCount: matchingBlogs.length
        });
    }, 250), [allProducts, allBlogPosts]);

    useEffect(() => {
        if (isSearchOpen) {
            performSearch(searchTerm);
        }
    }, [searchTerm, isSearchOpen, performSearch]);


    useOnClickOutside(searchRef, () => {
        if (isSearchOpen) {
            handleClearAndClose();
        }
    });

    const handleClearAndClose = () => {
        setSearchTerm('');
       setResults({ initialProducts: [], initialBlogs: [], fullProductList: [], fullBlogList: [], productCount: 0, blogCount: 0 });
        handleCloseSearch();
    }

    const handleViewAllProducts = (e) => {
        e.preventDefault();
       if (onSearchSubmit) {
           onSearchSubmit(searchTerm, 'products');
       }
    };

    const handleViewAllBlogs = (e) => {
        e.preventDefault();
        handleNavClick(e, 'blog');
        handleCloseSearch();
    };

    const handleClearSearch = (e) => {
        e.preventDefault();
        setSearchTerm('');
        setResults({ initialProducts: [], initialBlogs: [], fullProductList: [], fullBlogList: [], productCount: 0, blogCount: 0 });
    };


    return (
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
                    <button className="btn-clear" onClick={handleClearAndClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>

                {searchTerm && (
                    <Row className="search-results-area pt-4">

                        <Col md={9} className="search-products-col">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h6 className="search-results-heading">{results.productCount} RESULTS</h6>
                                {results.productCount > 3 && (
                                  <a href="#" className="search-view-all-link" onClick={handleViewAllProducts}>VIEW ALL</a>
                                )}
                            </div>

                           {results.initialProducts.length > 0 ? (
                                <Row xs={2} sm={3} md={3} className="g-3">
                                   {results.initialProducts.map(product => (
                                       <Col key={product.id}><ProductCard product={product} setPage={(pageId) => handleNavClick(null, pageId)} /></Col>
                                    ))}
                                </Row>
                            ) : (
                               <p className="text-center text-muted">No products found matching "{searchTerm}".</p>
                            )}
                        </Col>

                        <Col md={3} className="search-journal-col">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h6 className="search-results-heading">{results.blogCount} JOURNAL</h6>
                                {results.blogCount > 3 && (
                                  <a href="#" className="search-view-all-link" onClick={handleViewAllBlogs}>VIEW ALL</a>
                                )}
                            </div>

                           {results.initialBlogs.length > 0 ? (
                                <div className="d-grid gap-3">
                                   {results.initialBlogs.map(blog => (
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
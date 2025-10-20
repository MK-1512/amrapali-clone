// src/components/product/ProductList.jsx

import React from 'react';
import { Container, Row, Col, Pagination } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import ProductCard from './ProductCard'; 
import { products as sareeProducts } from '../../data/products';
import { jewellery as jewelleryProducts } from '../../data/jewellery';

const ProductList = ({ collectionName }) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const activeCollection = collectionName || 'sarees';
    const allProducts = activeCollection === 'sarees' ? sareeProducts : jewelleryProducts;
    const currentPage = parseInt(searchParams.get('page') || '1', 10);

    let currentProducts;
    let totalPages;
    
    if (activeCollection === 'jewellery') {
        // --- JEWELLERY: 16 / 16 / 5 split ---
        totalPages = 3; // 37 products / 16 per page = 2 full pages + 1 partial
        if (currentPage === 1) {
            currentProducts = allProducts.slice(0, 16); // Items 1-16
        } else if (currentPage === 2) {
            currentProducts = allProducts.slice(16, 32); // Items 17-32
        } else { // currentPage === 3
            currentProducts = allProducts.slice(32, 37); // Items 33-37
        }
        
    } else { // 'sarees'
        // --- SAREES: 16 / 8 split ---
        totalPages = allProducts.length > 16 ? 2 : 1;
        const productsForPage1 = allProducts.slice(0, 16);
        const productsForPage2 = allProducts.slice(16, 24);
        currentProducts = currentPage === 2 ? productsForPage2 : productsForPage1;
    }

    const handlePageChange = (pageNumber) => {
        setSearchParams({ page: pageNumber });
        window.scrollTo(0, 0); 
    };

    const showPagination = totalPages > 1;

    return (
        <Container className="product-list-container py-5">
            <Row>
                {currentProducts.map(product => (
                    <Col key={product.id} lg={3} md={4} sm={6} xs={6} className="mb-4">
                        <ProductCard product={product} />
                    </Col>
                ))}
            </Row>

            {showPagination && (
                <Row>
                    <Col className="d-flex justify-content-center mt-4">
                        <Pagination>
                            <Pagination.Prev 
                                onClick={() => handlePageChange(currentPage - 1)} 
                                disabled={currentPage === 1} 
                            />
                            {[...Array(totalPages).keys()].map(number => (
                                <Pagination.Item 
                                    key={number + 1} 
                                    active={number + 1 === currentPage}
                                    onClick={() => handlePageChange(number + 1)}
                                >
                                    {number + 1}
                                </Pagination.Item>
                            ))}
                            <Pagination.Next 
                                onClick={() => handlePageChange(currentPage + 1)} 
                                disabled={currentPage === totalPages} 
                            />
                        </Pagination>
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default ProductList;
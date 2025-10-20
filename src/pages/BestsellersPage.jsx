import React, { useState, useMemo } from 'react';
import { bestsellerProducts } from '../data/bestsellerProducts'; // ✅ FIX: Use the correct data source
import ProductCard from '../components/product/ProductCard';
import Pagination from '../components/common/Pagination';
import FilterBar from '../components/filters/FilterBar';

const BestsellersPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 16; // 4x4 grid

    const totalPages = Math.ceil(bestsellerProducts.length / productsPerPage);

    const currentProducts = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * productsPerPage;
        const lastPageIndex = firstPageIndex + productsPerPage;
        return bestsellerProducts.slice(firstPageIndex, lastPageIndex);
    }, [currentPage]);

    // Hero banner specific to this page
    const BestsellersHero = () => (
        <div className="bestsellers-hero">
            <div className="hero-overlay"></div>
            <div className="hero-content">
                <h1 className="hero-title">MOST LOVED</h1>
                <p className="hero-subtitle">
                    While all our six yards are equally precious and treasured by us, we would like to present you few top-listed pieces that have received the most amount of love in the past. Grab them before they're gone.
                </p>
            </div>
        </div>
    );

    return (
        <>
            <BestsellersHero />
            <FilterBar />
            <div className="container my-5">
                <div className="row row-cols-1 row-cols-md-4 g-4">
                    {currentProducts.map((product) => (
                        <div className="col" key={product.id}>
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </div>
        </>
    );
};

export default BestsellersPage;


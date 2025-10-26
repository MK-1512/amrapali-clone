// src/pages/NewArrivalsSareesPage.jsx
import React, { useState } from 'react';
import ProductList from '../components/product/ProductList';
import FilterBar from '../components/filters/FilterBar';
import FilterDrawer from '../components/filters/FilterDrawer';
import NewArrivalsSareesHeroBanner from '../components/common/NewArrivalsSareesHeroBanner';
import { products as sareeProducts } from '../data/products'; // Import saree data

// --- FIX: Accept setPage prop ---
const NewArrivalsSareesPage = ({ setPage }) => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const handleOpenFilter = () => setIsFilterOpen(true);
    const handleCloseFilter = () => setIsFilterOpen(false);

    // This page will likely display the same products as the main SareesPage initially
    // which are sourced directly from products.js in the ProductList component logic.
    // Or you could pass the data directly if needed:
    // const newSarees = sareeProducts; // Or filter sareeProducts if 'new arrivals' is a subset

    return (
        <>
            <NewArrivalsSareesHeroBanner />
            <FilterBar handleOpenFilter={handleOpenFilter} />
            {/* --- FIX: Pass setPage down to ProductList --- */}
            <ProductList collectionName="Sarees" setPage={setPage} /> {/* Assuming 'Sarees' in ProductList defaults to products.js */}
            <FilterDrawer show={isFilterOpen} handleClose={handleCloseFilter} />
        </>
    );
};

export default NewArrivalsSareesPage;
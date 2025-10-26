// src/context/RecentlyViewedContext.jsx
import React, { createContext, useState, useEffect, useCallback } from 'react';

export const RecentlyViewedContext = createContext();

const MAX_RECENTLY_VIEWED = 8;
const STORAGE_KEY = 'recentlyViewedProducts';

// Helper to get products from localStorage
const getStoredProducts = () => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error("Failed to parse recently viewed products:", error);
        return [];
    }
};

export const RecentlyViewedProvider = ({ children }) => {
    const [viewedProducts, setViewedProducts] = useState(getStoredProducts);

    // Persist to localStorage whenever viewedProducts changes
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(viewedProducts));
        } catch (error) {
            console.error("Failed to save recently viewed products:", error);
        }
    }, [viewedProducts]);

    const addProduct = useCallback((product) => {
        if (!product || !product.id) return;

        setViewedProducts(prevProducts => {
            // 1. Remove product if it already exists to move it to the front
            const filtered = prevProducts.filter(p => p.id !== product.id);
            
            // 2. Add the new product to the front (most recent)
            const updated = [product, ...filtered];
            
            // 3. Enforce the max limit (FIFO)
            if (updated.length > MAX_RECENTLY_VIEWED) {
                return updated.slice(0, MAX_RECENTLY_VIEWED);
            }
            
            return updated;
        });
    }, []);

    const contextValue = {
        viewedProducts,
        addProduct,
    };

    return (
        <RecentlyViewedContext.Provider value={contextValue}>
            {children}
        </RecentlyViewedContext.Provider>
    );
};
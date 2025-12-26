import React, { createContext, useState, useEffect, useCallback } from 'react';

export const RecentlyViewedContext = createContext();

const MAX_RECENTLY_VIEWED = 8;
const STORAGE_KEY = 'recentlyViewedProducts';

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
            const filtered = prevProducts.filter(p => p.id !== product.id);
            
            const updated = [product, ...filtered];
            
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
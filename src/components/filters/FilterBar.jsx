// src/components/filters/FilterBar.jsx

import React from 'react';

// 1. Accept 'handleOpenFilter' as a prop
const FilterBar = ({ handleOpenFilter }) => {
  return (
    <div className="filter-bar-container">
        <div className="container d-flex justify-content-between align-items-center py-3">
            <div>
                {/* This div is empty */}
            </div>
            <div className="d-flex align-items-center gap-3">
                <select className="form-select sort-select">
                    <option value="manual">SORT</option>
                    <option value="featured">Featured</option>
                    <option value="price-asc">Price, low to high</option>
                    <option value="price-desc">Price, high to low</option>
                </select>
                
                {/* 2. Add the onClick handler to the button */}
                <button 
                  className="btn btn-outline-secondary filter-button"
                  onClick={handleOpenFilter}
                >
                  FILTER
                </button>
            </div>
        </div>
    </div>
  );
};

export default FilterBar;
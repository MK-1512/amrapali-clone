// src/components/filters/FilterBar.jsx

import React from 'react';

// *** MODIFIED: Accept sortOrder and onSortChange props ***
const FilterBar = ({ handleOpenFilter, sortOrder, onSortChange }) => {
  return (
    <div className="filter-bar-container">
        <div className="container d-flex justify-content-between align-items-center py-3">
            <div>
                {/* This div is empty */}
            </div>
            <div className="d-flex align-items-center gap-3">
                {/* *** MODIFIED: Add value and onChange to the select element *** */}
                <select
                  className="form-select sort-select"
                  value={sortOrder} // Control the selected value
                  onChange={(e) => onSortChange(e.target.value)} // Report changes up
                >
                    <option value="manual">SORT</option>
                    <option value="featured">Featured</option>
                    <option value="price-asc">Price, low to high</option>
                    <option value="price-desc">Price, high to low</option>
                </select>
                
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
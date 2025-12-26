
import React from 'react';

const FilterBar = ({ handleOpenFilter, sortOrder, onSortChange }) => {
  return (
    <div className="filter-bar-container">
        <div className="container d-flex justify-content-between align-items-center py-3">
            <div>
            </div>
            <div className="d-flex align-items-center gap-3">
                <select
                  className="form-select sort-select"
                  value={sortOrder}
                  onChange={(e) => onSortChange(e.target.value)}
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
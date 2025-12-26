
import React from 'react';
import ProductList from '../components/product/ProductList';
import FilterBar from '../components/filters/FilterBar';
import FilterDrawer from '../components/filters/FilterDrawer';
import SareesHeroBanner from '../components/common/SareesHeroBanner';

const SareesPage = ({ setPage, onApplyFilters, isFilterOpen, handleOpenFilter, handleCloseFilter, appliedFilters, sortOrder, onSortChange }) => {

    return (
        <>
            <SareesHeroBanner />
            <FilterBar
              handleOpenFilter={handleOpenFilter}
              sortOrder={sortOrder}
              onSortChange={onSortChange}
            />
            <div className="container my-5">
                <div className="row">
                    <div className="col-12">
                        <ProductList
                            collectionName="sarees"
                            setPage={setPage}
                            appliedFilters={appliedFilters}
                            sortOrder={sortOrder}
                        />
                    </div>
                </div>
            </div>
            <FilterDrawer
                show={isFilterOpen}
                handleClose={handleCloseFilter}
                onApplyFilters={onApplyFilters}
            />
        </>
    );
};

export default SareesPage;
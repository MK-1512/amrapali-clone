import React from 'react';
import ProductList from '../components/product/ProductList';
import FilterBar from '../components/filters/FilterBar';
import FilterDrawer from '../components/filters/FilterDrawer';
import NewArrivalsSareesHeroBanner from '../components/common/NewArrivalsSareesHeroBanner';

const NewArrivalsSareesPage = ({ setPage, onApplyFilters, isFilterOpen, handleOpenFilter, handleCloseFilter, appliedFilters, sortOrder, onSortChange }) => {

    return (
        <>
            <NewArrivalsSareesHeroBanner />
            <FilterBar
              handleOpenFilter={handleOpenFilter}
              sortOrder={sortOrder}
              onSortChange={onSortChange}
            />
            <ProductList
              collectionName="Sarees"
              setPage={setPage}
              appliedFilters={appliedFilters}
              sortOrder={sortOrder}
            />
            <FilterDrawer
              show={isFilterOpen}
              handleClose={handleCloseFilter}
              onApplyFilters={onApplyFilters}
            />
        </>
    );
};

export default NewArrivalsSareesPage;
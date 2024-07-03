import React from "react";
import SearchIcon from "@mui/icons-material/Search";

const RestaurantsFilters = () => {
  return (
    <>
      <div className="background-color">
        <div className="inner">
          <div className="restaurants-page__filters">
            <button className="search-btn">
              <SearchIcon />
            </button>
            <ul className="filters__list">
              <li className="filters__item btn-active">전체보기</li>
              <li className="filters__item">한식</li>
              <li className="filters__item">중식</li>
              <li className="filters__item">양식</li>
              <li className="filters__item">일식</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default RestaurantsFilters;

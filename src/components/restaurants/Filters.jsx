import React from "react";
import "./Filters.scss";

const Filters = () => {
  return (
    <div className="inner">
      <ul className="main-page__filter-list">
        <li className="main-page__filter-item">기본정렬순</li>
        <li className="main-page__filter-item">가까운거리순</li>
        <li className="main-page__filter-item">별점높은순</li>
      </ul>
    </div>
  );
};

export default Filters;

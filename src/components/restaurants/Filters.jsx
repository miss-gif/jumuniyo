import React from "react";

const Filters = () => {
  return (
    <div className="filters">
      <select className="filters__select">
        <option value="1">기본 정렬순</option>
        <option value="2">별점순</option>
        <option value="3">리뷰 많은순</option>
      </select>
    </div>
  );
};

export default Filters;

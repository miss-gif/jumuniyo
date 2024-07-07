/* eslint-disable react/prop-types */
import React from "react";

const RestaurantDetailHeader = ({ setActiveTab }) => {
  return (
    <div className="restaurant-detail-page__menu-header">
      <h3
        className="header__item header__menu"
        onClick={() => setActiveTab("menu")}
      >
        메뉴
      </h3>
      <h3
        className="header__item header__review"
        onClick={() => setActiveTab("review")}
      >
        클린리뷰
      </h3>
      <h3
        className="header__item header__info"
        onClick={() => setActiveTab("info")}
      >
        정보
      </h3>
    </div>
  );
};

export default RestaurantDetailHeader;

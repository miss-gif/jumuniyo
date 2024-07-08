/* eslint-disable react/prop-types */
import React from "react";

const RestaurantDetailHeader = ({ setActiveTab }) => {
  return (
    <ul className="restaurant-detail-page__menu-header">
      <li
        className="header__item header__menu"
        onClick={() => setActiveTab("menu")}
      >
        메뉴 <span>77</span>
      </li>
      <li
        className="header__item header__review"
        onClick={() => setActiveTab("review")}
      >
        클린리뷰 <span>77</span>
      </li>
      <li
        className="header__item header__info"
        onClick={() => setActiveTab("info")}
      >
        정보
      </li>
    </ul>
  );
};

export default RestaurantDetailHeader;

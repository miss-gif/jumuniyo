/* eslint-disable react/prop-types */
import React from "react";
import RestaurantDetailCarousel from "./RestaurantDetailCarousel";
import MenuCategory from "./MenuCategory";

const RestaurantDetailMenuContent = ({ menuData, onSelectMenuItem }) => {
  return (
    <div className="restaurant-detail-page__menu-content">
      <div className="carousel hidden">
        <RestaurantDetailCarousel />
      </div>
      {menuData ? (
        <MenuCategory menuData={menuData} onSelectMenuItem={onSelectMenuItem} />
      ) : (
        <p>메뉴가 없습니다.</p>
      )}
    </div>
  );
};

export default RestaurantDetailMenuContent;

/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import RestaurantDetailCarousel from "./RestaurantDetailCarousel";
import MenuCategory from "./MenuCategory";

const RestaurantDetailMenuContent = () => {
  return (
    <div className="restaurant-detail-page__menu-content">
      <div className="carousel">
        <RestaurantDetailCarousel />
      </div>
      <MenuCategory />
    </div>
  );
};

export default RestaurantDetailMenuContent;

import React from "react";
import CategoryNavigation from "../components/CategoryNavigation";
import NewRestaurantListCarousel from "../components/home/NewRestaurantListCarousel";

const HomePage = () => {
  return (
    <>
      <CategoryNavigation />
      <div className="carousel">
        <h3 className="carousel__title">최근에 주문한 메뉴</h3>
        <NewRestaurantListCarousel />
      </div>
    </>
  );
};

export default HomePage;

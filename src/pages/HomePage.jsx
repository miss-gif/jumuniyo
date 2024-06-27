import React from "react";
import CategoryNavigation from "../components/CategoryNavigation";
import NewRestaurantListCarousel from "../components/home/NewRestaurantListCarousel";

const HomePage = () => {
  return (
    <div className="home">
      <CategoryNavigation />
      <section className="section-carousel">
        <h3 className="section__title">최근에 주문한 메뉴</h3>
        <NewRestaurantListCarousel />
      </section>
    </div>
  );
};

export default HomePage;

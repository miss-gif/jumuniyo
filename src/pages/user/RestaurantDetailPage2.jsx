import React, { useState } from "react";
import RestaurantDetailHeader from "../../components/user/restaurantdetail/RestaurantDetailHeader";
import RestaurantDetailCleanReview from "../../components/user/restaurantdetail/RestaurantDetailCleanReview";
import RestaurantDetailMenuContent from "../../components/user/restaurantdetail/RestaurantDetailMenuContent";
import RestaurantDetailTabInfo from "../../components/user/restaurantdetail/RestaurantDetailTabInfo";
import RestaurantDetailInfo from "../../components/user/restaurantdetail/RestaurantDetailInfo";
import OrderSummary from "../../components/user/restaurantdetail/OrderSummary";

const RestaurantDetailPage = () => {
  const [activeTab, setActiveTab] = useState("menu");

  const renderContent = () => {
    switch (activeTab) {
      case "menu":
        return <RestaurantDetailMenuContent />;
      case "review":
        return <RestaurantDetailCleanReview />;
      case "info":
        return <RestaurantDetailTabInfo />;
      default:
        return null;
    }
  };

  return (
    <div className="restaurant-detail-page">
      <div className="restaurant-detail-page__left">
        <RestaurantDetailInfo />

        <div className="restaurant-detail-page__menu">
          <RestaurantDetailHeader setActiveTab={setActiveTab} />
          <div>{renderContent()}</div>
        </div>
      </div>

      <div className="restaurant-detail-page__right">
        <OrderSummary />
      </div>
    </div>
  );
};

export default RestaurantDetailPage;

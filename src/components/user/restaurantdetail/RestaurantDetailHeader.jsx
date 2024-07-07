import React from "react";

const RestaurantDetailHeader = () => {
  return (
    <div className="restaurant-detail-page__menu-header">
      <h3 className="header__item header__menu">메뉴</h3>
      <h3 className="header__item header__review">클린리뷰</h3>
      <h3 className="header__item header__info">정보</h3>
    </div>
  );
};

export default RestaurantDetailHeader;

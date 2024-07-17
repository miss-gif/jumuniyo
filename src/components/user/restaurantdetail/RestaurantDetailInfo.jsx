/* eslint-disable react/prop-types */
import React from "react";

const RestaurantDetailInfo = ({ restaurantData }) => {
  // 소수 둘째 자리에서 반올림된 reviewScore
  const roundedReviewScore = Math.round(restaurantData.reviewScore * 100) / 100;

  return (
    <div className="restaurant-detail-page__info">
      <h2 className="restaurant-detail-page__info-name">
        {restaurantData.restaurantName}
      </h2>
      <div className="restaurant-detail-page__info-content">
        <div className="restaurant-detail-page__info-image">
          <img src="https://picsum.photos/100/" alt="" />
        </div>
        <div className="restaurant-detail-page__info-details">
          <div className="restaurant-detail-page__info-rating">
            <span>★★★★★</span> <p>{roundedReviewScore}</p>
          </div>
          <p className="restaurant-detail-page__info-payment">
            <span className="gray">결제</span> 신용카드 , 현금 , 웹 결제
          </p>
        </div>
      </div>
      <p className="restaurant-detail-page__info-notice">
        <span>가게 소개: </span> {restaurantData.restaurantDesc}
      </p>
    </div>
  );
};

export default RestaurantDetailInfo;

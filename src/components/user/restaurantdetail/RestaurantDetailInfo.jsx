import React from "react";

const RestaurantDetailInfo = () => {
  return (
    <div className="restaurant-detail-page__info">
      <h2 className="restaurant-detail-page__info-name">
        호식이두마리치킨-대명1호점
      </h2>
      <div className="restaurant-detail-page__info-content">
        <div className="restaurant-detail-page__info-image">
          <img src="https://picsum.photos/100/" alt="" />
        </div>
        <div className="restaurant-detail-page__info-details">
          <div className="restaurant-detail-page__info-rating">
            <span>★★★★★</span> <p>4.9</p>
          </div>
          <p className="restaurant-detail-page__info-payment">
            <span className="gray">결제</span> 신용카드 , 현금 , 웹 결제
          </p>
        </div>
      </div>
      <p className="restaurant-detail-page__info-notice">
        <span>사장님알림</span> 💜💙💛❤언제나 즐거운 리뷰 이벤트💜💙💛❤
        🖤호식이두마리치킨대명1호점
      </p>
    </div>
  );
};

export default RestaurantDetailInfo;

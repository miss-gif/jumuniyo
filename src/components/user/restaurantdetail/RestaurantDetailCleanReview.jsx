import React from "react";
import Review from "../../common/Review";
// import "./RestaurantDetailCleanReview.scss";

const RestaurantDetailCleanReview = () => {
  return (
    <div className="restaurant-detail">
      <div className="restaurant-detail__overall-score">
        <div className="overall-score">
          <p className="overall-score__value">4.8</p>
          <span className="overall-score__icon">★★★★★</span>
        </div>
        <div className="score-items">
          <div className="score-item score-item--taste">
            <p className="score-item__title">맛</p>
            <span className="score-item__icon">★★★★★</span>
            <p className="score-item__value">4.8</p>
          </div>
          <div className="score-item score-item--quantity">
            <p className="score-item__title">양</p>
            <span className="score-item__icon">★★★★★</span>
            <p className="score-item__value">4.8</p>
          </div>
          <div className="score-item score-item--delivery">
            <p className="score-item__title">배달</p>
            <span className="score-item__icon">★★★★★</span>
            <p className="score-item__value">4.8</p>
          </div>
        </div>
      </div>

      <div className="review-list">
        <div className="review-list__filter">
          <div className="filter__text">
            <p>
              리뷰 <span>10861</span>개
            </p>
            <p>
              사장님댓글 <span>10861</span>개
            </p>
          </div>
          <p className="filter__photo-reviews">사진리뷰만</p>
        </div>

        <ul className="reviews">
          <Review />
          <Review />
        </ul>
      </div>
    </div>
  );
};

export default RestaurantDetailCleanReview;

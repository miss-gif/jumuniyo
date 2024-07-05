/* eslint-disable react/prop-types */
import React from "react";

const ReviewContent = ({ reviewItems, storeReviewNumber }) => {
  return (
    <div className="review-content">
      <div className="review-wrap">
        <div>클린리뷰 {storeReviewNumber[0].reviews}</div>
        <div className="rating-section">
          <div className="rating-score">5.0</div>
          <div className="rating-stars">
            <span>맛</span> <span>5.0</span>
            <span>양</span> <span>5.0</span>
            <span>배달</span> <span>5.0</span>
          </div>
        </div>
        <div className="review-section">
          <div className="review-count">
            리뷰 {storeReviewNumber[0].reviews}개
          </div>
          <div className="review-switch">
            <label>
              <input type="checkbox" /> 사장님댓글
            </label>
          </div>
        </div>
        <div className="reviews">
          {reviewItems.map((item, index) => (
            <div key={index} className="review">
              <div className="review-header">
                <div className="review-headerUserandDate">
                  <span className="review-user">{item.userId}</span>
                  <span className="review-date">{item.writeTime}</span>
                </div>

                <span className="review-rating">{item.score}</span>
              </div>
              <div className="review-content">
                <img src={item.reviewImg} alt="Review" />
                <p>{item.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewContent;

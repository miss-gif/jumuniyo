/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import Review from "../../common/Review";
import { fetchReviewData } from "../../../api/restaurantdetail/restaurantDetail";
import LoadingSpinner from "../../common/LoadingSpinner";

const RestaurantDetailCleanReview = ({ resPk, restaurantData }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPhotoReviewsOnly, setShowPhotoReviewsOnly] = useState(false);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const reviewData = await fetchReviewData(resPk);
        setReviews(reviewData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    getReviews();
  }, [resPk]);

  if (loading) return <LoadingSpinner />;
  if (error) return <p>에러: {error}</p>;

  const roundedReviewScore = Math.round(restaurantData.reviewScore * 100) / 100;
  const photoReviews = reviews.filter(review => review.pics.length > 0);

  return (
    <div className="restaurant-detail">
      <div className="restaurant-detail__overall-score">
        <div className="overall-score">
          <p className="overall-score__value"> {roundedReviewScore}</p>
          <span className="overall-score__icon">
            {"★".repeat(Math.round(roundedReviewScore))}
          </span>
        </div>
      </div>

      <div className="review-list">
        <div className="review-list__filter">
          <div className="filter__text">
            <p>
              리뷰 <span>{reviews.length}</span>개
            </p>
            <p>
              사장님댓글{" "}
              <span>{reviews.filter(review => review.reply).length}</span>개
            </p>
            <p>
              사진 리뷰 <span>{photoReviews.length}</span>개
            </p>
          </div>
          <p
            className="filter__photo-reviews"
            onClick={() => setShowPhotoReviewsOnly(!showPhotoReviewsOnly)}
            style={{ cursor: "pointer" }}
          >
            사진리뷰만
          </p>
        </div>

        <ul className="reviews">
          {(showPhotoReviewsOnly ? photoReviews : reviews).map(review => (
            <Review key={review.reviewPk} review={review} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RestaurantDetailCleanReview;

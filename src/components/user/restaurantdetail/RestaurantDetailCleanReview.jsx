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
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const reviewData = await fetchReviewData(resPk, page);
        setReviews(reviewData.reviewList || []);
        setTotalPage(reviewData.totalPage || 1);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    getReviews();
  }, [resPk, page]);

  if (loading) return <LoadingSpinner />;
  if (error) return <p>에러: {error}</p>;

  const roundedReviewScore = Math.round(restaurantData.reviewScore * 100) / 100;
  const photoReviews = Array.isArray(reviews)
    ? reviews.filter(review => review.pics.length > 0)
    : [];

  const handlePageChange = newPage => {
    if (newPage > 0 && newPage <= totalPage) {
      setPage(newPage);
    }
  };

  const pageNumbers = Array.from(
    { length: totalPage },
    (_, index) => index + 1,
  );

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
              리뷰 <span>{Array.isArray(reviews) ? reviews.length : 0}</span>개
            </p>
            <p>
              사장님댓글{" "}
              <span>
                {Array.isArray(reviews)
                  ? reviews.filter(review => review.reply).length
                  : 0}
              </span>
              개
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

        <div className="paginationforOrderHistory">
          <button
            className="btn btnNextandBefore"
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            이전
          </button>
          {pageNumbers.map(pageNumber => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={page === pageNumber ? "active" : ""}
            >
              {pageNumber}
            </button>
          ))}
          <button
            className="btn btnNextandBefore"
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPage}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetailCleanReview;

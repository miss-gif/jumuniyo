/* eslint-disable react/prop-types */
import React from "react";
import OwnerComment from "./OwnerComment";

const Review = ({ review }) => {
  const { userPk, reviewContents, reviewRating, pics, createdAt, reply } =
    review;

  return (
    <li className="review">
      <div className="review__header">
        <div className="review__user-info">
          <p className="user-info__id">{userPk}님</p>
          <p className="user-info__time">{createdAt}</p>
        </div>
        <div className="review__report">신고</div>
      </div>
      <div className="review__rating">
        <div className="rating__stars">{"★".repeat(reviewRating)}</div>
      </div>
      {pics.length > 0 && (
        <img src={`/pic/${pics[0]}`} alt="review" className="review__image" />
      )}
      <div className="review__content">{reviewContents}</div>
      {reply && <OwnerComment reply={reply} />}
    </li>
  );
};

export default Review;

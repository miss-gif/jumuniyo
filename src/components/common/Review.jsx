/* eslint-disable react/prop-types */
import React, { useState } from "react";
import OwnerComment from "./OwnerComment";
import ModalforReview from "./ModalForReview";
import ReportModal from "./ReportModal";

const Review = ({ review }) => {
  const {
    nickName,
    reviewContents,
    reviewRating,
    pics,
    createdAt,
    reply,
    reviewPk,
  } = review;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const openModal = pic => {
    setSelectedImage(pic);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  const openReportModal = () => {
    setIsReportModalOpen(true);
  };

  const closeReportModal = () => {
    setIsReportModalOpen(false);
  };

  const roundedRating = Math.round(reviewRating * 100) / 100;

  return (
    <li className="review">
      <div className="review__header">
        <div className="review__user-info">
          <p className="user-info__id">{nickName}님</p>
          <p className="user-info__time">{createdAt}</p>
        </div>
        <div
          className="review__report"
          onClick={openReportModal}
          style={{ cursor: "pointer" }}
        >
          신고
        </div>
      </div>
      <div className="review__rating">
        <div className="rating__stars">
          {"★".repeat(Math.round(roundedRating))} {roundedRating}
        </div>
      </div>
      {pics.length > 0 && (
        <div
          className="review__images"
          style={{ display: "flex", gap: "10px" }}
        >
          {pics.map((pic, index) => (
            <img
              key={index}
              src={`/pic/${pic}`}
              alt={`review pic ${index + 1}`}
              className="review__image"
              style={{ width: "200px", height: "100px", cursor: "pointer" }}
              onClick={() => openModal(pic)}
            />
          ))}
        </div>
      )}
      <div className="review__content">{reviewContents}</div>
      {reply && <OwnerComment reply={reply} />}

      <ModalforReview isOpen={isModalOpen} onClose={closeModal}>
        <img
          src={`/pic/${selectedImage}`}
          alt="Original"
          style={{ width: "500px", height: "100%" }}
        />
      </ModalforReview>

      <ReportModal
        isOpen={isReportModalOpen}
        onClose={closeReportModal}
        reviewPk={reviewPk}
      />
    </li>
  );
};

export default Review;

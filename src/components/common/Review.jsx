/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useSelector } from "react-redux";
import OwnerComment from "./OwnerComment";
import ModalforReview from "./ModalForReview";
import ReportModal from "./ReportModal";
import LoginModal from "../user/restaurantdetail/LoginModal";

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
  const [showLoginModal, setShowLoginModal] = useState(false);

  const isLoggedIn = useSelector(state => !!state.user.accessToken);

  const openModal = pic => {
    setSelectedImage(pic);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  const openReportModal = () => {
    if (isLoggedIn) {
      setIsReportModalOpen(true);
    } else {
      setShowLoginModal(true);
    }
  };

  const closeReportModal = () => {
    setIsReportModalOpen(false);
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
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
              src={`${pic}`}
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
          src={`/${selectedImage}`}
          alt="Original"
          style={{ width: "500px", height: "100%" }}
        />
      </ModalforReview>

      <ReportModal
        isOpen={isReportModalOpen}
        onClose={closeReportModal}
        reviewPk={reviewPk}
      />

      {showLoginModal && <LoginModal onClose={closeLoginModal} />}
    </li>
  );
};

export default Review;

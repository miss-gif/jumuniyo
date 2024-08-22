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
    reviewReportState: initialReviewReportState, // Renaming for clarity
    reviewBlind,
  } = review;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [reviewReportState, setReviewReportState] = useState(
    initialReviewReportState,
  );

  const accessToken = useSelector(state => state.user.accessToken);
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

  const handleReportSuccess = () => {
    setReviewReportState(0); // 신고 상태를 0으로 업데이트하여 UI에 반영
    closeReportModal();
  };

  const roundedRating = Math.round(reviewRating * 100) / 100;

  if (reviewBlind === 1) {
    // 리뷰가 블라인드된 경우
    return (
      <li className="review">
        <div className="review__header">
          <div className="review__user-info">
            <p className="user-info__id">{nickName}님</p>
            <p className="user-info__time">{createdAt}</p>
          </div>
        </div>
        <div className="review__rating">
          <div className="rating__stars">
            {"★".repeat(Math.round(roundedRating))} {roundedRating}
          </div>
        </div>
        <div
          className="review__content"
          style={{
            fontSize: "20px",
            pointerEvents: "none",
            color: "red",
            display: "flex",
            justifyContent: "center",
            marginTop: "50px",
            marginBottom: "50px",
          }}
        >
          정지된 리뷰입니다.
        </div>
        {reply && <OwnerComment reply={reply} />}
      </li>
    );
  }

  if (reviewReportState === 0) {
    // 리뷰가 로그인된 유저에 의해 신고된 경우
    return (
      <li className="review">
        <div className="review__header">
          <div className="review__user-info">
            <p className="user-info__id">{nickName}님</p>
            <p className="user-info__time">{createdAt}</p>
          </div>
          <div className="review__report">
            <div className="review__content" style={{ pointerEvents: "none" }}>
              이미신고된 리뷰입니다.
            </div>
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
            src={`${selectedImage}`}
            alt="Original"
            style={{ width: "500px", height: "100%" }}
          />
        </ModalforReview>
      </li>
    );
  }

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
          src={`${selectedImage}`}
          alt="Original"
          style={{ width: "500px", height: "100%" }}
        />
      </ModalforReview>

      <ReportModal
        isOpen={isReportModalOpen}
        onClose={closeReportModal}
        reviewPk={reviewPk}
        onSuccess={handleReportSuccess} // 신고 성공 시 호출할 함수 전달
      />

      {showLoginModal && <LoginModal onClose={closeLoginModal} />}
    </li>
  );
};

export default Review;

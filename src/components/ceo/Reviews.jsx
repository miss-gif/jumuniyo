import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import ModalForOk from "./ModalForOk";

const getCookie = name => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
};

const Reviews = () => {
  const [reviewItems, setReviewItems] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [replies, setReplies] = useState({});
  const [isEditing, setIsEditing] = useState({});
  const [filter, setFilter] = useState("all");
  const [reviewCount, setReviewCount] = useState(0);
  const [replyCount, setReplyCount] = useState(0);
  const [photoReviewCount, setPhotoReviewCount] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [error, setError] = useState(null);
  const [photoOnly, setPhotoOnly] = useState(false);
  const [modalMessage, setModalMessage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchReviews = async page => {
    const accessToken = getCookie("accessToken");
    if (!accessToken) {
      setIsLoggedIn(false);
      return;
    }

    try {
      const response = await axios.get(`/api/rev/list/${page}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = response.data;

      if (data.statusCode === 1 || data.statusCode === 2) {
        const updatedReviewItems = data.resultData.reviewList.map(item => {
          const reviewImgs =
            item.pics.length > 0 ? item.pics.map(pic => `/pic/${pic}`) : [];
          return {
            ...item,
            reviewImgs: reviewImgs,
            ceoReply: item.reply
              ? {
                  content: item.reply.commentContents,
                  writeTime: item.updatedAt,
                  reviewCommentPk: item.reply.reviewCommentPk,
                }
              : null,
            answer: item.reply ? "yes" : "no",
          };
        });

        setReviewItems(prevItems => [...prevItems, ...updatedReviewItems]);
        setFilteredReviews(prevItems => [...prevItems, ...updatedReviewItems]);
        setReviewCount(prevCount => prevCount + updatedReviewItems.length);
        setReplyCount(
          prevCount =>
            prevCount +
            updatedReviewItems.filter(item => item.answer === "yes").length,
        );
        setPhotoReviewCount(
          prevCount =>
            prevCount +
            updatedReviewItems.filter(item => item.reviewImgs.length > 0)
              .length,
        );

        const totalRating = updatedReviewItems.reduce(
          (sum, item) => sum + item.reviewRating,
          0,
        );
        const avgRating = (
          (totalRating + averageRating * reviewItems.length) /
          (reviewItems.length + updatedReviewItems.length)
        ).toFixed(1);
        setAverageRating(avgRating);

        setTotalPages(data.resultData.totalPage);
      }
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchReviews(currentPage);
  }, [currentPage]);

  useEffect(() => {
    let filtered;
    if (filter === "yes") {
      filtered = reviewItems.filter(item => item.answer === "yes");
    } else if (filter === "no") {
      filtered = reviewItems.filter(item => item.answer === "no");
    } else {
      filtered = reviewItems;
    }

    if (photoOnly) {
      filtered = filtered.filter(item => item.reviewImgs.length > 0);
    }

    setFilteredReviews(filtered);
  }, [filter, reviewItems, photoOnly]);

  const handleReplyChange = (reviewPk, event) => {
    const newReplies = { ...replies, [reviewPk]: event.target.value };
    setReplies(newReplies);
  };

  const handleReplySubmit = async (reviewPk, isEdit = false) => {
    const accessToken = getCookie("accessToken");
    const commentContent = replies[reviewPk];
    const payload = isEdit
      ? {
          review_comment_pk: reviewItems.find(
            item => item.reviewPk === reviewPk,
          ).ceoReply.reviewCommentPk,
          comment_content: commentContent,
        }
      : {
          review_pk: reviewPk,
          comment_content: commentContent,
        };

    try {
      const method = isEdit ? "put" : "post";
      const response = await axios({
        method: method,
        url: "/api/rev/owner/comment",
        data: payload,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.data.statusCode === 1 || response.data.statusCode === 2) {
        setModalMessage("답글이 성공적으로 저장되었습니다.");
        const updatedReviewItems = reviewItems.map(item =>
          item.reviewPk === reviewPk
            ? {
                ...item,
                ceoReply: {
                  content: commentContent,
                  writeTime: new Date().toISOString(),
                  reviewCommentPk: item.ceoReply
                    ? item.ceoReply.reviewCommentPk
                    : response.data.resultData,
                },
                answer: "yes",
              }
            : item,
        );
        setReviewItems(updatedReviewItems);
        setFilteredReviews(updatedReviewItems);
        setIsEditing({ ...isEditing, [reviewPk]: false });
        setReplyCount(
          updatedReviewItems.filter(item => item.answer === "yes").length,
        );

        setPhotoReviewCount(
          updatedReviewItems.filter(item => item.reviewImgs.length > 0).length,
        );

        const totalRating = updatedReviewItems.reduce(
          (sum, item) => sum + item.reviewRating,
          0,
        );
        const avgRating = (
          (totalRating + averageRating * reviewItems.length) /
          (reviewItems.length + updatedReviewItems.length)
        ).toFixed(1);
        setAverageRating(avgRating);
      } else {
        setModalMessage("답글 저장에 실패했습니다.");
      }
    } catch (error) {
      setModalMessage("답글 저장 중 오류가 발생했습니다.");
    }
  };

  const handleReplyDelete = async reviewCommentPk => {
    const accessToken = getCookie("accessToken");

    try {
      const response = await axios.delete(
        `/api/rev/owner/comment/${reviewCommentPk}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (response.data.statusCode === 1 || response.data.statusCode === 2) {
        setModalMessage("답글이 성공적으로 삭제되었습니다.");
        const updatedReviewItems = reviewItems.map(item =>
          item.ceoReply && item.ceoReply.reviewCommentPk === reviewCommentPk
            ? {
                ...item,
                ceoReply: null,
                answer: "no",
              }
            : item,
        );

        const updatedReplies = { ...replies };
        const reviewPk = reviewItems.find(
          item =>
            item.ceoReply && item.ceoReply.reviewCommentPk === reviewCommentPk,
        ).reviewPk;
        delete updatedReplies[reviewPk];

        setReplies(updatedReplies);
        setReviewItems(updatedReviewItems);
        setFilteredReviews(updatedReviewItems);
        setReplyCount(
          updatedReviewItems.filter(item => item.answer === "yes").length,
        );

        setPhotoReviewCount(
          updatedReviewItems.filter(item => item.reviewImgs.length > 0).length,
        );

        const totalRating = updatedReviewItems.reduce(
          (sum, item) => sum + item.reviewRating,
          0,
        );
        const avgRating = (
          (totalRating + averageRating * reviewItems.length) /
          (reviewItems.length + updatedReviewItems.length)
        ).toFixed(1);
        setAverageRating(avgRating);
      } else {
        setModalMessage("답글 삭제에 실패했습니다.");
      }
    } catch (error) {
      setModalMessage("답글 삭제 중 오류가 발생했습니다.");
    }
  };

  const enableEdit = reviewPk => {
    setIsEditing({ ...isEditing, [reviewPk]: true });
    setReplies(prevReplies => ({
      ...prevReplies,
      [reviewPk]: reviewItems.find(item => item.reviewPk === reviewPk).ceoReply
        .content,
    }));
  };

  const renderStars = rating => {
    if (!rating || rating <= 0) {
      return <span className="star">☆☆☆☆☆</span>;
    }

    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return (
      <>
        {Array(fullStars)
          .fill()
          .map((_, index) => (
            <span key={index} className="star">
              ★
            </span>
          ))}
        {halfStar === 1 && <span className="star">☆</span>}
        {Array(emptyStars)
          .fill()
          .map((_, index) => (
            <span key={index + fullStars + halfStar} className="star">
              ☆
            </span>
          ))}
      </>
    );
  };

  const closeModal = () => {
    setModalMessage(null);
  };

  if (!isLoggedIn || error) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="ceo-review-content">
      <div className="ceo-review-wrap">
        <h2 className="review-tap">리뷰관리</h2>
        <div className="review-body">
          <div className="review-section">
            <div className="filter-buttons">
              <button
                className={`btn ${filter === "all" ? "active" : ""}`}
                onClick={() => setFilter("all")}
              >
                전체
              </button>
              <button
                className={`btn ${filter === "yes" ? "active" : ""}`}
                onClick={() => setFilter("yes")}
              >
                답변 있음
              </button>
              <button
                className={`btn ${filter === "no" ? "active" : ""}`}
                onClick={() => setFilter("no")}
              >
                미답변
              </button>
            </div>
          </div>
          <div className="review-content">
            <div className="rating-section">
              <div className="overall-score">
                <p className="overall-score__value">{averageRating}</p>
                <span className="overall-score__icon">
                  {renderStars(averageRating)}
                </span>
              </div>
            </div>
            <div className="review-list__filter">
              <div className="filter__text">
                <p>
                  리뷰 <span>{reviewCount}</span>개
                </p>
                <p>
                  사장님댓글 <span>{replyCount}</span> 개
                </p>
                <p>
                  사진리뷰 <span>{photoReviewCount}</span> 개
                </p>
              </div>
              <p
                className="filter__photo-reviews"
                onClick={() => setPhotoOnly(!photoOnly)}
              >
                사진리뷰만
              </p>
            </div>

            <div className="reviews">
              <div className="reviews-wrap">
                {filteredReviews.map((item, index) => (
                  <div key={index} className="review">
                    <div className="review-header">
                      <span className="review-user">{item.nickName}</span>
                      <span className="review-date">{item.createdAt}</span>
                      <span className="review-rating">
                        {renderStars(item.reviewRating)} {item.reviewRating}
                      </span>
                    </div>
                    <div className="review-content-image">
                      <p>{item.reviewContents}</p>
                      {item.reviewImgs.map((img, idx) => (
                        <img key={idx} src={img} alt={`Review ${idx + 1}`} />
                      ))}
                    </div>
                    {item.ceoReply ? (
                      <div className="ceo-reply">
                        <div className="ceo-reply-header">
                          <span className="ceo-reply-time">
                            {item.ceoReply.writeTime}
                          </span>
                        </div>
                        <textarea
                          className="textarea-custom"
                          value={
                            isEditing[item.reviewPk]
                              ? replies[item.reviewPk]
                              : item.ceoReply.content
                          }
                          onChange={event =>
                            handleReplyChange(item.reviewPk, event)
                          }
                          readOnly={!isEditing[item.reviewPk]}
                        />
                        {isEditing[item.reviewPk] ? (
                          <>
                            <button
                              className="btn"
                              onClick={() =>
                                handleReplySubmit(item.reviewPk, true)
                              }
                            >
                              저장
                            </button>
                            <button
                              className="btn"
                              onClick={() =>
                                handleReplyDelete(item.ceoReply.reviewCommentPk)
                              }
                            >
                              삭제
                            </button>
                          </>
                        ) : (
                          <button
                            className="btn"
                            onClick={() => enableEdit(item.reviewPk)}
                          >
                            수정
                          </button>
                        )}
                      </div>
                    ) : (
                      <div className="reply-section">
                        <textarea
                          className="textarea-custom"
                          value={replies[item.reviewPk] || ""}
                          onChange={event =>
                            handleReplyChange(item.reviewPk, event)
                          }
                          placeholder="답글을 입력하세요"
                        />
                        <button
                          className="btn"
                          onClick={() => handleReplySubmit(item.reviewPk)}
                        >
                          답글 달기
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {currentPage < totalPages && (
                <button
                  className="btn load-more"
                  onClick={() => setCurrentPage(prevPage => prevPage + 1)}
                >
                  더 보기
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {modalMessage && (
        <ModalForOk message={modalMessage} onClose={closeModal} />
      )}
    </div>
  );
};

export default Reviews;

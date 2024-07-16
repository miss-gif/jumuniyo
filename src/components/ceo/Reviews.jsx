import React, { useEffect, useState } from "react";
import reviewItemsData from "../restaurantdetail/review.json";
import ceoReviewData from "../restaurantdetail/ceoReview.json";
import testMenu from "../restaurantdetail/testMenu.jpg";

// const storeReviewNumber = [
//   {
//     reviews: 100,
//   },
// ];

const Reviews = () => {
  const [reviewItems, setReviewItems] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [replies, setReplies] = useState({});
  const [isEditing, setIsEditing] = useState({});
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const updatedReviewItems = reviewItemsData.map(item => {
      const ceoReply = ceoReviewData.find(
        reply => reply.reviewId === item.reviewId,
      );
      return {
        ...item,
        reviewImg: testMenu,
        ceoReply: ceoReply,
        answer: ceoReply ? "yes" : "no",
      };
    });
    setReviewItems(updatedReviewItems);
    setFilteredReviews(updatedReviewItems);
  }, []);

  useEffect(() => {
    let filtered;
    if (filter === "yes") {
      filtered = reviewItems.filter(item => item.answer === "yes");
    } else if (filter === "no") {
      filtered = reviewItems.filter(item => item.answer === "no");
    } else {
      filtered = reviewItems;
    }
    setFilteredReviews(filtered);
  }, [filter, reviewItems]);

  const handleReplyChange = (reviewId, event) => {
    const newReplies = { ...replies, [reviewId]: event.target.value };
    setReplies(newReplies);
  };

  const handleReplySubmit = reviewId => {
    alert(`리뷰id: ${reviewId} 답글id: ${replies[reviewId]}`);
    setIsEditing({ ...isEditing, [reviewId]: false });
  };

  const enableEdit = reviewId => {
    setIsEditing({ ...isEditing, [reviewId]: true });
  };

  return (
    <div className="ceo-review-content">
      <div className="ceo-review-wrap">
        <h2 className="review-tap">리뷰관리</h2>
        <div className="review-body">
          <div className="review-taps">리뷰</div>
          <div className="review-content">
            <div className="rating-section">
              <div className="overall-score">
                <p className="overall-score__value">4.8</p>
                <span className="overall-score__icon">★★★★★</span>
              </div>
            </div>
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
            <div className="review-section">
              <div className="filter-buttons">
                <button className="btn" onClick={() => setFilter("all")}>
                  전체
                </button>
                <button className="btn" onClick={() => setFilter("yes")}>
                  답변 있음
                </button>
                <button className="btn" onClick={() => setFilter("no")}>
                  미답변
                </button>
              </div>
            </div>
            <div className="reviews">
              <div className="reviews-wrap">
                {filteredReviews.map((item, index) => (
                  <div key={index} className="review">
                    <div className="review-header">
                      <span className="review-user">{item.userId}</span>
                      <span className="review-date">{item.writeTime}</span>
                      <span className="review-rating">{item.score}</span>
                    </div>
                    <div className="review-content-image">
                      <p>{item.content}</p>

                      <img src={item.reviewImg} alt="Review" />
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
                            replies[item.reviewId] || item.ceoReply.content
                          }
                          onChange={event =>
                            handleReplyChange(item.reviewId, event)
                          }
                          readOnly={!isEditing[item.reviewId]} // 읽기 전용 모드
                        />
                        {isEditing[item.reviewId] ? (
                          <>
                            <button
                              className="btn"
                              onClick={() => handleReplySubmit(item.reviewId)}
                            >
                              저장
                            </button>
                            {/* <button
                            className="btn"
                            onClick={() => handleReplyDelete(item.reviewId)}
                          >
                            삭제
                          </button> */}
                          </>
                        ) : (
                          <button
                            className="btn"
                            onClick={() => enableEdit(item.reviewId)}
                          >
                            수정
                          </button>
                        )}
                      </div>
                    ) : (
                      <div className="reply-section">
                        <textarea
                          className="textarea-custom"
                          value={replies[item.reviewId] || ""}
                          onChange={event =>
                            handleReplyChange(item.reviewId, event)
                          }
                          placeholder="답글을 입력하세요"
                        />
                        <button
                          className="btn"
                          onClick={() => handleReplySubmit(item.reviewId)}
                        >
                          답글 달기
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;

import { useEffect, useState } from "react";
import reviewItemsData from "../components/restaurantdetail/review.json";

const MyPageReviewPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [reviewItems, setReviewItems] = useState([]);

  useEffect(() => {
    const updatedReviewItems = reviewItemsData.map(item => ({
      ...item,
    }));
    setReviewItems(updatedReviewItems);
  }, []);

  console.log(reviewItems);
  return (
    <div className="mypage-review-wrap">
      <div className="reviews">
        {reviewItems.map((item, index) => (
          <div key={index} className="review">
            <div className="review-header">
              <span className="review-user">{item.userId}</span>
              <span className="review-date">{item.writeTime}</span>
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
  );
};

export default MyPageReviewPage;

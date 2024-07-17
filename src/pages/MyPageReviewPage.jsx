import { useEffect, useState } from "react";
import Mypage from "../components/join/Mypage";
import reviewItemsData from "../components/restaurantdetail/review.json";
import jwtAxios from "../api/user/jwtUtil";

const MyPageReviewPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [reviewItems, setReviewItems] = useState([]);
  const [reviewList, setReviewList] = useState([]);

  const getReview = async () => {
    try {
      const res = await jwtAxios.get("/api/rev/list");
      setReviewList(res.data.resultData);
      console.log(res.data.resultData);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(reviewItemsData);
  // const updatedReviewItems = async () => {
  //   const result = await getReview();
  //   const aaa = result.map(item => ({
  //     ...item,
  //     reviewList,
  //   }));
  //   console.log(aaa);
  // };
  // useEffect(() => {
  //   updatedReviewItems();
  //   setReviewItems(updatedReviewItems);
  // }, []);

  return (
    <div className="mypage-wrap">
      <Mypage />

      <div className="mypage-review-wrap">
        <div className="reviews">
          {reviewItems.map((item, index) => (
            <div key={index} className="review">
              <div className="review-header">
                <span className="review-user">{item.userId}</span>
                <span className="review-date">{item.createdAt}</span>
                <span className="review-rating">{item.score}</span>
              </div>
              <div className="review-content">
                <img src={item.reviewImg} alt="Review" />
                <p>{item.reviewContents}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyPageReviewPage;

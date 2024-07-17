import { useEffect, useState } from "react";
import Mypage from "../components/join/Mypage";
import reviewItemsData from "../components/restaurantdetail/review.json";
import jwtAxios from "../api/user/jwtUtil";
import { Rating } from "@mui/material";

const MyPageReviewPage = () => {
  const [reviewItems, setReviewItems] = useState([]);
  const [reviewList, setReviewList] = useState([]);
  const [imgUrl, setImgUrl] = useState([]);

  const getReview = async () => {
    try {
      const res = await jwtAxios.get("/api/rev/list");
      setReviewList(res.data.resultData);
      return res.data.resultData;
    } catch (error) {
      console.log(error);
    }
  };

  const updatedReviewItems = async () => {
    const reviewList = await getReview();
    const aaa = reviewList.map(item => ({
      ...item,
    }));
    console.log(aaa);
    return aaa;
  };

  useEffect(() => {
    updatedReviewItems().then(setReviewItems);
  }, []);

  return (
    <div className="mypage-wrap">
      <Mypage />

      <div className="mypage-review-wrap">
        <div className="reviews">
          {reviewItems.map((item, index) => (
            <div key={index} className="review">
              <div className="review-header">
                <span className="review-user">{item.resName}</span>
                <span className="review-date">
                  {item.createdAt.split(" ")[0]}
                </span>
                <Rating name="read-only" value={item.reviewRating} readOnly />
              </div>
              <div className="review-content-mypage">
                <div>
                  {item.pics.map((pic, picIndex) => (
                    <img
                      className="img-size"
                      key={picIndex}
                      src={`https://34.64.63.109/pic/${pic}`}
                      alt={`Review ${picIndex}`}
                    />
                  ))}
                </div>
                <div className="review-font">
                  <div className="review-font-box">
                    <h2>고객 리뷰</h2>
                    <p>{item.reviewContents}</p>
                  </div>
                  {item.reply && item.reply.commentContents ? (
                    <div className="review-font-box">
                      <h2>사장님 답변</h2>
                      <p>{item.reply.commentContents}</p>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyPageReviewPage;

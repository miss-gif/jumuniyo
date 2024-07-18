import { Alert, Rating } from "@mui/material";
import { useEffect, useState } from "react";
import jwtAxios from "../api/user/jwtUtil";
import Mypage from "../components/join/Mypage";
import { getCookie } from "../utils/cookie";
import NotLogin from "../components/common/mypage/NotLogin";

const MyPageReviewPage = () => {
  const [reviewItems, setReviewItems] = useState([]);
  const [isLogin, setIsLogin] = useState(false);

  const getReview = async () => {
    try {
      const res = await jwtAxios.get("/api/rev/list");
      return res.data.resultData;
    } catch (error) {
      console.log(error);
      return []; // 오류 발생 시 빈 배열 반환
    }
  };

  const updatedReviewItems = async () => {
    const reviewList = await getReview();
    if (!reviewList) return [];
    const aaa = reviewList.map(item => ({
      ...item,
    }));
    console.log(aaa);
    return aaa;
  };

  useEffect(() => {
    const isLogin = getCookie("accessToken");
    if (!isLogin) {
      setIsLogin(false);
      return;
    } else {
      setIsLogin(true);
    }
    updatedReviewItems().then(setReviewItems);
  }, []);

  return (
    <div className="mypage-wrap">
      <Mypage />
      {!isLogin ? (
        <NotLogin />
      ) : reviewItems.length === 0 ? (
        <div className="null-item">
          <Alert variant="outlined" severity="info">
            주문내역이 없습니다.
          </Alert>
        </div>
      ) : (
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
                  <div className="review-font">
                    <div className="review-font-box">
                      <h2>고객 리뷰</h2>
                      <p>{item.reviewContents}</p>
                    </div>
                    {item.reply && item.reply.commentContents ? (
                      <>
                        <div className="review-font-box">
                          <h2>사장님 답변</h2>
                          <p>{item.reply.commentContents}</p>
                        </div>
                        {item.pics.length ? (
                          <div className="review-imgs-box">
                            {item.pics.map((pic, picIndex) => (
                              <div key={picIndex} className="review-img-box">
                                <img
                                  className="img-size"
                                  src={`https://34.64.63.109/pic/${pic}`}
                                  alt={`Review ${picIndex}`}
                                />
                              </div>
                            ))}
                          </div>
                        ) : null}
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPageReviewPage;

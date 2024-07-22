import { Alert, Rating } from "@mui/material";
import { useEffect, useState } from "react";
import jwtAxios from "../api/user/jwtUtil";
import Mypage from "../components/join/Mypage";
import { getCookie } from "../utils/cookie";
import NotLogin from "../components/common/mypage/NotLogin";
import LoadingSpinner from "../components/common/LoadingSpinner";

const MyPageReviewPage = () => {
  const [reviewItems, setReviewItems] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getReview = async () => {
    setIsLoading(true);
    try {
      const res = await jwtAxios.get("/api/rev/list");
      return res.data.resultData;
    } catch (error) {
      alert("서버에러입니다.");
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const updatedReviewItems = async () => {
    const reviewList = await getReview();
    if (!reviewList) return [];
    const aaa = reviewList.map(item => ({
      ...item,
    }));
    return aaa;
  };

  useEffect(() => {
    const accessToken = getCookie("accessToken");
    if (!accessToken) {
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
      ) : isLoading ? (
        <LoadingSpinner />
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
                      </>
                    ) : null}
                    {item.pics.length ? (
                      <div className="review-imgs-box">
                        {item.pics.map((pic, picIndex) => (
                          <div key={picIndex} className="review-img-box">
                            <img
                              className="img-size"
                              src={`/pic/${pic}`}
                              alt={`Review ${picIndex}`}
                            />
                          </div>
                        ))}
                      </div>
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

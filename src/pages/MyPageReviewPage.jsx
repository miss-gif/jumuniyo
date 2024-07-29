import { Alert, Rating } from "@mui/material";
import { useEffect, useState } from "react";
import jwtAxios from "../api/user/jwtUtil";
import Mypage from "../components/join/Mypage";
import { getCookie } from "../utils/cookie";
import NotLogin from "../components/common/mypage/NotLogin";
import LoadingSpinner from "../components/common/LoadingSpinner";
import Swal from "sweetalert2";

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

  const editReview = e => {
    console.log(e);
  };

  const deleteReview = async reviewPk => {
    Swal.fire({
      title: "정말 삭제?",
      text: "되돌릴수 없다는걸 알아두세요 복구 못합니다.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "네 삭제할래요",
      cancelButtonText: "아니요",
    }).then(async result => {
      if (result.isConfirmed) {
        try {
          const res = await jwtAxios.delete(`/api/rev/${reviewPk}`);
          if (res.data.statusCode === 1) {
            Swal.fire({
              icon: "success",
              text: res.data.resultMsg,
            });
            const updatedItems = await updatedReviewItems();
            setReviewItems(updatedItems);
            return;
          }
        } catch (error) {
          console.error("서버 에러:", error);
          Swal.fire({
            title: "서버 에러",
            text: "서버에러입니다.",
            icon: "error",
          });
          return;
        }
        Swal.fire({
          title: "삭제완료",
          text: "해당 주소는 삭제되었습니다.",
          icon: "success",
        });
      }
    });
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
            리뷰내역이 없습니다.
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
                    <div className="mypage-button-box">
                      <button
                        className="btn"
                        onClick={e => {
                          editReview(item.reviewPk);
                        }}
                      >
                        수정
                      </button>
                      <button
                        className="btn"
                        onClick={e => {
                          deleteReview(item.reviewPk);
                        }}
                      >
                        삭제
                      </button>
                    </div>
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

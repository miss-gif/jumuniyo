import { Alert, Rating } from "@mui/material";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import jwtAxios from "../api/user/jwtUtil";
import LoadingSpinner from "../components/common/LoadingSpinner";
import NotLogin from "../components/common/mypage/NotLogin";
import Mypage from "../components/join/Mypage";
import { getCookie } from "../utils/cookie";
import MypageReviewWrite from "../components/common/mypage/MypageReviewWrite";

const MyPageReviewPage = () => {
  const [reviewItems, setReviewItems] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [selectedOrderPk, setSelectedOrderPk] = useState("");

  const getReview = async () => {
    setIsLoading(true);
    try {
      const res = await jwtAxios.get(`/api/rev/list/1`);
      return res.data.resultData;
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: "서버에러입니다.",
      });
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const updatedReviewItems = async () => {
    const reviewList = await getReview();
    if (!reviewList) return [];
    const aaa = reviewList.reviewList.map(item => ({
      ...item,
    }));
    return aaa;
  };

  const editReview = e => {
    setReviewOpen(true);
  };

  const reviewNo = () => {
    setReviewOpen(false);
    setSelectedOrderPk(null);
  };

  const deleteReview = async reviewPk => {
    try {
      const result = await Swal.fire({
        title: "정말 삭제?",
        text: "되돌릴 수 없다는 걸 알아두세요. 복구 못합니다.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "네 삭제할래요",
        cancelButtonText: "아니요",
      });

      if (result.isConfirmed) {
        try {
          const res = await jwtAxios.delete(`/api/rev/${reviewPk}`);
          if (res.data.statusCode === 1) {
            await Swal.fire({
              icon: "success",
              text: res.data.resultMsg,
            });
            const updatedItems = await updatedReviewItems();
            setReviewItems(updatedItems);
          } else {
            // 추가적인 오류 처리
            await Swal.fire({
              title: "삭제 실패",
              text: res.data.resultMsg,
              icon: "error",
            });
          }
        } catch (error) {
          console.error("서버 에러:", error);
          await Swal.fire({
            title: "서버 에러",
            text: "서버에러입니다.",
            icon: "error",
          });
        }
      }
    } catch (error) {
      console.error("Swal 에러:", error);
    }
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
                    {reviewOpen && (
                      <MypageReviewWrite
                        getOrderList={() => getReview("/api/rev/list/1")}
                        doneOrderPk={item.doneOrderPk}
                        setReviewOpen={setReviewOpen}
                        reviewNo={reviewNo}
                        setSelectedOrderPk={setSelectedOrderPk}
                      />
                    )}
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

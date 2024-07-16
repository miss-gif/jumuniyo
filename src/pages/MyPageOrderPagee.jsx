import { useEffect, useState } from "react";
import MyPageOrderList from "../components/common/MyPageOrderList";
import Mypage from "../components/join/Mypage";
import MypageReviewWrite from "../components/common/mypage/MypageReviewWrite";
import jwtAxios from "../api/user/jwtUtil";

const MyPageOrderPagee = () => {
  const [reviewOpen, setReviewOpen] = useState(false);
  const [orders, setOrders] = useState([]);

  const reviewOpenModal = () => {
    setReviewOpen(true);
  };

  const reviewYes = () => {
    setReviewOpen(false);
  };

  const reviewNo = () => {
    setReviewOpen(false);
  };

  const getOrderList = async () => {
    try {
      const res = await jwtAxios.get("/api/done/user/list");
      if (res.data.statusCode !== -7) {
        setOrders(res.data.resultData);
      } else {
        setOrders(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrderList();
  }, []);

  return (
    <div className="mypage-wrap">
      <Mypage />
      <div className="mypage-box">
        {orders ? (
          <>
            <MyPageOrderList
              reviewOpenModal={reviewOpenModal}
              orders={orders}
              reviewOpen={reviewOpen}
              reviewYes={reviewYes}
              reviewNo={reviewNo}
            />
            {reviewOpen ? (
              <MypageReviewWrite reviewYes={reviewYes} reviewNo={reviewNo} />
            ) : null}
          </>
        ) : (
          <div className="order-list">주문 내역이 없습니다</div>
        )}
      </div>
    </div>
  );
};

export default MyPageOrderPagee;

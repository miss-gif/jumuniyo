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
        console.log("데이터가 없습니다.");
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
        <MyPageOrderList reviewOpenModal={reviewOpenModal} orders={orders} />
        {reviewOpen ? (
          <MypageReviewWrite reviewYes={reviewYes} reviewNo={reviewNo} />
        ) : null}
      </div>
    </div>
  );
};

export default MyPageOrderPagee;

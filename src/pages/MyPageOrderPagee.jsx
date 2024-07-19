import { useEffect, useState } from "react";
import jwtAxios from "../api/user/jwtUtil";
import MypageReviewWrite from "../components/common/mypage/MypageReviewWrite";
import MyPageOrderList from "../components/common/MyPageOrderList";
import Mypage from "../components/join/Mypage";
import { getCookie } from "../utils/cookie";
import NotLogin from "../components/common/mypage/NotLogin";
import { Alert } from "@mui/material";
import LoadingSpinner from "../components/common/LoadingSpinner";

const MyPageOrderPagee = () => {
  const [reviewOpen, setReviewOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [selectedOrderPk, setSelectedOrderPk] = useState(null);
  const [doneOrderPk, setDoneOrderPk] = useState("");
  const [resPk, setResPk] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isOlderThanThreeDays = date => {
    const orderDate = new Date(date);
    const currentDate = new Date();
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(currentDate.getDate() - 3);
    return orderDate < threeDaysAgo;
  };

  const reviewOpenModal = (doneOrderPk, resPk) => {
    setReviewOpen(true);
    setSelectedOrderPk(doneOrderPk);
    setDoneOrderPk(doneOrderPk);
    setResPk(resPk);
  };

  const reviewNo = () => {
    setReviewOpen(false);
    setSelectedOrderPk(null);
  };

  const getOrderList = async () => {
    setIsLoading(true);
    try {
      const res = await jwtAxios.get("/api/done/user/list");
      if (res.data.statusCode !== -7) {
        setOrders(res.data.resultData.contents);
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.log(error);
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const accessToken = getCookie("accessToken");
    if (!accessToken) {
      setIsLogin(false);
      setIsLoading(false);
      return;
    } else {
      setIsLogin(true);
      getOrderList();
    }
  }, []);

  if (!isLogin) {
    return (
      <div className="mypage-wrap">
        <Mypage />
        <NotLogin />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="mypage-wrap">
        <Mypage />
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="mypage-wrap">
      <Mypage />
      {orders.length > 0 ? (
        <div className="mypage-box">
          {orders.map(order => {
            const isOldOrder = isOlderThanThreeDays(order.createdAt);
            return (
              <div key={order.doneOrderPk}>
                <MyPageOrderList
                  isOldOrder={isOldOrder}
                  order={order}
                  reviewOpenModal={reviewOpenModal}
                />
                {reviewOpen && selectedOrderPk === order.doneOrderPk && (
                  <MypageReviewWrite
                    doneOrderPk={order.doneOrderPk}
                    setReviewOpen={setReviewOpen}
                    reviewNo={reviewNo}
                    resPk={resPk}
                    setSelectedOrderPk={setSelectedOrderPk}
                  />
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="null-item">
          <Alert variant="outlined" severity="info">
            주문내역이 없습니다.
          </Alert>
        </div>
      )}
    </div>
  );
};

export default MyPageOrderPagee;

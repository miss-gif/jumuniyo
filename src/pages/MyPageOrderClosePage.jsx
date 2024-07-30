import { Alert } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwtAxios from "../api/user/jwtUtil";
import LoadingSpinner from "../components/common/LoadingSpinner";
import MyPageOrderList from "../components/common/MyPageOrderList";
import MypageReviewWrite from "../components/common/mypage/MypageReviewWrite";
import NotLogin from "../components/common/mypage/NotLogin";
import Mypage from "../components/join/Mypage";
import OrderListHeader from "../components/user/mypage/OrderListHeader";
import { getCookie } from "../utils/cookie";

const MyPageOrderClosePage = () => {
  const [reviewOpen, setReviewOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [selectedOrderPk, setSelectedOrderPk] = useState(null);
  const [resPk, setResPk] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const isOlderThanThreeDays = date => {
    const orderDate = new Date(date);
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
    return orderDate < threeDaysAgo;
  };

  const reviewOpenModal = (doneOrderPk, resPk) => {
    setReviewOpen(true);
    setSelectedOrderPk(doneOrderPk);
    setResPk(resPk);
  };

  const reviewNo = () => {
    setReviewOpen(false);
    setSelectedOrderPk(null);
  };

  const fetchOrders = async url => {
    setIsLoading(true);
    try {
      const res = await jwtAxios.get(url);
      setOrders(res.data.resultData.contents || res.data.resultData || []);
    } catch (error) {
      console.error("주문 목록을 가져오는 중 오류 발생:", error);
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
    } else {
      setIsLogin(true);
      fetchOrders("/api/done/user/list");
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
      <div className="mypage-box">
        <OrderListHeader />
        {orders.length > 0 ? (
          orders.map(order => {
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
                    getOrderList={() => fetchOrders("/api/done/user/list")}
                    doneOrderPk={order.doneOrderPk}
                    setReviewOpen={setReviewOpen}
                    reviewNo={reviewNo}
                    resPk={resPk}
                    setSelectedOrderPk={setSelectedOrderPk}
                  />
                )}
              </div>
            );
          })
        ) : (
          <div className="null-item">
            <Alert variant="outlined" severity="info">
              주문내역이 없습니다.
            </Alert>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPageOrderClosePage;

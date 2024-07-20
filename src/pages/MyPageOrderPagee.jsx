import { useEffect, useState } from "react";
import jwtAxios from "../api/user/jwtUtil";
import MypageReviewWrite from "../components/common/mypage/MypageReviewWrite";
import MyPageOrderList from "../components/common/MyPageOrderList";
import Mypage from "../components/join/Mypage";
import { getCookie } from "../utils/cookie";
import NotLogin from "../components/common/mypage/NotLogin";
import { Alert } from "@mui/material";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import OrderListHeader from "../components/user/mypage/OrderListHeader";

const MyPageOrderPagee = () => {
  const [reviewOpen, setReviewOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [selectedOrderPk, setSelectedOrderPk] = useState(null);
  const [doneOrderPk, setDoneOrderPk] = useState("");
  const [resPk, setResPk] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [orderNow, setOrderNow] = useState(null);
  const navgate = useNavigate();

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

  const getOrderNow = async () => {
    try {
      const res = await jwtAxios.get("/api/order/user/list");
      setOrderNow(res.data.resultData);
    } catch (error) {
      console.log(error);
    }
  };

  const orderCancel = async orderPk => {
    try {
      const res = await jwtAxios.put(`/api/order/cancel/list/${orderPk}`);
      getOrderNow();
      getOrderList();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrderNow();
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
  const orderDetails = doneOrderPk => {
    navgate(`../../mypage/order/${doneOrderPk}`);
  };

  return (
    <div className="mypage-wrap">
      <Mypage />
      {orders.length > 0 || orderNow ? (
        <div className="mypage-box">
          <OrderListHeader />
          {orderNow && orderNow.length > 0 ? (
            <div className="order-list-gap">
              {orderNow.map(order => (
                <div key={order.doneOrderPk}>
                  <div className="order-list">
                    <div className="order-date">
                      <div>
                        {new Date(order.createdAt).toLocaleDateString("ko-KR")}{" "}
                        - {order.orderState === 1 ? "주문 중" : "조리 중"}
                      </div>
                      <div
                        className="order-detail-text"
                        onClick={() => {
                          orderDetails(order.orderPk);
                        }}
                      >
                        주문상세
                      </div>
                    </div>
                    <div className="order-main">
                      {!order.resPic ? (
                        <img
                          src={`https://34.64.63.109/pic/default.png`}
                          className="order-logo"
                          alt="Order Logo"
                        />
                      ) : (
                        <img
                          src={`https://34.64.63.109/pic${order.resPic}`}
                          className="order-logo"
                          alt="Order Logo"
                        />
                      )}

                      <div className="order-detail-box">
                        <div>
                          <div>{order.resName}</div>
                          <div className="order-date">
                            {order.menuName[0]} 외 {order.menuName.length - 1}개{" "}
                            {order.orderPrice.toLocaleString("ko-KR")}원
                          </div>
                        </div>

                        {order.orderState === 1 ? (
                          <button
                            className="btn"
                            onClick={() => {
                              orderCancel(order.orderPk);
                            }}
                          >
                            취소하기
                          </button>
                        ) : (
                          "조리중 입니다.."
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
          <div>완료된 리스트</div>
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
                    getOrderList={getOrderList}
                    getOrderNow={getOrderNow}
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

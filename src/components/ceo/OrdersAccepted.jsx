import React, { useEffect, useState } from "react";
import axios from "axios";

const getCookie = name => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null; // 토큰이 없을 경우 null 반환
};

const fetchOrders = async () => {
  const accessToken = getCookie("accessToken");
  console.log("토큰 값: ", accessToken);
  const response = await fetch("/api/order/owner/confirm/list", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-type": "application/json",
    },
  });
  const data = await response.json();
  console.log(data);
  if (!response.ok) {
    throw new Error(data.resultMsg || "network response not ok");
  }
  return data;
};

const completeOrder = async orderPk => {
  const accessToken = getCookie("accessToken");
  const response = await axios.put(
    `/api/order/owner/done/${orderPk}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    },
  );

  return response.data;
};

const cancelOrder = async orderPk => {
  const accessToken = getCookie("accessToken");
  const response = await axios.put(
    `/api/order/cancel/list/${orderPk}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    },
  );

  return response.data;
};

const OrdersAccepted = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null); // 새로운 상태 추가

  const loadOrders = async () => {
    try {
      const data = await fetchOrders();
      if (data.statusCode === -7) {
        setOrders([]);
      } else {
        setOrders(Array.isArray(data.resultData) ? data.resultData : " []");
        console.log("데이터 결과 메세지:", data.resultMsg);
      }
    } catch (error) {
      setError(error);
    }
  };

  const handleCompleteOrder = async orderPk => {
    try {
      await completeOrder(orderPk);
      loadOrders(); // 주문 상태가 변경되면 주문 목록을 다시 로드
    } catch (error) {
      setError(error);
    }
  };

  const handleCancelOrder = async orderPk => {
    try {
      await cancelOrder(orderPk);
      loadOrders(); // 주문 상태가 변경되면 주문 목록을 다시 로드
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  if (error) {
    return <p>에러임 {error.message}</p>;
  }

  return (
    <div className="ceo-home-accepted">
      <div className="left">
        <h3>접수된 주문</h3>
        <div className="waiting-orders">
          {error ? (
            <div className="errorMessage">{error}</div>
          ) : orders.length === 0 ? (
            <div className="noOrdersMessage">주문이 없습니다.</div>
          ) : (
            orders.map(order => (
              <div
                key={order.orderPk}
                className="one-order"
                onClick={() => setSelectedOrder(order)}
              >
                <div className="one-order-left">
                  <div className="order-number">접수 No. {order.orderPk}</div>
                  <div className="order-menus-number">
                    메뉴 {order.menuName.length}개
                  </div>
                </div>
                <div className="one-order-right">
                  <div className="order-time">
                    {new Date(order.createdAt).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {selectedOrder && (
        <div className="order-body">
          <div className="orderedList">
            <div className="oneOrder" key={selectedOrder.orderPk}>
              <div className="AnOrderHead">주문 상세 정보</div>
              <div className="AnOrderBody">
                <div className="AnOrderLeft">
                  <div className="requested">
                    <h3>요청사항</h3>
                    <div className="requestedabout">
                      <div className="requestedto">
                        <h4>가게</h4>
                        <h4>배달</h4>
                      </div>
                      <div className="requestedof">
                        <p>맛있게 해주세요</p>
                        <p>빨리 와주세요</p>
                      </div>
                    </div>
                  </div>
                  <div className="orderedMenu">
                    <h3>주문내역</h3>
                    {selectedOrder.menuName.map((menu, index) => (
                      <div className="orderedMenuInf" key={index}>
                        <div className="menuName">{menu}</div>
                        <div className="menuAmount">1</div>
                        <div className="menuPrice">3,000</div>
                      </div>
                    ))}
                    <div className="allOrderedMenuInf">
                      <div className="title">총주문</div>
                      <div className="allMenuAmount">1</div>
                      <div className="allMenuPrice">3,000</div>
                    </div>
                  </div>
                </div>
                <div className="AnOrderRight">
                  <div className="AnOrderInf">
                    <div className="orderAddress">
                      <h3>배달주소</h3>
                      <p>경기도 화성시 이성로 대명아파트 102동 906호</p>
                    </div>
                    <div className="orderCallNumber">
                      <h3>주문번호</h3>
                      <p>{selectedOrder.orderPk}</p>
                    </div>
                    <div className="orderCallNumber">
                      <h3>주문시간</h3>
                      <p>13:54</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="acceptOrRefuse">
                <button
                  className="btn"
                  onClick={() => handleCompleteOrder(selectedOrder.orderPk)}
                >
                  완료하기
                </button>
                <button
                  className="btn"
                  onClick={() => handleCancelOrder(selectedOrder.orderPk)}
                >
                  취소하기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersAccepted;

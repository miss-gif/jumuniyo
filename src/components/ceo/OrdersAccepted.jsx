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

const OrdersAccepted = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      console.log(error);
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
              <div key={order.orderPk} className="one-order">
                <div className="one-order-left">
                  <div className="order-number">배달 No. {order.orderPk}</div>
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
      <div className="newOrders-accepted">
        <div className="confirmedList">
          <div className="confirmedList-tab">접수된 주문</div>
          {orders.map(order => (
            <div key={order.orderPk} className="oneOrder">
              <div className="orderedTime">
                {new Date(order.createdAt).toLocaleTimeString()}
              </div>
              <div className="orderInfo">
                <div className="orderAmount">
                  <div className="orderNumber">
                    [메뉴 {order.menuName.length}개]
                  </div>
                  <div className="orderPrice">
                    {order.orderPrice.toLocaleString()}원
                  </div>
                  <div className="payMethod">후불</div>
                </div>
                <div className="orderedMenu">
                  {order.menuName.map((menu, index) => (
                    <div key={index}>
                      <div className="menu-name">{menu}</div>
                      <div className="menu-amount">1개</div>
                    </div>
                  ))}
                </div>
                <div className="orderedAddress">
                  서울 송파구 방이동 44-2 장은빌딩 9층
                </div>
                <div className="requested">단무지 많이 주고 일회용품 ㄴㄴ</div>
              </div>
              <div className="orderStatus">
                <div className="orderLeftTime">12분</div>
                <div className="orderProcess">배달중</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersAccepted;

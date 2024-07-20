import React, { useEffect, useState } from "react";
import axios from "axios";
import ModalForOrdersAccepted from "./ModalForOrdersAccepted";
import { Navigate } from "react-router-dom";

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

const fetchOrderDetail = async orderPk => {
  const accessToken = getCookie("accessToken");
  const response = await axios.get(`/api/order/${orderPk}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

const OrdersAccepted = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderDetail, setOrderDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalAction, setModalAction] = useState(null);

  const [sortOrder, setSortOrder] = useState("latest");

  const loadOrders = async () => {
    try {
      const data = await fetchOrders();
      let sortedOrders = [];
      if (data.statusCode === -7) {
        sortedOrders = [];
      } else {
        sortedOrders = Array.isArray(data.resultData) ? data.resultData : [];
      }
      setOrders(sortOrders(sortedOrders, sortOrder));
      console.log("데이터 결과 메세지:", data.resultMsg);
    } catch (error) {
      setError(error);
    }
  };

  const loadOrderDetail = async orderPk => {
    try {
      const data = await fetchOrderDetail(orderPk);
      if (data.statusCode === 1) {
        setOrderDetail(data.resultData);
      } else {
        setOrderDetail(null);
      }
    } catch (error) {
      setError(error);
    }
  };

  const handleCompleteOrder = async orderPk => {
    setModalMessage("이 주문을 완료하시겠습니까?");
    setModalAction(() => async () => {
      try {
        await completeOrder(orderPk);
        loadOrders(); // 주문 상태가 변경되면 주문 목록을 다시 로드
        setShowModal(false);
        setSelectedOrder(null); // 주문 완료 후 상세 정보 창 닫기
        setOrderDetail(null);
      } catch (error) {
        setError(error);
      }
    });
    setShowModal(true);
  };

  const handleCancelOrder = async orderPk => {
    setModalMessage("이 주문을 취소하시겠습니까?");
    setModalAction(() => async () => {
      try {
        await cancelOrder(orderPk);
        loadOrders(); // 주문 상태가 변경되면 주문 목록을 다시 로드
        setShowModal(false);
        setSelectedOrder(null); // 주문 취소 후 상세 정보 창 닫기
      } catch (error) {
        setError(error);
      }
    });
    setShowModal(true);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  useEffect(() => {
    if (selectedOrder) {
      loadOrderDetail(selectedOrder.orderPk);
    }
  }, [selectedOrder]);

  const formatTime = datetime => {
    const date = new Date(datetime);
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "오후" : "오전";
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${ampm} ${hours}:${minutes}`;
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (error) {
    return Navigate("/login");
  }

  const sortOrders = (orders, order) => {
    return orders.sort((a, b) => {
      if (order === "latest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
    });
  };

  return (
    <>
      <div className="ceo-home-accepted">
        <div className="left">
          <h1>접수 주문</h1>
          <div className="sort-buttons">
            <button
              className="btn sort-btn"
              onClick={() => {
                setSortOrder("latest");
                setOrders(sortOrders([...orders], "latest"));
              }}
            >
              최신순
            </button>
            <button
              className="btn sort-btn"
              onClick={() => {
                setSortOrder("oldest");
                setOrders(sortOrders([...orders], "oldest"));
              }}
            >
              과거순
            </button>
          </div>
          <div className="waiting-orders">
            {error ? (
              <div className="errorMessage">{error}</div>
            ) : orders.length === 0 ? (
              <div className="noOrdersMessage">접수된 주문이 없습니다.</div>
            ) : (
              orders.map(order => (
                <div
                  key={order.orderPk}
                  className={`one-order ${selectedOrder && selectedOrder.orderPk === order.orderPk ? "selected" : ""}`}
                  onClick={() => setSelectedOrder(order)}
                >
                  <div className="one-order-left">
                    <div className="order-number">No. {order.orderPk}</div>
                    <div className="order-menus-number">
                      메뉴 {order.menuName.length}개
                    </div>
                  </div>
                  <div className="one-order-right">
                    <div className="order-time">
                      {new Date(order.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="order-body">
          <div className="orderedList">
            {orderDetail ? (
              <div className="oneOrder" key={orderDetail.orderPk}>
                <div className="AnOrderHead">주문 상세 정보</div>
                <div className="AnOrderBody">
                  <div className="AnOrderLeft">
                    <div className="requested">
                      <h2>요청사항</h2>
                      <div className="requestedabout">
                        <div className="requestedto">
                          <h3>가게 </h3>
                        </div>
                        <div className="requestedof">
                          <p>{orderDetail.orderRequest}</p>
                        </div>
                      </div>
                    </div>
                    <div className="orderedMenu">
                      <h2>주문내역</h2>
                      {orderDetail.menuInfoList.map((menu, index) => (
                        <div className="orderedMenuInf" key={index}>
                          <div className="menuName">{menu.menuName}</div>
                          <div className="menuAmount">1</div>
                          <div className="menuPrice">{menu.menuPrice}</div>
                        </div>
                      ))}
                      <div className="allOrderedMenuInf">
                        <div className="title">총주문</div>
                        <div className="allMenuAmount">
                          {orderDetail.menuInfoList.length}
                        </div>
                        <div className="allMenuPrice">
                          {orderDetail.orderPrice}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="AnOrderRight">
                    <div className="AnOrderInf">
                      <div className="orderCallNumber">
                        <h2 className="forSpace">주문번호</h2>
                        <p>{orderDetail.orderPk}</p>
                      </div>
                      <div className="payMethod">
                        <h2>결제방법</h2>
                        <p>
                          {`${orderDetail.paymentMethod}` === "1"
                            ? "카드"
                            : "현금"}
                        </p>
                      </div>
                      <div className="orderAddress">
                        <h2>배달주소</h2>
                        <p className="address-p">{orderDetail.orderAddress}</p>
                      </div>
                      <div className="orderphone">
                        <h2>전화번호</h2>
                        <p>{orderDetail.orderPhone}</p>
                      </div>
                      <div className="orderCallNumber">
                        <h2> 주문시간</h2>
                        <p>{formatTime(orderDetail.createdAt)}</p>
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
            ) : (
              <div className="orderChoiceMsg">← 주문을 선택해주세요.</div>
            )}
          </div>
        </div>
      </div>
      <ModalForOrdersAccepted
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={modalAction}
        message={modalMessage}
      />
    </>
  );
};

export default OrdersAccepted;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ModalForHome from "./ModalForHome";

const getCookie = name => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
};

const fetchOrders = async () => {
  const accessToken = getCookie("accessToken");
  const response = await axios.get("/api/order/owner/noconfirm/list", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

const confirmOrder = async orderPk => {
  const accessToken = getCookie("accessToken");
  const response = await axios.patch(
    `/api/order/owner/confirm/${orderPk}`,
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

const Home = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderDetail, setOrderDetail] = useState(null);
  const [error, setError] = useState(null);
  const [noOrders, setNoOrders] = useState(false);
  const [selectedOrderPk, setSelectedOrderPk] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const [modalOrderPk, setModalOrderPk] = useState(null);
  const [modalMessage, setModalMessage] = useState("");

  const loadOrders = async () => {
    try {
      const data = await fetchOrders();
      if (data.statusCode === -7) {
        console.log(data.resultMsg);
        setNoOrders(true);
        setOrders([]);
      } else {
        setNoOrders(false);
        setOrders(Array.isArray(data.resultData) ? data.resultData : []);
      }
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

  const handleConfirmOrder = async orderPk => {
    try {
      await confirmOrder(orderPk);
      setOrderDetail(null);
      setSelectedOrder(null);
      loadOrders();
    } catch (error) {
      setError(error);
    }
  };

  const handleCancelOrder = async orderPk => {
    try {
      await cancelOrder(orderPk);
      setOrderDetail(null);
      setSelectedOrder(null);
      loadOrders();
    } catch (error) {
      setError(error);
    }
  };

  const openModal = (action, orderPk) => {
    setModalAction(action);
    setModalOrderPk(orderPk);
    setModalMessage(
      action === "confirm" ? "접수하시겠습니까?" : "거절하시겠습니까?",
    );
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setModalAction(null);
    setModalOrderPk(null);
    setModalMessage("");
  };

  const handleModalConfirm = () => {
    if (modalAction === "confirm") {
      handleConfirmOrder(modalOrderPk);
    } else if (modalAction === "cancel") {
      handleCancelOrder(modalOrderPk);
    }
    closeModal();
  };

  useEffect(() => {
    const checkLogin = () => {
      const accessToken = getCookie("accessToken");
      if (!accessToken) {
        navigate("/login");
      }
    };

    checkLogin();
    loadOrders();
  }, [navigate]);

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
    hours = hours ? hours : 12; // the hour '0' should be '12'
    return `${ampm} ${hours}:${minutes}`;
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <div className="ceo-home">
        <div className="left">
          <h1>신규 주문</h1>
          <button className="btn refresh-btn" onClick={loadOrders}>
            새로고침
          </button>
          <div className="waiting-orders">
            {noOrders ? (
              <div className="noOrdersMessage">새 주문이 없습니다.</div>
            ) : (
              orders.map(order => (
                <div
                  className={`one-order ${selectedOrderPk === order.orderPk ? "selected" : ""}`}
                  key={order.orderPk}
                  onClick={() => {
                    setSelectedOrder(order);
                    setSelectedOrderPk(order.orderPk);
                  }}
                >
                  <div className="one-order-left">
                    <div className="order-number">No. {order.orderPk}</div>
                    <div className="order-menus-number">
                      메뉴 {order.menuName.length}개
                    </div>
                  </div>
                  <div className="one-order-right">
                    <div className="order-time">
                      {formatTime(order.createdAt)}
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
                <div className="AnOrderHead">새 주문</div>
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
                        <p className="address-p">
                          {orderDetail.orderAddress}
                          [지번]제주 제주시 애월읍 하귀 1리 5515
                        </p>
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
                    onClick={() => openModal("confirm", orderDetail.orderPk)}
                  >
                    접수하기
                  </button>
                  <button
                    className="btn"
                    onClick={() => openModal("cancel", orderDetail.orderPk)}
                  >
                    거절하기
                  </button>
                </div>
              </div>
            ) : (
              <div className="noOrdersMessage">주문을 선택해주세요.</div>
            )}
          </div>
        </div>
      </div>

      <ModalForHome
        isOpen={modalIsOpen}
        onClose={closeModal}
        onConfirm={handleModalConfirm}
        message={modalMessage}
      />
    </>
  );
};

export default Home;

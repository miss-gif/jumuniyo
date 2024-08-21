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
  const [orderDetail, setOrderDetail] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
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
      console.log("Full Response Data:", data);
      if (data.statusCode === 1 && data.resultData) {
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

    const accessToken = getCookie("accessToken");
    const eventSource = new EventSource(
      `https://34.64.63.109/sse?token=${accessToken}`,
    );

    eventSource.onopen = () => {
      console.log("SSE connection opened");
    };

    eventSource.onmessage = event => {
      try {
        const newOrder = event.data;
        console.log("New event received:", newOrder);
        loadOrders();
        setOrders(prevOrders => [newOrder, ...prevOrders]);
      } catch (err) {
        console.error("Failed to parse SSE event data:", err, event.data);
      }
    };

    eventSource.onerror = err => {
      console.error("EventSource failed:", err);
      eventSource.close();
    };

    return () => {
      console.log("SSE connection closed");
      eventSource.close();
    };
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
    hours = hours ? hours : 12;
    return `${ampm} ${hours}:${minutes}`;
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const formatNumber = num => {
    return num.toLocaleString();
  };

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
              <div className="noOrdersMessages">새 주문이 없습니다.</div>
            ) : (
              orders.map(order => (
                <div
                  className={`one-order ${
                    selectedOrderPk === order.orderPk ? "selected" : ""
                  }`}
                  key={order.orderPk}
                  onClick={() => {
                    setSelectedOrder(order);
                    setSelectedOrderPk(order.orderPk);
                  }}
                >
                  <div className="one-order-left">
                    <div className="order-number">No. {order.orderPk}</div>
                    <div className="order-menus-number">
                      {order.orderPrice}원
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
                      {orderDetail.menus && orderDetail.menus.length > 0 ? (
                        orderDetail.menus.map((menu, index) => (
                          <div className="orderedMenuInfandOption" key={index}>
                            <div className="orderedMenuInf">
                              <div className="menuName">
                                {menu.order_menu_name}
                              </div>
                              <div className="menuAmount">
                                {menu.order_menu_count}
                              </div>
                              <div className="menuPrice">
                                {formatNumber(menu.order_menu_price)}
                              </div>
                            </div>
                            {menu.menu_options &&
                              menu.menu_options.length > 0 && (
                                <div className="menuOptions">
                                  {menu.menu_options.map((option, optIndex) => (
                                    <div key={optIndex} className="menuOption">
                                      <div className="optionName">
                                        <h3>+</h3>
                                        {option.option_name}
                                      </div>
                                      <div className="optionPrice">
                                        {formatNumber(option.option_price)}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                          </div>
                        ))
                      ) : (
                        <div>메뉴 정보가 없습니다.</div>
                      )}
                      <div className="allOrderedMenuInf">
                        <div className="title">총주문</div>
                        <div className="allMenuAmount">
                          {orderDetail.menus?.length || 0}
                        </div>
                        <div className="allMenuPrice">
                          {formatNumber(orderDetail.orderPrice)}
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
                    className="btn acceptBtn"
                    onClick={() => openModal("confirm", orderDetail.orderPk)}
                  >
                    + 접수하기
                  </button>
                  <button
                    className="btn--cancel"
                    onClick={() => openModal("cancel", orderDetail.orderPk)}
                  >
                    거절하기
                  </button>
                </div>
              </div>
            ) : (
              <div className="orderChoiceMsg">← 주문을 선택해주세요.</div>
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

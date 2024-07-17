import React, { useEffect, useState } from "react";
import axios from "axios";

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
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderDetail, setOrderDetail] = useState(null);
  const [error, setError] = useState(null);
  const [noOrders, setNoOrders] = useState(false);

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
      loadOrders();
    } catch (error) {
      setError(error);
    }
  };

  const handleCancelOrder = async orderPk => {
    try {
      await cancelOrder(orderPk);
      loadOrders();
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    if (selectedOrder) {
      loadOrderDetail(selectedOrder.orderPk);
    }
  }, [selectedOrder]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <div className="ceo-home">
        <div className="left">
          <h3>새로 들어온 주문</h3>
          <div className="waiting-orders">
            {noOrders ? (
              <div className="noOrdersMessage">새 주문이 없습니다.</div>
            ) : (
              orders.map(order => (
                <div
                  className="one-order"
                  key={order.orderPk}
                  onClick={() => setSelectedOrder(order)}
                >
                  <div className="one-order-left">
                    <div className="order-number">접수 No. {order.orderPk}</div>
                    <div className="order-menus-number">
                      메뉴 {order.menuName.length}개
                    </div>
                  </div>
                  <div className="one-order-right">
                    <div className="order-time">{order.createdAt}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="order-body">
          <button className="btn refresh-btn" onClick={loadOrders}>
            새로고침
          </button>

          <div className="orderedList">
            {orderDetail ? (
              <div className="oneOrder" key={orderDetail.orderPk}>
                <div className="AnOrderHead">새 주문</div>
                <div className="AnOrderBody">
                  <div className="AnOrderLeft">
                    <div className="requested">
                      <h3>요청사항</h3>
                      <div className="requestedabout">
                        <div className="requestedto">
                          <h4>가게 </h4>
                        </div>
                        <div className="requestedof">
                          <p>{orderDetail.orderRequest}</p>
                        </div>
                      </div>
                    </div>
                    <div className="orderedMenu">
                      <h3>주문내역</h3>
                      {orderDetail.menuInfoList.map((menu, index) => (
                        <div className="orderedMenuInf" key={index}>
                          <div className="menuName">{menu.menuName}</div>
                          <div className="menuAmount">1</div>
                          <div className="menuPrice">{menu.menuPrice}</div>
                        </div>
                      ))}
                      <div className="allOrderedMenuInf">
                        <div className="title">총주문</div>
                        <div className="allMenuAmount">1</div>
                        <div className="allMenuPrice">
                          {orderDetail.orderPrice}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="AnOrderRight">
                    <div className="AnOrderInf">
                      <div className="orderCallNumber">
                        <h3>주문번호</h3>
                        <p>{orderDetail.orderPk}</p>
                      </div>
                      <div className="payMethod">
                        <h3>결제방법</h3>
                        <p>
                          {`${orderDetail.paymentMethod}` === "1"
                            ? "카드"
                            : "현금"}
                        </p>
                      </div>
                      <div className="orderAddress">
                        <h3>배달주소</h3>
                        <p className="address-p">{orderDetail.orderAddress}</p>
                      </div>

                      <div className="orderCallNumber">
                        <h3> 주문시간</h3>
                        <p>{orderDetail.createdAt}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="acceptOrRefuse">
                  <button
                    className="btn"
                    onClick={() => handleConfirmOrder(orderDetail.orderPk)}
                  >
                    접수하기
                  </button>
                  <button
                    className="btn"
                    onClick={() => handleCancelOrder(orderDetail.orderPk)}
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
    </>
  );
};

export default Home;

import React, { useEffect, useState } from "react";

const getCookie = name => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
};

const fetchOrders = async () => {
  const accessToken = getCookie("accessToken");
  const response = await fetch("/api/order/owner/noconfirm/list", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  console.log(data); // Swagger와의 연결 확인을 위한 콘솔 로그

  if (!response.ok) {
    throw new Error(data.resultMsg || "Network response was not ok");
  }

  return data;
};

const Home = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [noOrders, setNoOrders] = useState(false);

  const loadOrders = async () => {
    try {
      const data = await fetchOrders();
      if (data.statusCode === -7) {
        console.log(data.resultMsg); // 주문 정보가 없음을 콘솔에 출력
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

  useEffect(() => {
    loadOrders();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <div className="ceo-home">
        <h2 className="ceo-home-tab">주문요 사장님</h2>
        <button onClick={loadOrders} className="refresh-btn">
          새로고침
        </button>
        <div className="order-body">
          <div className="left">
            <div className="confirmedList">
              <div className="confirmedList-tab">접수된 주문</div>
              <div className="oneOrder">
                <div className="orderedTime">13:22</div>
                <div className="orderInfo">
                  <div className="orderAmount">
                    <div className="orderNumber">[메뉴 4개]</div>
                    <div className="orderPrice">31,800</div>
                    <div className="payMethod">후불</div>
                  </div>
                  <div className="orderedMenu">
                    <div className="menu-name">김치찌개</div>
                    <div className="menu-amount">1개</div>
                  </div>
                  <div className="orderedAddress">
                    서울 송파구 방이동 44-2 장은빌딩 9층
                  </div>
                  <div className="requested">
                    단무지 많이 주고 일회용품 ㄴㄴ
                  </div>
                </div>
                <div className="orderStatus">
                  <div className="orderLeftTime">12분</div>
                  <div className="orderProcess">배달중</div>
                </div>
              </div>
              <div className="oneOrder">
                <div className="orderedTime">13:22</div>
                <div className="orderInfo">
                  <div className="orderAmount">
                    <div className="orderNumber">[메뉴 4개]</div>
                    <div className="orderPrice">31,800</div>
                    <div className="payMethod">후불</div>
                  </div>
                  <div className="orderedMenu">
                    <div className="menu-name">김치찌개</div>
                    <div className="menu-amount">1개</div>
                  </div>
                  <div className="orderedAddress">
                    서울 송파구 방이동 44-2 장은빌딩 9층
                  </div>
                  <div className="requested">
                    단무지 많이 주고 일회용품 ㄴㄴ
                  </div>
                </div>
                <div className="orderStatus">
                  <div className="orderLeftTime">12분</div>
                  <div className="orderProcess">배달중</div>
                </div>
              </div>
            </div>
          </div>
          <div className="orderedList">
            {noOrders ? (
              <div className="noOrdersMessage">새 주문이 없습니다.</div>
            ) : (
              orders.map(order => (
                <div className="oneOrder" key={order.orderPk}>
                  <div className="AnOrderHead">새 주문</div>
                  <div className="AnOrderBody">
                    <div className="AnOrderLeft">
                      <div className="requested">
                        <h3>요청사항</h3>
                        <div className="requestedabout">
                          <div className="requestedto">
                            <h4>가게 </h4>
                            <h4>배달 </h4>
                          </div>
                          <div className="requestedof">
                            <p>맛있게해주세요</p>
                            <p>빨리와주세요</p>
                          </div>
                        </div>
                      </div>
                      <div className="orderedMenu">
                        <h3>주문내역</h3>
                        {order.menuName.map((menu, index) => (
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
                          <h3> 배달주소</h3>
                          <p>경기도 화성시 이성로 대명아파트 102동 906호</p>
                        </div>
                        <div className="orderCallNumber">
                          <h3>고객연락처</h3>
                          <p>010-1111-2222</p>
                        </div>
                        <div className="orderCallNumber">
                          <h3>주문번호</h3>
                          <p>{order.orderPk}</p>
                        </div>
                        <div className="orderCallNumber">
                          <h3> 주문시간</h3>
                          <p>13:54</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="acceptOrRefuse">
                    <button className="btn">접수하기</button>
                    <button className="btn">거절하기</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

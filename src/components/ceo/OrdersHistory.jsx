import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const getCookie = name => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
};

const OrdersHistory = () => {
  const [selectedTab, setSelectedTab] = useState("all");
  const [acceptedOrders, setAcceptedOrders] = useState([]);
  const [refusedOrders, setRefusedOrders] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);

  useEffect(() => {
    if (selectedTab === "accepted") {
      getAcceptedOrders(currentPage);
    } else if (selectedTab === "refused") {
      getRefusedOrders(currentPage);
    } else if (selectedTab === "all") {
      getAllOrders(currentPage);
    }
  }, [selectedTab, currentPage]);

  const getAcceptedOrders = async page => {
    try {
      const accessToken = getCookie("accessToken");
      const response = await axios.get(
        `/api/done/owner/done/list?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      const data = response.data;
      console.log("완료 API 응답:", data);
      if (data.statusCode === 1 || data.statusCode === 2) {
        setAcceptedOrders(data.resultData.contents);
        setMaxPage(data.resultData.maxPage);
        console.log("acceptedOrders:", data.resultData.contents);
      } else {
        setAcceptedOrders([]);
      }
    } catch (error) {
      console.log("완료주문 에러: ", error);
      setAcceptedOrders([]);
    }
  };

  const getRefusedOrders = async page => {
    try {
      const accessToken = getCookie("accessToken");
      const response = await axios.get(
        `/api/done/owner/cancel/list?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      const data = response.data;
      console.log("거절 API 응답:", data);
      if (data.statusCode === 1 || data.statusCode === 2) {
        setRefusedOrders(data.resultData.contents);
        setMaxPage(data.resultData.maxPage);
        console.log("refusedOrders:", data.resultData.contents);
      } else {
        setRefusedOrders([]);
      }
    } catch (error) {
      console.error("거절 주문 에러", error);
      setRefusedOrders([]);
    }
  };

  const getAllOrders = async page => {
    try {
      const accessToken = getCookie("accessToken");
      const [acceptedResponse, refusedResponse] = await Promise.all([
        axios.get(`/api/done/owner/done/list?size=10&page=${page}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }),
        axios.get(`/api/done/owner/cancel/list?size=10&page=${page}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }),
      ]);

      const acceptedData = acceptedResponse.data;
      const refusedData = refusedResponse.data;

      let allData = [];
      if (
        (acceptedData.statusCode === 1 || acceptedData.statusCode === 2) &&
        (refusedData.statusCode === 1 || refusedData.statusCode === 2)
      ) {
        allData = [
          ...acceptedData.resultData.contents,
          ...refusedData.resultData.contents,
        ];
      } else if (
        acceptedData.statusCode === 1 ||
        acceptedData.statusCode === 2
      ) {
        allData = acceptedData.resultData.contents;
      } else if (refusedData.statusCode === 1 || refusedData.statusCode === 2) {
        allData = refusedData.resultData.contents;
      }

      allData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setAllOrders(allData);
      setMaxPage(
        Math.max(
          acceptedData.resultData.maxPage,
          refusedData.resultData.maxPage,
        ),
      );
      console.log("allOrders:", allData);
    } catch (error) {
      console.error("전체 주문 에러", error);
      setAllOrders([]);
    }
  };

  const renderOrders = (orders, emptyMessage) => {
    return orders.length > 0 ? (
      orders.map(order => (
        <div className="ceo-orderList" key={order.doneOrderPk}>
          <div className="ceo-order-header">
            <div className="order-header-left">
              <div className="order-header-title">
                {new Date(order.createdAt).toLocaleDateString()} -{" "}
                <span>
                  {order.doneOrderState === 1 ? "주문완료" : "주문취소"}
                </span>
              </div>
              <div className="order-header-left-wrap">
                <div className="order-header-left-content">
                  <div className="order-header-left-content-title">
                    주문번호: {order.doneOrderPk}
                  </div>
                  <div className="order-header-left-content-text">
                    {order.menuInfoDtos.map((menu, index) => (
                      <span key={index}>
                        {menu.menuName} {menu.menuPrice}원
                      </span>
                    ))}
                    <span>총 {order.orderPrice}원</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-header-right">
              <Link
                to={`/ceopage/orders/details/${order.doneOrderPk}`}
                className="btn"
              >
                주문상세
              </Link>
            </div>
          </div>
        </div>
      ))
    ) : (
      <div>{emptyMessage}</div>
    );
  };

  const handlePageChange = newPage => {
    if (newPage >= 1 && newPage <= maxPage) {
      setCurrentPage(newPage);
    }
  };

  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.min(maxPage, 10); i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="paginationforOrderHistory">
        <button
          className="btn btnNextandBefore"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          이전
        </button>
        {pageNumbers.map(pageNumber => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={currentPage === pageNumber ? "active" : ""}
          >
            {pageNumber}
          </button>
        ))}
        <button
          className="btn btnNextandBefore"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === maxPage}
        >
          다음
        </button>
      </div>
    );
  };

  return (
    <div className="ceo-order-wrap">
      <h2 className="ceo-order-tab">주문내역</h2>
      <div className="orderListing">
        <ul className="tabforchoiceUl">
          <li>
            <button
              className={`btn ${selectedTab === "all" ? "active" : ""}`}
              onClick={() => {
                setSelectedTab("all");
                setCurrentPage(1);
              }}
            >
              전체 주문
            </button>
            <button
              className={`btn ${selectedTab === "accepted" ? "active" : ""}`}
              onClick={() => {
                setSelectedTab("accepted");
                setCurrentPage(1);
              }}
            >
              접수 주문
            </button>
            <button
              className={`btn ${selectedTab === "refused" ? "active" : ""}`}
              onClick={() => {
                setSelectedTab("refused");
                setCurrentPage(1);
              }}
            >
              거절 주문
            </button>
          </li>
        </ul>
      </div>
      <div className="ceo-order-content">
        {selectedTab === "accepted" && (
          <div className="accepted">
            {renderOrders(acceptedOrders, "완료된 주문이 없습니다.")}
          </div>
        )}
        {selectedTab === "refused" && (
          <div className="refused">
            {renderOrders(refusedOrders, "거절된 주문이 없습니다.")}
          </div>
        )}
        {selectedTab === "all" && (
          <div className="all">
            {renderOrders(
              allOrders,
              "아직 주문이 없습니다. 주문을 받아주세요!",
            )}
          </div>
        )}
      </div>
      {renderPagination()}
    </div>
  );
};

export default OrdersHistory;

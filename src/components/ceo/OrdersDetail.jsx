import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../common/LoadingSpinner";

const getCookie = name => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
};

const OrdersDetail = () => {
  const { doneOrderPk } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  const fetchOrderDetails = async () => {
    try {
      const accessToken = getCookie("accessToken");
      const response = await axios.get(`/api/done/${doneOrderPk}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = response.data;
      //console.log("주문 상세 API 응답:", data);
      if (data.statusCode === 1 || data.statusCode === 2) {
        setOrderDetails(data.resultData);
      }
    } catch (error) {
      //console.error("주문 상세 에러", error);
    }
  };

  if (!orderDetails) {
    return <LoadingSpinner />;
  }

  return (
    <div className="ceo-orderDetail-wrap">
      <h2>주문 번호 {orderDetails.doneOrderPk}</h2>
      <div className="ceo-order-list">
        <div className="ceo-orders">
          <div className="mypage-order">
            <div className="mypage-order__contents">
              <div className="mypage-order__section-titles">주문정보</div>
              <div className="배달정보-콘텐츠">
                <div className="mypage-order__detail">
                  <p className="mypage-order__label">주문상태</p>
                  <p className="mypage-order__value">
                    {orderDetails.doneOrderState === 1
                      ? "주문완료"
                      : "취소완료"}
                  </p>
                </div>
                <div className="mypage-order__detail">
                  <p className="mypage-order__label">주문날짜</p>
                  <p className="mypage-order__value">
                    {orderDetails.createdAt}
                  </p>
                </div>
                <div className="mypage-order__detail">
                  <p className="mypage-order__label">결제수단</p>
                  <p className="mypage-order__value">
                    현장결제 - 신용카드 결제
                  </p>
                </div>
                <div className="mypage-order__detail">
                  <p className="mypage-order__label">주문자정보</p>
                  <p className="mypage-order__value">
                    {orderDetails.orderAddress}
                  </p>
                </div>
                <div className="mypage-order__detail">
                  <p className="mypage-order__label">주문 요청 사항</p>
                  <p className="mypage-order__value">
                    {orderDetails.orderRequest}
                  </p>
                </div>
              </div>
              <div className="mypage-order__section-title">주문내역</div>
              <div className="주문내역-콘텐츠">
                <ul className="mypage-order__item">
                  {orderDetails.menuInfoList &&
                    orderDetails.menuInfoList.map((menu, index) => (
                      <li key={index}>
                        <p className="mypage-order__item-name">
                          {menu.menuName} <span>x {menu.quantity} 1 개</span>
                        </p>
                        <p className="mypage-order__item-price">
                          {menu.menuPrice}원
                        </p>
                      </li>
                    ))}
                </ul>
              </div>
              <div className="mypage-order__total">
                <p className="mypage-order__total-label">총 결제금액</p>
                <p className="mypage-order__total-price">
                  {orderDetails.orderPrice}원
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersDetail;

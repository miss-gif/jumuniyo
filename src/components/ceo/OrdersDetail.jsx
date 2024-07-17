import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

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
      console.log("주문 상세 API 응답:", data);
      if (data.statusCode === 1 || data.statusCode === 2) {
        setOrderDetails(data.resultData);
      }
    } catch (error) {
      console.error("주문 상세 에러", error);
    }
  };

  if (!orderDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="ceo-orderDetail-wrap">
      <div className="ceo-order-list">
        <div className="ceo-orders">
          <div className="mypage-order">
            <h2 className="mypage-order__title">제목</h2>
            <div className="mypage-order__contents">
              <p className="mypage-order__thanks">감사</p>
              <p className="mypage-order__confirmation">확정</p>
              <div className="mypage-order__section-title">배달정보</div>
              <div className="배달정보-콘텐츠">
                <div className="mypage-order__detail">
                  <p className="mypage-order__label">주문식당</p>
                  <p className="mypage-order__value">후라이드참잘하는집</p>
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
                    서울특별시 강남구 삼성동 143-10 위워크 타워
                  </p>
                </div>
                <div className="mypage-order__detail">
                  <p className="mypage-order__label">연락처</p>
                  <p className="mypage-order__value">01012345551</p>
                </div>
              </div>
              <div className="mypage-order__section-title">주문내역</div>
              <div className="주문내역-콘텐츠">
                <ul className="mypage-order__item">
                  {orderDetails.menuInfoList &&
                    orderDetails.menuInfoList.map((menu, index) => (
                      <li key={index}>
                        <p className="mypage-order__item-name">
                          {menu.menuName} <span>x {menu.quantity}개</span>
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

      <div className="order-details">
        <h2>주문 상세 정보</h2>
        <p>주문 번호: {orderDetails.doneOrderPk}</p>
        <p>사용자 번호: {orderDetails.userPk}</p>
        <p>가게 번호: {orderDetails.resPk}</p>
        <p>주문 가격: {orderDetails.orderPrice}원</p>
        <p>주문 요청 사항: {orderDetails.orderRequest}</p>
        <p>주문 상태: {orderDetails.doneOrderState}</p>
        <p>결제 방법: {orderDetails.paymentMethod}</p>
        <p>주문 시간: {orderDetails.createdAt}</p>
        <h3>메뉴 정보</h3>
        <ul>
          {orderDetails.menuInfoList.map((menu, index) => (
            <li key={index}>
              {menu.menuName} - {menu.menuPrice}원
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrdersDetail;

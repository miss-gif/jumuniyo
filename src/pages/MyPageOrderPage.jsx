import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MyPageOrderPage = () => {
  const { id } = useParams();
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    const fetchOrderData = async () => {
      const response = await fetch(`/api/order/${id}`);
      const data = await response.json();
      if (data.statusCode === 1) {
        setOrderData(data.resultData);
      }
    };
    fetchOrderData();
  }, [id]);

  if (!orderData) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="mypage-order">
      <div className="mypage-order-content">
        <h2 className="mypage-order__title">주문완료</h2>
        <div className="mypage-order__contents">
          <div className="주문완료-안내">
            <p className="mypage-order__thanks">주문 감사합니다</p>
            <p className="mypage-order__confirmation">
              주문 요청이 완료되었으며 고객님의 휴대전화 번호로 주문 확인 문자가
              곧 발송됩니다
            </p>
          </div>

          <div className="mypage-order__section">
            <div className="mypage-order__section-title">배달정보</div>
            <div className="mypage-order__detail">
              <p className="mypage-order__label">음식점</p>
              <p className="mypage-order__value">{orderData.resPk}</p>
            </div>
            <div className="mypage-order__detail">
              <p className="mypage-order__label">주문번호</p>
              <p className="mypage-order__value">{orderData.orderPk}</p>
            </div>
            <div className="mypage-order__detail">
              <p className="mypage-order__label">주문시간</p>
              <p className="mypage-order__value">
                {new Date(orderData.createdAt).toLocaleString()}
              </p>
            </div>
            <div className="mypage-order__detail none">
              <p className="mypage-order__label">배달완료시간</p>
              <p className="mypage-order__value">
                {orderData.orderState === 1 ? "배달 완료" : "배달 중"}
              </p>
            </div>
          </div>

          <div className="mypage-order__section">
            <div className="mypage-order__section-title">주문자 정보</div>
            <div className="mypage-order__detail">
              <p className="mypage-order__label">연락처</p>
              <p className="mypage-order__value">{orderData.orderPhone}</p>
            </div>
            <div className="mypage-order__detail">
              <p className="mypage-order__label">주소</p>
              <p className="mypage-order__value">{orderData.orderAddress}</p>
            </div>
            <div className="mypage-order__detail">
              <p className="mypage-order__label">가게 요청사항</p>
              <p className="mypage-order__value">{orderData.orderRequest}</p>
            </div>
            <div className="mypage-order__detail none">
              <p className="mypage-order__label">라이더 요청사항</p>
              <p className="mypage-order__value">없음</p>
            </div>
            <div className="mypage-order__detail">
              <p className="mypage-order__label">결제수단</p>
              <p className="mypage-order__value">{orderData.paymentMethod}</p>
            </div>
          </div>

          <div className="mypage-order__section">
            <div className="mypage-order__section-title">주문내역</div>
            <ul className="mypage-order__item">
              {orderData.menuInfoList.map((menu, index) => (
                <li key={index}>
                  <p className="mypage-order__item-name">
                    {menu.menuName} <span>x 1개</span>
                  </p>
                  <p className="mypage-order__item-price">
                    {menu.menuPrice.toLocaleString()}원
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div className="mypage-order__total">
            <p className="mypage-order__total-label">총 결제금액</p>
            <p className="mypage-order__total-price">
              {orderData.orderPrice.toLocaleString()}원
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPageOrderPage;

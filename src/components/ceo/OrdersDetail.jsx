import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const OrdersDetail = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const data = [
      {
        restaurant_name: "중원반점",
        order_id: "ORD123456",
        order_date: "2024-07-07T10:45:00Z",
        customer_info: {
          name: "홍길동",
          contact: "010-1234-5678",
        },
        order_list: [
          {
            menu_name: "짜장면",
            quantity: 2,
            price: 20000,
          },
          {
            menu_name: "간짜장",
            quantity: 1,
            price: 15000,
          },
        ],
        total_order_amount: 55000,
        payment_status: "결제 완료",
        shipping_status: "배송 완료",
        shipping_address: "서울특별시 강남구 테헤란로 123",
        order_notes: "부재 시 문앞에 주세요.",
        order_status: "확인 대기",
        coupon_discount: 5000,
        tracking_number: null,
        customer_service_history: [
          {
            date: "2024-07-06",
            issue: "주문 3건",
            resolution: "소비액 96,000",
          },
        ],
      },
      {
        restaurant_name: "스빠게띠",
        order_id: "ORD123457",
        order_date: "2024-07-06T09:30:00Z",
        customer_info: {
          name: "김철수",
          contact: "010-9876-5432",
        },
        order_list: [
          {
            menu_name: "상품 C",
            quantity: 3,
            price: 10000,
          },
        ],
        total_order_amount: 30000,
        payment_status: "결제 완료",
        shipping_status: "배송 완료",
        shipping_address: "부산광역시 해운대구 해운대로 456",
        order_notes: "빠른 배달 부탁요.",
        order_status: "처리 중",
        coupon_discount: 0,
        tracking_number: null,
        customer_service_history: [
          {
            date: "2024-07-05",
            issue: "주문 3건",
            resolution: "소비액 96,000",
          },
        ],
      },
    ];
    setOrders(data);
  }, []);
  return (
    <div className="ceo-orderDetail-wrap">
      <div className="ceo-order-list">
        <div className="ceo-orders">
          {orders.map(order => (
            <div key={order.order_id} className="mypage-order">
              <h2 className="mypage-order__title">{order.order_status}</h2>
              <div className="mypage-order__contents">
                <p className="mypage-order__thanks">{order.order_notes}</p>
                <p className="mypage-order__confirmation">
                  {order.order_notes}
                </p>
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
                    <li>
                      <p className="mypage-order__item-name">
                        순살 후라이드 <span>x 1개</span>
                      </p>
                      <p className="mypage-order__item-price">16,000원</p>
                    </li>
                    <li>
                      <p className="mypage-order__item-name">
                        순살 후라이드 <span>x 1개</span>
                      </p>
                      <p className="mypage-order__item-price">16,000원</p>
                    </li>
                  </ul>
                </div>
                <div className="mypage-order__total">
                  <p className="mypage-order__total-label">총 결제금액</p>
                  <p className="mypage-order__total-price">16,000원</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersDetail;

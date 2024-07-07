import React, { useEffect, useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const data = [
      {
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
    <div className="Ceo-Orders">
      <h1>주문 내역</h1>
      <div className="order-lists">
        {orders.map(order => (
          <div key={order.order_id} className="order">
            <h2>주문 번호: {order.order_id}</h2>
            <p>주문 날짜: {new Date(order.order_date).toLocaleString()}</p>
            <h3>고객 정보</h3>
            <p>이름: {order.customer_info.name}</p>
            <p>연락처: {order.customer_info.contact}</p>
            <h3>상품 목록</h3>
            <ul>
              {order.order_list.map((product, index) => (
                <li key={index}>
                  {product.menu_name} - {product.quantity}개 - {product.price}원
                </li>
              ))}
            </ul>
            <p>총 주문 금액: {order.total_order_amount}원</p>
            <p>결제 상태: {order.payment_status}</p>
            <p>배송 상태: {order.shipping_status}</p>
            <p>배송지: {order.shipping_address}</p>
            <p>주문 메모: {order.order_notes}</p>
            <p>주문 상태: {order.order_status}</p>
            <h3>고객 서비스 이력</h3>
            <ul>
              {order.customer_service_history.map((history, index) => (
                <li key={index}>
                  {history.date} - {history.issue} - {history.resolution}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;

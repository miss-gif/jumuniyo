import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Orders = () => {
  return (
    // <div className="Ceo-Orders">
    //   <h1>주문 내역</h1>
    //   <div className="order-lists">
    //     {orders.map(order => (
    //       <div key={order.order_id} className="order">
    //         <h2>주문 번호: {order.order_id}</h2>
    //         <p>주문 날짜: {new Date(order.order_date).toLocaleString()}</p>
    //         <h3>고객 정보</h3>
    //         <p>이름: {order.customer_info.name}</p>
    //         <p>연락처: {order.customer_info.contact}</p>
    //         <h3>상품 목록</h3>
    //         <ul>
    //           {order.order_list.map((product, index) => (
    //             <li key={index}>
    //               {product.menu_name} - {product.quantity}개 - {product.price}원
    //             </li>
    //           ))}
    //         </ul>
    //         <p>총 주문 금액: {order.total_order_amount}원</p>
    //         <p>결제 상태: {order.payment_status}</p>
    //         <p>배송 상태: {order.shipping_status}</p>
    //         <p>배송지: {order.shipping_address}</p>
    //         <p>주문 메모: {order.order_notes}</p>
    //         <p>주문 상태: {order.order_status}</p>
    //         <h3>고객 서비스 이력</h3>
    //         <ul>
    //           {order.customer_service_history.map((history, index) => (
    //             <li key={index}>
    //               {history.date} - {history.issue} - {history.resolution}
    //             </li>
    //           ))}
    //         </ul>
    //       </div>
    //     ))}
    //   </div>
    // </div>
    <div className="ceo-order-wrap">
      <h2 className="ceo-order-tab">주문내역</h2>
      <div className="ceo-order-tag">주문</div>
      <div className="orderListing">
        <ul className="tabforchoiceUl">
          <li>
            <button className="btn">전체 보기</button>
            <button className="btn">접수 주문</button>
            <button className="btn">거절 주문</button>
          </li>
        </ul>
      </div>
      <div className="ceo-orderList">
        <div className="ceo-order-header">
          <div className="order-header-left">
            <div className="order-header-title">
              7월 7일 - <span>배달완료</span>
            </div>
            <div className="order-header-left-wrap">
              <div className="order-header-left-content">
                <div className="order-header-left-content-title">
                  롯데리아 대구칠곡구암점
                </div>
                <div className="order-header-left-content-text">
                  <span>T REX세트</span>
                  <span>9999원</span>
                  <span>1개</span>
                </div>
              </div>
            </div>
          </div>
          <div className="order-header-right">
            <Link to="details" className="btn">
              주문상세
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;

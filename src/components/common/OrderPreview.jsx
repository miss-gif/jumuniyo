import React from "react";
import { Link } from "react-router-dom";

const OrderPreview = () => {
  return (
    <div className="mypage-order-header">
      <div className="order-header-left">
        <div className="mypage-order-header-title">
          7월 7일 - <span>배달완료</span>
        </div>
        <div className="order-header-left-wrap">
          <div className="order-header-left-image">
            <img src="" alt="" />
          </div>
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
        <Link to="" className="btn">
          주문상세
        </Link>
        <Link to="" className="btn">
          리뷰쓰기
        </Link>
      </div>
    </div>
  );
};

export default OrderPreview;

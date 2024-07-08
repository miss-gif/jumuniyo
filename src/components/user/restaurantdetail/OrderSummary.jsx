import React from "react";

const OrderSummary = () => {
  return (
    <div className="order-summary">
      <div className="order-summary-content">
        <div className="order-summary__header">주문표</div>
        <div className="order-summary__content-wrapper">
          <div className="order-summary__content">
            한마리 ＋ 순살치킨: New）수라깐풍, 크리스피 골드(국내산 순살), 콜라
            500ml 기본
          </div>
          <div className="order-summary__price-quantity">
            <div className="order-summary__wrap">
              <div className="order-summary__delete-button">x</div>
              <div className="order-summary__price">27,500원</div>
            </div>
            <div className="quantity-count">
              <div className="quantity-count__decrease-button">-</div>
              <div className="quantity-count__current-quantity">1</div>
              <div className="quantity-count__increase-button">+</div>
            </div>
          </div>
          <div className="order-summary__total-price">27,000원</div>
        </div>
      </div>
      <div className="order-summary__submit-button">주문하기</div>
    </div>
  );
};

export default OrderSummary;

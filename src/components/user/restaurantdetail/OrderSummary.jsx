import React from "react";
import QuantityCount from "../../common/QuantityCount";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";

const OrderSummary = () => {
  return (
    <div className="order-summary">
      <div className="order-summary-content">
        <div className="order-summary__header">
          <h2 className="header__title">주문표</h2>
          <div className="header__icon">
            <DeleteIcon />
          </div>
        </div>
        <div className="order-summary__content-wrapper">
          <div className="order-summary__content">
            한마리 ＋ 순살치킨: New）수라깐풍, 크리스피 골드(국내산 순살), 콜라
            500ml 기본
          </div>
          <div className="order-summary__price-quantity">
            <div className="order-summary__wrap">
              <div className="order-summary__delete-button">
                <CloseIcon />
              </div>
              <div className="order-summary__price">27,500원</div>
            </div>
            <QuantityCount />
          </div>
          <div className="order-summary__total-amount">
            <p>총 결제 금액</p>
            <p>23,000원</p>
          </div>
        </div>
      </div>
      <div className="order-summary__submit-button">주문하기</div>
    </div>
  );
};

export default OrderSummary;

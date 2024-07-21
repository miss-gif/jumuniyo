/* eslint-disable react/prop-types */
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";

const OrderSummary = ({
  selectedMenuItems,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onRemoveItem,
  onClearAll,
  onOrder,
  restaurantName,
}) => {
  const totalAmount = selectedMenuItems.reduce(
    (sum, item) => sum + item.menu_price * item.quantity,
    0,
  );

  const emptyMessageStyle = {
    padding: selectedMenuItems.length === 0 ? "20px" : "0",
    textAlign: "center",
  };

  const submitButtonStyle = {
    backgroundColor: selectedMenuItems.length > 0 ? "#333" : "#eee",
    color: selectedMenuItems.length > 0 ? "#eee" : "#aaa",
    cursor: selectedMenuItems.length > 0 ? "pointer" : "default",
  };

  return (
    <div className="order-summary">
      <div className="order-summary-content">
        <div className="order-summary__header">
          <h2 className="header__title">주문표</h2>
          <div className="header__icon" onClick={onClearAll}>
            <DeleteIcon />
          </div>
        </div>
        <div className="order-summary__content-wrapper">
          {selectedMenuItems.length === 0 ? (
            <div
              className="order-summary__empty-message"
              style={emptyMessageStyle}
            >
              선택된 메뉴가 없습니다.
            </div>
          ) : (
            selectedMenuItems.map((item, index) => (
              <div key={index}>
                <div className="order-summary__content">
                  {item.menu_name}: {item.menu_content} (수량: {item.quantity})
                </div>
                <div className="order-summary__price-quantity">
                  <div className="order-summary__wrap">
                    <div
                      className="order-summary__delete-button"
                      onClick={() => onRemoveItem(item.menu_pk)}
                    >
                      <CloseIcon />
                    </div>
                    <div className="order-summary__price">
                      {item.menu_price}원
                    </div>
                  </div>
                  <div className="quantity-count">
                    <button
                      onClick={() => onDecreaseQuantity(item.menu_pk)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => onIncreaseQuantity(item.menu_pk)}>
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
          {selectedMenuItems.length > 0 && (
            <div className="order-summary__total-amount">
              <p>총 결제 금액</p>
              <p>{totalAmount}원</p>
            </div>
          )}
        </div>
      </div>
      <div
        className="order-summary__submit-button"
        style={submitButtonStyle}
        onClick={() => {
          onOrder(restaurantName);
          // console.log("주문함");
        }}
      >
        주문하기
      </div>
      <div
        className="order-summary__submit-buttonforphone"
        style={submitButtonStyle}
        onClick={() => {
          if (totalAmount > 0) {
            onOrder(restaurantName);
          }
        }}
      >
        {totalAmount > 0 ? `${totalAmount}원 주문하기` : "음식을 담아주세요!"}
      </div>
    </div>
  );
};

export default OrderSummary;

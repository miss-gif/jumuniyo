import React, { useState } from "react";
import { useLocation } from "react-router-dom"; // useLocation 추가

const Pay = () => {
  const location = useLocation();
  const {
    orderItems: initialOrderItems,
    totalOrderPrice: initialTotalOrderPrice,
  } = location.state;

  const [orderItems, setOrderItems] = useState(initialOrderItems);
  const [totalOrderPrice, setTotalOrderPrice] = useState(
    initialTotalOrderPrice,
  );

  const handleIncreaseCount = index => {
    const newOrderItems = [...orderItems];
    newOrderItems[index].count += 1;
    setOrderItems(newOrderItems);
    updateTotalPrice(newOrderItems);
  };

  const handleDecreaseCount = index => {
    const newOrderItems = [...orderItems];
    if (newOrderItems[index].count > 1) {
      newOrderItems[index].count -= 1;
      setOrderItems(newOrderItems);
      updateTotalPrice(newOrderItems);
    }
  };

  const handleRemoveItem = index => {
    const newOrderItems = orderItems.filter((_, i) => i !== index);
    setOrderItems(newOrderItems);
    updateTotalPrice(newOrderItems);
  };

  const updateTotalPrice = items => {
    const newTotalPrice = items.reduce(
      (total, item) => total + item.price * item.count,
      0,
    );
    setTotalOrderPrice(newTotalPrice);
  };

  return (
    <div className="right">
      <h2 className="order-tab">주문표</h2>
      <div className="order-menu">
        {orderItems.length === 0 ? (
          "주문표에 담긴 메뉴가 없습니다."
        ) : (
          <ul>
            {orderItems.map((item, index) => (
              <li key={index}>
                {item.name} {(item.price * item.count).toLocaleString()}원
                <br />
                <button onClick={() => handleDecreaseCount(index)}>
                  -
                </button>{" "}
                {item.count}개
                <button onClick={() => handleIncreaseCount(index)}>+</button>
                <button onClick={() => handleRemoveItem(index)}>취소</button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="order-price">
        총 가격: {totalOrderPrice.toLocaleString()}원
      </div>
      <div className="order-button">주문하기</div>
    </div>
  );
};

export default Pay;

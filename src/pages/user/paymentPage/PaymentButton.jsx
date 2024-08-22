// PaymentButton.js
import React from "react";

const PaymentButton = ({ onClick, style, children }) => {
  return (
    <button onClick={onClick} className="payment-page__button payment-btn">
      {children}
    </button>
  );
};

export default PaymentButton;

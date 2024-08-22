// PaymentButton.js
import React from "react";

const PaymentButton = ({ onClick, style, children }) => {
  return (
    <div onClick={onClick} style={{ ...style, cursor: "pointer" }}>
      {children}
    </div>
  );
};

export default PaymentButton;

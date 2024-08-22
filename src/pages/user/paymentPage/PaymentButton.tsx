import React from "react";

// Props의 타입 정의
interface PaymentButtonProps {
  onClick: () => void;
  children: React.ReactNode; // children은 React 노드로 타입 정의
}

const PaymentButton: React.FC<PaymentButtonProps> = ({
  onClick,

  children,
}) => {
  return (
    <button onClick={onClick} className="payment-page__button payment-btn">
      {children}
    </button>
  );
};

export default PaymentButton;

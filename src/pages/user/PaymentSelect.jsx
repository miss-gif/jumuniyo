import React, { useState } from "react";
import { useSelector } from "react-redux";
import usePortOne from "../../hooks/usePortOne";
import useButtonClass from "../../hooks/useButtonClass";

const PaymentSelect = ({ onPaymentSelect }) => {
  const [selectedPayment, setSelectedPayment] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const accessToken = useSelector(state => state.user.accessToken);

  usePortOne();
  const getButtonClass = useButtonClass(selectedPayment, selectedPaymentMethod);

  const handlePaymentSelect = (event, method) => {
    event.preventDefault();
    setSelectedPayment(method);
    onPaymentSelect(method);
    setSelectedPaymentMethod(method);
  };

  const handlePaymentMethod = (event, method) => {
    event.preventDefault();
    setSelectedPaymentMethod(method);
    setSelectedPayment(method);
    onPaymentSelect(method);
  };

  return (
    <div className="payment-page__input-wrap">
      <h3 className="payment-page__subtitle">결제수단 선택</h3>
      <div className="payment-page__payment-method">
        <div className="payment-wrap">
          <h4>
            주문이요<span>웹에서 미리 결제</span>
          </h4>
          <div className="payment-page__onsite-payment">
            <button
              className={getButtonClass("CARD", true)}
              onClick={event => handlePaymentMethod(event, "CARD")}
            >
              카드결제
            </button>
            <button
              className={getButtonClass("MOBILE", true)}
              onClick={event => handlePaymentMethod(event, "MOBILE")}
            >
              휴대폰 소액결제
            </button>
          </div>
        </div>
        <div className="payment-wrap">
          <h4>현장결제</h4>
          <div className="payment-page__onsite-payment">
            <button
              className={getButtonClass("1")}
              onClick={event => handlePaymentSelect(event, "1")}
            >
              현금
            </button>
            <button
              className={getButtonClass("2")}
              onClick={event => handlePaymentSelect(event, "2")}
            >
              신용카드
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSelect;

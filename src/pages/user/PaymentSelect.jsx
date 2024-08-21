import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import PaymentButton from "./paymentPage/PaymentButton";

const PaymentSelect = ({ onPaymentSelect }) => {
  const [selectedPayment, setSelectedPayment] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const accessToken = useSelector(state => state.user.accessToken);

  useEffect(() => {
    const loadPortOne = () => {
      if (!window.PortOne) {
        const script = document.createElement("script");
        script.src = "https://cdn.portone.io/v2/browser-sdk.js";
        script.onload = () => console.log("PortOne SDK 로드 완료");
        script.onerror = () => console.error("PortOne SDK 로드 오류");
        document.body.appendChild(script);
      }
    };
    loadPortOne();
  }, []);

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

  const handlePayment = async () => {
    let pay;
    switch (selectedPaymentMethod) {
      case "VIRTUAL_ACCOUNT":
        pay = { virtualAccount: { accountExpiry: { validHours: 1 } } };
        break;
      case "MOBILE":
        pay = { productType: "DIGITAL" };
        break;
      default:
        pay = {};
        break;
    }

    if (!window.PortOne) {
      console.error("PortOne SDK가 아직 로드되지 않았습니다.");
      return;
    }

    try {
      const orderResponse = await axios.post(
        "/api/order/",
        {
          order_res_pk: 1163,
          order_request: "주문",
          payment_method:
            selectedPaymentMethod === "VIRTUAL_ACCOUNT" ? "5" : "1",
          order_phone: "010-0000-0000",
          order_address: "Seoul, Korea",
          menu: [{ menu_pk: 217852, menu_count: 1, menu_option_pk: [] }],
          use_mileage: 0,
          coupon: null,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (orderResponse.data.statusCode !== 1) {
        throw new Error(orderResponse.data.resultMsg || "주문 생성 실패");
      }

      const orderPK = orderResponse.data.resultData.order_pk;
      const redirectUrl = `http://localhost:3000/mypage/order/${orderPK}`;

      const paymentResponse = await window.PortOne.requestPayment({
        storeId: "store-fea01fbe-7f7a-4c41-9ab7-7ca7249ebc2a",
        channelKey: "channel-key-fb10d184-0d73-441a-98cf-b354125c63f4",
        paymentId: `payment-${crypto.randomUUID()}`,
        orderName: "주문이요 - 웹 결제",
        totalAmount: orderResponse.data.resultData.total_price,
        currency: "CURRENCY_KRW",
        payMethod: selectedPaymentMethod,
        ...pay,
        customer: {
          customerId: accessToken,
        },
        customData: orderPK,
        redirectUrl: redirectUrl,
      });
    } catch (error) {
      console.error("결제 요청 중 오류 발생:", error);
    }
  };

  const getButtonClass = (method, isPaymentMethod = false) => {
    if (isPaymentMethod) {
      return `payment-page__button ${selectedPaymentMethod === method ? "btn--active" : "btn--default"}`;
    }
    return `payment-page__button ${selectedPayment === method ? "btn--active" : "btn--default"}`;
  };

  return (
    <div className="payment-page__input-wrap">
      <PaymentButton onClick={handlePayment} style={{ marginTop: "20px" }}>
        결제하기
      </PaymentButton>
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
              통합모듈 결제
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

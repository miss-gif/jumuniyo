import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const TestModule = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const accessToken = useSelector(state => state.user.accessToken);

  useEffect(() => {
    // PortOne SDK 로드
    const loadPortOne = async () => {
      if (!window.PortOne) {
        const script = document.createElement("script");
        script.src = "https://cdn.portone.io/v2/browser-sdk.js";
        script.onload = () => console.log("PortOne SDK 로드 완료");
        document.body.appendChild(script);
      }
    };
    loadPortOne();
  }, []);

  const handlePayment = async () => {
    let pay;
    switch (paymentMethod) {
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
      // 주문 정보 전송
      const orderResponse = await axios.post(
        "/api/order/",
        {
          order_res_pk: 1163,
          order_request: "1",
          payment_method: paymentMethod === "VIRTUAL_ACCOUNT" ? "5" : "1", // 예시로 후불과 가상계좌의 구분을 설정
          order_phone: "010-0000-0000",
          order_address: "Seoul, Korea",
          menu: [
            {
              menu_pk: 81143,
              menu_count: 1,
              menu_option_pk: [365922],
            },
          ],
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

      if (!paymentMethod) {
        // SSE로 갱신 요청 전송
        const eventSource = new EventSource("/sse");

        eventSource.onopen = () => {
          console.log("SSE 연결됨.");
          // SSE 연결이 성공적으로 열렸을 때, 서버로부터 이벤트를 받기 시작합니다.
        };

        eventSource.onmessage = event => {
          // 서버로부터 이벤트 수신 시 처리
          console.log("서버 메시지:", event.data);
        };

        eventSource.onerror = err => {
          console.error("SSE 연결 오류:", err);
          eventSource.close(); // 오류 발생 시 연결 종료
        };

        return; // 후불 결제의 경우 결제 프로세스 종료
      }

      // 결제 요청
      const paymentResponse = await window.PortOne.requestPayment({
        storeId: "store-fea01fbe-7f7a-4c41-9ab7-7ca7249ebc2a",
        channelKey: "channel-key-fb10d184-0d73-441a-98cf-b354125c63f4",
        paymentId: `payment-${crypto.randomUUID()}`,
        orderName: "모듈에서 뜨는 상품명",
        totalAmount: orderResponse.data.resultData.total_price,
        currency: "CURRENCY_KRW",
        payMethod: paymentMethod,
        ...pay,
        customer: {
          customerId: "customer-id-from-jwt", // 필요한 경우 리덕스에서 토큰 기반 사용자 ID 추출
        },
        customData: JSON.stringify({ orderPK }), // 주문 고유 PK 첨부
        redirectUrl: "http://localhost:8080/", // 결제 완료 후 리다이렉트 URL
      });
      console.log(paymentResponse);
    } catch (error) {
      console.error("결제 요청 중 오류 발생:", error);
    }
  };

  return (
    <div>
      <select onChange={e => setPaymentMethod(e.target.value)}>
        <option value="" data-int="1">
          후불 현금결제
        </option>
        <option value="" data-int="2">
          후불 신용카드 결제
        </option>
        <option value="CARD" data-int="3">
          통합모듈
        </option>
        <option value="TRANSFER" data-int="4">
          실시간 계좌이체
        </option>
        <option value="VIRTUAL_ACCOUNT" data-int="5">
          가상계좌
        </option>
        <option value="MOBILE" data-int="6">
          휴대폰 소액결제
        </option>
      </select>
      <div onClick={handlePayment}>결제하기</div>
    </div>
  );
};

export default TestModule;
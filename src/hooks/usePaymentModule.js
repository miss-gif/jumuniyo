import { useCallback } from "react";
import axios from "axios";

const usePaymentModule = (
  selectedPaymentMethod,
  accessToken,
  onPaymentSelect,
) => {
  const paymentModule = useCallback(async () => {
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

      // requestPayment 호출 후의 결과 구조에 맞게 수정
      const response = await window.PortOne.requestPayment({
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

      if (response.code != null) {
        // 오류 발생
        return alert(response.message);
      }

      // 결제 완료 후 추가 로직 수행
      // 예를 들어, 결제 완료 페이지로 이동
      window.location.href = redirectUrl;
    } catch (error) {
      console.error("결제 요청 중 오류 발생:", error.message || error);
    }
  }, [selectedPaymentMethod, accessToken]);

  return paymentModule;
};

export default usePaymentModule;

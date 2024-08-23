import { useCallback } from "react";
import axios from "axios";

const usePaymentModule = (
  selectedPaymentMethod,
  accessToken,
  onPaymentSelect,
  orderRequest,
  orderPhone,
  orderAddress,
  items,
  coupon,
  useMileage = 0,
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
      const data = {
        order_res_pk: 2050, // 이 값은 동적으로 설정할 수 있음
        order_request: orderRequest,
        payment_method: selectedPaymentMethod === "VIRTUAL_ACCOUNT" ? "5" : "1",
        order_phone: orderPhone,
        order_address: orderAddress,
        menu: items.map(item => ({
          menu_pk: item.menu_pk,
          menu_count: item.quantity,
          menu_option_pk: item.selectedOptions
            ? Object.keys(item.selectedOptions).map(optionPk =>
                Number(optionPk),
              )
            : [],
        })),
        use_mileage: useMileage,
        coupon: coupon ? coupon.id : null,
      };

      const orderResponse = await axios.post("/api/order/", data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (orderResponse.data.statusCode !== 1) {
        throw new Error(orderResponse.data.resultMsg || "주문 생성 실패");
      }

      const orderPK = orderResponse.data.resultData.order_pk;
      const redirectUrl = `https://zumuniyo.shop/mypage/order/${orderPK}`;

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
        return alert(response.message);
      }

      window.location.href = redirectUrl;
    } catch (error) {
      console.error("결제 요청 중 오류 발생:", error.message || error);
    }
  }, [
    selectedPaymentMethod,
    accessToken,
    orderRequest,
    orderPhone,
    orderAddress,
    items,
    coupon,
    useMileage,
  ]);

  return paymentModule;
};

export default usePaymentModule;

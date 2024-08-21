import { Checkbox } from "@mui/material";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { clearCoupon } from "../app/couponSlice";
import PaymentSelect from "./user/PaymentSelect";
import CouponModal from "./user/paymentPage/CouponModal";

const PaymentPage = () => {
  const dispatch = useDispatch();
  const userPhone = useSelector(state => state.user.userPhone) || "";
  const locationData = useSelector(state => state.user.locationData) || "";
  const userAddress = useSelector(state => state.user.userAddress) || "";
  const accessToken = useSelector(state => state.user.accessToken) || "";
  const searchTerm = useSelector(state => state.user.searchTerm) || "";
  const { id } = useParams();
  const [isModal, setIsModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [request, setRequest] = useState(""); // 요청사항 상태
  const [selectedPayment, setSelectedPayment] = useState(""); // 결제수단 상태
  const [addressDetail1, setAddressDetail1] = useState(""); // 주소 상태
  const [addressDetail, setAddressDetail2] = useState(""); // 상세주소 상태
  const [phone, setPhone] = useState(userPhone); // 휴대전화 상태
  const [agreement, setAgreement] = useState(false); // 결제 동의 체크 상태
  const appliedCoupon = useSelector(state => state.coupon.appliedCoupon);

  const navigate = useNavigate();
  const restaurantName = sessionStorage.getItem("restaurantName");

  const items = useSelector(state => state.cart.items);

  console.log("items", items);

  // 첫 렌더링 시 쿠폰 값 초기화
  useEffect(() => {
    dispatch(clearCoupon()); // 쿠폰 초기화 액션 호출
  }, [dispatch]);

  const openModal = item => {
    setSelectedItem(item);
    setIsModal(true);
    document.documentElement.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModal(false);
    setSelectedItem(null);
    document.documentElement.style.overflow = "auto";
  };

  // 총 금액 계산
  const totalAmount = useMemo(() => {
    return items.reduce(
      (sum, item) =>
        sum +
        item.menu_price * item.quantity +
        (item.selectedOptions
          ? Object.values(item.selectedOptions).reduce(
              (optionSum, option) => optionSum + option.optionPrice,
              0,
            ) * item.quantity
          : 0),
      0,
    );
  }, [items]);

  // 주소 변경 시 userAddress.addr1 또는 addr2 값 업데이트
  useEffect(() => {
    console.log("searchTerm", searchTerm);
    console.log("userAddress.addr1", userAddress.addr1);

    if (searchTerm === userAddress.addr1) {
      setAddressDetail2(userAddress.addr2);
    } else {
      setAddressDetail2("");
    }
  }, [searchTerm]);

  // 결제 정보 검증 함수
  const validatePaymentInfo = () => {
    if (!addressDetail.trim()) {
      Swal.fire({
        icon: "warning",
        text: "상세주소를 입력해 주세요.",
      });
      return false;
    }
    if (!phone.trim()) {
      Swal.fire({
        icon: "warning",
        text: "휴대전화 번호를 입력해 주세요.",
      });
      return false;
    }
    if (!selectedPayment) {
      Swal.fire({
        icon: "warning",
        text: "결제수단을 선택해 주세요.",
      });
      return false;
    }
    if (!agreement) {
      Swal.fire({
        icon: "warning",
        text: "결제 동의에 체크해 주세요.",
      });
      return false;
    }
    return true;
  };

  const handlePayment = async () => {
    if (!validatePaymentInfo()) return;

    const data = {
      order_res_pk: id,
      order_request: request,
      payment_method: selectedPayment, // This will now handle all payment types
      order_phone: phone,
      order_address: `${searchTerm} ${addressDetail}`,
      menu: items.map(item => ({
        menu_pk: item.menu_pk,
        menu_count: item.quantity,
        menu_option_pk: item.selectedOptions
          ? Object.keys(item.selectedOptions).map(optionPk => Number(optionPk))
          : [],
      })),
      use_mileage: 0,
      coupon: appliedCoupon ? appliedCoupon.id : null, // Coupon data handling
    };

    try {
      const orderResponse = await axios.post("/api/order/", data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (orderResponse.data.statusCode !== 1) {
        throw new Error(orderResponse.data.resultMsg || "주문 생성 실패");
      }

      const orderPK = orderResponse.data.resultData.order_pk;
      let paymentResult;

      // Handle different payment methods
      if (
        selectedPayment === "VIRTUAL_ACCOUNT" ||
        selectedPayment === "MOBILE"
      ) {
        paymentResult = await handleNewPaymentModules(orderPK);
      } else {
        paymentResult = await handleExistingPaymentModules(orderPK);
      }

      if (paymentResult.success) {
        sessionStorage.removeItem(`selectedMenuItems_${id}`);
        sessionStorage.removeItem("restaurantName");

        Swal.fire({
          icon: "success",
          text: "결제가 완료되었습니다.",
        });
        navigate(`/mypage/order/${orderPK}`);
      } else {
        Swal.fire({
          icon: "warning",
          text: "결제에 실패했습니다. 다시 시도해주세요.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: error.response
          ? error.response.data.message
          : "결제에 실패했습니다. 다시 시도해주세요.",
      });
    }
  };

  const handleNewPaymentModules = async orderPK => {
    let pay;
    switch (selectedPayment) {
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
      return { success: false };
    }

    try {
      const paymentResponse = await window.PortOne.requestPayment({
        storeId: "store-fea01fbe-7f7a-4c41-9ab7-7ca7249ebc2a",
        channelKey: "channel-key-fb10d184-0d73-441a-98cf-b354125c63f4",
        paymentId: `payment-${crypto.randomUUID()}`,
        orderName: "모듈에서 뜨는 상품명",
        totalAmount: totalPaymentAmount,
        currency: "CURRENCY_KRW",
        payMethod: selectedPayment,
        ...pay,
        customer: {
          customerId: "customer-id-from-jwt",
        },
        customData: JSON.stringify({ orderPK }),
        redirectUrl: "http://localhost:8080/",
      });

      // 결제 성공 여부를 구체적으로 확인합니다.
      if (paymentResponse.success) {
        return { success: true };
      } else {
        console.error("결제 실패:", paymentResponse.message);
        return { success: false };
      }
    } catch (error) {
      console.error("결제 요청 중 오류 발생:", error);
      return { success: false };
    }
  };

  const handleExistingPaymentModules = async orderPK => {
    // Existing payment module logic here
    // Assuming the existing payment flow is handled here.
    return { success: true };
  };

  // 휴대전화 번호 형식 적용 함수
  const formatPhoneNumber = value => {
    const cleaned = ("" + value).replace(/\D/g, "");
    const match = cleaned.match(/^(\d{3})(\d{3,4})(\d{4})$/);
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }
    return value;
  };

  const handleChange = e => {
    const value = e.target.value;
    const onlyNums = value.replace(/[^0-9]/g, "");
    setPhone(formatPhoneNumber(onlyNums));
  };

  const formatPrice = price => {
    return price.toLocaleString();
  };

  const isPaymentDisabled =
    !addressDetail.trim() || !phone.trim() || !selectedPayment || !agreement;

  // 총 결제 금액 계산
  const totalPaymentAmount = useMemo(() => {
    const discount = appliedCoupon ? appliedCoupon.price : 0;
    return totalAmount - discount;
  }, [totalAmount, appliedCoupon]);

  return (
    <div className="payment-page">
      <div className="payment-page__section">
        <h2 className="payment-page__title">결제하기</h2>
        <div className="payment-page__warp-border">
          <form className="payment-page__form">
            <div className="payment-page__input-wrap">
              <h3 className="payment-page__subtitle">배달정보</h3>
              <div className="payment-page__delivery-info">
                <div>
                  <label htmlFor="address">주소</label>
                  <input
                    type="text"
                    id="address"
                    className="payment-page__input"
                    value={searchTerm}
                    readOnly
                  />
                </div>
                <div>
                  <label htmlFor="addressDetail">상세주소</label>
                  <input
                    type="text"
                    id="addressDetail"
                    className="payment-page__input"
                    placeholder="(필수) 상세주소 입력"
                    value={addressDetail}
                    onChange={e => setAddressDetail2(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="phone">휴대전화번호</label>
                  <input
                    type="text"
                    id="phone"
                    className="payment-page__input"
                    placeholder="(필수) 휴대전화 번호 입력"
                    value={phone}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="payment-page__input-wrap">
              <h3 className="payment-page__subtitle">주문시 요청사항</h3>
              <div className="payment-page__request">
                <textarea
                  name="request"
                  id="request"
                  placeholder="요청사항을 남겨주세요."
                  className="payment-page__textarea"
                  value={request}
                  onChange={e => setRequest(e.target.value)}
                ></textarea>
              </div>
            </div>

            <PaymentSelect onPaymentSelect={setSelectedPayment} />

            <div className="payment-page__input-wrap">
              <h3 className="payment-page__subtitle">할인방법 선택</h3>
              <div className="payment-page__coupon">
                <label htmlFor="coupon">쿠폰</label>
                <div className="payment-page__coupon-wrap">
                  {!appliedCoupon ? (
                    <>
                      <input
                        type="text"
                        id="coupon"
                        placeholder="쿠폰을 선택하세요"
                        className="payment-page__input"
                        onClick={() => {
                          openModal();
                        }}
                      />
                      <div
                        className="payment-page__coupon-btn btn--default"
                        onClick={openModal} // 쿠폰 적용 함수 호출
                      >
                        적용
                      </div>
                    </>
                  ) : (
                    <div className="payment-page__applied-coupon">
                      <h3>적용된 쿠폰: {appliedCoupon.name}</h3>
                      <p>할인 금액: {appliedCoupon.price}원</p>
                      <div
                        className="payment-page__coupon-cancel btn--danger"
                        onClick={openModal} // 쿠폰 취소 함수 호출
                      >
                        쿠폰 변경
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="payment-page__order-summary">
        <h2 className="payment-page__title">주문내역</h2>
        <div className="payment-page__warp-border">
          <h3 className="payment-page__restaurant-name">{restaurantName}</h3>
          <ul>
            {items.map((item, index) => (
              <li key={index} className="payment-page__order-item">
                <p>
                  {item.menu_name}
                  {item.selectedOptions && (
                    <div className="order-summary__options">
                      {Object.entries(item.selectedOptions).map(
                        ([optionPk, option]) => (
                          <div key={optionPk}>
                            {option.optionName}: +
                            {formatPrice(option.optionPrice)}원
                          </div>
                        ),
                      )}
                    </div>
                  )}
                  <span>x {item.quantity}개</span>
                </p>
                <p>
                  {formatPrice(
                    item.menu_price +
                      (item.selectedOptions
                        ? Object.values(item.selectedOptions).reduce(
                            (optionSum, option) =>
                              optionSum + option.optionPrice,
                            0,
                          )
                        : 0),
                  )}
                  원
                </p>
              </li>
            ))}
          </ul>

          {/* 할인 금액 추가 */}
          {appliedCoupon && (
            <div className="payment-page__discount-amount">
              <p>할인 금액</p>
              <p>-{formatPrice(appliedCoupon.price)}원</p>
            </div>
          )}

          {/* 총 결제 금액 */}
          <div className="payment-page__total-amount">
            <p>총 결제 금액</p>
            <p>{formatPrice(totalPaymentAmount)}원</p>
          </div>
        </div>
        <p className="payment-page__terms">
          <label className="agreement-checkbox">
            <span>
              이용약관, 개인정보 수집 및 이용, 개인정보 제3자 제공, 전자금융거래
              이용약관, 만 14세 이상 이용자입니다.
            </span>
            결제에 동의합니다.
            <Checkbox
              sx={{ padding: 0 }}
              checked={agreement}
              onChange={e => setAgreement(e.target.checked)}
            />
          </label>
        </p>
        <button
          className="payment-page__button payment-btn"
          onClick={handlePayment}
          type="submit"
          disabled={isPaymentDisabled}
        >
          결제하기
        </button>
      </div>
      <CouponModal isOpen={isModal} onRequestClose={closeModal} />
    </div>
  );
};

export default PaymentPage;

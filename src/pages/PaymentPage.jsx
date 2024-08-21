import { Checkbox } from "@mui/material";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { clearCoupon } from "../app/couponSlice";
import PaymentSelect from "./user/PaymentSelect";
import TestModule from "./user/TestModule.jsx";
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

  // 총 주문 금액 계산
  const calculateTotalOrderPrice = () => {
    return items.reduce(
      (total, item) => total + item.menu_price * item.quantity,
      0,
    );
  };

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
      payment_method: selectedPayment,
      order_phone: phone,
      order_address: `${searchTerm} ${addressDetail}`,
      menu: items.map(item => ({
        menu_pk: item.menu_pk,
        menu_count: item.quantity,
        menu_option_pk: item.selectedOptions
          ? Object.keys(item.selectedOptions).map(optionPk => Number(optionPk)) // 옵션의 pk를 추출하여 배열로 할당
          : [],
      })),
      use_mileage: 0,
      coupon: null,
    };

    try {
      const res = await axios.post("/api/order/", data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (res.data.statusCode === 1) {
        sessionStorage.removeItem(`selectedMenuItems_${id}`);
        sessionStorage.removeItem("restaurantName");

        const orderPk = res.data.resultData.order_pk;

        Swal.fire({
          icon: "success",
          text: res.data.resultMsg,
        });
        navigate(`/mypage/order/${orderPk}`);
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

            <TestModule />
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

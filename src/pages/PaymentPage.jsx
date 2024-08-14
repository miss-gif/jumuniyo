import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import PaymentSelect from "./user/PaymentSelect";
import { Checkbox } from "@mui/material";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { initiateKakaoPay } from "../utils/kakaopayUtils";
import Swal from "sweetalert2";

const PaymentPage = () => {
  const userPhone = useSelector(state => state.user.userPhone) || "";
  const locationData = useSelector(state => state.user.locationData) || "";
  const userAddress = useSelector(state => state.user.userAddress) || "";
  const accessToken = useSelector(state => state.user.accessToken) || "";
  const { id } = useParams();

  const [request, setRequest] = useState(""); // 요청사항 상태
  const [selectedPayment, setSelectedPayment] = useState(""); // 결제수단 상태
  const [menuPkArray, setMenuPkArray] = useState([]); // 메뉴 PK 배열 상태
  const [order, setOrder] = useState([]); // 주문 상세 정보 상태
  const [addressDetail1, setAddressDetail1] = useState(""); // 주소 상태
  const [addressDetail, setAddressDetail] = useState(""); // 상세주소 상태
  const [phone, setPhone] = useState(userPhone); // 휴대전화 상태
  const [agreement, setAgreement] = useState(false); // 결제 동의 체크 상태

  const navigate = useNavigate();
  const restaurantName = sessionStorage.getItem("restaurantName");

  useEffect(() => {
    const selectedMenuItems =
      JSON.parse(sessionStorage.getItem(`selectedMenuItems_${id}`)) || [];
    setOrder(selectedMenuItems);
    const menuPkArray = selectedMenuItems.flatMap(item =>
      Array(item.quantity).fill(item.menu_pk),
    );
    setMenuPkArray(menuPkArray);
  }, [id]);

  // 주소 변경 시 userAddress.addr1 또는 addr2 값 업데이트
  useEffect(() => {
    if (
      locationData.latitude === userAddress.addrCoorX &&
      locationData.longitude === userAddress.addrCoorY
    ) {
      setAddressDetail1(userAddress.addr1);
      setAddressDetail(userAddress.addr2);
    }
  }, [locationData, userAddress]);

  const calculateTotalPrice = item => {
    return item.menu_price * item.quantity;
  };

  const calculateTotalOrderPrice = () => {
    return order.reduce((total, item) => total + calculateTotalPrice(item), 0);
  };

  const handlePayment = async () => {
    if (!addressDetail.trim()) {
      Swal.fire({
        icon: "warning",
        text: "상세주소를 입력해 주세요.",
      });
      return;
    }
    if (!phone.trim()) {
      Swal.fire({
        icon: "warning",
        text: "휴대전화 번호를 입력해 주세요.",
      });
      return;
    }
    if (!selectedPayment) {
      Swal.fire({
        icon: "warning",
        text: "결제수단을 선택해 주세요.",
      });
      return;
    }
    if (!agreement) {
      Swal.fire({
        icon: "warning",
        text: "결제 동의에 체크해 주세요.",
      });
      return;
    }

    if (selectedPayment === "3") {
      try {
        // 카카오페이 결제 요청
        const order_pk = await initiateKakaoPay(
          calculateTotalOrderPrice(),
          phone,
          id, // 주문 ID
          accessToken, // 인증 토큰
          request,
          locationData,
          addressDetail,
          menuPkArray,
        );

        console.log("받아온 order_pk:", order_pk); // order_pk 확인용 로그

        if (order_pk) {
          Swal.fire({
            icon: "success",
            text: "결제 완료: " + order_pk,
          });

          // 결제 성공 후 이동
          navigate(`/mypage/order/${order_pk}`); // 주문 ID를 사용하여 이동

          // 결제 성공 후 세션 저장소 데이터 삭제
          sessionStorage.removeItem(`selectedMenuItems_${id}`);
          sessionStorage.removeItem("restaurantName");
        } else {
          throw new Error("결제 완료 후 order_pk를 받지 못했습니다.");
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          text: "결제 실패: " + error.message,
        });
        console.error("결제 오류:", error);
      }
      return;
    }

    const data = {
      order_res_pk: id,
      order_request: request, // 상태에서 요청사항 가져오기
      payment_method: selectedPayment, // 상태에서 결제수단 가져오기
      order_phone: phone,
      order_address: `${addressDetail1} ${addressDetail}`, // 주소 합치기
      menu: order.map(item => ({
        menu_pk: item.menu_pk,
        menu_count: item.quantity,
        menu_option_pk: item.menu_option_pk || [],
      })), // 메뉴 데이터 구조 변경
      use_mileage: 0, // 마일리지 0으로 하드코딩
      coupon: null, // 쿠폰 값은 null로 설정
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

        // `order_pk` 값을 사용하여 경로 설정
        const orderPk = res.data.resultData.order_pk;

        Swal.fire({
          icon: "success",
          text: res.data.resultMsg,
        });
        navigate(`/mypage/order/${orderPk}`); // orderPk를 사용하여 이동
      } else {
        Swal.fire({
          icon: "warning",
          text: "결제에 실패했습니다. 다시 시도해주세요.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: "결제에 실패했습니다. 다시 시도해주세요.",
      });
      console.log(error);
    }
  };

  // 휴대전화 번호 형식 적용 함수
  const formatPhoneNumber = value => {
    // 숫자만 추출
    const cleaned = ("" + value).replace(/\D/g, "");
    const match = cleaned.match(/^(\d{3})(\d{3,4})(\d{4})$/);
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }
    return value;
  };

  const handleChange = e => {
    const value = e.target.value;
    // 숫자만 입력 가능하도록 설정
    const onlyNums = value.replace(/[^0-9]/g, "");
    setPhone(formatPhoneNumber(onlyNums));
  };

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
                    value={addressDetail1 || locationData.geocodeAddress} // 조건에 따라 주소 표시
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
                    onChange={e => setAddressDetail(e.target.value)} // 상세주소 상태 업데이트
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
                  onChange={e => setRequest(e.target.value)} // 요청사항 상태 업데이트
                ></textarea>
              </div>
            </div>
            <PaymentSelect onPaymentSelect={setSelectedPayment} />
            {/* 결제수단 선택 전달 */}
            <div className="payment-page__input-wrap">
              <h3 className="payment-page__subtitle">할인방법 선택</h3>
              <div className="payment-page__coupon">
                <label htmlFor="coupon">쿠폰</label>
                <div className="payment-page__coupon-wrap">
                  <input
                    type="text"
                    id="coupon"
                    className="payment-page__input"
                  />
                  <button className="payment-page__coupon-btn btn--default">
                    적용
                  </button>
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
            {order.map((item, index) => (
              <li key={index} className="payment-page__order-item">
                <p>
                  {item.menu_name} <span>x {item.quantity}개</span>
                </p>
                <p>{calculateTotalPrice(item)}원</p>
              </li>
            ))}
          </ul>

          {/* 결제 */}
          <div className="payment-page__total-amount">
            <p>총 결제 금액</p>
            <p>{calculateTotalOrderPrice()}원</p>
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
        >
          결제하기
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;

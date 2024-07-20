import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import PaymentSelect from "./user/PaymentSelect";
import { Checkbox } from "@mui/material";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { initiateKakaoPay } from "../utils/kakaopayUtils";

const PaymentPage = () => {
  const userPhone = useSelector(state => state.user.userPhone) || "";
  const locationData = useSelector(state => state.user.locationData);
  const accessToken = useSelector(state => state.user.accessToken);
  const { id } = useParams();

  const [request, setRequest] = useState(""); // 요청사항 상태
  const [selectedPayment, setSelectedPayment] = useState(""); // 결제수단 상태
  const [menuPkArray, setMenuPkArray] = useState([]); // 메뉴 PK 배열 상태
  const [order, setOrder] = useState([]); // 주문 상세 정보 상태
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

  useEffect(() => {
    if (!locationData || !locationData.geocodeAddress) {
      alert("주소 정보를 불러올 수 없습니다. 다시 시도해 주세요.");
      navigate(-1); // 이전 페이지로 이동
    }
  }, [locationData, navigate]);

  const calculateTotalPrice = item => {
    return item.menu_price * item.quantity;
  };

  const calculateTotalOrderPrice = () => {
    return order.reduce((total, item) => total + calculateTotalPrice(item), 0);
  };

  const handlePayment = async () => {
    // 입력 값 검증
    if (!addressDetail.trim()) {
      alert("상세주소를 입력해 주세요.");
      return;
    }
    if (!phone.trim()) {
      alert("휴대전화 번호를 입력해 주세요.");
      return;
    }
    if (!selectedPayment) {
      alert("결제수단을 선택해 주세요.");
      return;
    }
    if (!agreement) {
      alert("결제 동의에 체크해 주세요.");
      return;
    }

    if (selectedPayment === "카카오페이") {
      try {
        // 카카오페이 결제 요청
        const orderId = await initiateKakaoPay(
          calculateTotalOrderPrice(),
          phone,
          id, // 주문 ID
          accessToken, // 인증 토큰
          request,
          locationData,
          addressDetail,
          menuPkArray,
        );
        alert("결제 완료: " + orderId);

        // 결제 성공 후 이동
        navigate(`/mypage/order/${orderId}`); // 주문 ID를 사용하여 이동

        // 결제 성공 후 세션 저장소 데이터 삭제
        sessionStorage.removeItem(`selectedMenuItems_${id}`);
        sessionStorage.removeItem("restaurantName");
      } catch (error) {
        alert("결제 실패: " + error);
      }
      return;
    }

    const data = {
      order_res_pk: id,
      order_request: request, // 상태에서 요청사항 가져오기
      payment_method: selectedPayment, // 상태에서 결제수단 가져오기
      order_phone: phone,
      order_address: `${locationData.geocodeAddress} ${addressDetail}`, // 주소 합치기
      menu_pk: menuPkArray,
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
        alert(res.data.resultMsg);
        navigate(`/mypage/order/${res.data.resultData}`);
      } else {
        alert("결제에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      alert("결제에 실패했습니다. 다시 시도해주세요.");
      console.log(error);
    }
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
                    value={locationData.geocodeAddress}
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
                    type="number"
                    id="phone"
                    className="payment-page__input"
                    placeholder="(필수) 휴대전화 번호 입력"
                    value={phone}
                    onChange={e => setPhone(e.target.value)} // 휴대전화 상태 업데이트
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
            <div className="payment-page__input-wrap none">
              <h3 className="payment-page__subtitle">할인방법 선택</h3>
              <div className="payment-page__coupon ">
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
              이용약관, 개인정보 수집 및 이용, 개인정보 제3자 제공 ,
              전자금융거래 이용약관, 만 14세 이상 이용자입니다.
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
        >
          결제하기
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;

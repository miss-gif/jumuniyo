import React from "react";
import { useSelector } from "react-redux"; // useSelector 임포트
import PaymentSelect from "./user/PaymentSelect";
import { Checkbox } from "@mui/material";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const order = []; // OrderContext 대신 사용할 수 있는 임시 데이터
  const userAddress = useSelector(state => state.user.userAddress) || {}; // 주소 가져오기
  const userPhone = useSelector(state => state.user.userPhone) || ""; // 전화번호 가져오기
  const [cookies] = useCookies(["accessToken"]);
  const navigate = useNavigate();

  const restaurantName = sessionStorage.getItem("restaurantName");

  const calculateTotalPrice = item => {
    return item.menu_price * item.quantity;
  };

  const calculateTotalOrderPrice = () => {
    return order.reduce((total, item) => total + calculateTotalPrice(item), 0);
  };

  const handlePayment = async () => {
    const data = {
      order_res_pk: 1,
      order_request: "요청사항",
      payment_method: "결제수단 키",
      order_phone: userPhone, // 저장된 전화번호 사용
      order_address: `${userAddress.addr1} ${userAddress.addr2}`, // 저장된 주소 사용
      menu_pk: [92],
    };

    try {
      const res = await axios.post("/api/order/", data, {
        headers: {
          Authorization: `Bearer ${cookies.accessToken}`,
        },
      });

      if (res.data.statusCode === 1) {
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
                    value={userAddress.addr1 || ""}
                    readOnly
                  />
                </div>
                <div>
                  <label htmlFor="address"></label>
                  <input
                    type="text"
                    id="address"
                    className="payment-page__input"
                    placeholder="(필수) 상세주소 입력"
                    value={userAddress.addr2 || ""}
                  />
                </div>
                <div>
                  <label htmlFor="phone">휴대전화번호</label>
                  <input
                    type="text"
                    id="phone"
                    className="payment-page__input"
                    value={userPhone}
                    placeholder="(필수) 휴대전화 번호 입력"
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
                ></textarea>
              </div>
            </div>
            <PaymentSelect />
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
                <p>{calculateTotalPrice(item)}원</p> {/* 계산된 총 가격 표시 */}
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
          <span>
            이용약관, 개인정보 수집 및 이용, 개인정보 제3자 제공 , 전자금융거래
            이용약관, 만 14세 이상 이용자입니다.
          </span>
          <label className="agreement-checkbox">
            결제에 동의합니다.
            <Checkbox sx={{ padding: 0 }} />
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

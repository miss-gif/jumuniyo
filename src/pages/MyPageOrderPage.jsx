import React from "react";
import OrderPreview from "../components/common/OrderPreview";

const MyPageOrderPage = () => {
  return (
    <div className="mypage-order">
      <OrderPreview />
      <div className="mypage-order-content">
        <h2 className="mypage-order__title">주문완료</h2>
        <div className="mypage-order__contents">
          <div className="주문완료-안내">
            <p className="mypage-order__thanks">주문 감사합니다</p>
            <p className="mypage-order__confirmation">
              주문 요청이 완료되었으며 고객님의 휴대전화 번호로 주문 확인 문자가
              곧 발송됩니다
            </p>
          </div>

          <div className="mypage-order__section">
            <div className="mypage-order__section-title">배달정보</div>
            <div className="mypage-order__detail">
              <p className="mypage-order__label">주문번호</p>
              <p className="mypage-order__value">111111111</p>
            </div>
            <div className="mypage-order__detail">
              <p className="mypage-order__label">주문시간</p>
              <p className="mypage-order__value">24.07.07 오후 11:48</p>
            </div>
            <div className="mypage-order__detail">
              <p className="mypage-order__label">배달완료시간</p>
              <p className="mypage-order__value">24.07.07 오후 12:48</p>
            </div>
          </div>

          <div className="mypage-order__section">
            <div className="mypage-order__section-title">주문자 정보</div>
            <div className="mypage-order__detail">
              <p className="mypage-order__label">연락처</p>
              <p className="mypage-order__value">013-111-1111</p>
            </div>
            <div className="mypage-order__detail">
              <p className="mypage-order__label">주소</p>
              <p className="mypage-order__value">
                대구광역시 서구 평리동 11-55
              </p>
            </div>
            <div className="mypage-order__detail">
              <p className="mypage-order__label">가게 요청사항</p>
              <p className="mypage-order__value">수저, 포크 필요해요</p>
            </div>
            <div className="mypage-order__detail">
              <p className="mypage-order__label">라이더 요청사항</p>
              <p className="mypage-order__value">문 앞에 두세요</p>
            </div>
            <div className="mypage-order__detail">
              <p className="mypage-order__label">결제수단</p>
              <p className="mypage-order__value">현장결제 - 신용카드 결제</p>
            </div>
          </div>

          <div className="mypage-order__section">
            <div className="mypage-order__section-title">주문내역</div>
            <ul className="mypage-order__item">
              <li>
                <p className="mypage-order__item-name">
                  순살 후라이드 <span>x 1개</span>
                </p>
                <p className="mypage-order__item-price">16,000원</p>
              </li>
              <li>
                <p className="mypage-order__item-name">
                  순살 후라이드 <span>x 1개</span>
                </p>
                <p className="mypage-order__item-price">16,000원</p>
              </li>
            </ul>
          </div>
          <div className="mypage-order__total">
            <p className="mypage-order__total-label">총 결제금액</p>
            <p className="mypage-order__total-price">16,000원</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPageOrderPage;

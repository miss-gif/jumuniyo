import React from "react";

const MyPageOrderPage = () => {
  return (
    <div className="mypage-order">
      <h2 className="mypage-order__title">주문완료</h2>
      <p className="mypage-order__thanks">주문 감사합니다</p>
      <p className="mypage-order__confirmation">
        주문 요청이 완료되었으며 고객님의 휴대전화 번호로 주문 확인 문자가 곧
        발송됩니다
      </p>
      <div className="mypage-order__section-title">배달정보</div>
      <div className="mypage-order__detail">
        <p className="mypage-order__label">주문식당</p>
        <p className="mypage-order__value">후라이드참잘하는집</p>
      </div>
      <div className="mypage-order__detail">
        <p className="mypage-order__label">결제수단</p>
        <p className="mypage-order__value">현장결제 - 신용카드 결제</p>
      </div>
      <div className="mypage-order__detail">
        <p className="mypage-order__label">주문자정보</p>
        <p className="mypage-order__value">
          서울특별시 강남구 삼성동 143-10 위워크 타워
        </p>
      </div>
      <div className="mypage-order__detail">
        <p className="mypage-order__label">연락처</p>
        <p className="mypage-order__value">01012345551</p>
      </div>
      <div className="mypage-order__section-title">주문내역</div>
      <div className="mypage-order__item">
        <p className="mypage-order__item-name">
          순살 후라이드 <span>x 1개</span>
        </p>
        <p className="mypage-order__item-price">16,000원</p>
      </div>
      <div className="mypage-order__total">
        <p className="mypage-order__total-label">총 결제금액</p>
        <p className="mypage-order__total-price">16,000원</p>
      </div>
    </div>
  );
};

export default MyPageOrderPage;

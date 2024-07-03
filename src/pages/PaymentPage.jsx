import React from "react";

const PaymentPage = () => {
  return (
    <div className="payment-page">
      <div className="payment-page__section">
        <h2 className="payment-page__title">결제하기</h2>
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
                />
              </div>
              <div>
                <label htmlFor="address"></label>
                <input
                  type="text"
                  id="address"
                  className="payment-page__input"
                  placeholder="(필수) 상세주소 입력"
                />
              </div>
              <div>
                <label htmlFor="phone">휴대전화번호</label>
                <input
                  type="text"
                  id="phone"
                  className="payment-page__input"
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
          <div className="payment-page__input-wrap">
            <h3 className="payment-page__subtitle">결제수단 선택</h3>
            <div className="payment-page__payment-method">
              <div className="payment-page__mobile-payment">
                <button className="payment-page__button btn--active">
                  네이버페이
                </button>
                <button className="payment-page__button btn--default">
                  카카오페이
                </button>
              </div>
              <div className="payment-page__onsite-payment">
                <button className="payment-page__button btn--default">
                  신용카드
                </button>
                <button className="payment-page__button btn--default">
                  현금
                </button>
              </div>
            </div>
          </div>
          <div className="payment-page__input-wrap">
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
      <div className="payment-page__order-summary">
        <p className="payment-page__title">주문내역</p>
        <p className="payment-page__restaurant-name">음식점 상호명</p>
        <div className="payment-page__order-item">
          <p>
            우삼겹 투움바 파스타 <span>x 1개</span>
          </p>
          <p>23,000원</p>
        </div>
        <div className="payment-page__total-amount">
          <p>총 결제 금액</p>
          <p>23,000원</p>
        </div>
        <p className="payment-page__terms">
          이용약관, 개인정보 수집 및 이용, 개인정보 제3자 제공 , 전자금융거래
          이용약관, 만 14세 이상 이용자 내용 확인하였으며 결제에 동의합니다.
        </p>
        <button className="payment-page__button">결제하기</button>
      </div>
    </div>
  );
};

export default PaymentPage;

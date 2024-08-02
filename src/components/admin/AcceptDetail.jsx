import React from "react";

const AcceptDetail = () => {
  return (
    <>
      <div className="acceptDetail-wrap">
        <h1 className="adminH1">No. 12432</h1>
        <div className="apiandSignInf">
          <div className="apiInf">
            <h1>API 정보</h1>
            <div className="ceo-name">사업자 성함: 김기덕</div>
            <div className="res-name">사업장 이름: 피자와 치킨</div>
            <div className="res-address">
              사업장 주소: 대구광역시 중구 대구로 12길 22
            </div>
            <div className="res-open-date">등록 날짜: 2024-07-07</div>
            <div className="res-status">영업상태: 영업 중</div>
            <div className="certificate-pic">
              <img src="/images/defaultRes.png" alt="사업자 이미지" />
            </div>
          </div>
          <div className="signupInf">
            <h1>회원가입 정보</h1>
            <div className="ceo-name">사업자 성함: 김기덕</div>
            <div className="res-name">사업장 이름: 피자와 치킨</div>
            <div className="res-address">
              사업장 주소: 대구광역시 중구 대구로 12길 22
            </div>
            <div className="res-open-date">가입 날짜: 2024-06-07</div>
          </div>
        </div>
        <div className="buttonforaccept">
          <button className="btn">사업자 승낙</button>
          <button className="btn">사업자 거부</button>
        </div>
      </div>
    </>
  );
};

export default AcceptDetail;

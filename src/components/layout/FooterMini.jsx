import React from "react";
import { Link } from "react-router-dom";

const FooterMini = () => {
  return (
    <div className="inner">
      <div className="footer__wrap">
        <Link to="/" className="logo-wrap">
          <img
            className="footer__logo"
            src={process.env.PUBLIC_URL + "/images/logo_1x.png"}
            alt="Logo"
          />
        </Link>
        <div className="footer__info">
          <h3>주문이요</h3>
          <div className="company-info__text">
            <p>대구 중구 중앙대로 394 제일빌딩 5F 506호</p>
            <p>개인정보담당자 : yumuniyo@gmail.com</p>
            <p>제휴문의 : yumuniyo@gmail.com</p>
            <p>고객만족센터 : yumuniyo@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterMini;

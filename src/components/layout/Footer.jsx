import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="inner">
        <div className="footer__menu">
          <ul>
            <li>
              <Link to="/">이용약관</Link>
            </li>
            <li>
              <Link to="/">개인정보처리방침</Link>
            </li>
            <li>
              <Link to="/">프로젝트 소개</Link>
            </li>
            <li>
              <Link to="/">주문이요사장님</Link>
            </li>
            <li>
              <Link to="/">공지사항</Link>
            </li>
            <li>
              <Link to="/">FAQ</Link>
            </li>
          </ul>
        </div>
        <div className="footer__info">
          <div className="">로고</div>
          <div className="info 영역">
            <div className="company-info">
              <h3>주문이요</h3>
              <div className="company-info__text">
                <p>대구 중구 중앙대로 394 제일빌딩 5F 506호</p>
                <p>FE : 곽도억, 김민기, 권민욱</p>
                <p>BE : 이민역, 공영빈, 김동현, 이하늘, 정형우</p>
                <p>개인정보담당자 : yumuniyo@gmail.com</p>
                <p>제휴문의 : yumuniyo@gmail.com</p>
                <p>고객만족센터 : yumuniyo@gmail.com</p>
              </div>
            </div>
            <div className="service-info">
              <div>주문이요 안심센터</div>
              <div>주문이요100% 클린리뷰</div>
              <div>고객만족센터 0000-000 (유료)</div>
              <div>24시간, 연중무휴</div>
            </div>
            <p className="guide">
              주문이요는 KDT 협업과정 프로젝트이며 통신판매의 당사자가 아닙니다.
              따라서 상품/ 거래정보 및 거래와 관련하여 주문이요에 등록된
              판매자의 고의 또는 과실로 소비자에게 발생하는 손해에 대해
              주문이요는 책임을 지지 않습니다. 상품 및 거래에 관하여 보다 정확한
              정보는 해당 판매자에게 직접 확인하여 주시기 바랍니다. Copyright
              YUMUNIYO. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

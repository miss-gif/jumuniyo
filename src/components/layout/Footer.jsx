import { Link } from "react-router-dom";
import FooterMenu from "./FooterMenu";

const Footer = () => {
  return (
    <footer className="footer">
      <FooterMenu />
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
              <p>FE : 곽도억, 김민기, 권민욱</p>
              <p>BE : 이민역, 공영빈, 김동현, 이하늘, 정형우</p>
              <p>개인정보담당자 : yumuniyo@gmail.com</p>
              <p>제휴문의 : yumuniyo@gmail.com</p>
              <p>고객만족센터 : yumuniyo@gmail.com</p>
            </div>
            <div className="service-info">
              <div>
                주문이요
                <br />
                안심센터
              </div>
              <div>
                주문이요100%
                <br />
                클린리뷰
              </div>
              <div>
                <span>고객만족센터 0000-000 (유료)</span>
              </div>
              <div>24시간, 연중무휴</div>
            </div>
            <p className="guide">
              주문이요는 KDT 협업과정 프로젝트이며 통신판매의 당사자가 아닙니다.
              따라서 상품/ 거래정보 및 거래와 관련하여 주문이요에 등록된
              판매자의 고의 또는 과실로 소비자에게 발생하는 손해에 대해
              주문이요는 책임을 지지 않습니다. 상품 및 거래에 관하여 보다 정확한
              정보는 해당 판매자에게 직접 확인하여 주시기 바랍니다. Copyright
              JUMUNIYO. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

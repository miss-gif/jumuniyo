import React from "react";
import Footer from "../components/layout/Footer";

const CeoPage = () => {
  return (
    <div className="ceo-page">
      <div className="ceo-page__header">
        <h2>주문이요사장님 | 사업장 페이지</h2>
        <div className="ceo-page__controller">
          <div className="ceo-page__user-id">userID</div>
          <button className="ceo-page__button">내정보</button>
          <div className="ceo-page__notification">알림</div>
        </div>
      </div>
      <div className="ceo-page__main">
        <aside className="ceo-page__menu">
          <div className="ceo-page__menu-item">사업장페이지 홈</div>
          <div className="ceo-page__menu-item">주문내역</div>
          <div className="ceo-page__menu-item">메뉴관리</div>
          <div className="ceo-page__menu-item">리뷰관리</div>
          <div className="ceo-page__menu-item">매장관리</div>
          <div className="ceo-page__menu-item">통계</div>
        </aside>
        <div className="ceo-page__content-wrap">
          <div className="ceo-page__content"></div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default CeoPage;

import React from "react";
import CeoHeader from "./CeoHeader";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import { Link } from "react-router-dom";

const CeoLayout = () => {
  return (
    <>
      <CeoHeader />
      <div className="ceo-page">
        <div className="ceo-page__main">
          <aside className="ceo-page__menu">
            <Link to="home" className="ceo-page__menu-item">
              홈
            </Link>
            <Link to="orders" className="ceo-page__menu-item">
              주문내역
            </Link>
            <Link to="menu-management" className="ceo-page__menu-item">
              메뉴관리
            </Link>
            <Link to="reviews" className="ceo-page__menu-item">
              리뷰관리
            </Link>
            <Link to="store-management" className="ceo-page__menu-item">
              매장관리
            </Link>
            <Link to="statistics" className="ceo-page__menu-item">
              통계
            </Link>
          </aside>
          <div className="ceo-page__content-wrap">
            <div className="ceo-page__content">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CeoLayout;

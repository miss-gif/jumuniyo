import React from "react";
import CeoHeader from "./CeoHeader";
import { Outlet, NavLink } from "react-router-dom";
import Footer from "./Footer";

const CeoLayout = () => {
  return (
    <div className="inner">
      <CeoHeader />
      <div className="ceo-page">
        <div className="ceo-page__main">
          <aside className="ceo-page__menu">
            <NavLink
              to="home"
              className={({ isActive }) =>
                isActive ? "ceo-page__menu-item active" : "ceo-page__menu-item"
              }
            >
              홈
            </NavLink>
            <NavLink
              to="orders"
              className={({ isActive }) =>
                isActive ? "ceo-page__menu-item active" : "ceo-page__menu-item"
              }
            >
              주문내역
            </NavLink>
            <NavLink
              to="menu-management"
              className={({ isActive }) =>
                isActive ? "ceo-page__menu-item active" : "ceo-page__menu-item"
              }
            >
              메뉴관리
            </NavLink>
            <NavLink
              to="reviews"
              className={({ isActive }) =>
                isActive ? "ceo-page__menu-item active" : "ceo-page__menu-item"
              }
            >
              리뷰관리
            </NavLink>
            <NavLink
              to="store-management"
              className={({ isActive }) =>
                isActive ? "ceo-page__menu-item active" : "ceo-page__menu-item"
              }
            >
              매장관리
            </NavLink>
            <NavLink
              to="statistics"
              className={({ isActive }) =>
                isActive ? "ceo-page__menu-item active" : "ceo-page__menu-item"
              }
            >
              통계
            </NavLink>
          </aside>
          <div className="ceo-page__content-wrap">
            <div className="ceo-page__content">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CeoLayout;

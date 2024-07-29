/* eslint-disable react/prop-types */
import React from "react";
import Footer from "./Footer";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import CeoHeader from "./CeoHeader";
import FooterMini from "./FooterMini";

const NavButton = ({ path, label, currentPath }) => {
  const navigate = useNavigate();

  return (
    <li
      className={`owner-nav__item ${
        currentPath === path ? "owner-nav__item--active" : ""
      }`}
      onClick={() => navigate(path)}
    >
      {label}
    </li>
  );
};

const AdminLayout = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { path: "/admin/home", label: "사업자 승낙" },
    { path: "/admin/category-setting", label: "카테고리 설정" },
    { path: "/admin/ask", label: "고객문의" },
    { path: "/admin/report", label: "고객신고" },
  ];

  return (
    <>
      <CeoHeader />
      <div className="ceo-page">
        <div className="ceo-page__main">
          <div className="owner-nav">
            {/* <div className="owner-nav__profile">
              <img
                src={
                  userInfo && userInfo.userPic !== null
                    ? `/pic/${userInfo.userPic}`
                    : "/images/defaultRes.png"
                }
                alt="프로필 이미지"
              />
              <p>{restaurantInfo ? restaurantInfo.restaurantName : "닉네임"}</p>
              <span>통합 매니저</span>
            </div>
            <div
              className="owner-nav__search__status"
              onClick={() => navigate("/ceopage/store-management")}
            >
              {restaurantInfo
                ? restaurantInfo.restaurantState === 1
                  ? "영업중"
                  : "준비중"
                : "상태"}
            </div>*/}
            <div className="owner-nav__wrap">
              <ul className="owner-nav__list">
                {navItems.map(({ path, label }) => (
                  <NavButton
                    key={path}
                    path={path}
                    currentPath={currentPath}
                    label={label}
                  />
                ))}
              </ul>
            </div>
          </div>
          <div className="ceo-page__content-wrap">
            <div className="ceo-page__content">
              <Outlet />
            </div>
            <FooterMini />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;

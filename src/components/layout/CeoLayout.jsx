/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import CeoHeader from "./CeoHeader";
import Footer from "./Footer";
import { fetchRestaurantInfo, fetchUserInfo } from "../../api/ceo/ceo";
import { getCookie } from "../../utils/cookie"; // 쿠키 가져오기 함수 추가

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

const CeoLayout = () => {
  const [restaurantInfo, setRestaurantInfo] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = getCookie("accessToken");
      if (!token) {
        navigate("/login");
      }
    };

    const getRestaurantInfo = async () => {
      try {
        const data = await fetchRestaurantInfo();
        setRestaurantInfo(data);
      } catch (error) {
        console.error("Failed to fetch restaurant info", error);
      }
    };

    const getUserInfo = async () => {
      try {
        const data = await fetchUserInfo();
        setUserInfo(data);
      } catch (error) {
        console.error("Failed to fetch user info", error);
      }
    };

    checkLoginStatus(); // 로그인 상태를 먼저 확인
    getRestaurantInfo();
    getUserInfo();
  }, [navigate]);

  const navItems = [
    { path: "/ceopage/home", label: "신규주문" },
    { path: "/ceopage/orders-accepted", label: "접수주문" },
    { path: "/ceopage/reviews", label: "리뷰관리" },
    { path: "/ceopage/store-management", label: "매장관리" },
    { path: "/ceopage/orders-history", label: "주문내역" },
    { path: "/ceopage/statistics", label: "통계" },
  ];

  return (
    <>
      <CeoHeader />
      <div className="ceo-page">
        <div className="ceo-page__main">
          <div className="owner-nav">
            <div className="owner-nav__profile">
              <img
                src={
                  userInfo
                    ? `/pic/${userInfo.userPic}`
                    : "https://picsum.photos/100/"
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
            </div>
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
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default CeoLayout;

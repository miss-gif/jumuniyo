/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import CeoHeader from "./CeoHeader";
import { fetchRestaurantInfo, fetchUserInfo } from "../../api/ceo/ceo";
import { getCookie } from "../../utils/cookie"; // 쿠키 가져오기 함수 추가
import ModalForOk from "../ceo/ModalForOk";
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

const CeoLayout = () => {
  const [restaurantInfo, setRestaurantInfo] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [showModal, setShowModal] = useState(false);
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

        // categories가 비어있고 현재 경로가 store-management가 아닌 경우 모달 창 표시
        if (
          data.categories.length === 0 &&
          currentPath !== "/ceopage/store-management"
        ) {
          setShowModal(true);
        }
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
  }, [navigate, currentPath]);

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/ceopage/store-management");
  };

  const navItems = [
    { path: "/ceopage/home", label: "신규주문" },
    { path: "/ceopage/orders-accepted", label: "접수주문" },
    { path: "/ceopage/reviews", label: "리뷰관리" },
    { path: "/ceopage/store-management", label: "매장관리" },
    { path: "/ceopage/orders-history", label: "주문내역" },
    { path: "/ceopage/statistics", label: "통계" },
    { path: "/ceopage/withdraw", label: "탈퇴" },
  ];

  return (
    <>
      {showModal && (
        <ModalForOk
          message="카테고리를 1개 이상 꼭 설정해주세요!"
          onClose={handleCloseModal}
        />
      )}
      <CeoHeader />
      <div className="ceo-page">
        <div className="ceo-page__main">
          <div className="owner-nav">
            <div className="owner-nav__profile">
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
            <FooterMini />
          </div>
        </div>
      </div>
    </>
  );
};

export default CeoLayout;

/* eslint-disable react/prop-types */
import React from "react";
import CeoHeader from "./CeoHeader";
import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
import Footer from "./Footer";

// const CeoLayout = () => {
//   return (
//     <div className="inner">
//       <CeoHeader />
//       <div className="ceo-page">
//         <div className="ceo-page__main">
//           <aside className="ceo-page__menu">
//             <NavLink
//               to="home"
//               className={({ isActive }) =>
//                 isActive ? "ceo-page__menu-item active" : "ceo-page__menu-item"
//               }
//             >
//               홈
//             </NavLink>
//             <NavLink
//               to="orders"
//               className={({ isActive }) =>
//                 isActive ? "ceo-page__menu-item active" : "ceo-page__menu-item"
//               }
//             >
//               주문내역
//             </NavLink>
//             <NavLink
//               to="menu-management"
//               className={({ isActive }) =>
//                 isActive ? "ceo-page__menu-item active" : "ceo-page__menu-item"
//               }
//             >
//               메뉴관리
//             </NavLink>
//             <NavLink
//               to="reviews"
//               className={({ isActive }) =>
//                 isActive ? "ceo-page__menu-item active" : "ceo-page__menu-item"
//               }
//             >
//               리뷰관리
//             </NavLink>
//             <NavLink
//               to="store-management"
//               className={({ isActive }) =>
//                 isActive ? "ceo-page__menu-item active" : "ceo-page__menu-item"
//               }
//             >
//               매장관리
//             </NavLink>
//             <NavLink
//               to="statistics"
//               className={({ isActive }) =>
//                 isActive ? "ceo-page__menu-item active" : "ceo-page__menu-item"
//               }
//             >
//               통계
//             </NavLink>
//           </aside>
//           <div className="ceo-page__content-wrap">
//             <div className="ceo-page__content">
//               <Outlet />
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default CeoLayout;

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
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { path: "/ceopage/home", label: "홈" },
    { path: "/ceopage/orders-accepted", label: "주문관리" },
    { path: "/ceopage/menu-management", label: "메뉴관리" },
    { path: "/ceopage/reviews", label: "리뷰관리" },
    { path: "/ceopage/store-management", label: "매장관리" },
    { path: "/ceopage/orders-history", label: "주문내역" },
    { path: "/ceopage/statistics", label: "통계" },
    { path: "/ceopage/login", label: "로그인" },
  ];

  return (
    <>
      <CeoHeader />
      <div className="ceo-page">
        <div className="ceo-page__main">
          <div className="owner-nav">
            <div className="owner-nav__profile">
              <img src="https://picsum.photos/100/" alt="프로필 이미지" />
              <p>닉네임</p>
              <span>통합 매니저</span>
            </div>
            <div className="owner-nav__search">
              <div className="owner-nav__search__status">영업중</div>
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

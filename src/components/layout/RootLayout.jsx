import React from "react";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import ToTop from "../common/ToTop";
import LocationSearch from "../common/LocationSearch";
import RestaurantsFilters from "../common/RestaurantsFilters";
import UserHeader from "../../pages/user/layout/UserHeader";

const MY_PAGE_PATHS = ["/restaurant"];
const RESTAURANTS_PATHS = ["/restaurant"];

function RootLayout() {
  const location = useLocation();

  const isHomePage = location.pathname === "/";
  const isMyPagePath = MY_PAGE_PATHS.some(path =>
    location.pathname.startsWith(path),
  );
  const isRestaurantsPath = RESTAURANTS_PATHS.some(path =>
    location.pathname.startsWith(path),
  );

  return (
    <>
      <ToTop />
      <UserHeader />

      {/* 위치 검색은 홈 페이지 및 마이 페이지에서 사용 */}
      {isHomePage && <LocationSearch />}
      {isMyPagePath && <LocationSearch />}
      {isRestaurantsPath && <RestaurantsFilters />}

      <main className="main">
        <div className="inner">
          <Outlet />
        </div>
      </main>

      <Footer />
    </>
  );
}

export default RootLayout;

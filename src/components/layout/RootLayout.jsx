import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import ToTop from "../common/ToTop";
import LocationSearch from "../common/LocationSearch";
import RestaurantsFilters from "../common/RestaurantsFilters";

function RootLayout() {
  const location = useLocation();

  // 위치 검색 사용 시 path 등록
  const myPagePaths = ["/restaurants"];
  // 음식점 카테고리 필터 시 사용 path 등록
  const restaurantsPaths = ["/restaurants"];

  const isHomePage = location.pathname === "/";
  const isMyPagePath = myPagePaths.some(path =>
    location.pathname.startsWith(path),
  );
  const isRestaurantsPaths = restaurantsPaths.some(path =>
    location.pathname.startsWith(path),
  );

  return (
    <>
      <ToTop />

      <Header />

      {isHomePage && <LocationSearch />}
      {isMyPagePath && <LocationSearch />}
      {isRestaurantsPaths && <RestaurantsFilters />}

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

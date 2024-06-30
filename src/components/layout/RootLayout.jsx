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
  // "/auth" 또는 "/login" 경로에서는 header와 footer가 렌더링 되지 않음
  const authPaths = ["/ceopage"];
  const myPagePaths = ["/payment", "/mypage", "/projectinfo"];
  // 허용하는 path
  const restaurantsPaths = ["/restaurants"];

  const isAuthPath = authPaths.some(path => location.pathname.startsWith(path));
  const isMyPagePath = myPagePaths.some(path =>
    location.pathname.startsWith(path),
  );
  const isRestaurantsPaths = restaurantsPaths.some(path =>
    location.pathname.startsWith(path),
  );

  return (
    <>
      <ToTop />
      {!isAuthPath && (
        <>
          <Header />
          {!isMyPagePath && <LocationSearch />}
          {isRestaurantsPaths && <RestaurantsFilters />}
        </>
      )}
      <main className="main">
        <div className="inner">
          <Outlet />
        </div>
      </main>
      {!isAuthPath && <Footer />}
    </>
  );
}

export default RootLayout;

import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import ToTop from "../ToTop";
import LocationSearch from "../home/LocationSearch";

function RootLayout() {
  const location = useLocation();
  // "/auth" 또는 "/login" 경로에서는 header와 footer가 렌더링 되지 않음
  const isAuthPath =
    location.pathname.startsWith("/auth") ||
    location.pathname.startsWith("/login");
  const isMyPagePath =
    location.pathname.startsWith("/payment") ||
    location.pathname.startsWith("/mypage");

  return (
    <>
      <ToTop />
      {!isAuthPath && (
        <>
          <Header />
          {!isMyPagePath && <LocationSearch />}
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

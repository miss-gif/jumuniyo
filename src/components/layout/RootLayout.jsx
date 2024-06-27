import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

function RootLayout() {
  const location = useLocation();
  // "/auth" 경로에서는 header과 footer가 렌더링 되지 않음
  const isAuthPath = location.pathname.startsWith("/auth");

  return (
    <>
      {!isAuthPath && <Header />}
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

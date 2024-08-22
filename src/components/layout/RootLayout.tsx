import { Outlet, useLocation } from "react-router-dom";
import CategoryFilter from "../../pages/user/layout/CategoryFilter";
import UserHeader from "../../pages/user/layout/UserHeader";
import UserHeaders from "../../pages/user/layout/UserHeaders";
import ToTop from "../common/ToTop";
import Footer from "./Footer";

const RootLayout: React.FC = () => {
  const location = useLocation();

  // 현재 경로가 '/' 또는 'restaurant'로 시작하는지 확인
  const showCategoryFilter =
    location.pathname === "/" || location.pathname.startsWith("/restaurant/");

  return (
    <>
      <ToTop />
      <UserHeaders />
      <UserHeader />
      {showCategoryFilter && <CategoryFilter />}
      <main className="main">
        <div className="inner">
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default RootLayout;

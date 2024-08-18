import { Outlet } from "react-router-dom";
import UserHeaders from "../../pages/user/layout/UserHeaders";
import ToTop from "../common/ToTop";
import Footer from "./Footer";
import CategoryFilter from "../../pages/user/layout/CategoryFilter";
import UserHeader from "../../pages/user/layout/UserHeader";

// RootLayout 컴포넌트의 타입을 명시적으로 지정
const RootLayout: React.FC = () => {
  return (
    <>
      <ToTop />
      <UserHeaders />
      <UserHeader />
      <CategoryFilter />
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

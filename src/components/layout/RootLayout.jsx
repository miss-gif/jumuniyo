import { Outlet } from "react-router-dom";
import UserHeaders from "../../pages/user/layout/UserHeaders";
import ToTop from "../common/ToTop";
import Footer from "./Footer";
import CategoryFilter from "../../pages/user/layout/CategoryFilter";
import UserHeader from "../../pages/user/layout/UserHeader";

function RootLayout() {
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
}

export default RootLayout;

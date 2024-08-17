import { Outlet } from "react-router-dom";
import ToTop from "../common/ToTop";
import Footer from "./Footer";
import UserHeader from "../../pages/user/layout/UserHeader";

function MypageLayout() {
  return (
    <>
      <ToTop />
      <UserHeader />
      <main className="main">
        <div className="inner">
          <Outlet />
        </div>
      </main>

      <Footer />
    </>
  );
}

export default MypageLayout;

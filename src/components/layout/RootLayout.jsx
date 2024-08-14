import { Outlet } from "react-router-dom";
import UserHeaders from "../../pages/user/layout/UserHeaders";
import ToTop from "../common/ToTop";
import Footer from "./Footer";

function RootLayout() {
  return (
    <>
      <ToTop />
      <UserHeaders />

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

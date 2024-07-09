import React from "react";
import { Outlet } from "react-router-dom";
import Mypage from "../join/Mypage";

const MyPageLayout = () => {
  return (
    <>
      <div className="mypage-wrap">
        <Mypage />
        <div className="mypage-content">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default MyPageLayout;

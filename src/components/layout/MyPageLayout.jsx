import React from "react";
import { Outlet } from "react-router-dom";

const MyPageLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default MyPageLayout;

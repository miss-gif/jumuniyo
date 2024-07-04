import React from "react";
import CeoHeader from "./CeoHeader";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const CeoLayout = () => {
  return (
    <>
      <CeoHeader />
      <Outlet />
      <Footer />
    </>
  );
};

export default CeoLayout;

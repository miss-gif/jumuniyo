import React from "react";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import CeoHeader from "./CeoHeader";

const AdminLayout = () => {
  return (
    <>
      <CeoHeader />
      <Outlet />
      <Footer />
    </>
  );
};

export default AdminLayout;

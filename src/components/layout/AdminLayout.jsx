import React from "react";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
};

export default AdminLayout;

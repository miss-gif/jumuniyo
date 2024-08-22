import React from "react";
import UserHeader from "./UserHeader";
import { Outlet } from "react-router-dom";
import CategoryFilter from "./CategoryFilter";

const UserLayout = () => {
  return (
    <div>
      <UserHeader />
      <CategoryFilter />
      <Outlet />
    </div>
  );
};

export default UserLayout;

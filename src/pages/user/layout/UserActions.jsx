import React from "react";
import { FaCartShopping, FaHeart } from "react-icons/fa6";
import { RiCoupon2Fill } from "react-icons/ri";

const UserActions = ({ toggleSidebarRight }) => (
  <>
    <div className="user-header__cart" onClick={toggleSidebarRight}>
      <FaCartShopping fontSize={24} />
    </div>
    <div className="user-header__heart" onClick={toggleSidebarRight}>
      <FaHeart fontSize={24} />
    </div>
    <div className="user-header__coupon" onClick={toggleSidebarRight}>
      <RiCoupon2Fill fontSize={24} />
    </div>
  </>
);

export default UserActions;

import React from "react";
import { FaCartShopping, FaHeart } from "react-icons/fa6";
import { RiCoupon2Fill } from "react-icons/ri";

const UserActions = () => (
  <>
    <div className="user-header__cart">
      <FaCartShopping fontSize={24} />
    </div>
    <div className="user-header__heart">
      <FaHeart fontSize={24} />
    </div>
    <div className="user-header__coupon">
      <RiCoupon2Fill fontSize={24} />
    </div>
  </>
);

export default UserActions;

import React from "react";
import PropTypes from "prop-types";
import "./SidebarRight.scss";

const SidebarCoupon = ({ isSidebarCoupon, toggleSidebarCoupon }) => (
  <div
    className={`sidebar-right-overlay ${isSidebarCoupon ? "visible" : ""}`}
    onClick={toggleSidebarCoupon}
  >
    <div
      className={`sidebar-right ${isSidebarCoupon ? "open" : ""}`}
      onClick={e => e.stopPropagation()}
    >
      <li className="nav__item">
        <button onClick={toggleSidebarCoupon}>쿠폰</button>
      </li>
    </div>
  </div>
);

export default SidebarCoupon;

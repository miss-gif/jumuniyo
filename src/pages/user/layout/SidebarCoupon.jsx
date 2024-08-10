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
      <ul>
        <li className="nav__item" onClick={toggleSidebarCoupon}>
          <button>쿠폰</button>
        </li>
      </ul>
    </div>
  </div>
);

export default SidebarCoupon;

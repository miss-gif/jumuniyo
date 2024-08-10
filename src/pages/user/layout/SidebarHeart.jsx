import React from "react";
import PropTypes from "prop-types";
import "./SidebarRight.scss";

const SidebarHeart = ({ isSidebarHeart, toggleSidebarHeart }) => (
  <div
    className={`sidebar-right-overlay ${isSidebarHeart ? "visible" : ""}`}
    onClick={toggleSidebarHeart}
  >
    <div
      className={`sidebar-right ${isSidebarHeart ? "open" : ""}`}
      onClick={e => e.stopPropagation()}
    >
      <li className="nav__item">
        <button onClick={toggleSidebarHeart}>찜</button>
      </li>
    </div>
  </div>
);

export default SidebarHeart;

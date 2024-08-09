import React from "react";
import PropTypes from "prop-types";
import "./SidebarRight.scss";

const SidebarRight = ({ isSidebarRightOpen, toggleSidebarRight }) => (
  <div
    className={`sidebar-right-overlay ${isSidebarRightOpen ? "visible" : ""}`}
    onClick={toggleSidebarRight}
  >
    <div
      className={`sidebar-right ${isSidebarRightOpen ? "open" : ""}`}
      onClick={e => e.stopPropagation()}
    >
      <li className="nav__item">
        <button onClick={toggleSidebarRight}>장바구니</button>
      </li>
    </div>
  </div>
);

SidebarRight.propTypes = {
  isSidebarRightOpen: PropTypes.bool.isRequired,
  toggleSidebarRight: PropTypes.func.isRequired,
  userNickname: PropTypes.string,
  handleLogoutClick: PropTypes.func.isRequired,
};

export default SidebarRight;

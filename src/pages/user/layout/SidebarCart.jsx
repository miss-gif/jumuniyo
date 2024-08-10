import React from "react";
import PropTypes from "prop-types";
import "./SidebarRight.scss";

const SidebarCart = ({ isSidebarCart, toggleSidebarCart }) => (
  <div
    className={`sidebar-right-overlay ${isSidebarCart ? "visible" : ""}`}
    onClick={toggleSidebarCart}
  >
    <div
      className={`sidebar-right ${isSidebarCart ? "open" : ""}`}
      onClick={e => e.stopPropagation()}
    >
      <li className="nav__item">
        <button onClick={toggleSidebarCart}>카트</button>
      </li>
    </div>
  </div>
);

export default SidebarCart;

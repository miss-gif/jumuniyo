import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./Sidebar.scss";

const Sidebar = ({
  isSidebarOpen,
  toggleSidebar,
  handleLogoutClick,
  userNickname,
}) => (
  <div
    className={`sidebar-overlay ${isSidebarOpen ? "visible" : ""}`}
    onClick={toggleSidebar}
  >
    <div
      className={`sidebar ${isSidebarOpen ? "open" : ""}`}
      onClick={e => e.stopPropagation()}
    >
      <li className="nav__item">
        <Link to="/mypage" onClick={toggleSidebar}>
          <img src="" alt="" />
          <div>
            <div>{userNickname}</div>
            <Link to="/mypage" onClick={toggleSidebar}>
              마이페이지
            </Link>
          </div>
        </Link>
      </li>
      <li className="nav__item">
        <Link to="/mypage" onClick={toggleSidebar}>
          주문내역
        </Link>
      </li>
      <li className="nav__item">
        <Link to="/mypage" onClick={toggleSidebar}>
          리뷰내역
        </Link>
      </li>
      <li className="nav__item">
        <Link to="/mypage" onClick={toggleSidebar}>
          고객센터
        </Link>
      </li>
      <li className="nav__item">
        <button onClick={handleLogoutClick}>로그아웃</button>
      </li>
    </div>
  </div>
);

Sidebar.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  handleLogoutClick: PropTypes.func.isRequired,
  userNickname: PropTypes.string,
};

export default Sidebar;

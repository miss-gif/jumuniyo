import React from "react";
import "./SidebarRight.scss";

// Props의 타입 정의
interface SidebarRightProps {
  isSidebarRightOpen: boolean;
  toggleSidebarRight: () => void;
}

const SidebarRight: React.FC<SidebarRightProps> = ({
  isSidebarRightOpen,
  toggleSidebarRight,
}) => (
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

export default SidebarRight;

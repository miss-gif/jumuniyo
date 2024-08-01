import React, { useState } from "react";
import { MdOutlineLocationOn } from "react-icons/md";
import { IoCartOutline, IoSearchSharp } from "react-icons/io5";
import { IoIosArrowDown, IoIosMenu } from "react-icons/io";
import { Link } from "react-router-dom";

import "./UserHeader.scss";

const UserHeader = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
    if (!isSidebarOpen) {
      document.documentElement.style.overflow = "hidden"; // 스크롤 정지
    } else {
      document.documentElement.style.overflow = "auto"; // 스크롤 재개
    }
  };

  return (
    <div className="user-header">
      <button className="user-header__menu-btn" onClick={toggleSidebar}>
        <IoIosMenu fontSize={32} />
      </button>
      <div className="user-header__logo">주문이요</div>
      <nav className="user-header__nav">
        <div className="user-header__location">
          <MdOutlineLocationOn />
          <span>대구 중구</span>
          <IoIosArrowDown />
        </div>
        <div className="user-header__search">
          <IoSearchSharp />
          <input className="search__input" type="text" placeholder="검색창" />
        </div>
        <div className="user-header__cart">
          <IoCartOutline fontSize={24} />
        </div>
      </nav>
      <div className="user-header__auth">
        <div className="user-header__auth-login auth-btn">
          <Link to="/login">로그인</Link>
        </div>
        <div className="user-header__auth-signup auth-btn">
          <Link to="/auth">회원가입</Link>
        </div>
      </div>

      {isSidebarOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar}>
          <div className="sidebar" onClick={e => e.stopPropagation()}>
            {/* 사이드바 내용 */}
            <button onClick={toggleSidebar}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserHeader;

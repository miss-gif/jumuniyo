import React, { useState, useEffect } from "react";
import { MdOutlineLocationOn } from "react-icons/md";
import { IoCartOutline, IoSearchSharp } from "react-icons/io5";
import { IoIosArrowDown, IoIosMenu } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleLogout } from "../../../utils/authUtils";

import "./UserHeader.scss";

const UserHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  const accessToken = useSelector(state => state.user.accessToken);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isTransitioning, setTransitioning] = useState(false);

  useEffect(() => {
    if (isSidebarOpen) {
      setTransitioning(true);
      document.documentElement.style.overflow = "hidden";
    } else if (isTransitioning) {
      // 사이드바가 닫힐 때 애니메이션이 완료된 후 overflow를 auto로 되돌립니다.
      const timer = setTimeout(() => {
        document.documentElement.style.overflow = "auto";
        setTransitioning(false);
      }, 300); // 애니메이션 시간과 맞추어야 합니다.
      return () => clearTimeout(timer);
    }
  }, [isSidebarOpen, isTransitioning]);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("state");
    handleLogout(accessToken, dispatch, navigate);
  };

  return (
    <div className="user-header">
      <button className="user-header__menu-btn" onClick={toggleSidebar}>
        <IoIosMenu fontSize={32} />
      </button>
      <div className="user-header__logo">
        <a href="/">주문이요</a>
      </div>
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

      {isLoggedIn ? (
        <></>
      ) : (
        <>
          <div className="user-header__auth">
            <div className="user-header__auth-login auth-btn">
              <Link to="/login">로그인</Link>
            </div>
            <div className="user-header__auth-signup auth-btn">
              <Link to="/auth">회원가입</Link>
            </div>
          </div>
        </>
      )}

      <div
        className={`sidebar-overlay ${isSidebarOpen ? "visible" : ""}`}
        onClick={toggleSidebar}
      >
        <div
          className={`sidebar ${isSidebarOpen ? "open" : ""}`}
          onClick={e => e.stopPropagation()}
        >
          {isLoggedIn ? (
            <>
              <li className="nav__item">
                <Link to="/mypage">마이페이지</Link>
              </li>
              <li className="nav__item">
                <button onClick={handleLogoutClick}>로그아웃</button>
              </li>
            </>
          ) : (
            <>
              <div className="user-header__auth">
                <div className="user-header__auth-login auth-btn">
                  <Link to="/login">로그인</Link>
                </div>
                <div className="user-header__auth-signup auth-btn">
                  <Link to="/auth">회원가입</Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserHeader;

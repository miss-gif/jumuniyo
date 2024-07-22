// Header 컴포넌트에서 saveState 호출
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import { useDispatch, useSelector } from "react-redux";
import { Logo } from "../common/Logo";
import { scheduleTokenRefresh } from "../../utils/tokenUtils";
import { handleLogout } from "../../utils/authUtils";
import { saveState } from "../../utils/storageUtils"; // 수정된 import

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  const accessToken = useSelector(state => state.user.accessToken);
  const tokenMaxAge = useSelector(state => state.user.tokenMaxAge);
  const userData = useSelector(state => state.user.userData);
  const userNickname = userData ? userData.userNickname : "Guest";

  useEffect(() => {
    const tokenRefreshInterval = scheduleTokenRefresh(accessToken, dispatch);
    return () => clearInterval(tokenRefreshInterval);
  }, [dispatch, accessToken]);

  const handleLogoutClick = () => {
    localStorage.removeItem("state");
    handleLogout(accessToken, dispatch, navigate);
  };

  return (
    <header className="header">
      <div className="inner">
        <Logo />
        <nav className="nav">
          <ul className="nav__top">
            <li className="bold">{userNickname}님 환영합니다.</li>
            <li className="알림자리 none"></li>
          </ul>
          <ul className="nav__list">
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
                <li className="nav__item nav__item--login">
                  <Link to="/login">로그인</Link>
                </li>
                <li className="nav__item nav__item--auth btn">
                  <Link to="/auth">회원가입</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
        <nav className="header-mobile none">
          <ul>
            <li>
              <Link to="/mypage" className="flex-center">
                <PersonIcon sx={{ fontSize: 32 }} />
              </Link>
            </li>
            <li className="none">
              <LocationOnIcon sx={{ fontSize: 32 }} />
            </li>
            <li className="header-mobile__alarm none">
              <NotificationsActiveIcon sx={{ fontSize: 32 }} />
            </li>
            <li className="none">
              <MenuIcon sx={{ fontSize: 42 }} />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

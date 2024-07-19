import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Logo } from "../common/Logo";
import { logout, setAccessToken } from "../../app/store";
import { removeCookie } from "../../utils/cookie";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  const accessToken = useSelector(state => state.user.accessToken);

  useEffect(() => {
    const storedState = JSON.parse(localStorage.getItem("state"));
    if (storedState && storedState.user && storedState.user.accessToken) {
      dispatch(setAccessToken(storedState.user.accessToken));
    }
  }, [dispatch]);

  const handleLogout = async () => {
    try {
      const response = await axios.get("/api/sign-out", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 200) {
        dispatch(logout()); // 리덕스 상태 초기화 및 로그아웃 처리
        localStorage.removeItem("state");
        removeCookie("accessToken");
        navigate("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("An error occurred during logout", error);
    }
  };

  return (
    <header className="header">
      <div className="inner">
        <Logo />
        <nav className="nav">
          <ul className="nav__top">
            <li>시간표시</li>
            <li>유저님 환영합니다.</li>
            <li className="알림자리 none">
              <Link to="/admin">알림</Link>
            </li>
          </ul>
          <ul className="nav__list">
            {isLoggedIn ? (
              <>
                <li className="nav__item">
                  <Link to="/mypage">마이페이지</Link>
                </li>
                <li className="nav__item">
                  <button onClick={handleLogout}>로그아웃</button>
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
        <nav className="header-mobile">
          <ul>
            <li>
              <PersonIcon sx={{ fontSize: 32 }} />
            </li>
            <li>
              <LocationOnIcon sx={{ fontSize: 32 }} />
            </li>
            <li className="header-mobile__alarm none">
              <NotificationsActiveIcon sx={{ fontSize: 32 }} />
            </li>
            <li>
              <MenuIcon sx={{ fontSize: 42 }} />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;

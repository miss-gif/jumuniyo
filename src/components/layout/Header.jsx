import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Logo } from "../common/Logo";

function Header() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 쿠키가 존재하는지 확인하여 로그인 상태 업데이트
    setIsLoggedIn(!!cookies.accessToken);
  }, [cookies]);

  const handleLogout = async () => {
    try {
      const response = await axios.get("/api/sign-out", {
        headers: {
          Authorization: `Bearer ${cookies.accessToken}`,
        },
      });

      if (response.status === 200) {
        // 쿠키에서 accessToken 삭제
        removeCookie("accessToken", { path: "/" });

        // 로그아웃 성공 시, 로그인 페이지로 리디렉션
        navigate("/login");

        // 로그인 상태 업데이트
        setIsLoggedIn(false);
      } else {
        // 에러 처리 (예: 에러 메시지 표시)
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

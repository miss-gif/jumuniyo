import React from "react";
import { Link, useNavigate } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import axios from "axios";
import { useCookies } from "react-cookie";

function Header() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);

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
        <h1>
          <Link to="/">
            <img
              src={process.env.PUBLIC_URL + "/images/logo_1x.png"}
              alt="Logo"
            />
          </Link>
        </h1>
        <nav className="nav">
          <ul className="nav__top">
            <li>
              <Link to="/ceopage">주문이요사장님</Link>
            </li>
            <li>
              <Link to="/admin">관리자</Link>
            </li>
          </ul>
          <ul className="nav__list">
            <li className="nav__item">
              <Link to="/payment">결제하기</Link>
            </li>
            <li className="nav__item">
              <Link to="/mypage/order/130">주문확인</Link>
            </li>
            <li className="nav__item">
              <Link to="/mypage">마이페이지</Link>
            </li>
            <li className="nav__item">
              <button onClick={handleLogout}>로그아웃</button>
            </li>
            <li className="nav__item nav__item--login">
              <Link to="/login">로그인</Link>
            </li>
            <li className="nav__item nav__item--auth btn">
              <Link to="/auth">회원가입</Link>
            </li>
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

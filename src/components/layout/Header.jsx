import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Logo } from "../common/Logo";
import { logout, setAccessToken, setTokenMaxAge } from "../../app/store";
import { removeCookie } from "../../utils/cookie";

// 토큰 갱신 스케줄러 훅
const useTokenRefreshScheduler = (
  accessToken,
  tokenMaxAge,
  dispatch,
  navigate,
) => {
  useEffect(() => {
    let interval;

    const scheduleTokenRefresh = async () => {
      try {
        const response = await axios.get("/api/access-token", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.status === 200) {
          const { newAccessToken, tokenMaxAge: newTokenMaxAge } = response.data;
          if (newAccessToken) {
            dispatch(setAccessToken(newAccessToken));
          }
          if (newTokenMaxAge) {
            dispatch(setTokenMaxAge(newTokenMaxAge));
          }
        } else {
          console.error("Token extension failed: ", response.status);
        }
      } catch (error) {
        console.error("Error occurred while extending the token: ", error);
      }
    };

    // 10분마다 토큰 갱신 시도
    interval = setInterval(scheduleTokenRefresh, 10 * 60 * 1000);

    return () => clearInterval(interval);
  }, [dispatch, navigate, accessToken]);
};

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  const accessToken = useSelector(state => state.user.accessToken);
  const tokenMaxAge = useSelector(state => state.user.tokenMaxAge);
  const userData = useSelector(state => state.user.userData);
  const userNickname = userData ? userData.userNickname : "Guest";

  useTokenRefreshScheduler(accessToken, tokenMaxAge, dispatch, navigate);

  const handleLogout = async () => {
    try {
      const response = await axios.get("/api/sign-out", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 200) {
        dispatch(logout());
        removeCookie("accessToken");
        navigate("/login");
      } else {
        console.error("Logout failed: ", response.status);
      }
    } catch (error) {
      console.error("Error occurred during logout: ", error);
    }
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
};

export default Header;

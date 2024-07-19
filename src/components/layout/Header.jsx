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

// Token 갱신 스케줄러
const useTokenRefreshScheduler = (
  accessToken,
  tokenMaxAge,
  dispatch,
  navigate,
) => {
  useEffect(() => {
    let timeout;
    let alertTimeout;

    const scheduleTokenRefresh = () => {
      if (tokenMaxAge) {
        const currentTime = new Date().getTime();
        const expiryTime = new Date(tokenMaxAge).getTime();
        const tenMinutes = 10 * 60 * 1000;
        const fiveMinutes = 5 * 60 * 1000;
        const timeUntilRefresh = expiryTime - currentTime - tenMinutes;
        const timeUntilAlert = expiryTime - currentTime - fiveMinutes;

        if (timeUntilAlert > 0) {
          alertTimeout = setTimeout(() => {
            alert("토큰이 만료되기 5분 전입니다. 다시 로그인 해주세요.");
          }, timeUntilAlert);
        }

        if (timeUntilRefresh > 0) {
          timeout = setTimeout(async () => {
            try {
              const response = await axios.get("/api/access-token", {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              });

              if (response.status === 200) {
                const { newAccessToken, tokenMaxAge: newTokenMaxAge } =
                  response.data;
                if (newAccessToken) {
                  dispatch(setAccessToken(newAccessToken));
                }
                if (newTokenMaxAge) {
                  dispatch(setTokenMaxAge(newTokenMaxAge));
                }

                // 새 토큰 만료 시간을 기준으로 다시 스케줄링
                scheduleTokenRefresh();
              } else {
                console.error("Token extension failed: ", response.status);
              }
            } catch (error) {
              console.error(
                "Error occurred while extending the token: ",
                error,
              );
            }
          }, timeUntilRefresh);
        } else {
          dispatch(logout());
          removeCookie("accessToken");
          navigate("/login");
        }
      }
    };

    scheduleTokenRefresh();

    return () => {
      clearTimeout(timeout);
      clearTimeout(alertTimeout);
    };
  }, [dispatch, navigate, tokenMaxAge, accessToken]);
};

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  const accessToken = useSelector(state => state.user.accessToken);
  const tokenMaxAge = useSelector(state => state.user.tokenMaxAge);

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
            <li>유저님 환영합니다.</li>
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

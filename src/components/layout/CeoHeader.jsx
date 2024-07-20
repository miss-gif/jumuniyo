import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { scheduleTokenRefresh } from "../../utils/tokenUtils";
import { handleLogout } from "../../utils/authUtils";

const OwnerHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = useSelector(state => state.user.accessToken);

  useEffect(() => {
    const tokenRefreshInterval = scheduleTokenRefresh(accessToken, dispatch);
    return () => clearInterval(tokenRefreshInterval);
  }, [accessToken, dispatch]);

  const handleLogoutClick = () => {
    handleLogout(accessToken, dispatch, navigate);
  };

  return (
    <header className="owner-header">
      <div className="owner-header__left">
        <h1 className="owner-header__logo">
          <Link to="/ceopage/">
            <img src={process.env.PUBLIC_URL + "/images/logo.png"} alt="Logo" />
          </Link>
        </h1>
      </div>
      <div className="owner-header__right">
        <div className="owner-header__item logout" onClick={handleLogoutClick}>
          로그아웃
        </div>
      </div>
    </header>
  );
};

export default OwnerHeader;

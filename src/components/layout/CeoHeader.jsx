import React from "react";
import { Link } from "react-router-dom";

const OwnerHeader = () => {
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
        <div className="owner-header__user none">
          <em>id</em>님
        </div>
        <div className="owner-header__item none">내정보</div>
        <div className="owner-header__item none">알림</div>
        <div className="owner-header__item">로그아웃</div>
      </div>
    </header>
  );
};

export default OwnerHeader;

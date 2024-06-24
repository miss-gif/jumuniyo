import React from "react";
import { Link } from "react-router-dom";

import "./Header.scss";

function Header() {
  return (
    <header className="header">
      <div className="inner">
        <h1>로고</h1>
        <nav className="nav">
          <ul className="nav__list">
            <li className="nav__item">
              <Link to="/">홈</Link>
            </li>
            <li className="nav__item">
              <Link to="/restaurants">주문하기</Link>
            </li>
            <li className="nav__item">
              <Link to="/cart">장바구니</Link>
            </li>
            <li className="nav__item">
              <Link to="/profile">마이페이지</Link>
            </li>
            <li className="nav__item">
              <Link to="/auth">로그인</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;

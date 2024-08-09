import React from "react";
import { Link } from "react-router-dom";

const AuthLinks = ({ closeModal }) => (
  <div className="user-header__auth">
    <div className="user-header__auth-login auth-btn">
      <Link to="/login" onClick={closeModal}>
        로그인
      </Link>
    </div>
    <div className="user-header__auth-signup auth-btn">
      <Link to="/auth" onClick={closeModal}>
        회원가입
      </Link>
    </div>
  </div>
);

export default AuthLinks;

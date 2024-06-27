import React from "react";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const joinNav = useNavigate();

  return (
    <div className="join-wrap">
      <h1>회원가입</h1>
      <div className="join-button">
        <a
          onClick={() => {
            joinNav("/auth/user");
          }}
        >
          <div className="join-user-img"></div>
          <p>일반 회원가입</p>
        </a>
        <a
          onClick={() => {
            joinNav("/auth/ceo");
          }}
        >
          <div className="join-ceo-img"></div>
          <p>사장님 회원가입</p>
        </a>
      </div>
    </div>
  );
};

export default AuthPage;

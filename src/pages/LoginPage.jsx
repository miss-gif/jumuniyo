import React from "react";

const AuthUserPage = () => {
  return (
    <div className="user-join-wrap">
      <h1>일반 로그인</h1>
      <div className="line">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="576"
          height="1"
          viewBox="0 0 576 1"
          fill="none"
        >
          <path d="M0.5 0.5H575.5" stroke="black" />
        </svg>
      </div>
      <form className="user-join-form">
        <input placeholder="아이디를 입력해 주세요."></input>
        <input placeholder="비밀번호를 입력해 주세요."></input>

        <button type="button">로그인</button>
      </form>
    </div>
  );
};

export default AuthUserPage;

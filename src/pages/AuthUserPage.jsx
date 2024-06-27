import React from "react";

const AuthUserPage = () => {
  return (
    <div className="user-join-wrap">
      <h1>일반 회원가입</h1>
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
        <h2>아이디</h2>
        <div>
          <input placeholder="아이디를 입력해 주세요."></input>
          <button type="button">중복 확인</button>
        </div>
        <h2>비밀번호</h2>
        <input placeholder="비밀번호를 입력해 주세요."></input>
        <h2>비밀번호 확인</h2>
        <input placeholder="비밀번호를 입력해 주세요."></input>
        <h2>이름</h2>
        <input placeholder="이름을 입력해 주세요."></input>
        <h2>이메일</h2>
        <input placeholder="이메일을 입력해 주세요."></input>

        <button type="button">회원가입</button>
      </form>
    </div>
  );
};

export default AuthUserPage;

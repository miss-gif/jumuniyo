import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPageforCEO = () => {
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
  const navigate = useNavigate();

  const handleLogin = async e => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/sign-in`, {
        user_id: userId,
        user_pw: userPw,
      });
      const { accessToken, userPk } = response.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("userPk", userPk);

      navigate("/ceopage/menu-management");
    } catch (error) {
      console.error("로그인 중 에러 발생: ", error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="text"
        value={userId}
        onChange={e => setUserId(e.target.value)}
        placeholder="ID"
        required
      />
      <input
        type="password"
        value={userPw}
        onChange={e => setUserPw(e.target.value)}
        placeholder="비밀번호"
        required
      />
      <button type="submit">로그인</button>
    </form>
  );
};

export default LoginPageforCEO;

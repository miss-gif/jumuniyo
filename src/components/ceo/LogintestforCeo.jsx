import React, { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // named import 사용
import { useNavigate } from "react-router-dom";

const LoginPageforCEO = () => {
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const getCookie = name => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  };

  const handleLogin = async e => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(
        `/api/sign-in`,
        {
          user_id: userId,
          user_pw: userPw,
        },
        {
          withCredentials: true, // 쿠키를 포함하여 요청
        },
      );

      const { resultData } = response.data;
      const { accessToken } = resultData;

      //console.log("Server Response:", resultData); // 서버 응답 확인
      //console.log("Access Token:", accessToken); // 디버깅용 로그

      document.cookie = `accessToken=${accessToken}; path=/; SameSite=None; Secure`;

      const decodedToken = jwtDecode(accessToken);
      const signedUser = JSON.parse(decodedToken.signedUser);
      const userPk = signedUser.userPk;

      const menuResResponse = await axios.get(`/api/menu-res/${userPk}`);
      const { menuResPk } = menuResResponse.data;

      localStorage.setItem("userPk", userPk);
      localStorage.setItem("menuResPk", menuResPk);

      navigate(`/ceopage/menu-management`);
    } catch (error) {
      setError("로그인 중 에러가 발생했습니다. 다시 시도해 주세요.");
      //console.error("로그인 중 에러 발생: ", error);
    } finally {
      setLoading(false);
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
      <button type="submit" disabled={loading}>
        {loading ? "로그인 중..." : "로그인"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default LoginPageforCEO;

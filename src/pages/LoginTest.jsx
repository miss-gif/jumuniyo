// LoginTest.js
import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  setUserData,
  setUserRole,
  setUserAddress,
  setUserPhone,
} from "../app/store"; // 추가된 액션 임포트
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const LoginTest = () => {
  const [username, setUsername] = useState("wyfmel1");
  const [password, setPassword] = useState("wyfmel1");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["accessToken"]);

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const response = await axios.post("/api/sign-in", {
        user_id: username,
        user_pw: password,
      });

      if (response.data.statusCode === 1) {
        const { resultData } = response.data;
        dispatch(setUserData(resultData));
        dispatch(setUserRole(resultData.userRole));
        dispatch(setUserAddress(resultData.mainAddr)); // 주소 저장
        dispatch(setUserPhone(resultData.userPhone)); // 전화번호 저장
        setCookie("accessToken", resultData.accessToken, { path: "/" });

        console.log("로그인 성공:", resultData);
        navigate("/"); // 로그인 후 이동
      } else {
        console.error("로그인 실패:", response.data.resultMsg);
      }
    } catch (error) {
      console.error("로그인 에러:", error);
    }
  };

  return (
    <div>
      <h2>로그인</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">아이디:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">비밀번호:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default LoginTest;

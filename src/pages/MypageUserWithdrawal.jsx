import React, { useState } from "react";
import Mypage from "../components/join/Mypage";
import { Box, TextField } from "@mui/material";
import jwtAxios from "../api/user/jwtUtil";
import { useNavigate } from "react-router-dom";

const MypageUserWithdrawal = () => {
  const [userPwCheck, setUserPwCheck] = useState("");
  const [isWithdrawal, setIsWithdrawal] = useState(false);

  const navgate = useNavigate();

  const handleFormSubmit = e => {
    e.preventDefault();
  };

  const userWithdrawal = async () => {
    try {
      const data = {
        user_pw: userPwCheck,
      };
      const res = await jwtAxios.post("/api/delete", data);
      if (res.data.statusCode !== 1) {
        alert(res.data.resultMsg);
      }
      setIsWithdrawal(false);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const useuserWithdrawalCancle = () => {
    setIsWithdrawal(false);
    navgate("/");
  };

  return (
    <div className="mypage-wrap">
      <Mypage />
      <div className="mypage-box">
        <div className="mypage-img">
          <div>
            <h3>정말 탈퇴 하시겠습니까?</h3>
            <form className="user-join-form" onSubmit={handleFormSubmit}>
              <div className="Withdrawal">
                <Box>
                  <TextField
                    label="비밀번호"
                    type="password"
                    placeholder="비밀번호를 입력해주세요."
                    onChange={e => {
                      setUserPwCheck(e.target.value);
                    }}
                  />
                </Box>
              </div>
              <div className="mypage-button-box-flex">
                <button
                  type="button"
                  className="btn"
                  onClick={e => {
                    userWithdrawal(e);
                  }}
                >
                  네
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => {
                    useuserWithdrawalCancle();
                  }}
                >
                  아니요
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MypageUserWithdrawal;

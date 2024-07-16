import React, { useState } from "react";
import Mypage from "../components/join/Mypage";
import { Box, TextField } from "@mui/material";
import jwtAxios from "../api/user/jwtUtil";

const MypageUserWithdrawal = () => {
  const [userPwCheck, setUserPwCheck] = useState("");
  const [isWithdrawal, setIsWithdrawal] = useState(false);

  const handleFormSubmit = e => {
    e.preventDefault();
  };

  const userWithdrawalOpen = () => {
    setIsWithdrawal(true);
  };

  const userWithdrawal = () => {
    try {
      const data = {
        user_pw: userPwCheck,
      };
      const res = jwtAxios.post("/api/delete", data);
      setIsWithdrawal(false);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const useuserWithdrawalCancle = () => {
    setIsWithdrawal(false);
  };

  return (
    <div className="mypage-wrap">
      <Mypage />
      <div className="mypage-box">
        <div className="mypage-img">
          <div>
            {!isWithdrawal ? (
              <>
                <h3>회원 탈퇴</h3>
                <button
                  className="btn"
                  onClick={() => {
                    userWithdrawalOpen();
                  }}
                >
                  회원 탈퇴
                </button>
              </>
            ) : (
              <>
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
                        userWithdrawal();
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
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MypageUserWithdrawal;

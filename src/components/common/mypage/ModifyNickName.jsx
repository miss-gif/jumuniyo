/* eslint-disable react/prop-types */
import React, { useState } from "react";
import jwtAxios from "../../../api/user/jwtUtil";
import { Box, TextField } from "@mui/material";

const ModifyNickName = ({
  nickName,
  isEditNickname,
  editMode,
  setNickName,
  editCancel,
  setIsEditNickname,
}) => {
  const [newNickName, setNewNickName] = useState("");

  const modifyPassord = async () => {
    const data = {
      user_nickname: newNickName,
    };
    try {
      const res = await jwtAxios.patch("/api/update-nickname", data);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const editNickname = () => {
    setIsEditNickname(false);
    setNickName(newNickName);
    modifyPassord();
  };

  return (
    <div className="mypage-title">
      <div className="mypage-title-box">닉네임</div>
      <div className="mypage-title-box-right">
        {!isEditNickname ? (
          <>
            <div>{nickName}</div>
            <button className="btn" onClick={() => editMode("nickname")}>
              변경
            </button>
          </>
        ) : (
          <>
            <div className="input-box">
              <h2>닉네임 변경</h2>
              <Box>
                <TextField
                  fullWidth
                  label="변경할 닉네임"
                  id="fullWidth"
                  onChange={e => {
                    setNewNickName(e.target.value);
                  }}
                />
              </Box>
            </div>
            <div>
              <button className="btn" onClick={editNickname}>
                저장
              </button>
              <button className="btn" onClick={editCancel}>
                취소
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ModifyNickName;

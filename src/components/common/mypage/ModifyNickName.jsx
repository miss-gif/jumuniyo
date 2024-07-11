/* eslint-disable react/prop-types */
import React, { useState } from "react";
import jwtAxios from "../../../api/user/jwtUtil";

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
      const res = await jwtAxios.patch("/api/user/update-nickname", data);
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
              <input
                type="text"
                placeholder="새 닉네임을 입력해주세요."
                onChange={e => {
                  setNewNickName(e.target.value);
                }}
              />
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

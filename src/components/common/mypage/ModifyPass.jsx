/* eslint-disable react/prop-types */
import { useState } from "react";
import jwtAxios from "../../../api/user/jwtUtil";

const ModifyPass = ({ setIsEditPassword, editCancel }) => {
  const [statePassWord, setStatePassWord] = useState("");
  const [newPassWord, setNewPassWord] = useState("");
  const [newPassWordCheck, setNewPassWordCheck] = useState("");
  const modifyPassord = async () => {
    const data = {
      user_pw: statePassWord,
      new_pw: newPassWord,
      new_pw_confirm: newPassWordCheck,
    };
    try {
      const res = await jwtAxios.patch("/api/user/update-pw", data);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  // 비밀번호 변경하기
  const editPassword = () => {
    setIsEditPassword(false);
    modifyPassord();
  };
  return (
    <>
      <div className="input-box">
        <input
          type="password"
          onChange={e => {
            setStatePassWord(e.target.value);
          }}
          placeholder="현재 비밀번호를 입력해주세요."
        />

        <input
          type="password"
          onChange={e => {
            setNewPassWord(e.target.value);
          }}
          placeholder="새 비밀번호를 입력해주세요."
        />

        <input
          type="password"
          onChange={e => {
            setNewPassWordCheck(e.target.value);
          }}
          placeholder="새 비밀번호를 재입력 입력해주세요."
        />
      </div>
      <div>
        <button className="btn" onClick={editPassword}>
          저장
        </button>
        <button className="btn" onClick={editCancel}>
          취소
        </button>
      </div>
    </>
  );
};

export default ModifyPass;

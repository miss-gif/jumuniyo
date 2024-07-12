/* eslint-disable react/prop-types */
import { useState } from "react";
import jwtAxios from "../../../api/user/jwtUtil";
import { Box, TextField } from "@mui/material";

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
      const res = await jwtAxios.patch("/api/update-pw", data);
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
    // <div className="modify-modal">
    //   <h2>비밀번호 변경</h2>
    //   <Box>
    //     <TextField
    //       fullWidth
    //       label="기존 비밀번호"
    //       id="fullWidth"
    //       onChange={e => {
    //         setStatePassWord(e.target.value);
    //       }}
    //     />
    //   </Box>
    //   <Box>
    //     <TextField
    //       fullWidth
    //       label="새 비밀번호"
    //       id="fullWidth"
    //       onChange={e => {
    //         setNewPassWord(e.target.value);
    //       }}
    //     />
    //   </Box>
    //   <Box>
    //     <TextField
    //       fullWidth
    //       label="새 비밀번호 확인"
    //       id="fullWidth"
    //       onChange={e => {
    //         setNewPassWordCheck(e.target.value);
    //       }}
    //     />
    //   </Box>
    //   {/* <AddressButton setAddress={setAddress} /> */}
    //   <div className="mypage-button-box">
    //     <button
    //       type="button"
    //       onClick={() => {
    //         editPassword();
    //       }}
    //     >
    //       완료
    //     </button>
    //     <button
    //       type="button"
    //       onClick={() => {
    //         editCancel();
    //       }}
    //     >
    //       취소
    //     </button>
    //   </div>
    // </div>
    <>
      <div className="input-box">
        <h2>비밀번호 변경</h2>
        <Box>
          <TextField
            fullWidth
            type="password"
            label="현재 비밀번호"
            id="fullWidth"
            onChange={e => {
              setStatePassWord(e.target.value);
            }}
          />
        </Box>

        <Box>
          <TextField
            fullWidth
            type="password"
            label="새 비밀번호"
            onChange={e => {
              setNewPassWord(e.target.value);
            }}
          />
        </Box>

        <Box>
          <TextField
            fullWidth
            type="password"
            label="새 비밀번호 확인"
            onChange={e => {
              setNewPassWordCheck(e.target.value);
            }}
          />
        </Box>
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

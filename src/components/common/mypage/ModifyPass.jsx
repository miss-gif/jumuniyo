/* eslint-disable react/prop-types */
import { useState } from "react";
import jwtAxios from "../../../api/user/jwtUtil";
import { Box, TextField } from "@mui/material";
import Swal from "sweetalert2";

const ModifyPass = ({ setIsEditPassword, editCancel, getUserInfo }) => {
  const [statePassWord, setStatePassWord] = useState("");
  const [newPassWord, setNewPassWord] = useState("");
  const [newPassWordCheck, setNewPassWordCheck] = useState("");

  const passRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

  const modifyPassord = async () => {
    const isCheckPass = passRegex.test(newPassWord);
    if (statePassWord === "") {
      Swal.fire({
        icon: "warning",
        text: "입력하지 않은칸이 있습니다.",
      });
      return;
    }
    if (newPassWord === "") {
      Swal.fire({
        icon: "warning",
        text: "입력하지 않은칸이 있습니다.",
      });
      return;
    }
    if (newPassWordCheck === "") {
      Swal.fire({
        icon: "warning",
        text: "입력하지 않은칸이 있습니다.",
      });
      return;
    }

    if (isCheckPass === false) {
      Swal.fire({
        icon: "warning",
        text: "비밀번호는 8자 이상, 특수문자 사용해야합니다.",
      });
      getUserInfo();
      return;
    }
    setIsEditPassword(false);

    const data = {
      user_pw: statePassWord,
      new_pw: newPassWord,
      new_pw_confirm: newPassWordCheck,
    };
    try {
      const res = await jwtAxios.patch("/api/update-pw", data);
      if (res.data.statusCode === 1) {
        Swal.fire({
          icon: "success",
          text: "비밀번호 변경을 완료 했습니다.",
        });
        getUserInfo();
      } else {
        Swal.fire({
          icon: "warning",
          text: res.data.resultMsg,
        });
        getUserInfo();
      }
      return res;
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: "서버에러입니다.",
      });
    }
  };

  return (
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
        <button
          className="btn"
          onClick={() => {
            modifyPassord();
          }}
        >
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

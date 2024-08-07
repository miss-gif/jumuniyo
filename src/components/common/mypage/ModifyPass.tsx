import React, { ChangeEvent, FC } from "react";
import { Box, TextField } from "@mui/material";
import Swal from "sweetalert2";
import jwtAxios from "../../../api/user/jwtUtil";

// Props 타입 정의
interface ModifyPassProps {
  setIsEditPassword: (isEditing: boolean) => void;
  editCancel: () => void;
  getUserInfo: () => void;
}

const ModifyPass: FC<ModifyPassProps> = ({
  setIsEditPassword,
  editCancel,
  getUserInfo,
}) => {
  const [statePassWord, setStatePassWord] = React.useState<string>("");
  const [newPassWord, setNewPassWord] = React.useState<string>("");
  const [newPassWordCheck, setNewPassWordCheck] = React.useState<string>("");

  const passRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

  const modifyPassord = async () => {
    const isCheckPass = passRegex.test(newPassWord);
    if (statePassWord === "" || newPassWord === "" || newPassWordCheck === "") {
      Swal.fire({
        icon: "warning",
        text: "입력하지 않은 칸이 있습니다.",
      });
      return;
    }

    if (!isCheckPass) {
      Swal.fire({
        icon: "warning",
        text: "비밀번호는 8자 이상, 특수문자를 사용해야 합니다.",
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
          text: "비밀번호 변경을 완료했습니다.",
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
        text: "서버 에러입니다.",
      });
    }
  };

  // 이벤트 핸들러에 타입 추가
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStatePassWord(e.target.value);
  };

  const handleNewPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewPassWord(e.target.value);
  };

  const handleNewPasswordCheckChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewPassWordCheck(e.target.value);
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
            id="current-password"
            onChange={handlePasswordChange}
          />
        </Box>

        <Box>
          <TextField
            fullWidth
            type="password"
            label="새 비밀번호"
            onChange={handleNewPasswordChange}
          />
        </Box>

        <Box>
          <TextField
            fullWidth
            type="password"
            label="새 비밀번호 확인"
            onChange={handleNewPasswordCheckChange}
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

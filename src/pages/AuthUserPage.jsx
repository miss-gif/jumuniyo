import { Link } from "react-router-dom";
import ImageImport from "../components/layout/ImageImport";
import JoinFooter from "../components/layout/JoinFooter";
import { Box, TextField } from "@mui/material";
import { useState } from "react";
import jwtAxios from "../api/user/jwtUtil";

const AuthUserPage = () => {
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
  const [userPwCheck, setUserPwCheck] = useState("");
  const [userName, setUserName] = useState("");
  const [userNickName, setUserNickName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userImgFile, setUserImgFile] = useState(null);

  const idTest = async () => {
    try {
      const res = await jwtAxios.get(`/api/is-duplicated?user_id=${userId}`);
      console.log(res);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const signUp = async () => {
    const data = {
      pic: userImgFile,
      p: {
        user_id: userId,
        user_pw: userPw,
        user_pw_confirm: userPwCheck,
        user_name: userName,
        user_nickname: userNickName,
        user_phone: userPhone,
      },
    };

    try {
      const header = { headers: { "Content-Type": "application/json" } };
      console.log(data, header);
      const res = await jwtAxios.post("sign-up", data.p, header);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="user-join-wrap">
        <Link to="/">
          <img
            src={process.env.PUBLIC_URL + "/images/logo_1x.png"}
            alt="Logo"
          />
        </Link>
        <h2>일반 회원가입</h2>
        <div className="line"></div>
        <form className="user-join-form">
          <div>
            <Box style={{ alignItems: "center" }}>
              <TextField
                fullWidth
                label="아이디"
                id="fullWidth"
                onChange={e => {
                  setUserId(e.target.value);
                }}
              />
            </Box>
            <button
              type="button"
              className="id-check"
              onClick={() => {
                idTest();
              }}
            >
              중복 확인
            </button>
          </div>
          <Box>
            <TextField
              fullWidth
              label="비밀번호"
              type="password"
              onChange={e => {
                setUserPw(e.target.value);
              }}
            />
          </Box>
          <Box>
            <TextField
              fullWidth
              label="비밀번호 확인"
              id="fullWidth"
              type="password"
              onChange={e => {
                setUserPwCheck(e.target.value);
              }}
            />
          </Box>
          <Box>
            <TextField
              fullWidth
              label="이름"
              id="fullWidth"
              onChange={e => {
                setUserName(e.target.value);
              }}
            />
          </Box>
          <Box>
            <TextField
              fullWidth
              label="닉네임"
              id="fullWidth"
              onChange={e => {
                setUserNickName(e.target.value);
              }}
            />
          </Box>
          <Box>
            <TextField
              fullWidth
              label="전화번호"
              id="fullWidth"
              onChange={e => {
                setUserPhone(e.target.value);
              }}
            />
          </Box>
          <h3>프로필 사진</h3>
          <ImageImport setUserImgFile={setUserImgFile} />
          <button
            type="button"
            onClick={() => {
              signUp();
            }}
          >
            회원가입
          </button>
        </form>
      </div>
      <JoinFooter />
    </>
  );
};

export default AuthUserPage;

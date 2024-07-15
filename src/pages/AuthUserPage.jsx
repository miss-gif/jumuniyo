import { Box, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import AuthImageImport from "../components/layout/AuthImageImport";
import JoinFooter from "../components/layout/JoinFooter";

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
      const res = await axios.get(`/api/is-duplicated?user_id=${userId}`);
      console.log(res);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const signUp = async () => {
    const pic = new FormData();

    const p = {
      user_id: userId,
      user_pw: userPw,
      user_pw_confirm: userPwCheck,
      user_name: userName,
      user_nickname: userNickName,
      user_phone: userPhone,
    };

    // JSON 객체를 문자열로 변환하지 않고 바로 FormData에 추가
    pic.append("pic", userImgFile); // 파일(binary) 추가
    pic.append("p", JSON.stringify(p)); // JSON 객체 추가

    console.log(pic);

    try {
      const header = { headers: { "Content-Type": "multipart/form-data" } };
      const res = await axios.post("../api/sign-up", pic, header); // FormData 객체를 직접 전송
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
          <AuthImageImport setUserImgFile={setUserImgFile} />
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

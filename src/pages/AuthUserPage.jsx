import { Link } from "react-router-dom";
import ImageImport from "../components/layout/ImageImport";
import JoinFooter from "../components/layout/JoinFooter";
import { Box, TextField } from "@mui/material";

const AuthUserPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

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
        <div className="line">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="576"
            height="1"
            viewBox="0 0 576 1"
            fill="none"
          >
            <path d="M0.5 0.5H575.5" stroke="black" />
          </svg>
        </div>
        <form className="user-join-form">
          <div>
            <Box style={{ alignItems: "center" }}>
              <TextField fullWidth label="아이디" id="fullWidth" />
            </Box>
            <button type="button" className="id-check">
              중복 확인
            </button>
          </div>
          <Box>
            <TextField
              fullWidth
              label="비밀번호"
              id="fullWidth"
              type="password"
            />
          </Box>
          <Box>
            <TextField
              fullWidth
              label="비밀번호 확인"
              id="fullWidth"
              type="password"
            />
          </Box>
          <Box>
            <TextField fullWidth label="이름" id="fullWidth" />
          </Box>
          <Box>
            <TextField fullWidth label="닉네임" id="fullWidth" />
          </Box>
          <Box>
            <TextField fullWidth label="전화번호" id="fullWidth" />
          </Box>
          <h2>프로필 사진</h2>
          <ImageImport />
          <button type="button">회원가입</button>
        </form>
      </div>
      <JoinFooter />
    </>
  );
};

export default AuthUserPage;

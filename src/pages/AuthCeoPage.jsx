import { Link } from "react-router-dom";
import ImageImport from "../components/layout/ImageImport";
import JoinFooter from "../components/layout/JoinFooter";
import AddressButton from "../components/common/_AddressButton";
import { Box, TextField } from "@mui/material";

const AuthUserPage = () => {
  return (
    <>
      <div className="user-join-wrap">
        <Link to="/">
          <img
            src={process.env.PUBLIC_URL + "/images/logo_1x.png"}
            alt="Logo"
          />
        </Link>

        <h2>사장님 회원가입</h2>
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
          <Box
            sx={{
              maxWidth: "100%",
            }}
          >
            <TextField fullWidth label="" id="fullWidth" type="time" />
          </Box>
          <Box
            sx={{
              maxWidth: "100%",
            }}
          >
            <TextField fullWidth label="" id="fullWidth" type="time" />
          </Box>

          <Box>
            <TextField fullWidth label="전화번호" id="fullWidth" />
          </Box>
          <Box>
            <TextField fullWidth label="가게이름" id="fullWidth" />
          </Box>
          <h3>음식 카테고리</h3>
          <div className="checkbox-group">
            <label>
              <input type="checkbox" name="options" value="Option 1" /> 치킨
            </label>
            <label>
              <input type="checkbox" name="options" value="Option 2" /> 햄버거
            </label>
            <label>
              <input type="checkbox" name="options" value="Option 3" /> 카페
            </label>
            <label>
              <input type="checkbox" name="options" value="Option 4" /> 죽
            </label>
            <label>
              <input type="checkbox" name="options" value="Option 5" /> 족발
            </label>
          </div>
          <div>
            <Box style={{ alignItems: "center" }}>
              <TextField
                disabled
                type="text"
                id="sample4_roadAddress"
                placeholder="도로명주소"
                readOnly
              />
            </Box>

            <AddressButton />
          </div>
          <Box>
            <TextField fullWidth label="상세 주소" id="fullWidth" />
          </Box>
          <Box>
            <TextField fullWidth label="사업자 상호명" id="fullWidth" />
          </Box>
          <Box>
            <TextField fullWidth label="사업자 번호" id="fullWidth" />
          </Box>
          <h3>브랜드 로고</h3>
          <ImageImport />
          <button type="button">회원가입</button>
        </form>
      </div>
      <JoinFooter />
    </>
  );
};

export default AuthUserPage;

/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import ImageImport from "../components/layout/ImageImport";
import JoinFooter from "../components/layout/JoinFooter";
import MyMap from "../components/user/mypage/MyMap";

const AuthUserPage = () => {
  const [address, setAddress] = useState("");
  const [xValue, setXValue] = useState("");
  const [yValue, setYValue] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [state, setState] = useState({
    gilad: false,
    jason: false,
    antoine: false,
  });

  const { gilad, jason, antoine } = state;
  const error = [gilad, jason, antoine].filter(v => v).length >= 1;

  const handleChange = event => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
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

        <h2>사장님 회원가입</h2>
        <div className="line"></div>
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
          <div>
            <Box style={{ alignItems: "center" }}>
              <MyMap
                setXValue={setXValue}
                setYValue={setYValue}
                setNewAddress={setNewAddress}
              />
            </Box>
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
          <Box>
            <TextField fullWidth label="전화번호" id="fullWidth" />
          </Box>
          <Box>
            <TextField fullWidth label="가게이름" id="fullWidth" />
          </Box>
          <h3>오픈시간</h3>
          <Box
            sx={{
              maxWidth: "100%",
            }}
          >
            <TextField fullWidth label="" id="fullWidth" type="time" />
          </Box>
          <h3>마감시간</h3>
          <Box
            sx={{
              maxWidth: "100%",
            }}
          >
            <TextField fullWidth label="" id="fullWidth" type="time" />
          </Box>

          <h3>음식 카테고리</h3>
          <FormControl
            required
            error={error}
            component="fieldset"
            sx={{ m: 3 }}
            variant="standard"
          >
            <FormLabel component="legend">3개 이하로 골라주세요</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={gilad}
                    onChange={handleChange}
                    name="gilad"
                  />
                }
                label="Gilad Gray"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={jason}
                    onChange={handleChange}
                    name="jason"
                  />
                }
                label="Jason Killian"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={antoine}
                    onChange={handleChange}
                    name="antoine"
                  />
                }
                label="Antoine Llorca"
              />
            </FormGroup>
            <FormHelperText>3개 오버 됐습니다</FormHelperText>
          </FormControl>

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

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
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import AuthImageImport from "../components/layout/AuthImageImport";
import JoinFooter from "../components/layout/JoinFooter";
import MyMap from "../components/user/mypage/MyMap";

const AuthUserPage = () => {
  // 입력 관련 State
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
  const [userPwCheck, setUserPwCheck] = useState("");
  const [userName, setUserName] = useState("");
  const [userNickName, setUserNickName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userRestaurantName, setUserRestaurantName] = useState("");
  const [userCEONumber, setUserCEONumber] = useState("");
  const [userOpenTime, setUserOpenTime] = useState("");
  const [userCloseTime, setUserCloseTime] = useState("");
  const [userImgFile, setUserImgFile] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [userCEOTip, setUserCEOTip] = useState("");
  const [userCEOEvent, setUserCEOEvent] = useState("");

  // 주소 관련 State
  const [newXValue, setNewXValue] = useState("");
  const [newYValue, setNewYValue] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newAddressDetail, setNewAddressDetail] = useState("");
  const [state, setState] = useState({
    gilad: false,
    jason: false,
    antoine: false,
  });

  const emailTest = async () => {
    try {
      const res = await axios.get(`/api/is-duplicated?user_id=${userId}`);
      console.log(res);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const ceoSignUp = async () => {
    const pic = new FormData();

    const p = {
      desc1: userCEOTip,
      desc2: userCEOEvent,
      user_nickname: userNickName,
      open_time: userOpenTime,
      user_email: userEmail,
      coor_x: newXValue,
      coor_y: newYValue,
      restaurant_name: userRestaurantName,
      user_id: userId,
      addr: newAddress,
      close_time: userCloseTime,
      user_phone: userPhone,
      user_pw: userPw,
      user_pw_confirm: userPwCheck,
      regi_num: userCEONumber,
      user_name: userName,
    };

    // JSON 객체를 문자열로 변환하지 않고 바로 FormData에 추가
    pic.append("pic", userImgFile); // 파일(binary) 추가
    pic.append("p", JSON.stringify(p)); // JSON 객체 추가

    try {
      const header = { headers: { "Content-Type": "multipart/form-data" } };
      const res = await axios.post("/api/owner/sign-up", pic, header); // FormData 객체를 직접 전송
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const { gilad, jason, antoine } = state;
  const error = [gilad, jason, antoine].filter(v => v).length >= 2;

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
              <TextField
                fullWidth
                label="아이디"
                id="fullWidth"
                placeholder="아이디를 입력해 주세요."
                onChange={e => {
                  setUserId(e.target.value);
                }}
              />
            </Box>
            <button type="button" className="id-check">
              중복 확인
            </button>
          </div>
          <div>
            <Box style={{ alignItems: "center" }}>
              <TextField
                fullWidth
                label="이메일"
                id="fullWidth"
                placeholder="이메일을 입력해주세요."
                onChange={e => {
                  setUserEmail(e.target.value);
                }}
              />
            </Box>
            <button
              type="button"
              className="id-check"
              onClick={() => {
                emailTest();
              }}
            >
              이메일 인증
            </button>
          </div>
          <Box>
            <TextField
              fullWidth
              label="비밀번호"
              id="fullWidth"
              type="password"
              placeholder="비밀번호를 입력해 주세요."
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
              placeholder="비밀번호를 한번 더 입력해 주세요."
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
              placeholder="이름을 입력해 주세요."
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
              placeholder="닉네임을 입력해 주세요."
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
              placeholder="전화번호를 입력해 주세요."
              onChange={e => {
                setUserPhone(e.target.value);
              }}
            />
          </Box>

          <Box>
            <TextField
              fullWidth
              label="가게 한줄 설명"
              id="fullWidth"
              placeholder="간단한 가게 한줄 설명을 입력해주세요."
              onChange={e => {
                setUserCEOTip(e.target.value);
              }}
            />
          </Box>
          <TextField
            id="outlined-multiline-static"
            label="리뷰 이벤트 입력"
            placeholder="리뷰 이벤트에 쓸 내용을 입력해주세요."
            multiline
            rows={4}
            defaultValue=""
          />
          <Box>
            <TextField
              fullWidth
              label="가게이름"
              id="fullWidth"
              placeholder="가게 이름을 입력해 주세요."
              onChange={e => {
                setUserRestaurantName(e.target.value);
              }}
            />
          </Box>
          <Box>
            <TextField
              fullWidth
              label="사업자 번호"
              id="fullWidth"
              placeholder="사업자 번호를 입력해 주세요."
              onChange={e => {
                setUserCEONumber(e.target.value);
              }}
            />
          </Box>

          <div>
            <Box style={{ alignItems: "center" }}>
              <MyMap
                setNewXValue={setNewXValue}
                setNewYValue={setNewYValue}
                setNewAddress={setNewAddress}
              />
            </Box>
          </div>
          <Box>
            <TextField
              fullWidth
              label="상세 주소"
              id="fullWidth"
              placeholder="상세 주소를 입력해 주세요."
              onChange={e => {
                setNewAddressDetail(e.target.value);
              }}
            />
          </Box>
          <h3>오픈시간</h3>
          <Box
            sx={{
              maxWidth: "100%",
            }}
          >
            <TextField
              fullWidth
              label=""
              id="fullWidth"
              type="time"
              onChange={e => {
                setUserOpenTime(e.target.value);
              }}
            />
          </Box>
          <h3>마감시간</h3>
          <Box
            sx={{
              maxWidth: "100%",
            }}
          >
            <TextField
              fullWidth
              label=""
              id="fullWidth"
              type="time"
              onChange={e => {
                setUserCloseTime(e.target.value);
              }}
            />
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
          <AuthImageImport setUserImgFile={setUserImgFile} />

          <button
            type="button"
            onClick={() => {
              ceoSignUp();
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

/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  const [emailCode, setEmailCode] = useState("");
  const [isEmailCheck, setIsEmailCheck] = useState(false);

  // 정규 표현식 참, 거짓 State
  const [userIdComplete, setUerIdComplete] = useState(false);
  const [userPwComplete, setUerPwComplete] = useState(false);
  const [userPwCheckComplete, setUerPwCheckComplete] = useState(false);
  const [userEmailComplete, setUerEmailComplete] = useState(false);
  const [userPhoneComplete, setUerPhoneComplete] = useState(false);
  const [userImgComplete, setUerImgComplete] = useState(false);

  // 인증 참, 거짓 State
  const [idCheckOk, setIdCheckOk] = useState(false);
  const [idCheckComplete, setIdCheckComplete] = useState(false);
  const [emailCheckOk, setEmailCheckOk] = useState(false);
  const [emailCheckComplete, setEmailCheckComplete] = useState(false);

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

  // 정규 표현식 조건
  const idRegex = /^.{8,}$/;
  const passRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phoneRegex = /^\d{3}-\d{4}-\d{4}$/;
  const imageRegex = /^[\w,\s-]+\.(jpg|jpeg|png|gif|bmp)$/;

  const idTest = async () => {
    const isCheckId = idRegex.test(userId);
    if (isCheckId) {
      try {
        const res = await axios.get(`/api/is-duplicated?user_id=${userId}`);
        if (res) {
          alert(res.data.resultMsg);
        }
        if (res.data.statusCode === 1) {
          setIdCheckOk(true);
        } else {
          setIdCheckOk(false);
        }
        console.log(res);
        return res;
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("아이디 형식을 확인해주세요");
    }
  };

  const emailCheck = async () => {
    const data = {
      email: userEmail,
    };

    const isCheckEmail = emailRegex.test(userEmail);
    if (isCheckEmail) {
      setIsEmailCheck(true);
      try {
        const res = await axios.post("/api/mail/send", data);
        return res;
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("이메일 형식을 확인해주세요.");
    }
  };

  const emailCheckCancle = () => {
    setIsEmailCheck(false);
  };

  const emailCodeCheck = async () => {
    setIsEmailCheck(false);
    const data = {
      email: userEmail,
      authNum: emailCode,
    };
    try {
      const res = await axios.post("/api/mail/auth_check", data);
      if (res.data.resultData === false) {
        alert(res.data.resultMsg);
        setEmailCheckOk(false);
        return;
      } else if (res.data.resultData === true) {
        alert(res.data.resultMsg);
        setEmailCheckOk(true);
      }
      console.log(res);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const joinCeo = async event => {
    event.preventDefault();
    const isCheckId = idRegex.test(userId);
    const isCheckPass = passRegex.test(userPw);
    const isCheckPass2 = userPw === userPwCheck;
    const isCheckEmail = emailRegex.test(userEmail);
    const isCheckPhone = phoneRegex.test(userPhone);
    const isCheckImgFile = !userImgFile || imageRegex.test(userImgFile.name);

    if (isCheckId === false) {
      alert("아이디는 8자 이상이어야 합니다.");
      setUerIdComplete(false);
      return;
    } else {
      setUerIdComplete(true);
    }

    if (isCheckEmail === false) {
      alert("이메일 인증을 해주세요");
      setUerEmailComplete(false);
      return;
    } else {
      setUerEmailComplete(true);
    }

    if (isCheckPass === false) {
      alert("비밀번호는 8자 이상, 특수문자 사용해야합니다.");
      setUerPwComplete(false);
      return;
    } else {
      setUerPwComplete(true);
    }

    if (isCheckPass2 === false) {
      alert("비밀번호가 다릅니다.");
      setUerPwCheckComplete(false);
      return;
    } else {
      setUerPwCheckComplete(true);
    }

    if (isCheckPhone === false) {
      alert("전화번호를 확인해주세요.");
      setUerPhoneComplete(false);
      return;
    } else {
      setUerPhoneComplete(true);
    }

    if (isCheckImgFile === false) {
      setUerImgComplete(true);
      return;
    } else {
      setUerImgComplete(true);
    }

    if (
      userIdComplete &&
      userPwComplete &&
      userPwCheckComplete &&
      userEmailComplete &&
      userPhoneComplete &&
      userImgComplete &&
      idCheckComplete &&
      emailCheckComplete
    ) {
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
        if (res.data.statusCode === 1) {
          useNavigate("/login");
        } else {
          alert(res.data.resultMsg);
        }

        return res;
      } catch (error) {
        console.log(error);
      }
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
                emailCheck();
              }}
            >
              이메일 인증
            </button>
          </div>
          {isEmailCheck ? (
            <>
              <Box style={{ alignItems: "center" }}>
                <TextField
                  fullWidth
                  label="인증 번호"
                  id="fullWidth"
                  placeholder="인증 번호를 입력해주세요."
                  onChange={e => {
                    setEmailCode(e.target.value);
                  }}
                />
              </Box>
              <div style={{ justifyContent: "center" }}>
                <button
                  type="button"
                  className="btn"
                  onClick={() => {
                    emailCodeCheck();
                  }}
                >
                  인증
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => {
                    emailCheckCancle();
                  }}
                >
                  취소
                </button>
              </div>
            </>
          ) : null}
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
            label="사장님 알림"
            placeholder="가게 정보에 쓸 내용을 입력해주세요."
            onChange={e => {
              setUserCEOEvent(e.target.value);
            }}
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

          <h3>브랜드 로고</h3>
          <AuthImageImport setUserImgFile={setUserImgFile} />

          <button
            type="button"
            onClick={e => {
              joinCeo(e);
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

import { Box, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthImageImport from "../components/layout/AuthImageImport";
import JoinFooter from "../components/layout/JoinFooter";
import { Logo } from "../components/common/Logo";
import LoadingSpinner from "../components/common/LoadingSpinner";

const AuthUserPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  // 입력 관련 State
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
  const [userPwCheck, setUserPwCheck] = useState("");
  const [userName, setUserName] = useState("");
  const [userNickName, setUserNickName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userImgFile, setUserImgFile] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [isEmailCheck, setIsEmailCheck] = useState(false);

  // 정규 표현식 참, 거짓 State
  const [userIdComplete, setUserIdComplete] = useState(true);
  const [userPwComplete, setUerPwComplete] = useState(true);
  const [userPwCheckComplete, setUserPwCheckComplete] = useState(true);
  const [userEmailComplete, setUserEmailComplete] = useState(true);
  const [userPhoneComplete, setUserPhoneComplete] = useState(true);
  const [userImgComplete, setUserImgComplete] = useState(false);

  // 인증 참, 거짓 State
  const [idCheckOk, setIdCheckOk] = useState(false);
  const [idCheckComplete, setIdCheckComplete] = useState(true);
  const [emailCheckOk, setEmailCheckOk] = useState(false);
  const [emailCheckComplete, setEmailCheckComplete] = useState(true);

  // 정규 표현식 조건
  const idRegex = /^.{8,}$/;
  const passRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phoneRegex = /^\d{3}-\d{4}-\d{4}$/;
  const imageRegex = /^[\w,\s-]+\.(jpg|jpeg|png|gif|bmp)$/;

  // 전화번호 형식
  const handleInputChange = e => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setUserPhone(formattedPhoneNumber);
  };

  const formatPhoneNumber = value => {
    if (!value) return value;

    // eslint-disable-next-line react/prop-types
    const phoneNumber = value.replace(/[^\d]/g, "");
    const phoneNumberLength = phoneNumber.length;

    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 8) {
      return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
    }
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7, 11)}`;
  };

  // 중복확인
  const idTest = async () => {
    setIsLoading(true);
    const isCheckId = idRegex.test(userId);
    if (isCheckId) {
      try {
        const res = await axios.get(`/api/is-duplicated?user_id=${userId}`);

        if (res) {
          alert(res.data.resultMsg);
        }
        if (res.data.statusCode === 1) {
          setIdCheckOk(true);
          setIsLoading(false);
        } else {
          setIdCheckOk(false);
          setIsLoading(false);
        }
        setIsLoading(false);
        return res;
      } catch (error) {
        alert("서버에러입니다.");
        setIsLoading(false);
      }
    } else {
      alert("아이디는 8자 이상이어야 합니다.");
      setIsLoading(false);
    }
  };

  // 이메일 인증
  const emailCheck = async () => {
    setIsLoading(true);
    const data = {
      email: userEmail,
    };

    const isCheckEmail = emailRegex.test(userEmail);
    if (isCheckEmail) {
      try {
        const res = await axios.post("/api/mail/send", data);
        alert(res.data.resultMsg);
        setIsLoading(false);
        if (res.data.resultMsg === "메일이 발송되었습니다.") {
          setIsEmailCheck(true);
          setIsLoading(false);
          alert(res.data.resultMsg);
        } else {
          alert(res.data.resultMsg);
        }
        return res;
      } catch (error) {
        alert("서버에러입니다.");
        setIsLoading(false);
      }
    } else {
      alert("이메일 형식을 확인해주세요.");
      setIsLoading(false);
    }
  };

  const emailCheckCancle = () => {
    setIsEmailCheck(false);
  };

  // 이메일 인증 코드 인증
  const emailCodeCheck = async () => {
    setIsLoading(true);
    const data = {
      email: userEmail,
      authNum: emailCode,
    };
    try {
      const res = await axios.post("/api/mail/auth_check", data);
      if (res.data.statusCode === 1) {
        setEmailCheckOk(true);
        setIsEmailCheck(false);
      } else {
        setEmailCheckOk(false);
        setIsEmailCheck(true);
      }
      if (res.data.resultData === false) {
        alert(res.data.resultMsg);

        return;
      } else if (res.data.resultData === true) {
        alert(res.data.resultMsg);
        setEmailCheckOk(true);
      }
      return res;
    } catch (error) {
      alert("서버에러입니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const joinMember = async event => {
    event.preventDefault();
    const isCheckId = idRegex.test(userId);
    const isCheckPass = passRegex.test(userPw);
    const isCheckPass2 = userPw === userPwCheck;
    const isCheckEmail = emailRegex.test(userEmail);
    const isCheckPhone = phoneRegex.test(userPhone);
    const isCheckImgFile = !userImgFile || imageRegex.test(userImgFile.name);

    if (isCheckId === false) {
      alert("아이디는 8자 이상이어야 합니다.");
      setUserIdComplete(false);
      return;
    } else {
      setUserIdComplete(true);
    }

    if (idCheckOk === false) {
      alert("아이디 중복확인을 해주세요");
      setIdCheckComplete(false);
      return;
    } else {
      setIdCheckComplete(true);
    }

    if (isCheckEmail === false) {
      alert("이메일 형식을 확인 해주세요");
      setUserEmailComplete(false);
      return;
    } else {
      setUserEmailComplete(true);
    }

    if (emailCheckOk === false) {
      alert("이메일 인증을 해주세요");
      setEmailCheckComplete(false);
      return;
    } else {
      setEmailCheckComplete(true);
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
      setUserPwCheckComplete(false);
      return;
    } else {
      setUserPwCheckComplete(true);
    }

    if (isCheckPhone === false) {
      alert("전화번호를 확인해주세요.");
      setUserPhoneComplete(false);
      return;
    } else {
      setUserPhoneComplete(true);
    }

    if (
      userIdComplete &&
      userPwComplete &&
      userPwCheckComplete &&
      userEmailComplete &&
      userPhoneComplete &&
      idCheckComplete &&
      emailCheckComplete
    ) {
      const pic = new FormData();
      const p = {
        user_id: userId,
        user_pw: userPw,
        user_pw_confirm: userPwCheck,
        user_name: userName,
        user_nickname: userNickName,
        user_phone: userPhone,
        user_email: userEmail,
      };

      // JSON 객체를 문자열로 변환하지 않고 바로 FormData에 추가
      pic.append("pic", userImgFile); // 파일(binary) 추가
      pic.append("p", JSON.stringify(p)); // JSON 객체 추가

      try {
        const header = { headers: { "Content-Type": "multipart/form-data" } };
        const res = await axios.post("../api/sign-up", pic, header); // FormData 객체를 직접 전송
        if (res.data.resultData === 1) {
          alert("회원가입 성공 환영합니다.");
          navigate("/login");
        } else {
          alert(res.data.resultMsg);
        }

        return res;
      } catch (error) {
        alert("서버에러입니다.");
      }
    }
  };

  return (
    <>
      <div className="user-join-wrap">
        <Logo />
        <h2>일반 회원가입</h2>
        <div className="line"></div>
        <form className="user-join-form">
          <div>
            <Box style={{ alignItems: "center" }}>
              <TextField
                error={!userIdComplete || !idCheckComplete}
                fullWidth
                label="아이디"
                id="fullWidth"
                placeholder="아이디는 8자 이상이어야 합니다."
                onChange={e => {
                  setUserId(e.target.value);
                }}
              />
            </Box>
            <button
              type="button"
              className="btn"
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
                error={!userEmailComplete || !emailCheckComplete}
                label="이메일"
                id="fullWidth"
                placeholder="이메일을 입력해주세요."
                onChange={e => {
                  setUserEmail(e.target.value);
                }}
                disabled={emailCheckOk}
              />
            </Box>
            {emailCheckOk === true ? null : (
              <button
                type="button"
                className="btn"
                onClick={() => {
                  emailCheck();
                }}
              >
                이메일 인증
              </button>
            )}
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
              error={!userPwComplete}
              label="비밀번호"
              type="password"
              placeholder="비밀번호는 8자 이상, 특수문자 사용해야합니다."
              onChange={e => {
                setUserPw(e.target.value);
              }}
            />
          </Box>
          <Box>
            <TextField
              fullWidth
              error={!userPwCheckComplete}
              label="비밀번호 확인"
              id="fullWidth"
              type="password"
              placeholder="비밀번호를 한번 더 입력해주세요."
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
              placeholder="이름을 입력해주세요."
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
              placeholder="닉네임을 입력해주세요."
              onChange={e => {
                setUserNickName(e.target.value);
              }}
            />
          </Box>
          <Box>
            <TextField
              fullWidth
              error={!userPhoneComplete}
              label="전화번호"
              id="fullWidth"
              value={userPhone}
              placeholder="전화번호를 입력해주세요."
              onChange={handleInputChange}
            />
          </Box>
          <h3>프로필 사진</h3>
          <AuthImageImport setUserImgFile={setUserImgFile} />
          <button
            type="button"
            className="btn"
            onClick={e => {
              joinMember(e);
            }}
          >
            회원가입
          </button>
        </form>
      </div>
      <JoinFooter />
      {isLoading ? <LoadingSpinner /> : null}
    </>
  );
};

export default AuthUserPage;

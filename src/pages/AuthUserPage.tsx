import { Box, TextField, Typography } from "@mui/material";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { Logo } from "../components/common/Logo";
import AuthImageImport from "../components/layout/AuthImageImport";
import JoinFooter from "../components/layout/JoinFooter";

const Divider = styled(Box)`
  width: 100%;
  display: flex;
  align-items: center;
  text-align: center;
  margin: 12px 0;
`;

const Line = styled(Box)`
  flex: 1;
  border-bottom: 1px solid #ddd;
`;

const Text = styled(Typography)`
  padding: 0 8px;
  color: #afafaf;
`;

const AuthUserPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 입력 관련 State
  const [userId, setUserId] = useState<string>("");
  const [userPw, setUserPw] = useState<string>("");
  const [userPwCheck, setUserPwCheck] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [userNickName, setUserNickName] = useState<string>("");
  const [userPhone, setUserPhone] = useState<string>("");
  const [userImgFile, setUserImgFile] = useState<File | undefined>(undefined);
  const [userEmail, setUserEmail] = useState<string>("");
  const [emailCode, setEmailCode] = useState<string>("");
  const [isEmailCheck, setIsEmailCheck] = useState<boolean>(false);

  // 정규 표현식 참, 거짓 State
  const [userIdComplete, setUserIdComplete] = useState<boolean>(true);
  const [userPwComplete, setUserPwComplete] = useState<boolean>(true);
  const [userPwCheckComplete, setUserPwCheckComplete] = useState<boolean>(true);
  const [userEmailComplete, setUserEmailComplete] = useState<boolean>(true);
  const [userPhoneComplete, setUserPhoneComplete] = useState<boolean>(true);
  const [userImgComplete, setUserImgComplete] = useState<boolean>(false);

  // 인증 참, 거짓 State
  const [idCheckOk, setIdCheckOk] = useState<boolean>(false);
  const [idCheckComplete, setIdCheckComplete] = useState<boolean>(true);
  const [emailCheckOk, setEmailCheckOk] = useState<boolean>(false);
  const [emailCheckComplete, setEmailCheckComplete] = useState<boolean>(true);

  // 정규 표현식 조건
  const idRegex = /^.{8,}$/;
  const passRegex =
    /^(?=.*[0-9])(?=.*[!@#$%^&*()\-_=+\\|[\]{};:'",<.>?/]).{8,}$/;

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phoneRegex = /^\d{3}-\d{4}-\d{4}$/;
  const imageRegex = /^[\w,\s-]+\.(jpg|jpeg|png|gif|bmp)$/;

  // 전화번호 형식
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setUserPhone(formattedPhoneNumber);
  };

  const formatPhoneNumber = (value: string) => {
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

        if (res.data.statusCode === 1) {
          Swal.fire({
            icon: "success",
            text: res.data.resultMsg,
          });
          setIdCheckOk(true);
          setIsLoading(false);
        } else {
          Swal.fire({
            icon: "info",
            text: res.data.resultMsg,
          });
          setIdCheckOk(false);
          setIsLoading(false);
        }

        setIsLoading(false);
        return res;
      } catch (error) {
        Swal.fire({
          icon: "error",
          text: "서버에러입니다.",
        });
        setIsLoading(false);
      }
    } else {
      Swal.fire({
        icon: "warning",
        text: "아이디는 8자 이상이어야 합니다.",
      });
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

        setIsLoading(false);
        if (res.data.resultMsg === "메일이 발송되었습니다.") {
          Swal.fire({
            icon: "success",
            text: res.data.resultMsg,
          });
          setIsEmailCheck(true);
          setIsLoading(false);
        } else {
          Swal.fire({
            icon: "info",
            text: res.data.resultMsg,
          });
        }
        return res;
      } catch (error) {
        Swal.fire({
          icon: "error",
          text: "서버에러입니다.",
        });
        setIsLoading(false);
      }
    } else {
      Swal.fire({
        icon: "warning",
        text: "이메일 형식을 확인해주세요.",
      });
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
      if (emailCode === "") {
        Swal.fire({
          icon: "warning",
          text: "빈문자열은 사용할수 없습니다.",
        });
        return;
      }
      if (res.data.resultData === false) {
        Swal.fire({
          icon: "warning",
          text: "코드가 다릅니다.",
        });

        return;
      } else if (res.data.resultData === true) {
        Swal.fire({
          icon: "success",
          title: "감사합니다.",
          text: res.data.resultMsg,
        });
        setEmailCheckOk(true);
      }
      return res;
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: "서버에러입니다.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const joinMember = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const isCheckId = idRegex.test(userId);
    const isCheckPass = passRegex.test(userPw);
    const isCheckPass2 = userPw === userPwCheck;
    const isCheckEmail = emailRegex.test(userEmail);
    const isCheckPhone = phoneRegex.test(userPhone);
    // const isCheckImgFile = !userImgFile || imageRegex.test(userImgFile.name);

    if (isCheckId === false) {
      Swal.fire({
        icon: "warning",
        text: "아이디는 8자 이상이어야 합니다.",
      });
      setUserIdComplete(false);
      return;
    } else {
      setUserIdComplete(true);
    }

    if (idCheckOk === false) {
      Swal.fire({
        icon: "warning",
        text: "아이디 중복확인을 해주세요.",
      });
      setIdCheckComplete(false);
      return;
    } else {
      setIdCheckComplete(true);
    }

    if (isCheckEmail === false) {
      Swal.fire({
        icon: "warning",
        text: "이메일 형식을 확인 해주세요.",
      });
      setUserEmailComplete(false);
      return;
    } else {
      setUserEmailComplete(true);
    }

    if (emailCheckOk === false) {
      Swal.fire({
        icon: "warning",
        text: "이메일 인증을 해주세요.",
      });
      setEmailCheckComplete(false);
      return;
    } else {
      setEmailCheckComplete(true);
    }

    if (isCheckPass === false) {
      Swal.fire({
        icon: "warning",
        text: "비밀번호는 8자 이상, 숫자와 특수문자 사용해야합니다.",
      });
      setUserPwComplete(false);
      return;
    } else {
      setUserPwComplete(true);
    }

    if (isCheckPass2 === false) {
      Swal.fire({
        icon: "warning",
        text: "비밀번호가 다릅니다.",
      });
      setUserPwCheckComplete(false);
      return;
    } else {
      setUserPwCheckComplete(true);
    }

    if (isCheckPhone === false) {
      Swal.fire({
        icon: "warning",
        text: "전화번호를 확인해주세요.",
      });
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
      if (userName === "" || userNickName === "") {
        Swal.fire({
          icon: "warning",
          text: "빈 문자열은 사용할수 없습니다.",
        });
        return;
      }

      const pic = new FormData();
      const p = {
        user_id: userId,
        user_pw: userPw,
        user_pw_confirm: userPwCheck,
        user_name: userName,
        user_nickname: userNickName,
        user_phone: userPhone,
        user_email: userEmail,
        auth_num: emailCode,
      };

      // JSON 객체를 문자열로 변환하지 않고 바로 FormData에 추가
      if (userImgFile) {
        pic.append("pic", userImgFile); // 파일(binary) 추가
      }
      pic.append("p", JSON.stringify(p)); // JSON 객체 추가

      try {
        const header = { headers: { "Content-Type": "multipart/form-data" } };
        const res = await axios.post("../api/sign-up", pic, header); // FormData 객체를 직접 전송
        if (res.data.resultData === 1) {
          Swal.fire({
            icon: "success",
            text: "회원가입 성공 환영합니다.",
          });
          navigate("/login");
        } else {
          Swal.fire({
            icon: "warning",
            text: res.data.resultMsg,
          });
        }

        return res;
      } catch (error) {
        Swal.fire({
          icon: "error",
          text: "서버에러입니다.",
        });
      }
    }
  };

  return (
    <>
      <div className="login-main">
        <div className="inner">
          <div className="user-join-realwrap">
            <div className="user-join-wrap">
              <div className="flex-colum">
                <div className="login-form">
                  <Logo />
                  <Divider>
                    <Line />
                    <Text>일반 가입</Text>
                    <Line />
                  </Divider>
                  <form className="user-join-form">
                    <div className="check-button-box">
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
                    <div className="check-button-box">
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
                        placeholder="비밀번호는 8자 이상, 숫자와 특수문자 사용해야합니다."
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthUserPage;

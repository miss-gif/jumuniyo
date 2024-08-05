/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthImageImport from "../components/layout/AuthImageImport";
import JoinFooter from "../components/layout/JoinFooter";
import MyMap from "../components/user/mypage/MyMap";
import { Logo } from "../components/common/Logo";
import LoadingSpinner from "../components/common/LoadingSpinner";
import Swal from "sweetalert2";
import styled from "styled-components";

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

const AuthUserPage = () => {
  const [isLoading, setIsLoading] = useState(false);
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

  // 정규 표현식 참, 거짓 State
  const [userIdComplete, setUserIdComplete] = useState(true);
  const [userPwComplete, setUerPwComplete] = useState(true);
  const [userPwCheckComplete, setUserPwCheckComplete] = useState(true);
  const [userEmailComplete, setUserEmailComplete] = useState(true);
  const [userPhoneComplete, setUserPhoneComplete] = useState(true);
  const [userImgComplete, setUserImgComplete] = useState(true);
  const [businessNumberComplete, setBusinessNumberComplete] = useState(true);

  // 인증 참, 거짓 State
  const [isEmailCheck, setIsEmailCheck] = useState(false);
  const [idCheckOk, setIdCheckOk] = useState(false);
  const [idCheckComplete, setIdCheckComplete] = useState(true);
  const [emailCheckOk, setEmailCheckOk] = useState(false);
  const [emailCheckComplete, setEmailCheckComplete] = useState(true);

  const navigate = useNavigate();

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
  const businessNumberPattern = /^\d{3}-\d{2}-\d{5}$/;

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

  const joinCeo = async event => {
    event.preventDefault();
    const isCheckId = idRegex.test(userId);
    const isCheckPass = passRegex.test(userPw);
    const isCheckPass2 = userPw === userPwCheck;
    const isCheckEmail = emailRegex.test(userEmail);
    const isCheckPhone = phoneRegex.test(userPhone);
    const isCheckImgFile = !userImgFile || imageRegex.test(userImgFile.name);
    const isCheckBusinessNumber = businessNumberPattern.test(userCEONumber);

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
        text: "비밀번호는 8자 이상, 특수문자 사용해야합니다.",
      });
      setUerPwComplete(false);
      return;
    } else {
      setUerPwComplete(true);
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

    if (isCheckBusinessNumber === false) {
      Swal.fire({
        icon: "warning",
        text: "사업자 번호는 nnn-nn-nnnnn의 형식으로 들어와야 합니다.",
      });
      setBusinessNumberComplete(false);
      return;
    } else {
      setBusinessNumberComplete(true);
    }

    if (
      userIdComplete &&
      userPwComplete &&
      userPwCheckComplete &&
      userEmailComplete &&
      userPhoneComplete &&
      userImgComplete &&
      idCheckComplete &&
      // emailCheckComplete &&
      businessNumberComplete
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
                    <Text>사장님 가입</Text>
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
                          placeholder="아이디를 입력해주세요."
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
                        placeholder="비밀번호를 입력해주세요."
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
                        error={!userPhoneComplete}
                        label="전화번호"
                        id="fullWidth"
                        value={userPhone}
                        placeholder="전화번호를 입력해주세요."
                        onChange={handleInputChange}
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
                        placeholder="사업자 번호는 nnn-nn-nnnnn의 형식으로 들어와야 합니다."
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
                      className="btn"
                      onClick={e => {
                        joinCeo(e);
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

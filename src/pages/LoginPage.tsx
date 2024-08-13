import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  makeStyles,
  styled,
} from "@mui/material";
import axios from "axios";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  setAccessToken,
  setTokenMaxAge,
  setUserAddress,
  setUserData,
  setUserPhone,
  setUserRole,
  setSearchTerm,
  setLocationData,
} from "../app/userSlice";
import { Logo } from "../components/common/Logo";
import JoinFooter from "../components/layout/JoinFooter";
import { setCookie } from "../utils/cookie";

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

const StyledButton = styled(Button)({
  backgroundColor: "#3085d6",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#2874a6",
  },
  borderRadius: "5px",
  boxShadow: "0 2px 2px rgba(0, 0, 0, 0.1)",
  padding: "10px 20px",
});

const CancelButton = styled(Button)({
  backgroundColor: "#aaa",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#888",
  },
  borderRadius: "5px",
  boxShadow: "0 2px 2px rgba(0, 0, 0, 0.1)",
  padding: "10px 20px",
});

const AuthUserPage: React.FC = () => {
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
  const [findIdIsOpen, setFindIdIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    if (email === "") {
      Swal.fire({
        icon: "warning",
        text: "이메일 입력해주세요.",
      });
    }
    if (name === "") {
      Swal.fire({
        icon: "warning",
        text: "아이디를 입력해주세요.",
      });
    }

    console.log(`입력된 이름: ${name}`);
    console.log(`입력된 이메일: ${email}`);
    setOpen(false);
  };

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const login = async (e: FormEvent) => {
    e.preventDefault();

    if (userId === "") {
      Swal.fire({
        icon: "warning",
        text: "아이디를 입력해주세요.",
      });
      return;
    }

    if (userPw === "") {
      Swal.fire({
        icon: "warning",
        text: "비밀번호를 입력해주세요.",
      });
      return;
    }

    try {
      const response = await axios.post("/api/sign-in", {
        user_id: userId,
        user_pw: userPw,
        user_login_type: 1,
      });

      if (response.data.statusCode === 1 || response.data.statusCode === 2) {
        const resultData = response.data.resultData; // 구조 분해 할당 대신 직접 접근

        if (resultData) {
          dispatch(setUserData(resultData));
          dispatch(setUserRole(resultData.userRole || ""));
          dispatch(setUserAddress(resultData.mainAddr || ""));
          dispatch(setUserPhone(resultData.userPhone || ""));
          dispatch(setAccessToken(resultData.accessToken || ""));
          dispatch(setTokenMaxAge(resultData.tokenMaxAge || 0));
          dispatch(setSearchTerm(resultData.mainAddr?.addr1 || ""));
          dispatch(
            setLocationData({
              latitude: resultData.mainAddr?.addrCoorX || 0,
              longitude: resultData.mainAddr?.addrCoorY || 0,
              geocodeAddress: "",
            }),
          );
        }
      }

      // accessToken을 쿠키에 저장
      setCookie("accessToken", response.data.resultData.accessToken);

      // 사용자 역할에 따라 다른 경로로 이동
      const userRole = response.data.resultData.userRole;
      const mainAddr = response.data.resultData.mainAddr;

      if (response.data.statusCode === 2) {
        navigate("/mypage/address");
        return;
      } else if (userRole === "ROLE_OWNER") {
        navigate("/ceopage/home");
        return;
      } else if (userRole === "ROLE_ADMIN") {
        navigate("/admin");
        return;
      } else if (response.data.statusCode === -2) {
        Swal.fire({
          icon: "warning",
          text: response.data.resultMsg,
        });
        navigate("/login");
        return;
      } else {
        navigate("/");
        return;
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: "서버에러입니다.",
      });
      return error;
    }
  };

  const findId = async () => {
    const { value: formValues } = await Swal.fire({
      title: "아이디 찾기",
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="이름을 입력 해주세요." />' +
        '<input id="swal-input2" class="swal2-input" type="email" placeholder="이메일을 입력 해주세요." />',
      focusConfirm: false,
      preConfirm: () => {
        return [
          // document.getElementById("swal-input1").value,
          // document.getElementById("swal-input2").value,
        ];
      },
    });

    if (formValues) {
      const [name, email] = formValues;
      if (name === "") {
        Swal.fire({
          icon: "warning",
          text: "이름을 입력해주세요.",
        });
        return;
      }
      if (email === "") {
        Swal.fire({
          icon: "warning",
          text: "이메일을 입력해주세요.",
        });
        return;
      }
    }
  };

  return (
    <>
      <div className="login-main">
        <div className="inner">
          <div className="user-join-realwrap">
            <div className="user-join-wrap">
              <div className="flex-between-box ">
                {/* <div className="login-image-box"></div> */}
                <div className="login-form">
                  <div className="logo-margin-box">
                    <Logo style={{ width: "200px", height: "100px" }} />
                  </div>
                  <form className="user-join-form">
                    <div className="display-block">
                      {/* <h3>아이디</h3> */}
                      <Box
                        sx={{
                          maxWidth: "100%",
                          backgroundColor: "white",
                          borderRadius: "4px",
                        }}
                      >
                        <TextField
                          fullWidth
                          id="fullWidth"
                          label="아이디"
                          onChange={e => {
                            setUserId(e.target.value);
                          }}
                        />
                      </Box>
                    </div>
                    <div className="display-block">
                      {/* <h3>비밀번호</h3> */}
                      <Box
                        sx={{
                          width: 250,
                          maxWidth: "100%",
                          backgroundColor: "white",
                          borderRadius: "4px",
                        }}
                      >
                        <TextField
                          fullWidth
                          id="fullWidth"
                          label="비밀번호"
                          type="password"
                          onChange={e => {
                            setUserPw(e.target.value);
                          }}
                        />
                      </Box>
                    </div>

                    <div className="login-find">
                      <h6
                        onClick={() => {
                          navigate("/auth");
                        }}
                      >
                        회원가입
                      </h6>
                      <div>
                        <h6
                          onClick={() => {
                            findId();
                          }}
                        >
                          아이디 찾기
                        </h6>
                        <h5>·</h5>
                        <h6
                          onClick={() => {
                            handleClickOpen();
                          }}
                        >
                          비밀번호 찾기
                        </h6>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="btn"
                      onClick={e => {
                        login(e);
                      }}
                    >
                      로그인
                    </button>

                    {/*  */}
                    <Divider>
                      <Line />
                      <Text>소셜 로그인</Text>
                      <Line />
                    </Divider>
                    <div className="소셜로그인">
                      <div className="로그인">
                        <div className="아이콘">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="25"
                            viewBox="0 0 24 25"
                            fill="none"
                          >
                            <path
                              d="M2 11.4475C2 6.3348 6.656 2.5 12 2.5C17.344 2.5 22 6.3348 22 11.4475C22 16.5602 17.344 20.395 12 20.395C11.474 20.395 10.9587 20.3599 10.454 20.2897L7.554 22.3235C7.38945 22.4388 7.1961 22.5003 6.99839 22.5C6.80068 22.4997 6.60749 22.4378 6.44321 22.322C6.27894 22.2062 6.15097 22.0417 6.07546 21.8494C5.99995 21.657 5.98031 21.4454 6.019 21.2413L6.464 18.9034C3.828 17.3318 2 14.6233 2 11.4475ZM10 6.71059C10.2652 6.71059 10.5196 6.82149 10.7071 7.0189C10.8946 7.21631 11 7.48406 11 7.76324V15.1318C11 15.411 10.8946 15.6787 10.7071 15.8761C10.5196 16.0735 10.2652 16.1844 10 16.1844C9.73478 16.1844 9.48043 16.0735 9.29289 15.8761C9.10536 15.6787 9 15.411 9 15.1318V7.76324C9 7.48406 9.10536 7.21631 9.29289 7.0189C9.48043 6.82149 9.73478 6.71059 10 6.71059ZM11 12.5002C11 12.2675 11.073 12.0349 11.22 11.8422L13.22 9.21063C13.3887 9.00265 13.6277 8.87195 13.8864 8.84621C14.145 8.82047 14.403 8.90171 14.6058 9.07272C14.8085 9.24373 14.9401 9.4911 14.9726 9.76243C15.0051 10.0338 14.936 10.3078 14.78 10.5264L13.28 12.5002L14.78 14.4739C14.867 14.5811 14.9326 14.7056 14.973 14.8401C15.0134 14.9745 15.0277 15.1161 15.0151 15.2565C15.0025 15.3969 14.9632 15.5332 14.8996 15.6572C14.836 15.7813 14.7494 15.8907 14.6448 15.9789C14.5403 16.0671 14.42 16.1322 14.2911 16.1705C14.1622 16.2088 14.0273 16.2194 13.8944 16.2018C13.7615 16.1841 13.6333 16.1386 13.5174 16.0678C13.4016 15.997 13.3005 15.9024 13.22 15.7897L11.22 13.1581C11.0778 12.9714 11.0002 12.7394 11 12.5002Z"
                              fill="black"
                            />
                            <defs>
                              <clipPath id="clip0_389_657">
                                <rect
                                  width="24"
                                  height="24"
                                  fill="white"
                                  transform="translate(0 0.5)"
                                />
                              </clipPath>
                            </defs>
                          </svg>
                        </div>
                        <div className="텍스트">카카오로 시작하기</div>
                      </div>
                      <div className="로그인">
                        <div className="아이콘">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="25"
                            viewBox="0 0 24 25"
                            fill="none"
                          >
                            <path
                              d="M15.5608 13.2042L8.14667 2.5H2V22.5H8.43833V11.7967L15.8533 22.5H22V2.5H15.5608V13.2042Z"
                              fill="black"
                            />
                          </svg>
                        </div>
                        <div className="텍스트">네이버로 시작하기</div>
                      </div>
                      <div className="로그인">
                        <div className="아이콘">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="25"
                            viewBox="0 0 24 25"
                            fill="none"
                          >
                            <path
                              d="M21.8055 10.5415H21V10.5H12V14.5H17.6515C16.827 16.8285 14.6115 18.5 12 18.5C8.6865 18.5 6 15.8135 6 12.5C6 9.1865 8.6865 6.5 12 6.5C13.5295 6.5 14.921 7.077 15.9805 8.0195L18.809 5.191C17.023 3.5265 14.634 2.5 12 2.5C6.4775 2.5 2 6.9775 2 12.5C2 18.0225 6.4775 22.5 12 22.5C17.5225 22.5 22 18.0225 22 12.5C22 11.8295 21.931 11.175 21.8055 10.5415Z"
                              fill="#FFC107"
                            />
                            <path
                              d="M3.15308 7.8455L6.43858 10.255C7.32758 8.054 9.48058 6.5 12.0001 6.5C13.5296 6.5 14.9211 7.077 15.9806 8.0195L18.8091 5.191C17.0231 3.5265 14.6341 2.5 12.0001 2.5C8.15908 2.5 4.82808 4.6685 3.15308 7.8455Z"
                              fill="#FF3D00"
                            />
                            <path
                              d="M11.9999 22.5C14.5829 22.5 16.9299 21.5115 18.7044 19.904L15.6094 17.285C14.5717 18.0742 13.3036 18.501 11.9999 18.5C9.39891 18.5 7.19041 16.8415 6.35841 14.527L3.09741 17.0395C4.75241 20.278 8.11341 22.5 11.9999 22.5Z"
                              fill="#4CAF50"
                            />
                            <path
                              d="M21.8055 10.5415H21V10.5H12V14.5H17.6515C17.2571 15.6082 16.5467 16.5766 15.608 17.2855L15.6095 17.2845L18.7045 19.9035C18.4855 20.1025 22 17.5 22 12.5C22 11.8295 21.931 11.175 21.8055 10.5415Z"
                              fill="#1976D2"
                            />
                          </svg>
                        </div>
                        <div className="텍스트">구글로 시작하기</div>
                      </div>
                    </div>

                    {/*  */}
                  </form>

                  <Dialog open={open} onClose={handleClose}>
                    <span className="find-text">아이디 찾기</span>
                    <DialogContent>
                      <TextField
                        autoFocus
                        margin="dense"
                        label="이름"
                        type="text"
                        fullWidth
                        value={name}
                        onChange={e => setName(e.target.value)}
                      />
                      <TextField
                        margin="dense"
                        label="이메일"
                        type="email"
                        fullWidth
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                      />
                    </DialogContent>
                    <DialogActions>
                      <StyledButton onClick={handleConfirm} color="primary">
                        확인
                      </StyledButton>
                      <CancelButton onClick={handleClose} color="primary">
                        취소
                      </CancelButton>
                    </DialogActions>
                  </Dialog>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthUserPage;

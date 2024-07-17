import { Link, useNavigate } from "react-router-dom";
import JoinFooter from "../components/layout/JoinFooter";
import { Box, TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { setCookie } from "../utils/cookie";

const AuthUserPage = () => {
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");

  const navigate = useNavigate();

  const login = async e => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/sign-in", {
        user_id: userId,
        user_pw: userPw,
        user_login_type: 1,
      });
      setCookie("accessToken", response.data.resultData.accessToken);
      console.log(response.data.resultData.userRole);
      if (
        response.data.resultData.userRole === "ROLE_USER" &&
        response.data.resultData.mainAddr === null
      ) {
        navigate("/mypage/address");
      } else if (response.data.resultData.userRole === "ROLE_OWNER") {
        navigate("/ceopage/home");
      } else {
        navigate("/");
      }
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
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
        <h2>일반 로그인</h2>
        <div className="line"></div>
        <form className="user-join-form">
          <Box
            sx={{
              width: 500,
              maxWidth: "100%",
            }}
          >
            <TextField
              fullWidth
              label="아이디"
              id="fullWidth"
              onChange={e => {
                setUserId(e.target.value);
              }}
            />
          </Box>
          <Box
            sx={{
              width: 500,
              maxWidth: "100%",
            }}
          >
            <TextField
              fullWidth
              label="비밀번호"
              id="fullWidth"
              type="password"
              onChange={e => {
                setUserPw(e.target.value);
              }}
            />
          </Box>

          <div>
            <h6
              onClick={() => {
                navigate("/auth");
              }}
            >
              회원가입
            </h6>
          </div>
          <button
            type="submit"
            onClick={e => {
              login(e);
            }}
          >
            로그인
          </button>
          {/* <div className="social-login">
            <div className="social-login-kakao">
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
            <div className="social-login-naver">
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
            <div className="social-login-google">
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
          </div> */}
        </form>
      </div>
      <JoinFooter />
    </>
  );
};

export default AuthUserPage;

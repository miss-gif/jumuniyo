import { Box, TextField } from "@mui/material";
import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { setAccessToken, setLocationData } from "../app/userSlice";
import { Logo } from "../components/common/Logo";
import { setCookie } from "../utils/cookie";
const SnsLoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [newUser, setNewUser] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [userPhone, setUserPhone] = useState<string>("");
  const [useToken, setUseToken] = useState<string>("");

  useEffect(() => {
    const myUrl = new URL(window.location.href); //브라우저 주소창 내용을 가져와서 URL 객체화
    const token = myUrl.searchParams.get("access_token");
    setUseToken(token || "");

    const userSeq = myUrl.searchParams.get("user_id");
    const userNickName = myUrl.searchParams.get("nm");
    const userPic = myUrl.searchParams.get("pic");
    setNewUser(myUrl.searchParams.get("needs_additional_info") || "");
    if (newUser === "false") {
      handleButtonClick();
    }
  }, [newUser]);
  //아래 화면은 찰나라서 보이진 않겠지만 보여주고 싶은 화면 출력

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

  const signIn = async (e: FormEvent) => {
    e.preventDefault();
    const data = {
      userName: userName,
      userPhone: userPhone,
    };

    try {
      const res = await axios.put("/api/social", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${useToken}`,
        },
      });
      if (res.data.statusCode === 1) {
        Swal.fire({
          icon: "success",
          text: res.data.resultMsg,
        });
        dispatch(setAccessToken(useToken || ""));

        navigate("/mypage/address");
      } else {
        Swal.fire({
          icon: "warning",
          text: res.data.resultMsg,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: "서버에러입니다.",
      });
    }
  };

  const handleButtonClick = async () => {
    dispatch(setAccessToken(useToken || ""));
    setCookie("accessToken", useToken);

    try {
      const res = await axios.get("/api/address/main-address", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${useToken}`,
        },
      });

      if (res.data.resultData) {
        dispatch(
          setLocationData({
            latitude: res.data.resultData.addrCoorX || 0,
            longitude: res.data.resultData.addrCoorY || 0,
            geocodeAddress: "",
          }),
        );
        navigate("/");
      } else {
        navigate("/mypage/address");
      }
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  if (newUser === "true") {
    return (
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
                          label="이름"
                          onChange={e => {
                            setUserName(e.target.value);
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
                          label="전화번호"
                          id="fullWidth"
                          value={userPhone}
                          placeholder="전화번호를 입력해주세요."
                          onChange={handleInputChange}
                        />
                      </Box>
                    </div>

                    <button
                      type="submit"
                      className="btn"
                      onClick={e => {
                        signIn(e);
                      }}
                    >
                      로그인
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default SnsLoginPage;

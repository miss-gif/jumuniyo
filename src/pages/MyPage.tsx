import { useEffect, useState } from "react";
import jwtAxios from "../api/user/jwtUtil";
import ModifyNickName from "../components/common/mypage/ModifyNickName";
import ModifyPass from "../components/common/mypage/ModifyPass";
import ModifyPhone from "../components/common/mypage/ModifyPhone";
import Mypage from "../components/join/Mypage";
import ImageImport from "../components/layout/ImageImport";
import { getCookie } from "../utils/cookie";
import NotLogin from "../components/common/mypage/NotLogin";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

export interface UserState {
  accessToken: string;
  // 다른 상태 속성 추가 가능
}

// 전체 상태의 타입 정의
export interface RootState {
  user: UserState;
  // 다른 상태 속성 추가 가능
}

const MyPage: React.FC = () => {
  const [isEditNickname, setIsEditNickname] = useState(false);
  const [isEditPassword, setIsEditPassword] = useState(false);
  const [isEditImg, setIsEditImg] = useState(false);
  const [isEditPhoneNumber, setIsEditPhoneNumber] = useState(false);
  const [imgFile, setImgFile] = useState(null);
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [newImgFile, setNewImgFile] = useState("");
  const [isLogIn, setIsLogIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [nickName, setNickName] = useState("");
  const [passWord, setPassWord] = useState("");

  const accessToken =
    useSelector((state: RootState) => state.user.accessToken) || "";

  const getUserInfo = async () => {
    try {
      const res = await jwtAxios.get("/api/user-info");
      setImgUrl(res.data.resultData.userPic);
      setPhoneNumber(res.data.resultData.userPhone);
      setPassWord(res.data.resultData.userPhone);
      setNickName(res.data.resultData.userNickname);
      setName(res.data.resultData.userName);
      setUserId(res.data.resultData.userId);
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: "서버에러입니다.",
      });
    }
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      await getUserInfo();
    };
    const isLogin = getCookie("accessToken");

    if (!isLogin) {
      setUserId("로그인 후 이용해주세요");
      setPhoneNumber("로그인 후 이용해주세요");
      setNickName("로그인 후 이용해주세요");
      setName("로그인 후 이용해주세요");
      setIsLogIn(false);
      setIsLoading(false);
    } else {
      setIsLogIn(true);
      fetchUserInfo();
    }
  }, []);

  const editMode = (mode: string) => {
    setIsEditNickname(mode === "nickname");
    setIsEditPassword(mode === "password");
    setIsEditImg(mode === "img");
    setIsEditPhoneNumber(mode === "PhoneNumber");
  };

  const editCancel = () => {
    setIsEditNickname(false);
    setIsEditPassword(false);
    setIsEditImg(false);
    setIsEditPhoneNumber(false);
    getUserInfo();
  };

  const editImg = async () => {
    const pic = new FormData();
    pic.append("pic", newImgFile);

    setIsEditImg(false);
    try {
      const res = await jwtAxios.patch("/api/update-pic", pic);
      getUserInfo();
      if (res.data.statusCode === 1) {
        Swal.fire({
          icon: "success",
          text: "프로필 사진 변경 완료",
        });
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
    } finally {
      setIsLoading(false);
    }
  };

  if (!isLogIn) {
    return (
      <div className="mypage-wrap">
        <Mypage />
        <NotLogin />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="mypage-wrap">
        <Mypage />
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="mypage-wrap">
      <Mypage />
      {!isLogIn ? (
        <NotLogin />
      ) : (
        <>
          <div className="mypage-box">
            <div className="mypage-img">
              <div>
                <h3>프로필 사진</h3>
                {!isEditImg ? (
                  <>
                    {imgUrl ? (
                      <img src={`/pic/${imgUrl}`} alt="profile-img" />
                    ) : (
                      <img src={`/pic/default.png`} alt="profile-img" />
                    )}
                    <button className="btn" onClick={() => editMode("img")}>
                      변경
                    </button>
                  </>
                ) : (
                  <>
                    <ImageImport
                      setImgFile={setImgFile}
                      setImgUrl={setImgUrl}
                      newImgFile={newImgFile}
                      setNewImgFile={setNewImgFile}
                    />
                    <div className="mypage-button-box-flex">
                      <button className="btn" onClick={editImg}>
                        저장
                      </button>
                      <button className="btn" onClick={editCancel}>
                        취소
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="mypage-title">
              <div className="mypage-title-box">아이디</div>
              <div className="mypage-title-box-right">
                <div>{userId}</div>
              </div>
            </div>
            <div className="mypage-title">
              <div className="mypage-title-box">이름</div>
              <div className="mypage-title-box-right">
                <div>{name}</div>
              </div>
            </div>
            <div className="mypage-title">
              <div className="mypage-title-box">비밀번호</div>
              <div className="mypage-title-box-right">
                {!isEditPassword ? (
                  <>
                    <input type="password" value={12345678910} disabled />
                    <button
                      className="btn"
                      onClick={() => editMode("password")}
                    >
                      변경
                    </button>
                  </>
                ) : (
                  <ModifyPass
                    getUserInfo={getUserInfo}
                    setIsEditPassword={setIsEditPassword}
                    editCancel={editCancel}
                  />
                )}
              </div>
            </div>
            <ModifyNickName
              getUserInfo={getUserInfo}
              isLogIn={isLogIn}
              setNickName={setNickName}
              nickName={nickName}
              setIsEditNickname={setIsEditNickname}
              isEditNickname={isEditNickname}
              editMode={editMode}
              editCancel={editCancel}
            />
            <ModifyPhone
              getUserInfo={getUserInfo}
              isLogIn={isLogIn}
              isEditPhoneNumber={isEditPhoneNumber}
              phoneNumber={phoneNumber}
              editMode={editMode}
              setPhoneNumber={setPhoneNumber}
              editCancel={editCancel}
              setIsEditPhoneNumber={setIsEditPhoneNumber}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default MyPage;

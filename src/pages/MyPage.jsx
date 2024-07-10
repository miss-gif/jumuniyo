import { useEffect, useState } from "react";
// import MypageModifyModal from "../components/common/mypage/MypageModifyModal";
import Mypage from "../components/join/Mypage";
import ImageImport from "../components/layout/ImageImport";
import PhoneNumberInput from "../components/user/mypage/PhoneNumberInput";
import jwtAxios from "../api/user/jwtUtil";

const MyPage = () => {
  const [isEditNickname, setIsEditNickname] = useState(false);
  const [isEditPassword, setIsEditPassword] = useState(false);
  const [isEditImg, setIsEditImg] = useState(false);
  const [isEditPhoneNumber, setIsEditPhoneNumber] = useState(false);
  const [imgFile, setImgFile] = useState(null);
  const [imgUrl, setImgUrl] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [passWord, setPassWord] = useState("");
  const [nickName, setNickName] = useState("");
  const getUserInfo = async () => {
    try {
      const res = await jwtAxios.get("/api/user");
      setImgUrl(res.data.resultData.userPic);
      setPhoneNumber(res.data.resultData.userPhone);
      setPassWord(res.data.resultData.userPhone);
      setNickName(res.data.resultData.userNickname);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const editMode = mode => {
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
  };

  const editNickname = () => {
    setIsEditNickname(false);
    setNickName(nickName);
  };

  const editPassword = () => {
    setIsEditPassword(false);
    setPassWord(passWord);
  };

  const editImg = () => {
    setIsEditImg(false);
    setImgFile(imgFile);
  };

  const editPhoneNumber = () => {
    setIsEditPhoneNumber(false);
    setPhoneNumber(phoneNumber);
  };

  return (
    <div className="mypage-wrap">
      <Mypage />
      <div className="mypage-box">
        <div className="mypage-img">
          <div>
            <h3>프로필 사진</h3>

            {!isEditImg ? (
              <>
                <img src={imgUrl} alt="profile-img" />
                <button className="btn" onClick={() => editMode("img")}>
                  변경
                </button>
              </>
            ) : (
              <>
                <ImageImport setImgFile={setImgFile} setImgUrl={setImgUrl} />
                <div className="mypage-button-box-flex">
                  <button
                    className="btn"
                    onClick={() => {
                      editImg();
                    }}
                  >
                    저장
                  </button>
                  <button
                    className="btn"
                    onClick={() => {
                      editCancel();
                    }}
                  >
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
            <div>tource</div>
          </div>
        </div>
        <div className="mypage-title">
          <div className="mypage-title-box">이름</div>
          <div className="mypage-title-box-right">
            <div>김민기</div>
          </div>
        </div>
        <div className="mypage-title">
          <div className="mypage-title-box">비밀번호</div>
          <div className="mypage-title-box-right">
            {!isEditPassword ? (
              <>
                <input type="password" value={passWord} disabled />
                <button
                  className="btn"
                  onClick={() => {
                    editMode("password");
                  }}
                >
                  변경
                </button>
              </>
            ) : (
              <>
                <input
                  type="password"
                  value={passWord}
                  onChange={e => {
                    setPassWord(e.target.value);
                  }}
                  placeholder="비밀번호를 입력해주세요."
                />
                <div>
                  <button className="btn" onClick={editPassword}>
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
          <div className="mypage-title-box">닉네임</div>
          <div className="mypage-title-box-right">
            {!isEditNickname ? (
              <>
                <div>{nickName}</div>
                <button className="btn" onClick={() => editMode("nickname")}>
                  변경
                </button>
              </>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="새 닉네임을 입력해주세요."
                  value={nickName}
                  onChange={e => {
                    setNickName(e.target.value);
                  }}
                />
                <div>
                  <button className="btn" onClick={editNickname}>
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
          <div className="mypage-title-box">전화번호</div>
          <div className="mypage-title-box-right">
            {!isEditPhoneNumber ? (
              <>
                <div>{phoneNumber}</div>
                <button className="btn" onClick={() => editMode("PhoneNumber")}>
                  변경
                </button>
              </>
            ) : (
              <>
                <PhoneNumberInput
                  value={phoneNumber}
                  onChange={setPhoneNumber}
                />
                <div>
                  <button className="btn" onClick={editPhoneNumber}>
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
      </div>
    </div>
  );
};

export default MyPage;

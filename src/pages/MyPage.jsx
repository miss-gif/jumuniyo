import { useState } from "react";
// import MypageModifyModal from "../components/common/mypage/MypageModifyModal";
import Mypage from "../components/join/Mypage";
import PhoneNumberInput from "../components/user/mypage/PhoneNumberInput";

const MyPage = () => {
  const [isEditNickname, setIsEditNickname] = useState(false);
  const [isEditPassword, setIsEditPassword] = useState(false);
  const [isEditImg, setIsEditImg] = useState(false);
  const [isEditPhoneNumber, setIsEditPhoneNumber] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

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
  };

  const editPassword = () => {
    setIsEditPassword(false);
  };

  const editImg = () => {
    setIsEditImg(false);
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
            <img
              src={process.env.PUBLIC_URL + "/images/logo_1x.png"}
              alt="profile-img"
            />
            {!isEditImg ? (
              <button className="btn" onClick={() => editMode("img")}>
                변경
              </button>
            ) : (
              <>
                <input type="file" />
                <div>
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
                <input
                  type="password"
                  value={"ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ"}
                  disabled
                />
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
                <input type="password" placeholder="비밀번호를 입력해주세요." />
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
                <div>밍밍밍</div>
                <button className="btn" onClick={() => editMode("nickname")}>
                  변경
                </button>
              </>
            ) : (
              <>
                <input type="text" placeholder="새 닉네임을 입력해주세요." />
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

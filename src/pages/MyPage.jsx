import { useState } from "react";
import MypageModifyModal from "../components/common/mypage/MypageModifyModal";
import Mypage from "../components/join/Mypage";

const MyPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onModify = () => {
    setIsModalOpen(true);
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
              alt="Logo"
            ></img>
          </div>
        </div>
        <div className="mypage-title">
          <div className="mypage-title-box">아이디</div>
          <div>tource</div>
        </div>
        <div className="mypage-title">
          <div className="mypage-title-box">비밀번호</div>
          <div>tource</div>
        </div>
        <div className="mypage-title">
          <div className="mypage-title-box">이름</div>
          <div>김민기</div>
        </div>
        <div className="mypage-title">
          <div className="mypage-title-box">닉네임</div>
          <div>밍밍밍</div>
        </div>
        <div className="mypage-title">
          <div className="mypage-title-box">전화번호</div>
          <div>010-1234-5678</div>
        </div>

        <div className="mypage-button-box">
          <button
            type="button"
            onClick={() => {
              onModify();
            }}
          >
            수정
          </button>
          <button type="button">삭제</button>
        </div>
        {isModalOpen ? <MypageModifyModal /> : null}
      </div>
    </div>
  );
};

export default MyPage;

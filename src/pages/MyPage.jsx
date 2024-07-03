import Mypage from "../components/join/Mypage";

const MyPage = () => {
  return (
    <div className="mypage-wrap">
      <Mypage />
      <div className="mypage-box">
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
          <div className="mypage-title-box">이메일</div>
          <div>tource20@naver.com</div>
        </div>
        <div className="mypage-button-box">
          <button type="button">수정</button>
          <button type="button">삭제</button>
        </div>
      </div>
    </div>
  );
};

export default MyPage;

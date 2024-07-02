const MyPage = () => {
  return (
    <div className="mypage-wrap">
      <div className="mypage-select">
        <button>내정보</button>
        <button>주문내역</button>
      </div>
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
        <div>
          <button type="button">수정</button>
          <button type="button">삭제</button>
        </div>
      </div>
    </div>
  );
};

export default MyPage;

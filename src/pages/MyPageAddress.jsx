import AddressButton from "../components/common/_AddressButton";
import Mypage from "../components/join/Mypage";

const MyPageAddress = () => {
  return (
    <div className="mypage-wrap">
      <Mypage />
      <div className="mypage-box">
        <div className="mypage-title">
          <div className="mypage-title-box">주소</div>
          <div>주소를 입력해주세요</div>
        </div>
        <div className="mypage-title">
          <div className="mypage-title-box">세부 주소</div>
          <div>103동 1605호</div>
        </div>
        <div className="mypage-address">
          <AddressButton />
        </div>
        <div className="mypage-button-box">
          <button type="button">수정</button>
          <button type="button">삭제</button>
        </div>
      </div>
    </div>
  );
};

export default MyPageAddress;

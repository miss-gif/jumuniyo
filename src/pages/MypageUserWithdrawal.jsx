import React from "react";
import Mypage from "../components/join/Mypage";

const MypageUserWithdrawal = () => {
  return (
    <div className="mypage-wrap">
      <Mypage />
      <div className="mypage-box">
        <div className="mypage-img">
          <div>
            <h3>회원 탈퇴</h3>
            <button className="btn">회원 탈퇴</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MypageUserWithdrawal;

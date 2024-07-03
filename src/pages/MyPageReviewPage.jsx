import React from "react";
import Mypage from "../components/join/Mypage";

const MyPageReviewPage = () => {
  return (
    <div className="mypage-wrap">
      <Mypage />
      <div className="mypage-box">내가 쓴 리뷰 개수 100개</div>
    </div>
  );
};

export default MyPageReviewPage;

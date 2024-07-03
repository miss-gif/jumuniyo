import React from "react";
import Mypage from "../components/join/Mypage";
import MyPageOrderList from "../components/common/MyPageOrderList";

const MyPageOrderPagee = () => {
  return (
    <div className="mypage-wrap">
      <Mypage />
      <div className="mypage-box">
        <MyPageOrderList />
        <MyPageOrderList />
        <MyPageOrderList />
        <MyPageOrderList />
      </div>
    </div>
  );
};

export default MyPageOrderPagee;

import React from "react";
import Mypage from "../components/join/Mypage";
import ReportListHeader from "../components/user/mypage/ReportListHeader";

const MypageReportPage = () => {
  return (
    <div className="mypage-wrap">
      <Mypage />
      <div className="mypage-box">
        <ReportListHeader />
      </div>
    </div>
  );
};

export default MypageReportPage;

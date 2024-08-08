import React, { useState } from "react";
import Mypage from "../components/join/Mypage";
import ReportListHeader from "../components/user/mypage/ReportListHeader";
import { TextField } from "@mui/material";
import Swal from "sweetalert2";
import jwtAxios from "../api/user/jwtUtil";
import { useNavigate } from "react-router-dom";

const MypageReportPage = () => {
  const [reportTitle, setReportTitle] = useState("");
  const [reportDetail, setReportDetail] = useState("");

  const navigate = useNavigate();

  const postReport = async () => {
    try {
      const res = await jwtAxios.post("/api/user/inquiry", {
        inquiryTitle: reportTitle,
        inquiryContent: reportDetail,
      });
      if (res.data.statusCode === 1) {
        Swal.fire({
          icon: "success",
          text: res.data.resultMsg,
        });
        navigate("/mypage/report/list");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: "서버에러입니다.",
      });
    }
  };

  return (
    <div className="mypage-wrap">
      <Mypage />
      <div className="mypage-box">
        <div className="modify-modal">
          <h3>문의하기</h3>
          <h4>제목, 내용에 개인정보를 입력하지 마세요.</h4>

          <TextField
            fullWidth
            id="fullWidth"
            label="문의 제목"
            onChange={e => {
              setReportTitle(e.target.value);
            }}
          />

          <TextField
            id="outlined-multiline-static"
            label="문의 내용"
            multiline
            rows={4}
            defaultValue=""
            onChange={e => {
              setReportDetail(e.target.value);
            }}
          />
          <div className="mypage-button-box">
            <button
              className="btn"
              onClick={() => {
                postReport();
              }}
            >
              완료
            </button>
            <button
              className="btn"
              onClick={() => {
                navigate("/mypage/report/list");
              }}
            >
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MypageReportPage;

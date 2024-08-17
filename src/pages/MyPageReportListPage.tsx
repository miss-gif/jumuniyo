import React, { useEffect, useState } from "react";
import Mypage from "../components/join/Mypage";
import ReportListHeader from "../components/user/mypage/ReportListHeader";
import Swal from "sweetalert2";
import jwtAxios from "../api/user/jwtUtil";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";

interface Report {
  inquiryPk: number;
  inquiryTitle: string;
  createdAt: string;
  updatedAt: string;
  inquiryState: number;
}

const MypageReportPage: React.FC = () => {
  const [report, setReport] = useState<Report[]>([]);

  const navgate = useNavigate();

  const getReportList = async () => {
    try {
      const res = await jwtAxios.get("/api/user/inquiry/inquiry_list");
      setReport(res.data.resultData);
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: "서버에러입니다.",
      });
    }
  };

  const deleteReport = async (reportPk: number) => {
    const result = await Swal.fire({
      title: "정말 삭제?",
      text: "되돌릴 수 없다는 걸 알아두세요. 복구 못합니다.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "네 삭제할래요",
      cancelButtonText: "아니요",
    });

    if (result.isConfirmed) {
      try {
        const res = await jwtAxios.delete(`/api/user/inquiry/${reportPk}`);

        getReportList();
      } catch (error) {
        Swal.fire({
          icon: "error",
          text: "서버에러입니다.",
        });
      }
    }
  };

  useEffect(() => {
    getReportList();
  }, []);

  const reportDetails = (doneOrderPk: number) => {
    navgate(`../../mypage/reportdetail/${doneOrderPk}`);
  };

  if (report.length <= 0) {
    return (
      <div className="mypage-wrap">
        <Mypage />
        <div className="mypage-box">
          <Alert variant="outlined" severity="info">
            문의하신 내역이 없습니다.
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="mypage-wrap">
      <Mypage />
      <div className="mypage-box">
        <ReportListHeader />
        {report && report.length > 0 ? (
          <div className="order-list-gap">
            {report.map(report => (
              <div key={report.inquiryPk}>
                <div className="order-list">
                  <div className="order-date">
                    <div className="flex-between-real-box">
                      <h2>
                        {new Date(report.createdAt).toLocaleDateString("ko-KR")}{" "}
                      </h2>

                      <div>
                        <div>
                          {report.inquiryState === 2
                            ? "답변 완료"
                            : "답변 안달림"}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-between-real-box">
                    <div>
                      <div>제목: {report.inquiryTitle}</div>
                      <div
                        className="order-detail-text"
                        onClick={() => {
                          reportDetails(report.inquiryPk);
                        }}
                      >
                        문의 상세보기
                      </div>
                    </div>
                    {report.inquiryState === 1 ? (
                      <button
                        className="btn"
                        onClick={() => {
                          deleteReport(report.inquiryPk);
                        }}
                      >
                        삭제
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default MypageReportPage;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ReportDetail = () => {
  const { report_pk } = useParams();
  const [reportDetail, setReportDetail] = useState(null);
  const [blockDuration, setBlockDuration] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const getCookie = name => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  useEffect(() => {
    const fetchDetail = async () => {
      const accessToken = getCookie("accessToken");
      if (!accessToken) {
        console.error("토큰을 찾을 수 없습니다.");
        return;
      }

      try {
        const response = await axios.get(`/api/admin/report/${report_pk}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });

        if (response.data.statusCode === 1) {
          setReportDetail(response.data.resultData);
        } else {
          console.error("데이터 불러오기 실패:", response.data.resultMsg);
        }
      } catch (error) {
        console.error("데이터 불러오기 중 오류 발생:", error);
      }
    };

    fetchDetail();
  }, [report_pk]);

  const handleDelete = async () => {
    const accessToken = getCookie("accessToken");
    if (!accessToken) {
      console.error("토큰을 찾을 수 없습니다.");
      return;
    }

    try {
      const response = await axios.delete(`/api/admin/report/${report_pk}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (response.data.statusCode === 1) {
        alert("신고가 성공적으로 삭제되었습니다.");
        navigate("/admin/report"); // 목록 페이지로 이동
      } else {
        console.error("신고 삭제 실패:", response.data.resultMsg);
        alert("신고 삭제에 실패했습니다.");
      }
    } catch (error) {
      console.error("신고 삭제 중 오류 발생:", error);
      alert("신고 삭제 중 오류가 발생했습니다.");
    }
  };

  const handleBlockUser = async () => {
    const accessToken = getCookie("accessToken");
    if (!accessToken) {
      console.error("토큰을 찾을 수 없습니다.");
      return;
    }

    try {
      const response = await axios.patch(
        `/api/admin/report/account_suspension`,
        {
          userBlockDate: blockDuration,
          userPk: reportDetail.reviewUserPk,
          reportPk: report_pk,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (response.data.statusCode === 1) {
        alert(`유저가 ${blockDuration}일 동안 정지되었습니다.`);
        navigate("/admin/report"); // 목록 페이지로 이동
      } else {
        console.error("유저 정지 실패:", response.data.resultMsg);
        alert("유저 정지에 실패했습니다.");
      }
    } catch (error) {
      console.error(
        "유저 정지 중 오류 발생:",
        error.response?.data || error.message,
      );
      alert("유저 정지 중 오류가 발생했습니다.");
    }
    setShowModal(false); // 모달 닫기
  };

  if (!reportDetail) {
    return <div>로딩 중...</div>;
  }

  return (
    <>
      <div className="reportDetail-wrap">
        <h1>No. {report_pk}</h1>
        <div className="report">
          <div className="reportTitle">{reportDetail.reportTitle}</div>
          <div className="reportWriter">
            <div className="reportWriter-tab">작성자</div>
            <div className="reportWriter-value">
              {reportDetail.reportNickName}
            </div>
          </div>
          <div className="reportTime">
            <div className="reportTime-tab">작성날짜</div>
            <div className="reportTime-value">
              {new Date(reportDetail.reportCreatedAt).toLocaleString()}
            </div>
          </div>
        </div>
        <div className="reportContent">
          <div className="reportWhyContent">{reportDetail.reportContent}</div>
        </div>
        <div className="reported">
          <div className="reportedWriter">
            <div className="reportedWriter-tab">작성자</div>
            <div className="reportedWriter-value">
              {reportDetail.reviewNickName}
            </div>
          </div>
          <div className="reportedTime">
            <div className="reportedTime-tab">작성날짜</div>
            <div className="reportedTime-value">
              {new Date(reportDetail.reviewCreatedAt).toLocaleString()}
            </div>
          </div>
        </div>
        <div className="reportedContent">
          <div className="reportedWhyContent">
            {reportDetail.reviewContents}
          </div>
        </div>

        <div className="review-images">
          {reportDetail.reviewPics1 && (
            <img src={reportDetail.reviewPics1} alt="Review Pic 1" />
          )}
          {reportDetail.reviewPics2 && (
            <img src={reportDetail.reviewPics2} alt="Review Pic 2" />
          )}
          {reportDetail.reviewPics3 && (
            <img src={reportDetail.reviewPics3} alt="Review Pic 3" />
          )}
          {reportDetail.reviewPics4 && (
            <img src={reportDetail.reviewPics4} alt="Review Pic 4" />
          )}
        </div>

        <div className="buttonforreport">
          <div className="btn" onClick={handleDelete}>
            취소처리
          </div>
          <div className="btn" onClick={() => setShowModal(true)}>
            유저 정지
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>유저 정지</h2>
            <label>
              정지 기한 설정
              <input
                type="number"
                placeholder="정지일수"
                value={blockDuration || ""}
                onChange={e => setBlockDuration(Number(e.target.value))}
                style={{ border: "1px solid black" }}
              />
              (일)
            </label>
            <button className="btn--cancel" onClick={handleBlockUser}>
              확인
            </button>
            <button className="btn" onClick={() => setShowModal(false)}>
              취소
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ReportDetail;

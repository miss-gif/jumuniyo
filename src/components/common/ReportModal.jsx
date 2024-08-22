/* eslint-disable react/prop-types */
import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const ReportModal = ({ isOpen, onClose, reviewPk, onSuccess }) => {
  const [reason, setReason] = useState("");
  const [customReason, setCustomReason] = useState("");
  const [error, setError] = useState(""); // 에러 메시지를 위한 상태
  const accessToken = useSelector(state => state.user.accessToken);

  const handleReasonChange = event => {
    setReason(event.target.value);
    setError(""); // 선택 시 에러 메시지 초기화
    if (event.target.value !== "직접 입력") {
      setCustomReason("");
    }
  };

  const handleCustomReasonChange = event => {
    setCustomReason(event.target.value);
  };

  const handleSubmit = async () => {
    if (!reason) {
      setError("사유를 선택해 주세요"); // 사유를 선택하지 않으면 에러 메시지 설정
      return;
    }

    const reportReason = reason === "직접 입력" ? customReason : reason;

    try {
      await axios.post(
        "/api/user/report",
        {
          reviewPk,
          reportTitle: reportReason,
          reportContent: reportReason,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      // 신고가 성공하면 부모 컴포넌트에 상태 업데이트를 요청
      if (onSuccess) {
        onSuccess();
      }

      onClose(); // 모달 닫기
    } catch (error) {
      console.error("신고 실패:", error);
      // 추가적으로 실패 알림을 사용자에게 보여줄 수 있습니다.
    }
    console.log("제출완료");
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal__content">
        <h2>신고 사유를 선택하세요</h2>
        <select value={reason} onChange={handleReasonChange}>
          <option value="" disabled>
            사유 선택
          </option>
          <option value="부적절한 언행 사용">부적절한 언행 사용</option>
          <option value="부적절한 사진 업로드">부적절한 사진 업로드</option>
          <option value="사적 광고 게시">사적 광고 게시</option>
          <option value="직접 입력">직접 입력</option>
        </select>
        {reason === "직접 입력" && (
          <textarea
            value={customReason}
            onChange={handleCustomReasonChange}
            placeholder="신고 사유를 적어주세요"
            style={{ resize: "none" }}
          />
        )}
        {error && <p style={{ color: "red" }}>{error}</p>}{" "}
        {/* 에러 메시지 출력 */}
        <button className="btn" onClick={handleSubmit}>
          제출
        </button>
        <button className="btn" onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
};

export default ReportModal;

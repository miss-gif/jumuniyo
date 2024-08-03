/* eslint-disable react/prop-types */
import React, { useState } from "react";

const ReportModal = ({ isOpen, onClose, onSubmit }) => {
  const [reason, setReason] = useState("");
  const [customReason, setCustomReason] = useState("");

  const handleReasonChange = event => {
    setReason(event.target.value);
    if (event.target.value !== "직접 입력") {
      setCustomReason("");
    }
  };

  const handleCustomReasonChange = event => {
    setCustomReason(event.target.value);
  };

  const handleSubmit = () => {
    const reportReason = reason === "직접 입력" ? customReason : reason;
    onSubmit(reportReason);
    onClose();
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
          />
        )}
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

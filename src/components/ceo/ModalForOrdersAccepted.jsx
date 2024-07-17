/* eslint-disable react/prop-types */
import React from "react";

const ModalForOrdersAccepted = ({ show, onClose, onConfirm, message }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>확인</h2>
        <p>{message}</p>
        <button className="btn" onClick={onConfirm}>
          확인
        </button>
        <button className="btn" onClick={onClose}>
          취소
        </button>
      </div>
    </div>
  );
};

export default ModalForOrdersAccepted;

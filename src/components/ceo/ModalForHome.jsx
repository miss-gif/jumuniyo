/* eslint-disable react/prop-types */
import React from "react";

const ModalForHome = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
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

export default ModalForHome;

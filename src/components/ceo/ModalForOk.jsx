/* eslint-disable react/prop-types */
import React from "react";

const ModalForOk = ({ message, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <p>{message}</p>
        <button onClick={onClose}>확인</button>
      </div>
    </div>
  );
};

export default ModalForOk;

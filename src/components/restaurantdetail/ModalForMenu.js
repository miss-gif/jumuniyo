/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import "../../css/components/_ModalForMenu.scss";

const ModalForMenu = ({ isOpen, onClose, onSelect }) => {
  const [count, setCount] = useState(1);

  useEffect(() => {
    if (!isOpen) {
      setCount(1); // 모달이 닫힐 때 개수를 초기화합니다.
    }
  }, [isOpen]);

  const handleIncrease = () => setCount(prevCount => prevCount + 1);
  const handleDecrease = () =>
    setCount(prevCount => Math.max(prevCount - 1, 1));

  const handleSelect = () => {
    onSelect(count);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>개수를 선택하세요</h2>
        <div className="modal-options">
          <button onClick={handleDecrease}>-</button>
          <span>{count}</span>
          <button onClick={handleIncrease}>+</button>
        </div>
        <button className="modal-confirm" onClick={handleSelect}>
          확인
        </button>
        <button className="modal-close" onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
};

export default ModalForMenu;

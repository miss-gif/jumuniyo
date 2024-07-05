/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const ModalForMenu = ({ isOpen, onClose, onSelect }) => {
  const [count, setCount] = useState(1);

  useEffect(() => {
    if (!isOpen) {
      setCount(1);
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
          <button onClick={handleDecrease}>
            <RemoveIcon />
          </button>
          <span>{count}</span>
          <button onClick={handleIncrease}>
            <AddIcon />
          </button>
        </div>
        <Button className="modal-confirm" onClick={handleSelect}>
          확인
        </Button>
        <Button className="modal-close" onClick={onClose}>
          닫기
        </Button>
      </div>
    </div>
  );
};

export default ModalForMenu;
const Button = styled.button`
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  &:hover {
    background: #0056b3;
  }
  &:not(:last-child) {
    margin-right: 10px;
  }
`;

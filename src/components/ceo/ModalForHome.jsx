/* eslint-disable react/prop-types */
import React from "react";
import styled from "styled-components";

const ModalForHome = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <P>{message}</P>
        <Button className="btn" onClick={onConfirm}>
          확인
        </Button>
        <Button className="btn" onClick={onClose}>
          취소
        </Button>
      </div>
    </div>
  );
};

export default ModalForHome;
const Button = styled.button`
  margin: 0px 20px 0px 20px;
`;

const P = styled.p`
  margin-top: 20px;
  margin-bottom: 50px;
  font-size: 16px;
`;

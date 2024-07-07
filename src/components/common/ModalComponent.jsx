import React from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

Modal.setAppElement("#root"); // 애플리케이션 루트 엘리먼트를 설정합니다.

const ModalComponent = ({
  isOpen,
  onRequestClose,
  type,
  title,
  content,
  onConfirm,
  onCancel,
  options,
  onCheck,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={title}
      style={modalStyles}
    >
      <Title>{title}</Title>
      <Content>{content}</Content>

      {type === "confirm" && (
        <ButtonGroup>
          <Button onClick={onConfirm}>Yes</Button>
          <Button onClick={onCancel}>No</Button>
        </ButtonGroup>
      )}

      {type === "checkbox" && (
        <>
          <CheckboxGroup>
            {options.map((option, index) => (
              <CheckboxLabel key={index}>
                <Checkbox
                  type="checkbox"
                  checked={option.checked}
                  onChange={() => onCheck(index)}
                />
                {option.label}
              </CheckboxLabel>
            ))}
          </CheckboxGroup>
          <Button onClick={onConfirm}>Confirm</Button>
        </>
      )}
    </Modal>
  );
};

export default ModalComponent;

const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "10px",
    padding: "20px",
    width: "300px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff", // 추가
  },
};

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

const Content = styled.div`
  text-align: center;
  margin-bottom: 20px;
  color: #555;
`;

const ButtonGroup = styled.div`
  display: flex;
  /* justify-content: space-between; */
`;

const Button = styled.button`
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  width: 50%;
  cursor: pointer;
  &:hover {
    background: #0056b3;
  }
  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const CheckboxGroup = styled.div`
  margin-bottom: 20px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  color: #555;
`;

const Checkbox = styled.input`
  margin-right: 10px;
  width: 20px; // 기본 체크박스 크기로 조정
  height: 20px; // 기본 체크박스 크기로 조정
  border: 1px solid #ccc; // 기본 테두리 색상 설정
  border-radius: 3px; // 둥근 모서리 설정
  &:checked {
    background-color: #007bff; // 체크된 상태의 배경색 설정
    border-color: #007bff; // 체크된 상태의 테두리 색상 설정
  }
`;

// prop에 대한 타입 검증
ModalComponent.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  type: PropTypes.oneOf(["confirm", "checkbox"]).isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      checked: PropTypes.bool.isRequired,
    }),
  ),
  onCheck: PropTypes.func,
};

ModalComponent.defaultProps = {
  onCancel: () => {},
  options: [],
  onCheck: () => {},
};

// App.jsx
import React, { useState } from "react";
import ModalComponent from "../components/common/ModalComponent";

const Test = () => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isCheckboxModalOpen, setIsCheckboxModalOpen] = useState(false);

  // 체크박스 모달 데이터
  const [checkboxOptions, setCheckboxOptions] = useState([
    { label: "Option 1", checked: false },
    { label: "Option 2", checked: false },
    { label: "Option 3", checked: false },
  ]);

  const handleConfirm = () => {
    console.log("Confirmed");
    setIsConfirmModalOpen(false);
  };

  const handleCancel = () => {
    console.log("Cancelled");
    setIsConfirmModalOpen(false);
  };

  const handleCheckboxConfirm = () => {
    console.log(
      "Checked Options:",
      checkboxOptions.filter(option => option.checked),
    );
    setIsCheckboxModalOpen(false);
  };

  const handleCheckboxChange = index => {
    const newOptions = [...checkboxOptions];
    newOptions[index].checked = !newOptions[index].checked;
    setCheckboxOptions(newOptions);
  };

  return (
    <div>
      <button className="btn" onClick={() => setIsConfirmModalOpen(true)}>
        확인 모달
      </button>
      <button className="btn" onClick={() => setIsCheckboxModalOpen(true)}>
        체크박스 모달
      </button>

      <ModalComponent
        isOpen={isConfirmModalOpen}
        onRequestClose={() => setIsConfirmModalOpen(false)}
        type="confirm"
        title="제목"
        content="확인 내용"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />

      <ModalComponent
        isOpen={isCheckboxModalOpen}
        onRequestClose={() => setIsCheckboxModalOpen(false)}
        type="checkbox"
        title="제목"
        content="체크항목"
        options={checkboxOptions}
        onCheck={handleCheckboxChange}
        onConfirm={handleCheckboxConfirm}
      />
    </div>
  );
};

export default Test;

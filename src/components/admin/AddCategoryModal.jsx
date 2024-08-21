import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const AddCategoryModal = ({ onClose, onCategoryAdded }) => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleAddCategory = async () => {
    try {
      const encodedCategoryName = encodeURIComponent(categoryName);
      const formData = new FormData();
      formData.append("file", categoryImage);

      const accessToken = Cookies.get("accessToken");

      const response = await axios.post(
        `/api/admin/category?str=${encodedCategoryName}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      console.log("카테고리 추가 성공:", response.data);
      setShowSuccessModal(true); // 성공 모달 표시
      onCategoryAdded(); // 카테고리 추가 후 부모 컴포넌트에 알림
    } catch (error) {
      console.error("카테고리 추가 실패:", error);
      if (error.response && error.response.status === 401) {
        console.error("권한이 없습니다. 다시 로그인 해주세요.");
      } else {
        console.error("카테고리 추가 실패:", error);
      }
    }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    onClose(); // 성공 모달을 닫으면서 기본 모달도 닫기
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>새 카테고리 추가</h2>
        <input
          type="text"
          value={categoryName}
          onChange={e => setCategoryName(e.target.value)}
          placeholder="카테고리 이름"
        />
        <input
          className="btn btnforimg"
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          onChange={e => setCategoryImage(e.target.files[0])}
        />
        <label
          htmlFor="fileInput"
          className="btn btnforimg"
          style={{ marginRight: "20px" }}
        >
          이미지 선택
        </label>
        <button className="btn" onClick={handleAddCategory}>
          추가
        </button>
        <button className="btn--cancel" onClick={onClose}>
          취소
        </button>
      </div>

      {/* 성공 모달 */}
      {showSuccessModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>추가 되었습니다</h2>
            <button onClick={handleCloseSuccessModal}>확인</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddCategoryModal;

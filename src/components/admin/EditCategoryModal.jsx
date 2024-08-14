import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const EditCategoryModal = ({ category, onClose, onCategoryUpdated }) => {
  const [categoryName, setCategoryName] = useState(category.categoryName);
  const [categoryImage, setCategoryImage] = useState(null);

  const handleEditCategory = async () => {
    try {
      const formData = new FormData();
      const categoryData = {
        p: {
          catePk: category.categoryPk,
          cateName: categoryName,
        },
      };

      formData.append("p", JSON.stringify(categoryData.p));

      if (categoryImage) {
        formData.append("file", categoryImage);
      }

      const accessToken = Cookies.get("accessToken");

      const response = await axios.put(`/api/admin/category`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log("카테고리 수정 성공:", response.data);
      onCategoryUpdated(); // 카테고리 수정 후 부모 컴포넌트에 알림
    } catch (error) {
      console.error("카테고리 수정 실패:", error);
      if (error.response && error.response.status === 401) {
        console.error("권한이 없습니다. 다시 로그인 해주세요.");
      } else {
        console.error("카테고리 수정 실패:", error);
      }
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>카테고리 수정</h2>
        <input
          type="text"
          value={categoryName}
          onChange={e => setCategoryName(e.target.value)}
          placeholder="카테고리 이름"
        />
        <input
          type="file"
          onChange={e => setCategoryImage(e.target.files[0])}
        />
        <button onClick={handleEditCategory}>수정</button>
        <button onClick={onClose}>취소</button>
      </div>
    </div>
  );
};

export default EditCategoryModal;

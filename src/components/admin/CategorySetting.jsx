import React, { useState } from "react";
import CategoryItem from "../home/CategoryItem";
import useCategories from "../../hooks/useCategories";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../common/LoadingSpinner";
import AddCategoryModal from "./AddCategoryModal";
import EditCategoryModal from "./EditCategoryModal";
import Cookies from "js-cookie";
import axios from "axios";

const CategorySetting = () => {
  const { categories, loading, error } = useCategories();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isDeleteSuccess, setIsDeleteSuccess] = useState(false); // 삭제 성공 모달 상태

  const onClickLink = categoryPk => () => {
    navigate(`/restaurant/category_id=${categoryPk}`);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCategoryAdded = () => {
    window.location.reload();
  };

  const handleEditCategory = category => {
    setSelectedCategory(category);
    setIsEditing(true);
  };

  const handleCloseEditModal = () => {
    setIsEditing(false);
    setSelectedCategory(null);
  };

  const handleCategoryUpdated = () => {
    console.log("카테고리가 수정되었습니다.");
    setIsEditing(false);
    setSelectedCategory(null);
    window.location.reload();
  };

  const handleDeleteCategory = async categoryPk => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      try {
        const accessToken = Cookies.get("accessToken");
        await axios.delete(`/api/admin/category/${categoryPk}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log("카테고리 삭제 성공");
        setIsDeleteSuccess(true); // 삭제 성공 모달 표시
        window.location.reload(); // 페이지 새로고침
      } catch (error) {
        console.error("카테고리 삭제 실패:", error);
      }
    }
  };

  const handleCloseDeleteSuccessModal = () => {
    setIsDeleteSuccess(false); // 모달 닫기
    // 필요에 따라 카테고리 목록 갱신 작업 추가
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <p>에러 발생: {error}</p>;

  return (
    <>
      <div className="categorySetting-wrap">
        <section className="category-header">
          <h1>카테고리 설정</h1>
          <div className="category-button">
            <button className="btn category-add" onClick={handleOpenModal}>
              카테고리 추가
            </button>
            <button
              className="btn category-add"
              onClick={() => setIsEditing(!isEditing)}
            >
              카테고리 수정
            </button>
          </div>
        </section>
        <section className="category">
          <ul className="category__list">
            <CategoryItem
              index={0}
              categoryPk={0}
              categoryName="전체보기"
              categoryPic={`/images/category/category-01.png`}
            />
            {categories.map((category, index) => (
              <div key={category.categoryPk}>
                <CategoryItem
                  index={index + 1}
                  categoryPk={category.categoryPk}
                  categoryName={category.categoryName}
                  categoryPic={category.categoryPic}
                />
                {isEditing && (
                  <div className="category-edit-buttons">
                    <button onClick={() => handleEditCategory(category)}>
                      수정
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(category.categoryPk)}
                    >
                      삭제
                    </button>
                  </div>
                )}
              </div>
            ))}
          </ul>
        </section>
        {isModalOpen && (
          <AddCategoryModal
            onClose={handleCloseModal}
            onCategoryAdded={handleCategoryAdded}
          />
        )}
        {isEditing && selectedCategory && (
          <EditCategoryModal
            category={selectedCategory}
            onClose={handleCloseEditModal}
            onCategoryUpdated={handleCategoryUpdated}
          />
        )}

        {/* 삭제 성공 모달 */}
        {isDeleteSuccess && (
          <div className="modal">
            <div className="modal-content">
              <h2>삭제 되었습니다.</h2>
              <button onClick={handleCloseDeleteSuccessModal}>확인</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CategorySetting;

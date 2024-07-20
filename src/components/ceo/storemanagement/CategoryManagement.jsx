import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../common/LoadingSpinner";

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false); // 수정 모드 상태 추가
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // 카테고리 추가 모달 상태
  const [allCategories, setAllCategories] = useState([]); // 모든 카테고리 리스트
  const [selectedCategories, setSelectedCategories] = useState([]); // 선택된 카테고리 리스트
  const [warningModalOpen, setWarningModalOpen] = useState(false); // 경고 모달 상태
  const navigate = useNavigate();

  const getCookie = name => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const accessToken = getCookie("accessToken");

        if (!accessToken) {
          setError("로그인이 필요합니다.");
          setLoading(false);
          return;
        }

        console.log("Fetching categories with accessToken:", accessToken);

        const response = await axios.get("/api/owner/restaurant", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        console.log("Categories response:", response.data);

        const fetchedCategories = response.data.resultData.categories || [];
        setCategories(fetchedCategories);

        // if (fetchedCategories.length === 0) {
        //   navigate("/");
        // }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("카테고리를 불러오는 중 에러가 발생했습니다.");
        setLoading(false);
      }
    };

    fetchCategories();
  }, [navigate]);

  const handleDeleteCategory = async categoryPk => {
    if (categories.length <= 1) {
      setWarningModalOpen(true);
      return;
    }

    const accessToken = getCookie("accessToken");

    if (!accessToken) {
      setError("로그인이 필요합니다.");
      return;
    }

    try {
      await axios.delete(`/api/owner/restaurant/category/${categoryPk}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // 카테고리 삭제 후 상태 업데이트
      const updatedCategories = categories.filter(
        category => category.categoryPk !== categoryPk,
      );
      setCategories(updatedCategories);

      if (updatedCategories.length === 0) {
        navigate("/ceopage/category-management");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      setError("카테고리를 삭제하는 중 에러가 발생했습니다.");
    }
  };

  const handleOpenAddModal = async () => {
    const accessToken = getCookie("accessToken");

    if (!accessToken) {
      setError("로그인이 필요합니다.");
      return;
    }

    try {
      const response = await axios.get("/api/restaurant/category", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log("All categories response:", response.data);

      setAllCategories(response.data.resultData || []);
      setIsAddModalOpen(true);
    } catch (error) {
      console.error("Error fetching all categories:", error);
      setError("모든 카테고리를 불러오는 중 에러가 발생했습니다.");
    }
  };

  const handleAddCategory = async () => {
    const accessToken = getCookie("accessToken");

    if (!accessToken) {
      setError("로그인이 필요합니다.");
      return;
    }

    try {
      for (const categoryPk of selectedCategories) {
        await axios.post(
          `/api/owner/restaurant/category?seq=${categoryPk}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
      }

      // 선택된 카테고리를 추가 후 상태 업데이트
      const updatedCategories = allCategories.filter(category =>
        selectedCategories.includes(category.categoryPk),
      );
      setCategories([...categories, ...updatedCategories]);
      setIsAddModalOpen(false);
    } catch (error) {
      console.error("Error adding categories:", error);
      setError("카테고리를 추가하는 중 에러가 발생했습니다.");
    }
  };

  const handleCategorySelection = categoryPk => {
    if (selectedCategories.includes(categoryPk)) {
      setSelectedCategories(selectedCategories.filter(pk => pk !== categoryPk));
    } else {
      setSelectedCategories([...selectedCategories, categoryPk]);
    }
  };

  if (loading) {
    return (
      <p>
        <LoadingSpinner />
      </p>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>카테고리 관리</h2>
      <button onClick={() => setEditMode(!editMode)}>
        {editMode ? "수정 모드 종료" : "카테고리 수정"}
      </button>
      <button onClick={handleOpenAddModal}>카테고리 추가</button>
      <ul>
        {categories.map(category => (
          <li key={category.categoryPk}>
            <p>이름: {category.categoryName}</p>
            {editMode && (
              <button onClick={() => handleDeleteCategory(category.categoryPk)}>
                삭제
              </button>
            )}
          </li>
        ))}
      </ul>
      {isAddModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span
              className="close-button"
              onClick={() => setIsAddModalOpen(false)}
            >
              &times;
            </span>
            <h2>카테고리 추가</h2>
            <ul>
              {allCategories.map(category => (
                <li key={category.categoryPk}>
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category.categoryPk)}
                      onChange={() =>
                        handleCategorySelection(category.categoryPk)
                      }
                    />
                    {category.categoryName}
                  </label>
                </li>
              ))}
            </ul>
            <button onClick={handleAddCategory}>추가</button>
          </div>
        </div>
      )}
      {warningModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <p>
              카테고리는 1개 이상의 값이 필수입니다. 만약 변경하고 싶으시면
              카테고리 추가 후 삭제하세요.
            </p>
            <button className="btn" onClick={() => setWarningModalOpen(false)}>
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryManagement;

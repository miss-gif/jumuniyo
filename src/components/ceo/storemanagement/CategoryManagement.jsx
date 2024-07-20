import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../common/LoadingSpinner";
import { Checkbox, FormControlLabel } from "@mui/material";

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [warningModalOpen, setWarningModalOpen] = useState(false);
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
        setSelectedCategories(fetchedCategories.map(cat => cat.categoryPk)); // 기존 카테고리를 선택된 상태로 설정

        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("카테고리를 불러오는 중 에러가 발생했습니다.");
        setLoading(false);
      }
    };

    fetchCategories();
  }, [navigate]);

  const fetchAllCategories = async () => {
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
    } catch (error) {
      console.error("Error fetching all categories:", error);
      setError("모든 카테고리를 불러오는 중 에러가 발생했습니다.");
    }
  };

  const handleSaveCategories = async () => {
    if (selectedCategories.length === 0) {
      setWarningModalOpen(true);
      return;
    }

    const accessToken = getCookie("accessToken");

    if (!accessToken) {
      setError("로그인이 필요합니다.");
      return;
    }

    try {
      // 추가할 카테고리
      for (const categoryPk of selectedCategories) {
        if (!categories.some(cat => cat.categoryPk === categoryPk)) {
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
      }

      // 삭제할 카테고리
      for (const category of categories) {
        if (!selectedCategories.includes(category.categoryPk)) {
          await axios.delete(
            `/api/owner/restaurant/category/${category.categoryPk}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            },
          );
        }
      }

      // 선택된 카테고리를 추가 후 상태 업데이트
      const updatedCategories = allCategories.filter(category =>
        selectedCategories.includes(category.categoryPk),
      );
      setCategories(updatedCategories);
      setEditMode(false); // 저장 후 수정 모드 종료
    } catch (error) {
      console.error("Error saving categories:", error);
      setError("카테고리를 저장하는 중 에러가 발생했습니다.");
    }
  };

  const handleCategorySelection = categoryPk => {
    if (selectedCategories.includes(categoryPk)) {
      setSelectedCategories(selectedCategories.filter(pk => pk !== categoryPk));
    } else {
      setSelectedCategories([...selectedCategories, categoryPk]);
    }
  };

  useEffect(() => {
    fetchAllCategories();
  }, []);

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
    <div className="category-wrap">
      <ul className="categoryList">
        {categories.map(category => (
          <li className="oneCategory" key={category.categoryPk}>
            <h2>{category.categoryName}</h2>
          </li>
        ))}
      </ul>

      {editMode && (
        <div>
          <h2>카테고리 수정 및 추가</h2>
          <ul>
            {allCategories.map(category => (
              <li key={category.categoryPk}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedCategories.includes(category.categoryPk)}
                      onChange={() =>
                        handleCategorySelection(category.categoryPk)
                      }
                      name={category.categoryName}
                    />
                  }
                  label={category.categoryName}
                />
              </li>
            ))}
          </ul>
          <button className="btn" onClick={handleSaveCategories}>
            저장
          </button>
        </div>
      )}

      {!editMode && (
        <button className="btn" onClick={() => setEditMode(true)}>
          {categories.length === 0 ? "카테고리 추가" : "카테고리 수정"}
        </button>
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

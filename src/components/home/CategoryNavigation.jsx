// CategoryNavigation.js
import React from "react";
import PropTypes from "prop-types";
import useCategories from "../../hooks/useCategories";
import { useNavigate } from "react-router-dom";
import CategoryItem from "./CategoryItem";
import LoadingSpinner from "../common/LoadingSpinner";

const CategoryNavigation = () => {
  const { categories, loading, error } = useCategories();
  const navigate = useNavigate();

  const onClickLink = categoryPk => () => {
    navigate(`/restaurant/category_id=${categoryPk}`);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <p>에러 발생: {error}</p>;

  return (
    <>
      <h2 className="hidden">카테고리 선택 메뉴</h2>
      <section className="category">
        <ul className="category__list">
          <CategoryItem
            index={0}
            categoryPk={0}
            categoryName="전체보기"
            onClick={onClickLink(0)}
          />
          {categories.map((category, index) => (
            <CategoryItem
              key={category.categoryPk}
              index={index + 1} // 인덱스를 1부터 시작
              categoryPk={category.categoryPk}
              categoryName={category.categoryName}
              onClick={onClickLink(category.categoryPk)}
            />
          ))}
        </ul>
      </section>
    </>
  );
};

export default CategoryNavigation;

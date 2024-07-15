// CategoryNavigation.js
import React from "react";
import useCategories from "../hooks/useCategories";

const CategoryNavigation = () => {
  const { categories, loading, error } = useCategories();

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>에러 발생: {error}</p>;

  return (
    <>
      <h2 className="hidden">카테고리 선택 메뉴</h2>
      <section className="category">
        <ul className="category__list">
          <li className="category__item border-set bc">
            <p>전체보기</p>
          </li>
          {categories.map(category => (
            <li
              key={category.categoryPk}
              className="category__item border-set bc"
            >
              <p>{category.categoryName}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default CategoryNavigation;

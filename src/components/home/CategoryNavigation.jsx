// CategoryNavigation.js
import React from "react";
import PropTypes from "prop-types";
import useCategories from "../../hooks/useCategories";
import { useNavigate } from "react-router-dom";

const CategoryItem = ({ categoryPk, categoryName, onClick }) => (
  <li className="category__item border-set bc" onClick={onClick}>
    <p>{categoryName}</p>
  </li>
);

CategoryItem.propTypes = {
  categoryPk: PropTypes.number.isRequired,
  categoryName: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

const CategoryNavigation = () => {
  const { categories, loading, error } = useCategories();
  const navigate = useNavigate();

  const onClickLink = categoryPk => () => {
    navigate(`/restaurants/category_id=${categoryPk}&page=1&order_type=1`);
  };

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>에러 발생: {error}</p>;

  return (
    <>
      <h2 className="hidden">카테고리 선택 메뉴</h2>
      <section className="category">
        <ul className="category__list">
          <CategoryItem
            categoryPk={0}
            categoryName="전체보기"
            onClick={onClickLink(0)}
          />
          {categories.map(category => (
            <CategoryItem
              key={category.categoryPk}
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

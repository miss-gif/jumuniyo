// CategoryNavigation.js
import React from "react";
import PropTypes from "prop-types";
import useCategories from "../../hooks/useCategories";
import { useNavigate } from "react-router-dom";

const CategoryItem = ({ index, categoryPk, categoryName, onClick }) => (
  <li className="category__item bc" onClick={onClick}>
    <p>{categoryName}</p>
    <img
      src={`${process.env.PUBLIC_URL}/images/category/category-${String(index + 1).padStart(2, "0")}.png`}
      alt="Logo"
    />
  </li>
);

CategoryItem.propTypes = {
  index: PropTypes.number.isRequired,
  categoryPk: PropTypes.number.isRequired,
  categoryName: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

const CategoryNavigation = () => {
  const { categories, loading, error } = useCategories();
  const navigate = useNavigate();

  const onClickLink = categoryPk => () => {
    navigate(`/restaurant/category_id=${categoryPk}`);
  };

  if (loading) return <p>로딩 중...</p>;
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

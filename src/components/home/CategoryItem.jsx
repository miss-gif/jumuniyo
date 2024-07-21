// CategoryItem.js
import React from "react";
import PropTypes from "prop-types";
import { lazy } from "react";

// Lazy load Image component
const Image = lazy(() => import("./Image"));

const CategoryItem = ({ index, categoryPk, categoryName, onClick }) => (
  <li className="category__item bc" onClick={onClick}>
    <p>{categoryName}</p>
    <React.Suspense fallback={<div>이미지 로딩 중...</div>}>
      <Image
        src={`/images/category/category-${String(index + 1).padStart(2, "0")}.png`}
        alt="Logo"
        className="category__image"
      />
    </React.Suspense>
  </li>
);

CategoryItem.propTypes = {
  index: PropTypes.number.isRequired,
  categoryPk: PropTypes.number.isRequired,
  categoryName: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default CategoryItem;
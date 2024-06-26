import React from "react";

const CategoryNavigation = () => {
  return (
    <>
      <h2 className="hidden">카테고리 선택 메뉴</h2>
      <section className="category">
        <ul className="category__list">
          <li className="category__item border-set">
            <h3>전체보기</h3>
          </li>
          <li className="category__item border-set">
            <h3>한식</h3>
          </li>
          <li className="category__item border-set">
            <h3>중식</h3>
          </li>
          <li className="category__item border-set">
            <h3>양식</h3>
          </li>
          <li className="category__item border-set">
            <h3>일식</h3>
          </li>
          <li className="category__item border-set">
            <h3>일식</h3>
          </li>
        </ul>
      </section>
    </>
  );
};

export default CategoryNavigation;

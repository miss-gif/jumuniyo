import React from "react";

const CategoryNavigation = () => {
  return (
    <>
      <h2 className="hidden">카테고리 선택 메뉴</h2>
      <section className="category">
        <ul className="category__list">
          <li className="category__item border-set">
            <p>전체보기</p>
          </li>
          <li className="category__item border-set">
            <p>한식</p>
          </li>
          <li className="category__item border-set">
            <p>중식</p>
          </li>
          <li className="category__item border-set">
            <p>양식</p>
          </li>
          <li className="category__item border-set">
            <p>일식</p>
          </li>
        </ul>
      </section>
    </>
  );
};

export default CategoryNavigation;

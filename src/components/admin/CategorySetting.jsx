import React from "react";
import CategoryItem from "../home/CategoryItem";
import useCategories from "../../hooks/useCategories";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../common/LoadingSpinner";

const CategorySetting = () => {
  const { categories, loading, error } = useCategories();
  const navigate = useNavigate();
  const onClickLink = categoryPk => () => {
    navigate(`/restaurant/category_id=${categoryPk}`);
  };
  if (loading) return <LoadingSpinner />;
  if (error) return <p>에러 발생: {error}</p>;
  return (
    <>
      <div className="categorySetting-wrap">
        <section className="category-header">
          <h1>카테고리 설정</h1>
          <div className="category-button">
            <button className="btn category-add">카테고리 추가</button>
            <button className="btn category-add">카테고리 수정</button>
            <button className="btn category-add">카테고리 순서변경</button>
          </div>
        </section>
        <section className="category">
          <ul className="category__list">
            <CategoryItem
              index={0}
              categoryPk={0}
              categoryName="전체보기"
              categoryPic="/images/category/category-01.png"
            />
            {categories.map((category, index) => (
              <CategoryItem
                key={category.categoryPk}
                index={index + 1} // 인덱스를 1부터 시작
                categoryPk={category.categoryPk}
                categoryName={category.categoryName}
                categoryPic={category.categoryPic}
              />
            ))}
          </ul>
        </section>
      </div>
    </>
  );
};

export default CategorySetting;

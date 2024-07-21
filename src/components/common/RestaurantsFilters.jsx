/** @jsxImportSource @emotion/react */
import React, { useState, useEffect, useRef } from "react";
import SearchIcon from "@mui/icons-material/Search";
import useCategories from "../../hooks/useCategories";
import ModalMenuSearch from "../../pages/user/restaurantListPage/ModalMenuSearch.jsx";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import styled from "@emotion/styled";

// 스타일이 적용된 리스트 항목 컴포넌트
const ListItem = styled.li`
  padding: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  background-color: ${props => (props.isActive ? "#00c4bd" : "transparent")};
  color: ${props => (props.isActive ? "white" : "black")};
  border-radius: 4px;
`;

const RestaurantsFilters = () => {
  const [isMenuSearchVisible, setMenuSearchVisible] = useState(false);
  const menuSearchRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams(); // URL에서 카테고리 ID 추출

  const parseCategoryId = queryString => {
    const params = new URLSearchParams(queryString);
    const categoryId = params.get("category_id");
    return categoryId ? parseInt(categoryId, 10) : null;
  };

  // id가 'category_id=8'과 같은 형태일 때 처리
  const categoryId = parseCategoryId(id);

  const { categories, loading, error } = useCategories();

  const onClickMenuSearch = () => {
    setMenuSearchVisible(!isMenuSearchVisible);
  };

  const handleClickOutside = event => {
    if (
      menuSearchRef.current &&
      !menuSearchRef.current.contains(event.target)
    ) {
      setMenuSearchVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const onClickLink = categoryPk => () => {
    navigate(`/restaurant/category_id=${categoryPk}`);
  };

  // 카테고리 ID를 기준으로 활성화 상태 결정
  const activeCategory = categoryId;

  if (loading) return <LoadingSpinner />;
  if (error) return <p>에러 발생: {error}</p>;

  return (
    <>
      <div className="background-color">
        <div className="inner">
          <div className="restaurants-page__filters">
            <button className="search-btn none" onClick={onClickMenuSearch}>
              <SearchIcon />
            </button>
            <ul className="filters__list">
              <ListItem
                isActive={activeCategory === 0}
                onClick={onClickLink(0)}
              >
                전체보기
              </ListItem>
              {categories.map(category => (
                <ListItem
                  key={category.categoryPk}
                  isActive={activeCategory === category.categoryPk}
                  onClick={onClickLink(category.categoryPk)}
                >
                  {category.categoryName}
                </ListItem>
              ))}
              <ModalMenuSearch
                menuSearchRef={menuSearchRef}
                isVisible={isMenuSearchVisible}
              />
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default RestaurantsFilters;

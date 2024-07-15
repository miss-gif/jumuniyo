import React, { useState, useEffect, useRef } from "react";
import SearchIcon from "@mui/icons-material/Search";
import useCategories from "../../hooks/useCategories";
import ModalMenuSearch from "../../pages/user/restaurantListPage/ModalMenuSearch.jsx";

const RestaurantsFilters = () => {
  const [isMenuSearchVisible, setMenuSearchVisible] = useState(false);
  const menuSearchRef = useRef(null);

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

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>에러 발생: {error}</p>;

  return (
    <>
      <div className="background-color">
        <div className="inner">
          <div className="restaurants-page__filters">
            <button className="search-btn" onClick={onClickMenuSearch}>
              <SearchIcon />
            </button>
            <ul className="filters__list">
              <li className="filters__item btn-active">전체보기</li>
              {categories.map(category => (
                <li key={category.categoryPk} className="filters__item">
                  {category.categoryName}
                </li>
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

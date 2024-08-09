import React, { useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const MenuCategory = ({ categoryData, onSelectMenuItem }) => {
  const [isOpen, setIsOpen] = useState(true); // 메뉴 카테고리의 펼침 상태

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // categoryData에서 menu_category가 null인지 확인
  const { menu_category, menu } = categoryData || {};

  // menu_category가 null인 경우 처리
  if (!menu_category) {
    return null; // 또는 다른 방법으로 이 경우를 처리할 수 있음
  }

  return (
    <div className="menu-category">
      <div className="toggle-category" onClick={toggleMenu}>
        <h4 className="menu-category__title">{menu_category.menu_cat_name}</h4>
        <div className="toggle-category-icon">
          {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </div>
      </div>
      {isOpen && (
        <ul className="menu-category__list">
          {menu.map((item, index) => (
            <li
              key={index}
              className={`menu-category__item ${
                item.menu_state === 2 ? "disabled" : ""
              }`}
              onClick={() => item.menu_state !== 2 && onSelectMenuItem(item)}
            >
              <div className="menu-category__text">
                <div className="menu-category__name">{item.menu_name}</div>
                <div className="menu-category__description">
                  {item.menu_content}
                </div>
                <div className="menu-category__price">{item.menu_price}원</div>
                {item.menu_state === 2 && (
                  <div className="menu-category__status">준비중입니다.</div>
                )}
              </div>
              {item.menu_pic && (
                <div className="menu-category__image">
                  <img src={`/pic/${item.menu_pic}`} alt={item.menu_pic} />
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MenuCategory;

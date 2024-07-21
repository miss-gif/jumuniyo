/* eslint-disable react/prop-types */
import React, { useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const MenuCategory = ({ menuData, onSelectMenuItem }) => {
  const [isOpen, setIsOpen] = useState(true); // 메뉴 카테고리의 펼침 상태

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="menu-category">
      <div className="toggle-category" onClick={toggleMenu}>
        <h4 className="menu-category__title">인기메뉴</h4>
        <div className="toggle-category-icon">
          {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </div>
      </div>
      {isOpen && (
        <ul className="menu-category__list">
          {menuData.map((item, index) => (
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

import React, { useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import OptionModal from "./OptionModal";
import axios from "axios";

const MenuCategory = ({ categoryData, onSelectMenuItem }) => {
  const [isOpen, setIsOpen] = useState(true); // 메뉴 카테고리의 펼침 상태
  const [selectedMenuItem, setSelectedMenuItem] = useState(null); // 모달에 전달할 선택된 메뉴
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열기/닫기 상태

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const fetchOptions = async menu_pk => {
    try {
      const response = await axios.get(`/api/menu/option/${menu_pk}`);
      const resultData = response.data.resultData;
      return resultData;
    } catch (error) {
      console.error("옵션 데이터를 불러오는 데 실패했습니다.", error);
      return [];
    }
  };

  const handleMenuClick = async item => {
    if (item.menu_state !== 2) {
      const options = await fetchOptions(item.menu_pk);
      if (options.length > 0) {
        setSelectedMenuItem(item);
        setIsModalOpen(true); // 옵션이 있으면 모달 열기
      } else {
        onSelectMenuItem(item); // 옵션이 없으면 바로 OrderSummary로 이동
      }
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleOptionConfirm = menuItemWithOptions => {
    onSelectMenuItem(menuItemWithOptions);
  };

  const { menu_category, menu } = categoryData || {};

  if (!menu_category) {
    return null;
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
              onClick={() => handleMenuClick(item)}
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
                  <img
                    src={
                      item.menu_pic.startsWith("http")
                        ? item.menu_pic
                        : `/pic/${item.menu_pic}`
                    }
                    alt={item.menu_pic}
                  />
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
      <OptionModal
        open={isModalOpen}
        onClose={handleModalClose}
        menuItem={selectedMenuItem}
        onConfirm={handleOptionConfirm}
      />
    </div>
  );
};

export default MenuCategory;

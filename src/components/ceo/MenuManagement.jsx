/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import Swiper from "swiper";
import { SwiperSlide } from "swiper/react";
import pizzaImage from "../user/home/restaurantdetail/pizza.jpg";
import menuItemsData from "../user/home/restaurantdetail/menuItems.json";
import "../../css/components/_MenuManagement.scss";
import "../../css/components/_Menu.scss";

const MenuManagement = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const updatedMenuItems = menuItemsData.map(item => ({
      ...item,
      img: pizzaImage,
    }));
    setMenuItems(updatedMenuItems);
  }, []);

  const handleOpenModal = item => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };
  return (
    <>
      <div className="menu-settings">
        <div className="settings-header">메뉴설정</div>
        <div className="settings-body">
          <div className="menu-upper">
            <div className="menu-search">메뉴를 검색하세요</div>
            <div className="menu-orderChange">메뉴 순서변경</div>
            <div className="menu-add">
              <button>메뉴 추가</button>
            </div>
          </div>
        </div>
      </div>
      <div className="menu-section">
        {" "}
        <div className="menu-component">
          <div className="menu-list">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className="menu-list-oneMenu"
                onClick={() => handleOpenModal(item)}
              >
                <div className="menu-list-oneMenu-table">
                  <div className="menu-list-oneMenu-tableData">
                    <h3 className="menu-list-name">{item.name}</h3>
                    <p className="menu-list-content">{item.content}</p>
                    <p className="menu-list-price">
                      {item.price.toLocaleString()}원
                    </p>
                  </div>
                  <div className="menu-list-oneMenu-tablePic">
                    <img src={item.img} alt={item.name} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuManagement;

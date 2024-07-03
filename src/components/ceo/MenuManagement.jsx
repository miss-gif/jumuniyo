/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import Swiper from "swiper";
import { SwiperSlide } from "swiper/react";
import pizzaImage from "../restaurantdetail/pizza.jpg";
import menuItemsData from "../restaurantdetail/menuItems.json";
import "../../css/components/_MenuManagement.scss";

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
          <div className="menu-lower">
            <div className="oneMenu">
              <div className="oneMenu-body">
                <div className="oneMenu-image">
                  <img className="image" src={pizzaImage} />
                </div>
                <div className="oneMenu-content">
                  <div className="oneMenu-content-title">
                    토마토 베이컨 버거
                  </div>
                  <div className="oneMenu-content-explain">
                    싱싱한 토마토와 짭조롬한 베이컨의 만남
                  </div>
                  <div className="oneMenu-content-price">10,000원</div>
                </div>
                <div className="oneMenu-status">
                  <div className="oneMenu-status-box">
                    <div className="choice">판매중</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuManagement;

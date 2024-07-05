/* eslint-disable react/prop-types */
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const MenuContent = ({ menuItems, handleOpenModal }) => {
  return (
    <div className="menu-section">
      <div className="menu-slide">
        <Swiper
          className="swiper-container"
          spaceBetween={10}
          slidesPerView={4}
        >
          {menuItems.map((item, index) => (
            <SwiperSlide
              key={index}
              className="oneMenu border-set"
              onClick={() => handleOpenModal(item)}
            >
              <div className="menuPicture">
                <img src={item.img} alt={item.name} />
              </div>
              <h3 className="menuTitle">{item.name}</h3>
              <p className="menuPrice">{item.price.toLocaleString()}원</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="menu-component">
        <div className="menu-tap">메뉴</div>
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
  );
};

export default MenuContent;

import React, { useState, useEffect } from "react";
import pizzaImage from "../restaurantdetail/pizza.jpg";
import menuItemsData from "../restaurantdetail/menuItems.json";
import "../../css/components/ceo/_MenuManagement.scss";
import "../../css/components/ceo/_AddMenuModal.scss";

const MenuManagement = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [newMenuItem, setNewMenuItem] = useState({
    name: "",
    content: "",
    price: "",
    img: pizzaImage,
    status: "판매중",
  });

  useEffect(() => {
    const updatedMenuItems = menuItemsData.map(item => ({
      ...item,
      img: pizzaImage,
    }));
    setMenuItems(updatedMenuItems);
  }, []);

  const handleOpenModal = (item = null) => {
    setSelectedItem(item);
    setIsModalOpen(true);
    setIsEditMode(!!item);
    if (item) {
      setNewMenuItem(item);
    } else {
      setNewMenuItem({
        name: "",
        content: "",
        price: "",
        img: pizzaImage,
        status: "판매중", // 새로운 항목의 기본 상태
      });
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
    setIsEditMode(false);
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setNewMenuItem({
      ...newMenuItem,
      [name]: value,
    });
  };

  const handleAddMenuItem = () => {
    setMenuItems([...menuItems, newMenuItem]);
    handleCloseModal();
  };

  const handleEditMenuItem = () => {
    const updatedItems = menuItems.map(item =>
      item.name === selectedItem.name ? newMenuItem : item,
    );
    setMenuItems(updatedItems);
    handleCloseModal();
  };

  const handleDeleteMenuItem = itemToDelete => {
    const updatedItems = menuItems.filter(item => item !== itemToDelete);
    setMenuItems(updatedItems);
  };

  const handleStatusChange = (e, item) => {
    const updatedItems = menuItems.map(menuItem =>
      menuItem.name === item.name
        ? { ...menuItem, status: e.target.value }
        : menuItem,
    );
    setMenuItems(updatedItems);
  };

  return (
    <div className="menu-management">
      <div className="menu-settings">
        <div className="settings-header">메뉴설정</div>
        <div className="settings-body">
          <div className="menu-upper">
            <div className="menu-search">메뉴를 검색하세요</div>
            <div className="menu-orderChange">메뉴 순서변경</div>
            <div className="menu-add">
              <button onClick={() => handleOpenModal(null)}>메뉴 추가</button>
            </div>
          </div>
        </div>
      </div>
      <div className="menu-section">
        <div className="menu-list">
          {menuItems.map((item, index) => (
            <div key={index} className="menu-list-oneMenu">
              <div className="menu-list-oneMenu-table">
                <div className="menu-list-oneMenu-tableData">
                  <h3 className="menu-list-name">{item.name}</h3>
                  <p className="menu-list-content">{item.content}</p>
                  <p className="menu-list-price">
                    {item.price.toLocaleString()}원
                  </p>
                  <div className="menu-list-status">
                    <label htmlFor={`status-${index}`}>상태: </label>
                    <select
                      id={`status-${index}`}
                      value={item.status}
                      onChange={e => handleStatusChange(e, item)}
                    >
                      <option value="판매중">판매중</option>
                      <option value="판매중지">판매중지</option>
                    </select>
                  </div>
                </div>
                <div className="menu-list-oneMenu-tablePic">
                  <img src={item.img} alt={item.name} />
                </div>
              </div>
              <div className="menu-list-actions">
                <button className="btn" onClick={() => handleOpenModal(item)}>
                  수정
                </button>
                <button
                  className="btn"
                  onClick={() => handleDeleteMenuItem(item)}
                >
                  삭제
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={handleCloseModal}>
              &times;
            </span>
            <h2>{isEditMode ? "메뉴 수정" : "새 메뉴 추가"}</h2>
            <form>
              <div className="form-group">
                <label htmlFor="name">메뉴 이름</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newMenuItem.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="content">메뉴 설명</label>
                <input
                  type="text"
                  id="content"
                  name="content"
                  value={newMenuItem.content}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">가격</label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  value={newMenuItem.price}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="img">이미지</label>
                <input
                  type="file"
                  id="img"
                  name="img"
                  onChange={e =>
                    setNewMenuItem({ ...newMenuItem, img: e.target.files[0] })
                  }
                />
              </div>
              <button
                type="button"
                onClick={isEditMode ? handleEditMenuItem : handleAddMenuItem}
              >
                {isEditMode ? "수정" : "추가"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuManagement;

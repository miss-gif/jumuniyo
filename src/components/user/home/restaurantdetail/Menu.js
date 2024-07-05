import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import pizzaImage from "./pizza.jpg";
import testMenu from "./testMenu.jpg";
import ModalForMenu from "./ModalForMenu";
import menuItemsData from "./menuItems.json";
import reviewItemsData from "./review.json";
import infoData from "./info.json";
import "swiper/css";

import MenuContent from "./MenuContent";
import ReviewContent from "./ReviewContent";
import InfoContent from "./InfoContent";

import DeleteIcon from "@mui/icons-material/Delete";
import CancelIcon from "@mui/icons-material/Cancel";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
const storeReviewNumber = [
  {
    reviews: 100,
  },
];

const Menu = () => {
  const [selectedTab, setSelectedTab] = useState("menu");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [orderItems, setOrderItems] = useState([]);

  const navigate = useNavigate();

  const [menuItems, setMenuItems] = useState([]);
  const [reviewItems, setReviewItems] = useState([]);
  const [info, setInfo] = useState({});

  useEffect(() => {
    const updatedMenuItems = menuItemsData.map(item => ({
      ...item,
      img: pizzaImage,
    }));
    setMenuItems(updatedMenuItems);

    const updatedReviewItems = reviewItemsData.map(item => ({
      ...item,
      reviewImg: testMenu,
    }));
    setReviewItems(updatedReviewItems);

    setInfo(infoData);
  }, []);

  const handleOpenModal = item => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const handleSelectCount = count => {
    const existingItemIndex = orderItems.findIndex(
      item => item.name === selectedItem.name,
    );

    if (existingItemIndex !== -1) {
      const newOrderItems = [...orderItems];
      newOrderItems[existingItemIndex].count += count;
      setOrderItems(newOrderItems);
    } else {
      const itemWithCount = { ...selectedItem, count };
      setOrderItems([...orderItems, itemWithCount]);
    }

    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const handleIncreaseCount = index => {
    const newOrderItems = [...orderItems];
    newOrderItems[index].count += 1;
    setOrderItems(newOrderItems);
  };

  const handleDecreaseCount = index => {
    const newOrderItems = [...orderItems];
    if (newOrderItems[index].count > 1) {
      newOrderItems[index].count -= 1;
      setOrderItems(newOrderItems);
    }
  };

  const handleRemoveItem = index => {
    const newOrderItems = orderItems.filter((_, i) => i !== index);
    setOrderItems(newOrderItems);
  };

  const handleOrder = () => {
    navigate("/pay", { state: { orderItems, totalOrderPrice } });
  };

  const handleClearOrder = () => {
    setOrderItems([]);
  };

  const totalOrderPrice = orderItems.reduce(
    (total, item) => total + item.price * item.count,
    0,
  );

  const renderContent = () => {
    if (selectedTab === "menu") {
      return (
        <MenuContent menuItems={menuItems} handleOpenModal={handleOpenModal} />
      );
    } else if (selectedTab === "review") {
      return (
        <ReviewContent
          reviewItems={reviewItems}
          storeReviewNumber={storeReviewNumber}
        />
      );
    } else if (selectedTab === "info") {
      return <InfoContent info={info} />;
    }
  };

  return (
    <div className="menu-wrap">
      <div className={`left ${selectedTab}`}>
        <div className="restaurant-info border-set">
          <h2 className="restaurant-title">롯데리아-서성네거리점</h2>
          <div className="restaurant-logoandcontent">
            <div className="restaurant-logo">
              <img className="restaurant-logo-img" src={pizzaImage} />
            </div>
            <div className="restaurant-content">
              <div className="restaurant-list">
                <div className="list-star">별점</div>
                <div className="list-item">
                  <div className="list-minimumOrder">최소주문금액 11,000원</div>
                </div>
                <div className="list-item">
                  <div className="list-payMethod">결제 요기서결제</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div className="choice">
          <div className="threeChoices">
            <ul>
              <button
                className={selectedTab === "menu" ? "active" : ""}
                onClick={() => setSelectedTab("menu")}
              >
                <h3>메뉴</h3>
              </button>
              <button
                className={selectedTab === "review" ? "active" : ""}
                onClick={() => setSelectedTab("review")}
              >
                <h3>클린리뷰 {storeReviewNumber[0].reviews || "Loading..."}</h3>
              </button>
              <button
                className={selectedTab === "info" ? "active" : ""}
                onClick={() => setSelectedTab("info")}
              >
                <h3>정보</h3>
              </button>
            </ul>
          </div>
          {renderContent()}
        </div>
      </div>
      <div className={`right ${selectedTab}`}>
        <h2 className="order-tab">
          <div className="orderList">주문표</div>
          <button
            className="clear-order btn--default"
            onClick={handleClearOrder}
          >
            <DeleteIcon sx={{ fontSize: 20, color: "$black" }} />
          </button>
        </h2>
        <div className="order-menu">
          {orderItems.length === 0 ? (
            "주문표에 담긴 메뉴가 없습니다."
          ) : (
            <ul>
              {orderItems.map((item, index) => (
                <li key={index}>
                  <div className="order-menu-name">{item.name}</div>
                  <div className="order-menu-lower">
                    <div className="order-priceAndCancel">
                      <button
                        className="order-cancel"
                        onClick={() => handleRemoveItem(index)}
                      >
                        <CancelIcon />
                      </button>
                      {(item.price * item.count).toLocaleString()}원
                    </div>
                    <div className="order-controlNumber">
                      <button onClick={() => handleDecreaseCount(index)}>
                        <RemoveIcon />
                      </button>
                      {item.count}개
                      <button onClick={() => handleIncreaseCount(index)}>
                        <AddIcon />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="order-price">
          총 가격: {totalOrderPrice.toLocaleString()}원
        </div>
        <button
          className={`order-button ${orderItems.length === 0 ? "disabled" : ""}`}
          onClick={handleOrder}
          disabled={orderItems.length === 0}
        >
          주문하기
        </button>

        {/* width 760px 이하일시 버튼 */}
        <button
          className={`order-buttonforphone ${orderItems.length === 0 ? "disabled" : ""}`}
          onClick={handleOrder}
          disabled={orderItems.length === 0}
        >
          {orderItems.length === 0
            ? "음식을 선택해주세요!"
            : totalOrderPrice.toLocaleString() + "원 주문하기"}
        </button>
      </div>

      <ModalForMenu
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSelect={handleSelectCount}
      />
    </div>
  );
};

export default Menu;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import pizzaImage from "./pizza.jpg";
import testMenu from "./testMenu.jpg";
import ModalForMenu from "./ModalForMenu";
import menuItemsData from "./menuItems.json";
import reviewItemsData from "./review.json";
import infoData from "./info.json";
import "../../css/components/_Menu.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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
    const itemWithCount = { ...selectedItem, count };
    setOrderItems([...orderItems, itemWithCount]);
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

  const renderContent = () => {
    if (selectedTab === "menu") {
      return (
        <div>
          <div className="menu-slide">
            <Swiper
              className="swiper-container"
              spaceBetween={10}
              slidesPerView={4}
              // navigation
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
                  <div className="menuTitle">{item.name}</div>
                  <div className="menuPrice">
                    {item.price.toLocaleString()}원
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
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
                      <p className="menu-list-name">{item.name}</p>
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
    } else if (selectedTab === "review") {
      return (
        <div className="review-wrap">
          <div>클린리뷰 {storeReviewNumber[0].reviews}</div>
          <div className="rating-section">
            <div className="rating-score">5.0</div>
            <div className="rating-stars">
              <span>맛</span> <span>5.0</span>
              <span>양</span> <span>5.0</span>
              <span>배달</span> <span>5.0</span>
            </div>
          </div>
          <div className="review-section">
            <div className="review-count">
              리뷰 {storeReviewNumber[0].reviews}개
            </div>
            <div className="review-switch">
              <label>
                <input type="checkbox"></input> 사장님댓글
              </label>
            </div>
          </div>
          <div className="reviews">
            {reviewItems.map((item, index) => (
              <div key={index} className="review">
                <div className="review-header">
                  <span className="review-user">{item.userId}</span>
                  <span className="review-date">{item.writeTime}</span>
                  <span className="review-rating">{item.score}</span>
                </div>
                <div className="review-content">
                  <img src={item.reviewImg} alt="Review" />
                  <p>{item.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    } else if (selectedTab === "info") {
      return (
        <div className="info-section">
          <h2>업체정보</h2>
          <p>
            <strong>영업시간</strong> {info.companyInfo?.businessHours}
          </p>
          {/* <p>
            <strong>전화번호</strong> {info.companyInfo?.phoneNumber}
          </p> */}
          <p>
            <strong>주소</strong> {info.companyInfo?.address}
          </p>
          {/* <h2>결제정보</h2>
          <p>
            <strong>최소주문금액</strong> {info.paymentInfo?.minimumOrderAmount}
          </p>
          <p>
            <strong>결제수단</strong> {info.paymentInfo?.paymentMethods}
          </p> */}
          <h2>사업자정보</h2>
          <p>
            <strong>상호명</strong> {info.businessInfo?.businessName}
          </p>
          <p>
            <strong>사업자등록번호</strong>{" "}
            {info.businessInfo?.businessRegistrationNumber}
          </p>
        </div>
      );
    }
  };

  const totalOrderPrice = orderItems.reduce(
    (total, item) => total + item.price * item.count,
    0,
  );

  return (
    <div className="menu-wrap">
      <div className="left">
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
      <div className="right">
        <h2 className="order-tab">주문표</h2>
        <div className="order-menu">
          {orderItems.length === 0 ? (
            "주문표에 담긴 메뉴가 없습니다."
          ) : (
            <ul>
              {orderItems.map((item, index) => (
                <li key={index}>
                  {item.name} <br />
                  <button onClick={() => handleRemoveItem(index)}>취소</button>
                  {(item.price * item.count).toLocaleString()}원
                  <button onClick={() => handleDecreaseCount(index)}>-</button>
                  {item.count}개
                  <button onClick={() => handleIncreaseCount(index)}>+</button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="order-price">
          총 가격: {totalOrderPrice.toLocaleString()}원
        </div>
        <div className="order-button" onClick={handleOrder}>
          주문하기
        </div>
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

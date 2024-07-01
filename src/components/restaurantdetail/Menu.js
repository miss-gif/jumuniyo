import React, { useEffect, useState } from "react";
import pizzaImage from "./pizza.jpg";
import testMenu from "./testMenu.jpg";
import ModalForMenu from "./ModalForMenu"; // 모달 컴포넌트 추가
import menuItemsData from "./menuItems.json";
import reviewItemsData from "./review.json";
import infoData from "./info.json"; // JSON 파일 가져오기

import "../../css/components/_Menu.scss";

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

  // 더미데이터용
  const [menuItems, setMenuItems] = useState([]);
  const [reviewItems, setReviewItems] = useState([]);
  const [info, setInfo] = useState({});

  // 더미데이터용
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

  const renderContent = () => {
    if (selectedTab === "menu") {
      return (
        <div>
          <div className="menu-slide">
            <div className="container">
              {menuItems.map((item, index) => (
                <div
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
                </div>
              ))}
            </div>
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
              <img src={pizzaImage} />
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
                  {item.name} - {item.count}개 -{" "}
                  {(item.price * item.count).toLocaleString()}원
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="order-price">
          총 가격: {totalOrderPrice.toLocaleString()}원
        </div>
        <div className="order-button">주문하기</div>
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

import React, { useEffect, useState } from "react";
import RestaurantDetailHeader from "../../components/user/restaurantdetail/RestaurantDetailHeader";
import RestaurantDetailCleanReview from "../../components/user/restaurantdetail/RestaurantDetailCleanReview";
import RestaurantDetailMenuContent from "../../components/user/restaurantdetail/RestaurantDetailMenuContent";
import RestaurantDetailTabInfo from "../../components/user/restaurantdetail/RestaurantDetailTabInfo";
import RestaurantDetailInfo from "../../components/user/restaurantdetail/RestaurantDetailInfo";
import OrderSummary from "../../components/user/restaurantdetail/OrderSummary";
import { useParams } from "react-router-dom";
import {
  fetchRestaurantData,
  fetchMenuData,
} from "../../api/restaurantdetail/restaurantDetail";

const RestaurantDetailPage = () => {
  const [activeTab, setActiveTab] = useState("menu");
  const { id } = useParams();
  const [restaurantData, setRestaurantData] = useState(null);
  const [menuData, setMenuData] = useState([]);
  const [selectedMenuItems, setSelectedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const restaurant = await fetchRestaurantData(id);
        const menu = restaurant.menuList;
        console.log("가게: ", restaurant);
        console.log("메뉴: ", menu);
        setRestaurantData(restaurant);
        setMenuData(menu);
        setLoading(false);
      } catch (err) {
        console.error("에러: ", err);
        setError(err);
        setLoading(false);
      }
    };

    getData();
  }, [id]);

  if (loading) return <p>로딩 중</p>;
  if (error) return <p>error: {error.message}</p>;
  if (!restaurantData) return <p>없는 페이지 입니다.</p>;

  const handleSelectMenuItem = item => {
    setSelectedMenuItems(prevItems => {
      const existingItem = prevItems.find(
        menuItem => menuItem.menu_pk === item.menu_pk,
      );
      if (existingItem) {
        return prevItems.map(menuItem =>
          menuItem.menu_pk === item.menu_pk
            ? { ...menuItem, quantity: menuItem.quantity + 1 }
            : menuItem,
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const handleIncreaseQuantity = menu_pk => {
    setSelectedMenuItems(prevItems =>
      prevItems.map(item =>
        item.menu_pk === menu_pk
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  };

  const handleDecreaseQuantity = menu_pk => {
    setSelectedMenuItems(prevItems =>
      prevItems.map(item =>
        item.menu_pk === menu_pk && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  };

  const handleRemoveItem = menu_pk => {
    setSelectedMenuItems(prevItems =>
      prevItems.filter(item => item.menu_pk !== menu_pk),
    );
  };

  const handleClearAll = () => {
    setSelectedMenuItems([]);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "menu":
        return (
          <RestaurantDetailMenuContent
            menuData={menuData}
            onSelectMenuItem={handleSelectMenuItem}
          />
        );
      case "review":
        return <RestaurantDetailCleanReview restaurantData={restaurantData} />;
      case "info":
        return <RestaurantDetailTabInfo restaurantData={restaurantData} />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="restaurant-detail-page">
        <div className="restaurant-detail-page__left">
          <RestaurantDetailInfo restaurantData={restaurantData} />

          <div className="restaurant-detail-page__menu">
            <RestaurantDetailHeader setActiveTab={setActiveTab} />
            <div>{renderContent()}</div>
          </div>
        </div>

        <div className="restaurant-detail-page__right">
          <OrderSummary
            selectedMenuItems={selectedMenuItems}
            onIncreaseQuantity={handleIncreaseQuantity}
            onDecreaseQuantity={handleDecreaseQuantity}
            onRemoveItem={handleRemoveItem}
            onClearAll={handleClearAll}
          />
        </div>
      </div>
    </>
  );
};

export default RestaurantDetailPage;

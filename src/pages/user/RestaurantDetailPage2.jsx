import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  fetchRestaurantData,
  fetchMenuData,
  fetchReviewData,
} from "../../api/restaurantdetail/restaurantDetail";
import RestaurantDetailHeader from "../../components/user/restaurantdetail/RestaurantDetailHeader";
import RestaurantDetailCleanReview from "../../components/user/restaurantdetail/RestaurantDetailCleanReview";
import RestaurantDetailMenuContent from "../../components/user/restaurantdetail/RestaurantDetailMenuContent";
import RestaurantDetailTabInfo from "../../components/user/restaurantdetail/RestaurantDetailTabInfo";
import RestaurantDetailInfo from "../../components/user/restaurantdetail/RestaurantDetailInfo";
import OrderSummary from "../../components/user/restaurantdetail/OrderSummary";
import { OrderContext } from "./OrderContext";
import LoginModal from "../../components/user/restaurantdetail/LoginModal";
import LoadingSpinner from "../../components/common/LoadingSpinner";

const saveStateToSessionStorage = (key, state) => {
  sessionStorage.setItem(key, JSON.stringify(state));
};

const loadStateFromSessionStorage = key => {
  const savedState = sessionStorage.getItem(key);
  return savedState ? JSON.parse(savedState) : null;
};

const clearStateFromSessionStorage = key => {
  sessionStorage.removeItem(key);
};

const RestaurantDetailPage = () => {
  const [activeTab, setActiveTab] = useState("menu");
  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurantData, setRestaurantData] = useState(null);
  const [menuData, setMenuData] = useState([]);
  const [reviewData, setReviewData] = useState([]);
  const [selectedMenuItems, setSelectedMenuItems] = useState(
    loadStateFromSessionStorage(`selectedMenuItems_${id}`) || [],
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addOrderItem, clearOrder } = useContext(OrderContext);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const accessToken = useSelector(state => state.user.accessToken);
  const isLoggedIn = !!accessToken;

  useEffect(() => {
    console.log("로그인 상태 확인: ", isLoggedIn);
  }, [isLoggedIn]);

  useEffect(() => {
    const getData = async () => {
      try {
        const restaurant = await fetchRestaurantData(id);
        const menu = restaurant.menuList;
        const reviews = await fetchReviewData(id);
        console.log("가게: ", restaurant);
        console.log("메뉴: ", menu);
        console.log("리뷰: ", reviews);
        setRestaurantData(restaurant);
        setMenuData(menu);
        setReviewData(reviews);
        setLoading(false);
      } catch (err) {
        console.error("에러: ", err);
        setError(err);
        setLoading(false);
      }
    };

    getData();
  }, [id]);

  useEffect(() => {
    saveStateToSessionStorage(`selectedMenuItems_${id}`, selectedMenuItems);
  }, [selectedMenuItems, id]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      clearOrder();
      clearStateFromSessionStorage(`selectedMenuItems_${id}`);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [id, clearOrder]);

  if (loading) return <LoadingSpinner />;
  if (error) return <p>에러: {error.message}</p>;
  if (!restaurantData) return <p>없는 페이지 입니다.</p>;

  const menuCount = menuData.length;
  const reviewCount = reviewData.length;

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
    clearOrder();
    clearStateFromSessionStorage(`selectedMenuItems_${id}`);
  };

  const handleOrder = restaurantName => {
    console.log("주문 시도: isLoggedIn = ", isLoggedIn);
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }

    selectedMenuItems.forEach(item => {
      addOrderItem(item);
    });

    sessionStorage.setItem("restaurantName", restaurantName);

    navigate(`/payment/${id}`, {
      state: { orderItems: selectedMenuItems, id },
    });
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
        return (
          <RestaurantDetailCleanReview
            resPk={id}
            restaurantData={restaurantData}
          />
        );
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
            <RestaurantDetailHeader
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              menuCount={menuCount}
              reviewCount={reviewCount}
            />
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
            onOrder={handleOrder}
            restaurantName={restaurantData.restaurantName}
          />
        </div>
      </div>
      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}
    </>
  );
};

export default RestaurantDetailPage;

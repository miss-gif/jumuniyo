import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchRestaurantData,
  fetchReviewData,
} from "../../api/restaurantdetail/restaurantDetail";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import LoginModal from "../../components/user/restaurantdetail/LoginModal";
import OrderSummary from "../../components/user/restaurantdetail/OrderSummary";
import RestaurantDetailCleanReview from "../../components/user/restaurantdetail/RestaurantDetailCleanReview";
import RestaurantDetailHeader from "../../components/user/restaurantdetail/RestaurantDetailHeader";
import RestaurantDetailInfo from "../../components/user/restaurantdetail/RestaurantDetailInfo";
import RestaurantDetailMenuContent from "../../components/user/restaurantdetail/RestaurantDetailMenuContent";
import RestaurantDetailTabInfo from "../../components/user/restaurantdetail/RestaurantDetailTabInfo";
import {
  addItem,
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeItem,
} from "../../app/cartSlice";

const RestaurantDetailPage = () => {
  const [activeTab, setActiveTab] = useState("menu");
  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurantData, setRestaurantData] = useState(null);
  const [menuData, setMenuData] = useState([]);
  const [reviewData, setReviewData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const dispatch = useDispatch();
  const selectedMenuItems = useSelector(state => state.cart.items);
  const accessToken = useSelector(state => state.user.accessToken);
  const isLoggedIn = !!accessToken;

  useEffect(() => {
    const getData = async () => {
      try {
        const restaurant = await fetchRestaurantData(id);
        const menu = restaurant.menuList || [];
        const reviews = (await fetchReviewData(id)) || [];
        setRestaurantData(restaurant);
        setMenuData(menu);
        setReviewData(reviews);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    getData();
  }, [id]);

  useEffect(() => {
    console.log(selectedMenuItems);
  }, [selectedMenuItems]);

  if (loading) return <LoadingSpinner />;
  if (error) return <p>에러: {error.message}</p>;
  if (!restaurantData) return <p>없는 페이지 입니다.</p>;

  const menuCount = menuData ? menuData.length : 0;
  const reviewCount = reviewData ? reviewData.length : 0;

  const handleSelectMenuItem = item => {
    dispatch(addItem(item));
  };

  const handleIncreaseQuantity = menu_pk => {
    dispatch(increaseQuantity(menu_pk));
  };

  const handleDecreaseQuantity = menu_pk => {
    dispatch(decreaseQuantity(menu_pk));
  };

  const handleRemoveItem = menu_pk => {
    dispatch(removeItem(menu_pk));
  };

  const handleClearAll = () => {
    dispatch(clearCart());
  };

  const handleOrder = restaurantName => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }

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
          <RestaurantDetailInfo
            restaurantData={restaurantData}
            onShowLoginModal={() => setShowLoginModal(true)}
          />

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
            restaurantState={restaurantData.restaurantState}
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

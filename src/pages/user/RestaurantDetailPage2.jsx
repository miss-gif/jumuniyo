import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchRestaurantData,
  fetchReviewData,
} from "../../api/restaurantdetail/restaurantDetail";
import {
  addItem,
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeItem,
} from "../../app/cartSlice";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import LoginModal from "../../components/user/restaurantdetail/LoginModal";
import OrderSummary from "../../components/user/restaurantdetail/OrderSummary";
import RestaurantDetailCleanReview from "../../components/user/restaurantdetail/RestaurantDetailCleanReview";
import RestaurantDetailHeader from "../../components/user/restaurantdetail/RestaurantDetailHeader";
import RestaurantDetailInfo from "../../components/user/restaurantdetail/RestaurantDetailInfo";
import RestaurantDetailMenuContent from "../../components/user/restaurantdetail/RestaurantDetailMenuContent";
import RestaurantDetailTabInfo from "../../components/user/restaurantdetail/RestaurantDetailTabInfo";

const TAB_MENU = "menu";
const TAB_REVIEW = "review";
const TAB_INFO = "info";

const RestaurantDetailPage = () => {
  const [activeTab, setActiveTab] = useState(TAB_MENU);
  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurantData, setRestaurantData] = useState(null);
  const [menuData, setMenuData] = useState([]);
  const [reviewData, setReviewData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const dispatch = useDispatch();
  const items = useSelector(state => state.cart.items);
  const restaurant = useSelector(state => state.cart.restaurant);
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
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [id]);

  useEffect(() => {
    console.log("장바구니 아이템: ", items);
    console.log("장바구니 상점명: ", restaurant);
  }, [items, restaurant]);

  if (loading) return <LoadingSpinner />;
  if (error) return <p>문제가 발생했습니다. 잠시 후 다시 시도해주세요.</p>;
  if (!restaurantData) return <p>없는 페이지 입니다.</p>;

  const menuCount = menuData.length;
  const reviewCount = reviewData.length;

  const handleSelectMenuItem = item => {
    dispatch(
      addItem({
        item,
        restaurant: {
          restaurantPk: restaurantData.restaurantPk,
          restaurantName: restaurantData.restaurantName,
        },
      }),
    );
  };

  const handleIncreaseQuantity = (menu_pk, selectedOptions) => {
    dispatch(increaseQuantity({ menu_pk, selectedOptions }));
  };

  const handleDecreaseQuantity = (menu_pk, selectedOptions) => {
    dispatch(decreaseQuantity({ menu_pk, selectedOptions }));
  };

  const handleRemoveItem = (menu_pk, selectedOptions) => {
    dispatch(removeItem({ menu_pk, selectedOptions }));
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
      state: { orderItems: items, id },
    });
  };

  const renderContent = () => {
    switch (activeTab) {
      case TAB_MENU:
        return (
          <RestaurantDetailMenuContent
            menuData={menuData}
            onSelectMenuItem={handleSelectMenuItem}
          />
        );
      case TAB_REVIEW:
        return (
          <RestaurantDetailCleanReview
            resPk={id}
            restaurantData={restaurantData}
          />
        );
      case TAB_INFO:
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
            selectedMenuItems={items}
            onIncreaseQuantity={handleIncreaseQuantity}
            onDecreaseQuantity={handleDecreaseQuantity}
            onRemoveItem={handleRemoveItem}
            onClearAll={handleClearAll}
            onOrder={handleOrder}
            restaurantName={restaurantData?.restaurantName}
            restaurantState={restaurantData?.restaurantState}
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

import { useEffect, useState, useCallback } from "react";
import { IoIosMenu } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { searchRestaurant } from "../../../app/userSlice";
import { handleLogout } from "../../../utils/authUtils";
import AddressModal from "../main/AddressModal";
import AuthLinks from "./AuthLinks.jsx";
import LocationSelector from "./LocationSelector";
import Sidebar from "./Sidebar";
import SidebarCart from "./SidebarCart";
import SidebarCoupon from "./SidebarCoupon";
import SidebarHeart from "./SidebarHeart";
import UserActions from "./UserActions";
import "./UserHeader.scss";

const UserHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 통합된 상태 관리
  const [sidebarState, setSidebarState] = useState({
    isOpen: false,
    isRightOpen: false,
    isCartOpen: false,
    isCouponOpen: false,
    isHeartOpen: false,
  });

  const [isTransitioning, setTransitioning] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [onSearch, setOnSearch] = useState(false);

  // Redux 상태 통합
  const {
    isLoggedIn,
    accessToken,
    userData,
    searchTerm,
    searchRestaurant: searchRestaurantValue,
  } = useSelector(state => ({
    isLoggedIn: state.user.isLoggedIn,
    accessToken: state.user.accessToken,
    userData: state.user.userData,
    searchTerm: state.user.searchTerm,
    searchRestaurant: state.user.searchRestaurant,
  }));

  const userNickname = userData ? userData.userNickname : "Guest";

  const handleInputChange = e => {
    dispatch(searchRestaurant(e.target.value));
  };

  // 상태 변경에 따른 UI 반응
  useEffect(() => {
    if (
      sidebarState.isOpen ||
      sidebarState.isRightOpen ||
      sidebarState.isCartOpen ||
      sidebarState.isCouponOpen ||
      sidebarState.isHeartOpen
    ) {
      setTransitioning(true);
      document.documentElement.style.overflow = "hidden";
    } else if (isTransitioning) {
      const timer = setTimeout(() => {
        document.documentElement.style.overflow = "auto";
        setTransitioning(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [sidebarState, isTransitioning]);

  // useCallback을 사용한 리렌더링 최적화
  const toggleSidebar = useCallback(() => {
    setSidebarState(prevState => ({ ...prevState, isOpen: !prevState.isOpen }));
  }, []);

  const toggleSidebarCart = useCallback(() => {
    setSidebarState(prevState => ({
      ...prevState,
      isCartOpen: !prevState.isCartOpen,
    }));
  }, []);

  const toggleSidebarCoupon = useCallback(() => {
    setSidebarState(prevState => ({
      ...prevState,
      isCouponOpen: !prevState.isCouponOpen,
    }));
  }, []);

  const toggleSidebarHeart = useCallback(() => {
    setSidebarState(prevState => ({
      ...prevState,
      isHeartOpen: !prevState.isHeartOpen,
    }));
  }, []);

  const handleLogoutClick = () => {
    localStorage.removeItem("state");
    handleLogout(accessToken, dispatch, navigate);
    setSidebarState({
      isOpen: false,
      isRightOpen: false,
      isCartOpen: false,
      isCouponOpen: false,
      isHeartOpen: false,
    }); // 로그아웃 시 모든 사이드바 닫기
  };

  const openModal = item => {
    setSelectedItem(item);
    setIsModal(true);
    document.documentElement.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModal(false);
    setSelectedItem(null);
    document.documentElement.style.overflow = "auto";
  };

  const clickSearch = () => {
    setOnSearch(prev => !prev);
    console.log("onSearch", onSearch);
  };

  return (
    <div className="user-header">
      {isLoggedIn && (
        <>
          <button className="user-header__menu-btn" onClick={toggleSidebar}>
            <IoIosMenu fontSize={32} />
          </button>
        </>
      )}
      <div className="user-header__logo">
        <Link to={"/"}>주문이요</Link>
      </div>
      <nav className="user-header__nav">
        <LocationSelector
          searchTerm={searchTerm}
          openModal={openModal}
          setIsModal={setIsModal}
        />
        <div className="user-header__search">
          <IoSearch fontSize={20} />
          <input
            className="search__input"
            type="text"
            placeholder="검색창"
            value={searchRestaurantValue}
            onChange={handleInputChange}
          />
          <button onClick={clickSearch}>검색</button>
        </div>
        {isLoggedIn && (
          <UserActions
            toggleSidebarCart={toggleSidebarCart}
            toggleSidebarCoupon={toggleSidebarCoupon}
            toggleSidebarHeart={toggleSidebarHeart}
          />
        )}
      </nav>
      {!isLoggedIn && <AuthLinks closeModal={closeModal} />}

      <Sidebar
        isSidebarOpen={sidebarState.isOpen}
        toggleSidebar={toggleSidebar}
        handleLogoutClick={handleLogoutClick}
        userNickname={userNickname}
      />
      <SidebarCart
        isSidebarCart={sidebarState.isCartOpen}
        toggleSidebarCart={toggleSidebarCart}
      />
      <SidebarCoupon
        isSidebarCoupon={sidebarState.isCouponOpen}
        toggleSidebarCoupon={toggleSidebarCoupon}
      />
      <SidebarHeart
        isSidebarHeart={sidebarState.isHeartOpen}
        toggleSidebarHeart={toggleSidebarHeart}
      />

      <AddressModal isOpen={isModal} onRequestClose={closeModal} />
    </div>
  );
};

export default UserHeader;

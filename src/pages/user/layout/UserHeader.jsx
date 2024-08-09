import { useEffect, useState } from "react";
import { IoIosMenu } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { handleLogout } from "../../../utils/authUtils";
import AddressModal from "../main/AddressModal";
import AuthLinks from "./AuthLinks.jsx";
import LocationSelector from "./LocationSelector";
import Sidebar from "./Sidebar";
import SidebarRight from "./SidebarRight";
import UserActions from "./UserActions";
import "./UserHeader.scss";

const UserHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  const accessToken = useSelector(state => state.user.accessToken);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isSidebarRightOpen, setSidebarRightOpen] = useState(false); // 오른쪽 사이드바 상태 추가
  const [isTransitioning, setTransitioning] = useState(false);

  const userData = useSelector(state => state.user.userData);
  const userNickname = userData ? userData.userNickname : "Guest";

  const searchTerm = useSelector(state => state.user.searchTerm);

  useEffect(() => {
    if (isSidebarOpen || isSidebarRightOpen) {
      setTransitioning(true);
      document.documentElement.style.overflow = "hidden";
    } else if (isTransitioning) {
      const timer = setTimeout(() => {
        document.documentElement.style.overflow = "auto";
        setTransitioning(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isSidebarOpen, isSidebarRightOpen, isTransitioning]);

  const toggleSidebar = () => setSidebarOpen(prev => !prev);
  const toggleSidebarRight = () => setSidebarRightOpen(prev => !prev); // 오른쪽 사이드바 토글 함수 추가

  const handleLogoutClick = () => {
    localStorage.removeItem("state");
    handleLogout(accessToken, dispatch, navigate);
    setSidebarOpen(false);
    setSidebarRightOpen(false); // 로그아웃 시 모든 사이드바 닫기
  };

  const [isModal, setIsModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

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
        <LocationSelector searchTerm={searchTerm} openModal={openModal} />
        <div className="user-header__search">
          <IoSearch fontSize={20} />
          <input className="search__input" type="text" placeholder="검색창" />
        </div>
        {isLoggedIn && <UserActions toggleSidebarRight={toggleSidebarRight} />}
      </nav>

      {!isLoggedIn && <AuthLinks closeModal={closeModal} />}

      <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        handleLogoutClick={handleLogoutClick}
        userNickname={userNickname}
      />
      <SidebarRight
        isSidebarRightOpen={isSidebarRightOpen}
        toggleSidebarRight={toggleSidebarRight}
      />

      <AddressModal isOpen={isModal} onRequestClose={closeModal} />
    </div>
  );
};

export default UserHeader;

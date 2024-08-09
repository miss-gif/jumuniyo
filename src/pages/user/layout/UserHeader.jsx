import React, { useState, useEffect } from "react";
import { IoIosMenu } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AddressModal from "../main/AddressModal";
import AuthLinks from "./AuthLinks.jsx";
import Sidebar from "./Sidebar";
import LocationSelector from "./LocationSelector";
import "./UserHeader.scss";
import UserActions from "./UserActions";
import { handleLogout } from "../../../utils/authUtils";

const UserHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  const accessToken = useSelector(state => state.user.accessToken);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isTransitioning, setTransitioning] = useState(false);

  const userData = useSelector(state => state.user.userData);
  const userNickname = userData ? userData.userNickname : "Guest";

  const searchTerm = useSelector(state => state.user.searchTerm);

  useEffect(() => {
    if (isSidebarOpen) {
      setTransitioning(true);
      document.documentElement.style.overflow = "hidden";
    } else if (isTransitioning) {
      const timer = setTimeout(() => {
        document.documentElement.style.overflow = "auto";
        setTransitioning(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isSidebarOpen, isTransitioning]);

  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  const handleLogoutClick = () => {
    localStorage.removeItem("state");
    handleLogout(accessToken, dispatch, navigate);
    setSidebarOpen(false);
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
        <button className="user-header__menu-btn" onClick={toggleSidebar}>
          <IoIosMenu fontSize={32} />
        </button>
      )}
      <div className="user-header__logo">
        <Link to={"/"}>주문이요</Link>
      </div>
      <nav className="user-header__nav">
        <LocationSelector searchTerm={searchTerm} openModal={openModal} />
        <div className="user-header__search">
          <input className="search__input" type="text" placeholder="검색창" />
        </div>
        {isLoggedIn && <UserActions />}
      </nav>

      {!isLoggedIn && <AuthLinks closeModal={closeModal} />}

      <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        handleLogoutClick={handleLogoutClick}
        userNickname={userNickname}
      />
      <AddressModal isOpen={isModal} onRequestClose={closeModal} />
    </div>
  );
};

export default UserHeader;

import React, { useState, useEffect } from "react";
import { MdOutlineLocationOn } from "react-icons/md";
import { IoCartOutline, IoSearchSharp } from "react-icons/io5";
import { IoIosArrowDown, IoIosMenu } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleLogout } from "../../../utils/authUtils";
import AddressModal from "../main/AddressModal";
import PropTypes from "prop-types";
import { FaHeart } from "react-icons/fa6";
import { RiCoupon2Fill } from "react-icons/ri";
import { FaCartShopping } from "react-icons/fa6";

import "./UserHeader.scss";

// AuthLinks 컴포넌트 추가

const AuthLinks = ({ closeModal }) => (
  <div className="user-header__auth">
    <div className="user-header__auth-login auth-btn">
      <Link to="/login" onClick={closeModal}>
        로그인
      </Link>
    </div>
    <div className="user-header__auth-signup auth-btn">
      <Link to="/auth" onClick={closeModal}>
        회원가입
      </Link>
    </div>
  </div>
);

const UserHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  const accessToken = useSelector(state => state.user.accessToken);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isTransitioning, setTransitioning] = useState(false);

  const userData = useSelector(state => state.user.userData);
  const userNickname = userData ? userData.userNickname : "Guest";

  const searchTerm = useSelector(state => state.user.searchTerm); // Redux에서 searchTerm 읽기

  useEffect(() => {
    if (isSidebarOpen) {
      setTransitioning(true);
      document.documentElement.style.overflow = "hidden";
    } else if (isTransitioning) {
      // 사이드바가 닫힐 때 애니메이션이 완료된 후 overflow를 auto로 되돌립니다.
      const timer = setTimeout(() => {
        document.documentElement.style.overflow = "auto";
        setTransitioning(false);
      }, 300); // 애니메이션 시간과 맞추어야 합니다.
      return () => clearTimeout(timer);
    }
  }, [isSidebarOpen, isTransitioning]);

  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  const handleLogoutClick = () => {
    localStorage.removeItem("state");
    handleLogout(accessToken, dispatch, navigate);
    setSidebarOpen(false);
  };

  /**
   * 모달 코드입니다.
   *
   */

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
      {isLoggedIn ? (
        <button className="user-header__menu-btn" onClick={toggleSidebar}>
          <IoIosMenu fontSize={32} />
        </button>
      ) : (
        <></>
      )}
      <div className="user-header__logo">
        <Link to={"/"}>주문이요</Link>
      </div>
      <nav className="user-header__nav">
        <div
          className="user-header__location"
          onClick={() => {
            openModal();
          }}
        >
          <MdOutlineLocationOn />
          <span>{searchTerm}</span>
          <IoIosArrowDown />
        </div>
        <div className="user-header__search">
          <IoSearchSharp />
          <input className="search__input" type="text" placeholder="검색창" />
        </div>

        {isLoggedIn ? (
          <>
            <div className="user-header__cart">
              <FaCartShopping fontSize={24} />
            </div>
            <div className="user-header__heart">
              <FaHeart fontSize={24} />
            </div>
            <div className="user-header__coupon">
              <RiCoupon2Fill fontSize={24} />
            </div>
          </>
        ) : (
          <></>
        )}
      </nav>

      {!isLoggedIn ? <AuthLinks /> : null}

      <div
        className={`sidebar-overlay ${isSidebarOpen ? "visible" : ""}`}
        onClick={toggleSidebar}
      >
        <div
          className={`sidebar ${isSidebarOpen ? "open" : ""}`}
          onClick={e => e.stopPropagation()}
        >
          {isLoggedIn ? (
            <>
              <li className="nav__item">
                <Link to="/mypage" onClick={toggleSidebar}>
                  <img src="" alt="" />
                  <div className="">
                    <div className="">{userNickname}</div>
                    <Link to="/mypage" onClick={toggleSidebar}>
                      마이페이지
                    </Link>
                  </div>
                </Link>
              </li>
              <li className="nav__item">
                <Link to="/mypage" onClick={toggleSidebar}>
                  주문내역
                </Link>
              </li>
              <li className="nav__item">
                <Link to="/mypage" onClick={toggleSidebar}>
                  리뷰내역
                </Link>
              </li>
              <li className="nav__item">
                <Link to="/mypage" onClick={toggleSidebar}>
                  고객센터
                </Link>
              </li>
              <li className="nav__item">
                <button onClick={handleLogoutClick}>로그아웃</button>
              </li>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
      <AddressModal isOpen={isModal} onRequestClose={closeModal} />
    </div>
  );
};

AddressModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
};

export default UserHeader;

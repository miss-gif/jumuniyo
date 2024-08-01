import { MdOutlineLocationOn } from "react-icons/md";
import { IoCartOutline, IoSearchSharp } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

import "./UserHeader.scss";

const UserHeader = () => {
  return (
    <div className="user-header">
      <button className="user-header__menu-btn">
        <GiHamburgerMenu fontSize={24} />
      </button>
      <div className="user-header__logo">주문이요</div>
      <nav className="user-header__nav">
        <div className="user-header__location">
          <MdOutlineLocationOn />
          <span>대구 중구</span>
          <IoIosArrowDown />
        </div>
        <div className="user-header__search">
          <IoSearchSharp />
          <input className="search__input" type="text" placeholder="검색창" />
        </div>
        <div className="user-header__cart">
          <IoCartOutline fontSize={24} />
        </div>
      </nav>
      <div className="user-header__auth">
        <div className="user-header__auth-login">
          <Link to="/login">로그인</Link>
        </div>
        <div className="user-header__auth-signup auth-btn">
          <Link to="/auth">회원가입</Link>
        </div>
      </div>
    </div>
  );
};

export default UserHeader;

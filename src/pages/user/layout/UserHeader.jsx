import { MdOutlineLocationOn } from "react-icons/md";
import { IoCartOutline, IoSearchSharp } from "react-icons/io5";
import "./UserHeader.scss";
import { IoIosArrowDown } from "react-icons/io";

const UserHeader = () => {
  return (
    <div className="user-header">
      <div className="inner">
        <div className="user-header__logo">주문이요</div>
        <nav className="user-header__nav">
          <div className="user-header__location">
            <MdOutlineLocationOn />
            <span>대구 중구</span>
            <IoIosArrowDown />
          </div>
          <div className="user-header__search">
            <IoSearchSharp />
            <input className="search__input" type="text" value="검색창" />
          </div>
          <div className="user-header__cart">
            <IoCartOutline fontSize={24} />
          </div>
        </nav>
        <div className="user-header__auth">
          <div className="user-header__auth-login auth-btn">로그인</div>
          <div className="user-header__auth-signup auth-btn">회원가입</div>
        </div>
      </div>
    </div>
  );
};

export default UserHeader;

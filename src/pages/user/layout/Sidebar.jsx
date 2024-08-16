import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Sidebar.scss";

const Sidebar = ({
  isSidebarOpen,
  toggleSidebar,
  handleLogoutClick,
  userNickname,
}) => {
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);

  return (
    <>
      <div
        className={`sidebar-overlay ${isSidebarOpen ? "visible" : ""}`}
        onClick={toggleSidebar}
      >
        <div
          className={`sidebar ${isSidebarOpen ? "open" : ""}`}
          onClick={e => e.stopPropagation()}
        >
          {isLoggedIn ? (
            <ul className="sidebar__nav">
              <li className="sidebar__nav-item">
                <div>
                  <Link to="/mypage" onClick={toggleSidebar}>
                    <div>{userNickname}</div>
                  </Link>
                </div>
              </li>
              <li className="sidebar__nav-item">
                <Link to="/mypage" onClick={toggleSidebar}>
                  내정보
                </Link>
              </li>
              <li className="sidebar__nav-item">
                <Link to="/mypage/address" onClick={toggleSidebar}>
                  내주소
                </Link>
              </li>
              <li className="sidebar__nav-item">
                <Link to="/mypage/favorite" onClick={toggleSidebar}>
                  즐겨찾기
                </Link>
              </li>
              <li className="sidebar__nav-item">
                <Link to="/mypage/order" onClick={toggleSidebar}>
                  주문내역
                </Link>
              </li>
              <li className="sidebar__nav-item">
                <Link to="/mypage/review" onClick={toggleSidebar}>
                  리뷰내역
                </Link>
              </li>
              <li className="sidebar__nav-item">
                <Link to="/mypage/coupon" onClick={toggleSidebar}>
                  보유쿠폰
                </Link>
              </li>
              <li className="sidebar__nav-item">
                <Link to="/mypage/report/list" onClick={toggleSidebar}>
                  고객센터
                </Link>
              </li>
              <li className="sidebar__nav-item">
                <button onClick={handleLogoutClick}>로그아웃</button>
              </li>
            </ul>
          ) : (
            <ul className="sidebar__nav">
              <li className="sidebar__nav-item">
                <Link to="/login">로그인</Link>
              </li>
              <li className="sidebar__nav-item">
                <Link to="/auth">회원가입</Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;

import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import "./SidebarRight.scss";
import useFollowedRestaurants from "../../../hooks/useFollowedRestaurants";

const StatusListItem = styled.li`
  position: relative;
  opacity: ${props => (props.isclosed ? ".4" : "1")};
  cursor: ${props => (props.isclosed ? "auto" : "pointer")};

  &:before {
    content: ${props => (props.isclosed ? '"준비중"' : "")};
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: red;
    color: white;
    padding: 4px 6px;
    border-radius: 4px;
    font-size: 12px;
  }
`;

const SidebarHeart = ({ isSidebarHeart, toggleSidebarHeart }) => {
  const { restaurants, loading } = useFollowedRestaurants(); // 커스텀 훅 사용
  const navigate = useNavigate();

  return (
    <div
      className={`sidebar-right-overlay ${isSidebarHeart ? "visible" : ""}`}
      onClick={toggleSidebarHeart}
    >
      <div
        className={`sidebar-right ${isSidebarHeart ? "open" : ""}`}
        onClick={e => e.stopPropagation()}
      >
        <h2>찜 목록</h2>
        <ul>
          <li className="nav__item" onClick={toggleSidebarHeart}>
            <>
              {loading ? (
                <div className="loading">로딩 중...</div>
              ) : restaurants.length > 0 ? (
                <ul className="restaurants-page__list">
                  {restaurants.map(restaurant => (
                    <StatusListItem
                      className="restaurant-item"
                      key={restaurant.restaurantPk}
                      isclosed={restaurant.restaurantState === 2}
                      onClick={() => {
                        if (restaurant.restaurantState !== 2) {
                          navigate(`/restaurants/${restaurant.restaurantPk}`);
                        }
                      }}
                    >
                      <div className="img-cover">
                        <img
                          src={
                            restaurant.restaurantPic
                              ? `${restaurant.restaurantPic}`
                              : "/images/defaultRes.png"
                          }
                          alt={`${restaurant.restaurantName} 이미지`}
                          className="restaurant-item__image"
                        />
                      </div>
                      <div className="restaurant-item__info">
                        <div className="restaurant-item__top">
                          <h3 className="restaurant-item__title">
                            {restaurant.restaurantName}
                          </h3>
                        </div>
                      </div>
                    </StatusListItem>
                  ))}
                </ul>
              ) : (
                <div className="result__zero">검색 결과가 없습니다.</div>
              )}
            </>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SidebarHeart;

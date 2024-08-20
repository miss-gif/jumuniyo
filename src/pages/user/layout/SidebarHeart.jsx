import styled from "@emotion/styled";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./SidebarRight.scss";

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
  const [restaurants, setRestaurants] = useState([]);
  const accessToken = useSelector(state => state.user.accessToken);
  const navigate = useNavigate(); // useNavigate 훅 추가
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);

  useEffect(() => {
    const fetchFollowedRestaurants = async () => {
      try {
        const response = await axios.get("/api/restaurant/followed", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.data.statusCode === 1) {
          setRestaurants(response.data.resultData.list);
        } else {
          console.error("API 응답 오류:", response.data.resultMsg);
        }
      } catch (error) {
        console.error("API 요청 실패:", error);
      }
    };

    if (isLoggedIn) {
      fetchFollowedRestaurants();
    }
  }, [accessToken]);

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
              {restaurants.length > 0 ? (
                <ul className="restaurants-page__list">
                  {restaurants.map(restaurant => (
                    <StatusListItem
                      className="restaurant-item"
                      key={restaurant.restaurantPk}
                      isclosed={restaurant.restaurantState === 2}
                      onClick={() => {
                        if (restaurant.restaurantState !== 2) {
                          navigate(`/restaurants/${restaurant.restaurantPk}`); // Navigate 사용
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

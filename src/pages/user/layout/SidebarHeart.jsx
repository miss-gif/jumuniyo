import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import "./SidebarRight.scss";

const StatusListItem = styled.li`
  position: relative;
  opacity: ${props => (props.isClosed ? ".4" : "1")};
  cursor: ${props => (props.isClosed ? "auto" : "pointer")};

  &:before {
    content: ${props => (props.isClosed ? '"준비중"' : "")};
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

    fetchFollowedRestaurants();
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
        <li className="nav__item" onClick={toggleSidebarHeart}>
          <a href="#">
            <>
              {restaurants.length > 0 ? (
                <ul className="restaurants-page__list">
                  {restaurants.map(restaurant => (
                    <StatusListItem
                      className="restaurant-item"
                      key={restaurant.restaurantPk}
                      isClosed={restaurant.restaurantState === 2}
                      onClick={() => {
                        if (restaurant.restaurantState !== 2) {
                          Navigate(`/restaurants/${restaurant.restaurantPk}`);
                        }
                      }}
                    >
                      <div className="img-cover">
                        <img
                          src={
                            restaurant.restaurantPic
                              ? `/pic${restaurant.restaurantPic}`
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
                          <div className="rank-point">
                            {restaurant.reviewAvgScore
                              ? restaurant.reviewAvgScore.toFixed(1)
                              : "-"}
                          </div>
                        </div>
                        <div className="restaurant-item__comment-count">
                          <div className="restaurant-item__rank-point">
                            <p>
                              리뷰 <span>{restaurant.reviewTotalElements}</span>
                            </p>
                            <p className="none">
                              사장님댓글 <span>11643</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </StatusListItem>
                  ))}
                </ul>
              ) : (
                <div className="result__zero">검색 결과가 없습니다.</div>
              )}
            </>
          </a>
        </li>
      </div>
    </div>
  );
};

export default SidebarHeart;

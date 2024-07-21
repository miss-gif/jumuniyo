import React, { useEffect, useState } from "react";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import LoadingSpinner from "../components/common/LoadingSpinner";
import styled from "styled-components";

const StatusListItem = styled.li`
  position: relative;
  background-color: ${props => (props.isClosed ? "#ddd" : "white")};
  opacity: ${props => (props.isClosed ? ".6" : "1")};
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

const RestaurantsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const locationData = useSelector(state => state.user.locationData);

  const [restaurantData, setRestaurantData] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderType, setOrderType] = useState(1); // 기본 정렬순

  useEffect(() => {
    const fetchRestaurants = async () => {
      setIsLoading(true);
      setError(null);

      const addrX = locationData?.latitude || 0;
      const addrY = locationData?.longitude || 0;

      const queryString = `${id}&page=1&order_type=${orderType}&addrX=${addrX}&addrY=${addrY}`;

      try {
        const response = await axios.get(`/api/restaurant?${queryString}`);
        setRestaurantData(response.data.resultData.list);
        setTotalElements(response.data.resultData.totalElements);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRestaurants();
  }, [id, orderType, locationData]); // orderType이나 locationData가 변경될 때마다 재호출

  const handleOrderChange = e => {
    setOrderType(e.target.value);
  };

  return (
    <div className="restaurants-page">
      <div className="filters">
        <select
          className="filters__select"
          value={orderType}
          onChange={handleOrderChange}
        >
          <option value="1">기본 정렬순</option>
          <option value="2">가까운 거리순</option>
          <option value="3">별점 높은순</option>
        </select>
      </div>
      <h2 className="restaurants-page__title">
        주문이요 등록 음식점
        <span className="search-count">{totalElements}</span>
      </h2>
      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <p>에러 발생: {error.message}</p>
      ) : (
        <ul className="restaurants-page__list">
          {restaurantData.map(restaurant => (
            <StatusListItem
              className="restaurant-item bc"
              key={restaurant.restaurantPk}
              isClosed={restaurant.restaurantState === 2}
              onClick={() => {
                if (restaurant.restaurantState !== 2) {
                  navigate(`/restaurants/${restaurant.restaurantPk}`);
                }
              }}
            >
              <img
                src={restaurant.restaurantPic || "/images/defaultRes.png"}
                alt={`${restaurant.restaurantName} 이미지`}
                className="restaurant-item__image"
              />
              <div className="restaurant-item__info">
                <h3 className="restaurant-item__title">
                  {restaurant.restaurantName}
                </h3>
                <div className="restaurant-item__comment-count">
                  <div className="restaurant-item__rank-point">
                    <div className="rank-point">
                      <MdOutlineStarPurple500 />
                      <p>
                        {restaurant.reviewAvgScore
                          ? restaurant.reviewAvgScore.toFixed(1)
                          : "N/A"}
                      </p>
                    </div>
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
      )}
    </div>
  );
};

export default RestaurantsPage;

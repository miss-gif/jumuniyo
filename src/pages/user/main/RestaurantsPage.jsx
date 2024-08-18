// 검색결과 페이지

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import styled from "styled-components";
import LoadingSpinner from "../../../components/common/LoadingSpinner";
import useDebounce from "../../../hooks/useDebounce";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const StatusListItem = styled.li`
  position: relative;
  opacity: ${props => (props.isclosed === "true" ? ".4" : "1")};
  cursor: ${props => (props.isclosed === "true" ? "auto" : "pointer")};

  &:before {
    content: ${props => (props.isclosed === "true" ? '"준비중"' : "")};
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
  const searchRestaurant = useSelector(state => state.user.searchRestaurant);

  const [restaurantData, setRestaurantData] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderType, setOrderType] = useState("1"); // 기본 정렬순

  // 커스텀 훅 사용으로 지연 검색
  const debouncedSearchTerm = useDebounce(searchRestaurant, 500);

  useEffect(() => {
    const fetchRestaurants = async () => {
      setIsLoading(true);
      setError(null);

      const addrX = locationData?.longitude || 0;
      const addrY = locationData?.latitude || 0;
      const search = searchRestaurant || "";

      // 위도, 경도 순서 변경
      const queryString = `${id}&page=1&order_type=${orderType}&addrX=${addrY}&addrY=${addrX}&search=${search}`;

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
  }, [id, orderType, locationData.latitude, debouncedSearchTerm]);

  const handleOrderChange = e => {
    setOrderType(e.target.value);
  };

  return (
    <div className="restaurants-page">
      <div className="filters">
        <label
          className={`filters__select ${orderType === "1" ? "active" : ""}`}
        >
          <input
            type="radio"
            name="orderType"
            value="1"
            checked={orderType === "1"}
            onChange={handleOrderChange}
          />
          기본 정렬순
        </label>
        <label
          className={`filters__select ${orderType === "2" ? "active" : ""}`}
        >
          <input
            type="radio"
            name="orderType"
            value="2"
            checked={orderType === "2"}
            onChange={handleOrderChange}
          />
          가까운 거리순
        </label>
        <label
          className={`filters__select ${orderType === "3" ? "active" : ""}`}
        >
          <input
            type="radio"
            name="orderType"
            value="3"
            checked={orderType === "3"}
            onChange={handleOrderChange}
          />
          별점 높은순
        </label>
      </div>
      <h2 className="restaurants-page__title">
        전체보기 (<span className="search-count">{totalElements}</span>)건
      </h2>
      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <p>에러 발생: {error.message}</p>
      ) : (
        <>
          {restaurantData.length > 0 ? (
            <ul className="restaurants-page__list">
              {restaurantData.map(restaurant => (
                <StatusListItem
                  className="restaurant-item"
                  key={restaurant.restaurantPk}
                  isclosed={restaurant.restaurantState === 2 ? "true" : "false"}
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
                    <div className="main-page__toggle-heart">
                      {/* {restaurant.isFollow ? <FaHeart /> : <FaRegHeart />} */}
                    </div>
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
            <>
              <div className="result__zero">검색 결과가 없습니다.</div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default RestaurantsPage;

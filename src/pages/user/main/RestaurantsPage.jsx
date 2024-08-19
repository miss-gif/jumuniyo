import React, { useEffect, useState, useCallback } from "react";
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
  const [page, setPage] = useState(1); // 현재 페이지 상태
  const [hasMore, setHasMore] = useState(true); // 추가 데이터 여부

  // 커스텀 훅 사용으로 지연 검색
  const debouncedSearchTerm = useDebounce(searchRestaurant, 500);

  const fetchRestaurants = useCallback(
    async (page = 1) => {
      setIsLoading(true);
      setError(null);

      const addrX = locationData?.longitude || 0;
      const addrY = locationData?.latitude || 0;
      const search = searchRestaurant || "";

      const queryString = `${id}&page=${page}&order_type=${orderType}&addrX=${addrY}&addrY=${addrX}&search=${search}`;

      try {
        const response = await axios.get(`/api/restaurant?${queryString}`);
        const newRestaurants = response.data.resultData.list;
        setRestaurantData(prevData => [...prevData, ...newRestaurants]);
        setTotalElements(response.data.resultData.totalElements);
        setHasMore(newRestaurants.length > 0); // 데이터가 더 있는지 확인
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    },
    [id, orderType, locationData.latitude, searchRestaurant],
  );

  useEffect(() => {
    setPage(1); // 페이지 초기화
    setRestaurantData([]); // 기존 데이터 초기화
    fetchRestaurants(1); // 첫 페이지 데이터 로드
  }, [
    id,
    orderType,
    locationData.latitude,
    debouncedSearchTerm,
    // fetchRestaurants,
  ]);

  const handleScroll = useCallback(() => {
    if (isLoading || !hasMore) return; // 이미 로딩 중이거나 더 이상 데이터가 없으면 중지

    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 50) {
      // 페이지 하단 근처에 도달했을 때
      setPage(prevPage => prevPage + 1);
    }
  }, [isLoading, hasMore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (page > 1) {
      fetchRestaurants(page);
    }
  }, [page, fetchRestaurants]);

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
      {isLoading && page === 1 ? (
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
            <div className="result__zero">검색 결과가 없습니다.</div>
          )}
        </>
      )}
      {isLoading && page > 1 && <LoadingSpinner />} {/* 추가 페이지 로딩 */}
    </div>
  );
};

export default RestaurantsPage;

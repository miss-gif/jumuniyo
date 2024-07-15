import React, { useEffect } from "react";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Filters from "../components/restaurants/Filters";
import useFetchRestaurantData from "../hooks/useFetchRestaurantData";

const RestaurantsPage = () => {
  const { restaurantData, isLoading, error, fetchData } =
    useFetchRestaurantData();

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="restaurants-page">
      <Filters />
      <h2 className="restaurants-page__title">
        주문이요 등록 음식점
        <span className="search-count">{restaurantData.totalElements}</span>
      </h2>
      {isLoading ? (
        <p>로딩 중...</p>
      ) : error ? (
        <p>에러 발생: {error.message}</p>
      ) : (
        <ul className="restaurants-page__list">
          {restaurantData.map(restaurant => (
            <li
              className="restaurant-item bc"
              key={restaurant.restaurantPk}
              onClick={() => {
                navigate(`/restaurantdetail/${restaurant.restaurantPk}`);
              }}
            >
              <img
                src={restaurant.restaurantPic || "https://picsum.photos/200/"}
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
                      <p>{restaurant.reviewAvgScore}</p>
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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RestaurantsPage;

import React, { useState, useEffect } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useSelector } from "react-redux";
import axios from "axios";

const RestaurantDetailInfo = ({ restaurantData, onShowLoginModal }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [showNotLoginAlert, setShowNotLoginAlert] = useState(false); // 경고 메시지 상태 추가
  const accessToken = useSelector(state => state.user.accessToken);
  const isLoggedIn = !!accessToken;

  useEffect(() => {
    // 찜하기 상태 초기화
    const fetchFavoriteStatus = async () => {
      try {
        const response = await axios.get(
          `/api/restaurant/${restaurantData.restaurantPk}`, // 실제 API 호출 경로를 사용하세요.
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        setIsFavorited(response.data.resultData.isFollow === 1);
      } catch (err) {
        console.error("Failed to fetch favorite status:", err);
      }
    };

    if (isLoggedIn) {
      fetchFavoriteStatus();
    }
  }, [isLoggedIn, restaurantData.restaurantPk, accessToken]);

  const handleFavoriteToggle = async () => {
    if (!isLoggedIn) {
      setShowNotLoginAlert(true); // 경고 메시지 표시
      onShowLoginModal();
      return;
    }

    try {
      const response = await axios.put(
        `/api/follow/toggle/${restaurantData.restaurantPk}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      if (response.data.statusCode === 1) {
        setIsFavorited(response.data.resultData === 1);
      }
    } catch (err) {
      console.error("Failed to toggle favorite:", err);
    }
  };

  const roundedReviewScore = Math.round(restaurantData.reviewScore * 100) / 100;

  const renderStars = score => {
    const fullStars = Math.floor(score);
    const halfStar = score % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <>
        {Array(fullStars)
          .fill("★")
          .map((star, index) => (
            <span key={`full-${index}`} className="star full">
              {star}
            </span>
          ))}
        {halfStar && <span className="star half">★</span>}
        {Array(emptyStars)
          .fill("☆")
          .map((star, index) => (
            <span key={`empty-${index}`} className="star empty">
              {star}
            </span>
          ))}
      </>
    );
  };

  return (
    <div className="restaurant-detail-page__info">
      <h2 className="restaurant-detail-page__info-name">
        {restaurantData.restaurantName}
        <div className="iconforinfo" onClick={handleFavoriteToggle}>
          {isFavorited ? (
            <FavoriteIcon style={{ color: "red" }} />
          ) : (
            <FavoriteBorderIcon style={{ color: "red" }} />
          )}
        </div>
      </h2>
      {showNotLoginAlert && <div>로그인이 필요합니다.</div>}{" "}
      {/* 경고 메시지 컴포넌트 추가 */}
      <div className="restaurant-detail-page__info-content">
        <div className="restaurant-detail-page__info-image">
          <img
            src={
              restaurantData.restaurantPic
                ? `/pic${restaurantData.restaurantPic}`
                : "/images/defaultRes.png"
            }
            alt={restaurantData.restaurantPic}
          />
        </div>
        <div className="restaurant-detail-page__info-details">
          <div className="restaurant-detail-page__info-rating">
            <span>{renderStars(roundedReviewScore)}</span>
            <p>{roundedReviewScore}</p>
          </div>
          <p className="restaurant-detail-page__info-payment">
            <span className="gray">결제</span> 신용카드, 현금, 웹 결제
          </p>
        </div>
      </div>
      <p className="restaurant-detail-page__info-notice">
        <span>가게 소개: </span> {restaurantData.restaurantDesc}
      </p>
    </div>
  );
};

export default RestaurantDetailInfo;

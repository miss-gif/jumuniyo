import React, { useState, useEffect } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useSelector } from "react-redux";
import axios from "axios";

const RestaurantDetailInfo = ({ restaurantData, onShowLoginModal }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [showNotLoginAlert, setShowNotLoginAlert] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [receivedCoupons, setReceivedCoupons] = useState([]); // 유저가 가진 쿠폰 ID를 저장
  const accessToken = useSelector(state => state.user.accessToken);
  const isLoggedIn = !!accessToken;

  useEffect(() => {
    // 찜하기 상태 초기화
    const fetchFavoriteStatus = async () => {
      try {
        const response = await axios.get(
          `/api/restaurant/${restaurantData.restaurantPk}`,
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

  useEffect(() => {
    // 유저가 가진 쿠폰 목록 가져오기
    const fetchUserCoupons = async () => {
      try {
        const response = await axios.get(`/api/coupons/user`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (response.data.statusCode === 1) {
          const userCouponIds = response.data.resultData.map(
            coupon => coupon.couponId,
          );
          setReceivedCoupons(userCouponIds); // 받은 쿠폰 ID를 저장
        }
      } catch (err) {
        console.error("Failed to fetch user coupons:", err);
      }
    };

    if (isLoggedIn) {
      fetchUserCoupons();
    }
  }, [isLoggedIn, accessToken]);

  useEffect(() => {
    // 쿠폰 데이터 가져오기
    const fetchCoupons = async () => {
      try {
        const response = await axios.get(
          `/api/coupons/${restaurantData.restaurantPk}`,
        );
        if (response.data.statusCode === 1) {
          setCoupons(response.data.resultData);
        }
      } catch (err) {
        console.error("Failed to fetch coupons:", err);
      }
    };

    fetchCoupons();
  }, [restaurantData.restaurantPk]);

  const handleFavoriteToggle = async () => {
    if (!isLoggedIn) {
      setShowNotLoginAlert(true);
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

  const handleCouponClick = async couponId => {
    if (receivedCoupons.includes(couponId)) {
      return; // 이미 발급된 쿠폰이면 아무 작업도 하지 않음
    }

    if (!isLoggedIn) {
      setShowNotLoginAlert(true);
      onShowLoginModal();
      return;
    }

    try {
      const response = await axios.post(`/api/coupons/${couponId}`, null, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.data.statusCode === 1) {
        setReceivedCoupons([...receivedCoupons, couponId]); // 발급된 쿠폰 ID를 배열에 추가
        alert("쿠폰을 받았습니다!");
      }
    } catch (err) {
      console.error("Failed to receive coupon:", err);
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
    <>
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
        {showNotLoginAlert}
        <div className="restaurant-detail-page__info-content">
          <div className="restaurant-detail-page__info-image">
            <img
              src={
                restaurantData.restaurantPic
                  ? `${restaurantData.restaurantPic}`
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
        <div className="couponForResDetail">
          {coupons.map(coupon => (
            <div
              key={coupon.id}
              className={`oneCoupon ${receivedCoupons.includes(coupon.id) ? "disabled" : ""}`}
              onClick={() => handleCouponClick(coupon.id)}
              style={{
                pointerEvents: receivedCoupons.includes(coupon.id)
                  ? "none"
                  : "auto",
                opacity: receivedCoupons.includes(coupon.id) ? 0.5 : 1,
                position: "relative",
                cursor: receivedCoupons.includes(coupon.id)
                  ? "default"
                  : "pointer",
              }}
            >
              {receivedCoupons.includes(coupon.id) && (
                <div
                  style={{
                    position: "absolute",
                    top: "30%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    backgroundColor: "rgba(255, 0, 0, 0.8)",
                    color: "#fff",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    zIndex: 10,
                    fontSize: "0.9em",
                  }}
                >
                  이미 받으신 쿠폰입니다.
                </div>
              )}
              <div className="couponTitle">{coupon.name}</div>
              <div className="couponContent">{coupon.content}</div>
              <div className="discount">{coupon.price}원</div>
              <div className="minOrder">
                최소 주문 금액: {coupon.minOrderAmount}원
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RestaurantDetailInfo;

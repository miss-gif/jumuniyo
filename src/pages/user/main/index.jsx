import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { IoIosHeartEmpty } from "react-icons/io";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import "swiper/css";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "./MainPage.scss";

const MainPage = () => {
  const swiperRef = useRef(null);
  const dispatch = useDispatch();
  const { locationData } = useSelector(state => state.user);
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoupons = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `/api/restaurant/coupon?addrX=${locationData.latitude}&addrY=${locationData.longitude}`,
        );
        setCoupons(response.data.resultData.list);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoupons();
  }, [locationData]);

  const handlePrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  return (
    <div className="main-page">
      <div className="coupon-event">
        <div className="carousel-header">
          <h3 className="carousel-header__title">쿠폰 이벤트 진행중</h3>
          <div className="carousel-header__controller">
            <div className="carousel-header__controller-all">See all</div>
            <div className="carousel-header__controller-btns">
              <button
                className="carousel-header__controller-prev"
                onClick={handlePrev}
              >
                <MdNavigateBefore />
              </button>
              <button
                className="carousel-header__controller-next"
                onClick={handleNext}
              >
                <MdNavigateNext />
              </button>
            </div>
          </div>
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          <Swiper
            ref={swiperRef}
            slidesPerView={4}
            spaceBetween={10}
            modules={[Navigation]}
            className="mySwiper main-page__list"
          >
            {coupons.map(coupon => (
              <SwiperSlide
                key={coupon.restaurantPk}
                className="main-page__item"
              >
                <div className="main-page__image main-page__image--background">
                  <div className="main-page__store-img__cover">
                    <img
                      src={`/pic/${coupon.restaurantPic}`}
                      alt={coupon.restaurantName}
                    />
                  </div>
                  <div className="main-page__toggle-heart">
                    <IoIosHeartEmpty />
                  </div>
                </div>
                <div className="main-page__store-info">
                  <div className="main-page__store-name">
                    {coupon.restaurantName}
                  </div>
                  <div className="main-page__score">
                    {coupon.reviewAvgScore.toFixed(1)}
                  </div>
                </div>
                <div className="main-page__review-info">
                  <div className="main-page__review">
                    리뷰
                    <span className="main-page__review-count">
                      {coupon.reviewTotalElements}
                    </span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default MainPage;

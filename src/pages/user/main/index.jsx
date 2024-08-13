import axios from "axios";
import { useEffect, useState, useRef, memo } from "react";
import { IoIosHeartEmpty } from "react-icons/io";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import "swiper/css";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "./MainPage.scss";

const SwiperCarousel = memo(
  ({ title, data, loading, error, onPrev, onNext, swiperRef }) => (
    <div className="carousel">
      <div className="carousel-header">
        <h3 className="carousel-header__title">{title}</h3>
        <div className="carousel-header__controller">
          <div className="carousel-header__controller-all">See all</div>
          <div className="carousel-header__controller-btns">
            <button
              className="carousel-header__controller-prev"
              onClick={onPrev}
            >
              <MdNavigateBefore />
            </button>
            <button
              className="carousel-header__controller-next"
              onClick={onNext}
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
      ) : data.length > 0 ? (
        <Swiper
          onBeforeInit={swiper => {
            swiperRef.current = swiper;
          }}
          slidesPerView={4}
          spaceBetween={10}
          modules={[Navigation]}
          className="mySwiper main-page__list"
        >
          {data.map(item => (
            <SwiperSlide key={item.restaurantPk} className="main-page__item">
              <div className="main-page__image main-page__image--background">
                <div className="main-page__store-img__cover">
                  <img
                    src={`/pic/${item.restaurantPic}`}
                    alt={item.restaurantName}
                  />
                </div>
                <div className="main-page__toggle-heart">
                  <IoIosHeartEmpty />
                </div>
              </div>
              <div className="main-page__store-info">
                <div className="main-page__store-name">
                  {item.restaurantName}
                </div>
                <div className="main-page__score">{item.reviewAvgScore}</div>
              </div>
              <div className="main-page__review-info">
                <div className="main-page__review">
                  리뷰
                  <span className="main-page__review-count">
                    {item.reviewTotalElements}
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div>No data available</div>
      )}
    </div>
  ),
);

SwiperCarousel.displayName = "SwiperCarousel";

const MainPage = () => {
  const swiperRef = useRef(null);
  const dispatch = useDispatch();
  const { locationData } = useSelector(state => state.user);
  const [coupons, setCoupons] = useState([]);
  const [newStores, setNewStores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async (url, setData) => {
      setLoading(true);
      try {
        const response = await axios.get(url);
        const list = response.data?.resultData?.list || [];
        setData(list);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData(
      `/api/restaurant/coupon?addrX=${locationData.longitude}&addrY=${locationData.latitude}`,
      setCoupons,
    );
    fetchData(
      `/api/restaurant/new10?addrX=${locationData.longitude}&addrY=${locationData.latitude}`,
      setNewStores,
    );
  }, [locationData]);

  const handlePrev = () => swiperRef.current?.slidePrev();
  const handleNext = () => swiperRef.current?.slideNext();

  return (
    <div className="main-page">
      <SwiperCarousel
        title="쿠폰 이벤트 진행중"
        data={coupons}
        loading={loading}
        error={error}
        onPrev={handlePrev}
        onNext={handleNext}
        swiperRef={swiperRef}
      />
      <SwiperCarousel
        title="최근 입점한 상점"
        data={newStores}
        loading={loading}
        error={error}
        onPrev={handlePrev}
        onNext={handleNext}
        swiperRef={swiperRef}
      />
      <SwiperCarousel
        title="최근 주문한 상점(스웨거 문제)"
        data={newStores}
        loading={loading}
        error={error}
        onPrev={handlePrev}
        onNext={handleNext}
        swiperRef={swiperRef}
      />
      <SwiperCarousel
        title="찜한 상점(작업대기)"
        data={newStores}
        loading={loading}
        error={error}
        onPrev={handlePrev}
        onNext={handleNext}
        swiperRef={swiperRef}
      />
    </div>
  );
};

export default MainPage;

import axios from "axios";
import { useEffect, useState, useRef, memo } from "react";
import { IoIosHeartEmpty } from "react-icons/io";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import "swiper/css";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "./MainPage.scss";
import { useNavigate } from "react-router";

const SwiperCarousel = memo(
  ({ title, data, loading, error, onPrev, onNext, swiperRef }) => {
    const navigate = useNavigate(); // useHistory 훅 사용

    const handleClick = restaurantPk => {
      navigate(`/restaurants/${restaurantPk}`); // 해당 경로로 이동
    };

    return (
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
                <div
                  className="main-page__image main-page__image--background"
                  onClick={() => {
                    handleClick(item.restaurantPk);
                  }}
                >
                  <div className="main-page__store-img__cover">
                    <img
                      src={
                        item.restaurantPic
                          ? `${item.restaurantPic}`
                          : "/images/defaultRes.png"
                      }
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
    );
  },
);

SwiperCarousel.displayName = "SwiperCarousel";

const MainPage = () => {
  const swiperRef = useRef(null);
  const dispatch = useDispatch();
  const { locationData } = useSelector(state => state.user);
  const [coupons, setCoupons] = useState([]);
  const [newStores, setNewStores] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [heartStores, setHeartStores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);

  const accessToken = useSelector(state => state.user.accessToken);

  useEffect(() => {
    const fetchData = async (url, setData) => {
      setLoading(true);
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const list = response.data?.resultData?.list || [];
        setData(list);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const addrX = locationData?.longitude || 0;
    const addrY = locationData?.latitude || 0;

    if (isLoggedIn) {
      fetchData(
        `/api/restaurant/coupon?addrX=${addrX}&addrY=${addrY}`,
        setCoupons,
      );
      fetchData(
        `/api/restaurant/new10?addrX=${addrX}&addrY=${addrY}`,
        setNewStores,
      );
      fetchData(
        `/api/restaurant/recent?addrX=${addrX}&addrY=${addrY}`,
        setRecentOrders,
      );
      fetchData(`/api/restaurant/followed`, setHeartStores);
    }
  }, [locationData]);

  const handlePrev = () => swiperRef.current?.slidePrev();
  const handleNext = () => swiperRef.current?.slideNext();

  return isLoggedIn ? (
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
        title="최근 주문한 상점"
        data={recentOrders}
        loading={loading}
        error={error}
        onPrev={handlePrev}
        onNext={handleNext}
        swiperRef={swiperRef}
      />
      <SwiperCarousel
        title="찜한 상점"
        data={heartStores}
        loading={loading}
        error={error}
        onPrev={handlePrev}
        onNext={handleNext}
        swiperRef={swiperRef}
      />
    </div>
  ) : (
    <>비로그인 출력화면</>
  );
};

export default MainPage;

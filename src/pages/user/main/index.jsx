import axios from "axios";
import { memo, useEffect, useRef, useState } from "react";
import { IoIosHeartEmpty } from "react-icons/io";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import "swiper/css";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "./MainPage.scss";

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
            {/* <div className="carousel-header__controller-all">See all</div> */}
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
  const swiperRefs = {
    coupons: useRef(null),
    newStores: useRef(null),
    recentOrders: useRef(null),
    heartStores: useRef(null),
  };
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

    if (locationData) {
      fetchData(
        `/api/restaurant/coupon?addrX=${addrY}&addrY=${addrX}`,
        setCoupons,
      );
      fetchData(
        `/api/restaurant/new10?addrX=${addrY}&addrY=${addrX}`,
        setNewStores,
      );
    }

    if (isLoggedIn) {
      fetchData(
        `/api/restaurant/recent?addrX=${addrY}&addrY=${addrX}`,
        setRecentOrders,
      );
      fetchData(`/api/restaurant/followed`, setHeartStores);
    }
  }, [isLoggedIn, locationData]);

  return !locationData.latitude == 0 ? (
    <div className="main-page">
      <SwiperCarousel
        title="쿠폰 이벤트 진행 중인 상점"
        data={coupons}
        loading={loading}
        error={error}
        onPrev={() => swiperRefs.coupons.current?.slidePrev()}
        onNext={() => swiperRefs.coupons.current?.slideNext()}
        swiperRef={swiperRefs.coupons}
      />
      <SwiperCarousel
        title="최근 입점한 상점"
        data={newStores}
        loading={loading}
        error={error}
        onPrev={() => swiperRefs.newStores.current?.slidePrev()}
        onNext={() => swiperRefs.newStores.current?.slideNext()}
        swiperRef={swiperRefs.newStores}
      />
      {isLoggedIn ? (
        <>
          <SwiperCarousel
            title="최근 주문한 상점"
            data={recentOrders}
            loading={loading}
            error={error}
            onPrev={() => swiperRefs.recentOrders.current?.slidePrev()}
            onNext={() => swiperRefs.recentOrders.current?.slideNext()}
            swiperRef={swiperRefs.recentOrders}
          />
          <SwiperCarousel
            title="찜한 상점"
            data={heartStores}
            loading={loading}
            error={error}
            onPrev={() => swiperRefs.heartStores.current?.slidePrev()}
            onNext={() => swiperRefs.heartStores.current?.slideNext()}
            swiperRef={swiperRefs.heartStores}
          />
        </>
      ) : (
        <></>
      )}
    </div>
  ) : (
    <div className="대기화면">주소를 입력해주세요.</div>
  );
};

export default MainPage;

/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from "@emotion/styled";
import axios from "axios";
import { memo, useEffect, useRef, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import "swiper/css";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "./MainPage.scss";

const Button = styled.button<{ disabled: boolean }>`
  color: ${props => (props.disabled ? "#fff" : "#6c757d")};
`;

// RootState 인터페이스를 정의하여 Redux 상태 타입을 명확히 합니다.
interface RootState {
  user: {
    locationData: {
      latitude: number;
      longitude: number;
    };
    isLoggedIn: boolean;
    accessToken: string;
  };
}

// API로 받아올 데이터의 타입을 정의합니다.
interface Restaurant {
  restaurantPk: number;
  restaurantName: string;
  restaurantPic: string;
  reviewAvgScore: number;
  reviewTotalElements: number;
  isFollow: boolean;
}

// SwiperCarousel 컴포넌트의 props 타입을 정의합니다.
interface SwiperCarouselProps {
  title: string;
  data: Restaurant[];
  loading: boolean;
  error: string | null;
  onPrev: () => void;
  onNext: () => void;
  swiperRef: React.MutableRefObject<any>;
}

// SwiperCarousel 컴포넌트 내부
const SwiperCarousel = memo(
  ({
    title,
    data,
    loading,
    error,
    onPrev,
    onNext,
    swiperRef,
  }: SwiperCarouselProps) => {
    const navigate = useNavigate();

    // isBeginning과 isEnd 상태를 관리
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);

    // Swiper 초기화 및 상태 업데이트
    useEffect(() => {
      if (swiperRef.current) {
        swiperRef.current.on("slideChange", () => {
          setIsBeginning(swiperRef.current.isBeginning);
          setIsEnd(swiperRef.current.isEnd);
        });
      }
    }, [swiperRef]);

    const handleClick = (restaurantPk: number) => {
      navigate(`/restaurants/${restaurantPk}`);
    };

    return (
      <div className="carousel">
        <div className="carousel-header">
          <h3 className="carousel-header__title">{title}</h3>
          <div className="carousel-header__controller">
            <div className="carousel-header__controller-btns">
              <Button
                className="carousel-header__controller-prev"
                onClick={onPrev}
                disabled={isBeginning} // 맨 앞일 때 비활성화
              >
                <MdNavigateBefore />
              </Button>
              <Button
                className="carousel-header__controller-next"
                onClick={onNext}
                disabled={isEnd} // 맨 끝일 때 비활성화
              >
                <MdNavigateNext />
              </Button>
            </div>
          </div>
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : data.length > 0 ? (
          <Swiper
            onBeforeInit={(swiper: typeof Swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={() => {
              setIsBeginning(swiperRef.current?.isBeginning || false);
              setIsEnd(swiperRef.current?.isEnd || false);
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
                  onClick={() => handleClick(item.restaurantPk)}
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
                    {item.isFollow ? <FaHeart /> : <FaRegHeart />}
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
          <div className="no-data">죄송합니다, 일치하는 데이터가 없습니다.</div>
        )}
      </div>
    );
  },
);

SwiperCarousel.displayName = "SwiperCarousel";

const MainPage: React.FC = () => {
  const swiperRefs = {
    coupons: useRef<any>(null),
    newStores: useRef<any>(null),
    recentOrders: useRef<any>(null),
    heartStores: useRef<any>(null),
  };

  const { locationData } = useSelector((state: RootState) => state.user);
  const [coupons, setCoupons] = useState<Restaurant[]>([]);
  const [newStores, setNewStores] = useState<Restaurant[]>([]);
  const [recentOrders, setRecentOrders] = useState<Restaurant[]>([]);
  const [heartStores, setHeartStores] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn && locationData?.longitude == 0) {
      navigate("/");
    }

    if (!isLoggedIn && locationData?.longitude == 0) {
      navigate("/intro");
    }
  }, [locationData]);

  useEffect(() => {
    const fetchData = async (
      url: string,
      setData: React.Dispatch<React.SetStateAction<Restaurant[]>>,
    ) => {
      setLoading(true);
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const list: Restaurant[] = response.data?.resultData?.list || [];
        setData(list);
      } catch (err) {
        setError((err: any) => err.message);
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
  }, [isLoggedIn, locationData, accessToken]);

  return !locationData.latitude ? (
    <div className="대기화면">주소를 입력해주세요.</div>
  ) : (
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
      {isLoggedIn && (
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
      )}
    </div>
  );
};

export default MainPage;

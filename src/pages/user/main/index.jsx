import React, { useRef } from "react";
import { IoIosHeartEmpty } from "react-icons/io";
import "swiper/css";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "./MainPage.scss";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";

const MainPage = () => {
  const swiperRef = useRef(null);

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
      <div className="슬라이드1">
        <div className="carousel-header">
          <h3 className="carousel-header__title">치킨</h3>
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
        <Swiper
          ref={swiperRef}
          slidesPerView={4}
          spaceBetween={10}
          modules={[Navigation]}
          className="mySwiper main-page__list"
        >
          <SwiperSlide className="main-page__item">
            <div className="main-page__image main-page__image--background">
              <div className="main-page__toggle-heart">
                <IoIosHeartEmpty />
              </div>
            </div>
            <div className="main-page__store-info">
              <div className="main-page__store-name">McDonald</div>
              <div className="main-page__score">4.5</div>
            </div>
            <div className="main-page__review-info">
              <div className="main-page__review">
                리뷰
                <span className="main-page__review-count">33</span>
              </div>
              <div className="main-page__owner-review">
                사장님리뷰
                <span className="main-page__owner-review-count">33</span>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="main-page__item">
            <div className="main-page__image main-page__image--background">
              <div className="main-page__toggle-heart">
                <IoIosHeartEmpty />
              </div>
            </div>
            <div className="main-page__store-info">
              <div className="main-page__store-name">McDonald</div>
              <div className="main-page__score">4.5</div>
            </div>
            <div className="main-page__review-info">
              <div className="main-page__review">
                리뷰
                <span className="main-page__review-count">33</span>
              </div>
              <div className="main-page__owner-review">
                사장님리뷰
                <span className="main-page__owner-review-count">33</span>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="main-page__item">
            <div className="main-page__image main-page__image--background">
              <div className="main-page__toggle-heart">
                <IoIosHeartEmpty />
              </div>
            </div>
            <div className="main-page__store-info">
              <div className="main-page__store-name">McDonald</div>
              <div className="main-page__score">4.5</div>
            </div>
            <div className="main-page__review-info">
              <div className="main-page__review">
                리뷰
                <span className="main-page__review-count">33</span>
              </div>
              <div className="main-page__owner-review">
                사장님리뷰
                <span className="main-page__owner-review-count">33</span>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="main-page__item">
            <div className="main-page__image main-page__image--background">
              <div className="main-page__toggle-heart">
                <IoIosHeartEmpty />
              </div>
            </div>
            <div className="main-page__store-info">
              <div className="main-page__store-name">McDonald</div>
              <div className="main-page__score">4.5</div>
            </div>
            <div className="main-page__review-info">
              <div className="main-page__review">
                리뷰
                <span className="main-page__review-count">33</span>
              </div>
              <div className="main-page__owner-review">
                사장님리뷰
                <span className="main-page__owner-review-count">33</span>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="main-page__item">
            <div className="main-page__image main-page__image--background">
              <div className="main-page__toggle-heart">
                <IoIosHeartEmpty />
              </div>
            </div>
            <div className="main-page__store-info">
              <div className="main-page__store-name">McDonald</div>
              <div className="main-page__score">4.5</div>
            </div>
            <div className="main-page__review-info">
              <div className="main-page__review">
                리뷰
                <span className="main-page__review-count">33</span>
              </div>
              <div className="main-page__owner-review">
                사장님리뷰
                <span className="main-page__owner-review-count">33</span>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default MainPage;

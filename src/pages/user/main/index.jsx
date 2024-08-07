import { IoIosHeartEmpty, IoMdHeart } from "react-icons/io";
import { Swiper, SwiperSlide } from "swiper/react";
import "./MainPage.scss";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const MainPage = () => {
  return (
    <div className="main-page">
      <Swiper
        navigation={true}
        modules={[Navigation]}
        spaceBetween={50}
        slidesPerView={3}
        onSlideChange={() => console.log("slide change")}
        onSwiper={swiper => console.log(swiper)}
        className="main-page__list"
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
  );
};

export default MainPage;

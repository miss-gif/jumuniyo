import React, { useEffect, useRef, useState } from "react";
import SwiperSlideComponent from "../common/SwiperSlideComponent";
import carouselDummy from "../../json/user/carouselDummy.json";
import PropTypes from "prop-types";

const RecentOrderCarousel = () => {
  const [data, setData] = useState([]);
  const swiperRef = useRef(null);

  useEffect(() => {
    const swiperEl = swiperRef.current;

    if (swiperEl) {
      initializeSwiper(swiperEl);
    }

    setData(carouselDummy);
  }, []);

  const initializeSwiper = swiperEl => {
    const swiperParams = {
      slidesPerView: 5,
      spaceBetween: 8,
      breakpoints: {
        1024: {
          slidesPerView: 5,
        },
        768: {
          slidesPerView: 4,
        },
        480: {
          slidesPerView: 2,
        },
        240: {
          slidesPerView: 1,
        },
      },
      on: {
        init() {
          // ...
        },
      },
    };

    Object.assign(swiperEl, swiperParams);
    swiperEl.initialize();
  };

  return (
    <div>
      <swiper-container ref={swiperRef} init="false">
        {data.map(restaurant => (
          <SwiperSlideComponent
            key={restaurant.id}
            image={restaurant.image}
            title={restaurant.title}
            rating={restaurant.rating}
            reviews={restaurant.reviews}
          />
        ))}
      </swiper-container>
    </div>
  );
};

RecentOrderCarousel.propTypes = {
  carouselDummy: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      reviews: PropTypes.number.isRequired,
    }),
  ),
};

export default RecentOrderCarousel;

import React, { useEffect, useRef, useState } from "react";
import carouselDummy from "../../../json/user/carouselDummy.json";
import PropTypes from "prop-types";
import RestaurantDetailSwiperSlide from "./RestaurantDetailSwiperSlide";

const RestaurantDetailCarousel = () => {
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
      slidesPerView: 3.5,
      spaceBetween: 8,
      breakpoints: {
        1024: {
          slidesPerView: 3.5,
        },
        768: {
          slidesPerView: 3.5,
        },
        480: {
          slidesPerView: 3.5,
        },
        240: {
          slidesPerView: 2.2,
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
      <swiper-container ref={swiperRef} init="false" navigation="true">
        {data.map(restaurant => (
          <RestaurantDetailSwiperSlide
            key={restaurant.id}
            image={restaurant.image}
            title={restaurant.title}
            price={restaurant.price}
          />
        ))}
      </swiper-container>
    </div>
  );
};

RestaurantDetailCarousel.propTypes = {
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

export default RestaurantDetailCarousel;

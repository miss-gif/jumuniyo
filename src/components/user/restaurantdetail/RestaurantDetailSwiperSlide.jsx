// SwiperSlide.js
import React from "react";
import PropTypes from "prop-types";

const RestaurantDetailSwiperSlide = ({ image, title, price }) => {
  return (
    <swiper-slide>
      <div className="carousel__item">
        <img src={image} alt={title} className="carousel__image" />
        <div className="carousel__text">
          <div className="carousel__top">
            <p className="carousel__title">{title}</p>
          </div>
          <div>
            <p className="carousel__price">{price}</p>
          </div>
        </div>
      </div>
    </swiper-slide>
  );
};

RestaurantDetailSwiperSlide.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
};

export default RestaurantDetailSwiperSlide;

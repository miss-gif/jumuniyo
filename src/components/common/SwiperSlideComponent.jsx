// SwiperSlide.js
import React from "react";
import PropTypes from "prop-types";
import { MdOutlineStarPurple500 } from "react-icons/md";

const SwiperSlideComponent = ({ image, title, rating, reviews }) => {
  return (
    <swiper-slide className="carousel__slide">
      <img src={image} alt={title} className="carousel__image" />
      <div className="carousel__top">
        <p className="carousel__title">{title}</p>
      </div>
      <div className="carousel__comment-count">
        <div className="carousel__rank-point">
          <MdOutlineStarPurple500 />
          <p>{rating}</p>
        </div>
        <p>
          리뷰 <span>{reviews}</span>
        </p>
      </div>
    </swiper-slide>
  );
};

SwiperSlideComponent.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  reviews: PropTypes.number.isRequired,
};

export default SwiperSlideComponent;

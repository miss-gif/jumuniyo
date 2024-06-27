import React from "react";
import { register } from "swiper/element/bundle";
import { MdOutlineStarPurple500 } from "react-icons/md";

const NewRestaurantListCarousel = () => {
  register();

  return (
    <swiper-container
      className="carousel carousel--new-restaurant"
      slides-per-view={5}
      space-between={10}
    >
      <swiper-slide className="carousel__slide">
        <img
          src="https://picsum.photos/200/"
          alt=""
          className="carousel__image"
        />
        <div className="carousel__top">
          <p className="carousel__title">히야짬뽕-3호점</p>
        </div>
        <div className="carousel__comment-count">
          <div className="carousel__rank-point">
            <MdOutlineStarPurple500 />
            <p>4.8</p>
          </div>
          <p>
            리뷰 <span>11643</span>
          </p>
        </div>
      </swiper-slide>
      <swiper-slide className="carousel__slide">
        <img
          src="https://picsum.photos/200/"
          alt=""
          className="carousel__image"
        />
        <div className="carousel__top">
          <p className="carousel__title">히야짬뽕-3호점</p>
        </div>
        <div className="carousel__comment-count">
          <div className="carousel__rank-point">
            <MdOutlineStarPurple500 />
            <p>4.8</p>
          </div>
          <p>
            리뷰 <span>11643</span>
          </p>
        </div>
      </swiper-slide>
      <swiper-slide className="carousel__slide">
        <img
          src="https://picsum.photos/200/"
          alt=""
          className="carousel__image"
        />
        <div className="carousel__top">
          <p className="carousel__title">히야짬뽕-3호점</p>
        </div>
        <div className="carousel__comment-count">
          <div className="carousel__rank-point">
            <MdOutlineStarPurple500 />
            <p>4.8</p>
          </div>
          <p>
            리뷰 <span>11643</span>
          </p>
        </div>
      </swiper-slide>
      <swiper-slide className="carousel__slide">
        <img
          src="https://picsum.photos/200/"
          alt=""
          className="carousel__image"
        />
        <div className="carousel__top">
          <p className="carousel__title">히야짬뽕-3호점</p>
        </div>
        <div className="carousel__comment-count">
          <div className="carousel__rank-point">
            <MdOutlineStarPurple500 />
            <p>4.8</p>
          </div>
          <p>
            리뷰 <span>11643</span>
          </p>
        </div>
      </swiper-slide>
      <swiper-slide className="carousel__slide">
        <img
          src="https://picsum.photos/200/"
          alt=""
          className="carousel__image"
        />
        <div className="carousel__top">
          <p className="carousel__title">히야짬뽕-3호점</p>
        </div>
        <div className="carousel__comment-count">
          <div className="carousel__rank-point">
            <MdOutlineStarPurple500 />
            <p>4.8</p>
          </div>
          <p>
            리뷰 <span>11643</span>
          </p>
        </div>
      </swiper-slide>
      <swiper-slide className="carousel__slide">
        <img
          src="https://picsum.photos/200/"
          alt=""
          className="carousel__image"
        />
        <div className="carousel__top">
          <p className="carousel__title">히야짬뽕-3호점</p>
        </div>
        <div className="carousel__comment-count">
          <div className="carousel__rank-point">
            <MdOutlineStarPurple500 />
            <p>4.8</p>
          </div>
          <p>
            리뷰 <span>11643</span>
          </p>
        </div>
      </swiper-slide>
    </swiper-container>
  );
};

export default NewRestaurantListCarousel;

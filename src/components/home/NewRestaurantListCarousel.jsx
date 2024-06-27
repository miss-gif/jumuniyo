import React from "react";
import { register } from "swiper/element/bundle";

const NewRestaurantListCarousel = () => {
  register();

  return (
    <swiper-container
      className="swiper mySwiper"
      slides-per-view={6}
      space-between={10}
    >
      <swiper-slide>
        <img src="이미지" alt="" />
        <p className="title">음식점 상호명</p>
        <p>평점</p>
        <div>
          <p>음식점 리뷰 수</p>
          <p>사장님 댓글 수</p>
        </div>
      </swiper-slide>
      <swiper-slide>
        <img src="이미지" alt="" />
        <p className="title">음식점 상호명</p>
        <p>평점</p>
        <div>
          <p>음식점 리뷰 수</p>
          <p>사장님 댓글 수</p>
        </div>
      </swiper-slide>
      <swiper-slide>
        <img src="이미지" alt="" />
        <p className="title">음식점 상호명</p>
        <p>평점</p>
        <div>
          <p>음식점 리뷰 수</p>
          <p>사장님 댓글 수</p>
        </div>
      </swiper-slide>
      <swiper-slide>
        <img src="이미지" alt="" />
        <p className="title">음식점 상호명</p>
        <p>평점</p>
        <div>
          <p>음식점 리뷰 수</p>
          <p>사장님 댓글 수</p>
        </div>
      </swiper-slide>
      <swiper-slide>
        <img src="이미지" alt="" />
        <p className="title">음식점 상호명</p>
        <p>평점</p>
        <div>
          <p>음식점 리뷰 수</p>
          <p>사장님 댓글 수</p>
        </div>
      </swiper-slide>
      <swiper-slide>
        <img src="이미지" alt="" />
        <p className="title">음식점 상호명</p>
        <p>평점</p>
        <div>
          <p>음식점 리뷰 수</p>
          <p>사장님 댓글 수</p>
        </div>
      </swiper-slide>
      <swiper-slide>
        <img src="이미지" alt="" />
        <p className="title">음식점 상호명</p>
        <p>평점</p>
        <div>
          <p>음식점 리뷰 수</p>
          <p>사장님 댓글 수</p>
        </div>
      </swiper-slide>
    </swiper-container>
  );
};

export default NewRestaurantListCarousel;

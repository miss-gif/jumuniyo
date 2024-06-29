import React from "react";
import { MdOutlineStarPurple500 } from "react-icons/md";

const RestaurantsPage = () => {
  return (
    <>
      <div className="restaurants-page">
        <div className="filters">
          <select className="filters__select">
            <option value="1">기본 정렬순</option>
            <option value="2">별점순</option>
            <option value="3">리뷰 많은순</option>
          </select>
        </div>
        <p className="restaurants-page__title">주문이요 등록 음식점</p>
        <div className="restaurants-page__list">
          <div className="restaurant-item">
            <img
              src="https://picsum.photos/200/"
              alt=""
              className="restaurant-item__image"
            />
            <div className="restaurant-item__info">
              <p className="restaurant-item__title">히야짬뽕-3호점</p>
              <div className="restaurant-item__comment-count">
                <div className="restaurant-item__rank-point">
                  <div className="rank-point">
                    <MdOutlineStarPurple500 />
                    <p>4.8</p>
                  </div>
                  <p>
                    리뷰 <span>11643</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="restaurant-item">
            <img
              src="https://picsum.photos/200/"
              alt=""
              className="restaurant-item__image"
            />
            <div className="restaurant-item__info">
              <p className="restaurant-item__title">히야짬뽕-3호점</p>
              <div className="restaurant-item__comment-count">
                <div className="restaurant-item__rank-point">
                  <div className="rank-point">
                    <MdOutlineStarPurple500 />
                    <p>4.8</p>
                  </div>
                  <p>
                    리뷰 <span>11643</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="restaurant-item">
            <img
              src="https://picsum.photos/200/"
              alt=""
              className="restaurant-item__image"
            />
            <div className="restaurant-item__info">
              <p className="restaurant-item__title">히야짬뽕-3호점</p>
              <div className="restaurant-item__comment-count">
                <div className="restaurant-item__rank-point">
                  <div className="rank-point">
                    <MdOutlineStarPurple500 />
                    <p>4.8</p>
                  </div>
                  <p>
                    리뷰 <span>11643</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="restaurant-item">
            <img
              src="https://picsum.photos/200/"
              alt=""
              className="restaurant-item__image"
            />
            <div className="restaurant-item__info">
              <p className="restaurant-item__title">히야짬뽕-3호점</p>
              <div className="restaurant-item__comment-count">
                <div className="restaurant-item__rank-point">
                  <div className="rank-point">
                    <MdOutlineStarPurple500 />
                    <p>4.8</p>
                  </div>
                  <p>
                    리뷰 <span>11643</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RestaurantsPage;

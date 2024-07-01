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
        <h2 className="restaurants-page__title">주문이요 등록 음식점</h2>
        <ul className="restaurants-page__list">
          <li className="restaurant-item">
            <img
              src="https://picsum.photos/200/"
              alt=""
              className="restaurant-item__image"
            />
            <div className="restaurant-item__info">
              <h3 className="restaurant-item__title">히야짬뽕-3호점</h3>
              <div className="restaurant-item__comment-count">
                <div className="restaurant-item__rank-point">
                  <div className="rank-point">
                    <MdOutlineStarPurple500 />
                    <p>4.8</p>
                  </div>
                  <p>
                    리뷰 <span>11643</span>
                  </p>
                  <p>
                    사장님댓글 <span>11643</span>
                  </p>
                </div>
              </div>
            </div>
          </li>
          <li className="restaurant-item">
            <img
              src="https://picsum.photos/200/"
              alt=""
              className="restaurant-item__image"
            />
            <div className="restaurant-item__info">
              <h3 className="restaurant-item__title">히야짬뽕-3호점</h3>
              <div className="restaurant-item__comment-count">
                <div className="restaurant-item__rank-point">
                  <div className="rank-point">
                    <MdOutlineStarPurple500 />
                    <p>4.8</p>
                  </div>
                  <p>
                    리뷰 <span>11643</span>
                  </p>
                  <p>
                    사장님댓글 <span>11643</span>
                  </p>
                </div>
              </div>
            </div>
          </li>
          <li className="restaurant-item">
            <img
              src="https://picsum.photos/200/"
              alt=""
              className="restaurant-item__image"
            />
            <div className="restaurant-item__info">
              <h3 className="restaurant-item__title">히야짬뽕-3호점</h3>
              <div className="restaurant-item__comment-count">
                <div className="restaurant-item__rank-point">
                  <div className="rank-point">
                    <MdOutlineStarPurple500 />
                    <p>4.8</p>
                  </div>
                  <p>
                    리뷰 <span>11643</span>
                  </p>
                  <p>
                    사장님댓글 <span>11643</span>
                  </p>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default RestaurantsPage;

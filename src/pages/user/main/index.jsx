import { IoIosHeartEmpty, IoMdHeart } from "react-icons/io";
import "./MainPage.scss";

const MainPage = () => {
  return (
    <div className="main-page">
      <div className="inner">
        <ul className="main-page__filter-list">
          <li className="main-page__filter-item">기본정렬순</li>
          <li className="main-page__filter-item">가까운거리순</li>
          <li className="main-page__filter-item">별점높은순</li>
        </ul>
        <p className="main-page__result-count">0개 결과</p>
        <ul className="main-page__list">
          <li className="main-page__item">
            <div className="main-page__image main-page__image--background">
              <div className="main-page__toggle-heart">
                <IoIosHeartEmpty />
                <IoMdHeart />
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
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MainPage;
